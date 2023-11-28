<template>
  <LogoHeader />

  <div v-if="cronjob">
    <WiderHeader :cronjob="cronjob" :pods="pods" />

    <div class="container-xl clearfix mb-4">
      <JobPodList :job-pods="pods" :cronjob="cronjob" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LogoHeader from '@/components/LogoHeader.vue';
import JobPodList from '@/components/JobPodList.vue';
import RootBlankSlate from '@/views/RootBlankSlate.vue';
import WiderHeader from '@/components/WiderHeader.vue';
// import axios, { isCancel, AxiosError } from 'axios';

const {CronjobPodsRequest,
       CronjobPodsResponse} = require('../components/protos/sk8l_pb.js');
import Sk8lCronjobClient from '@/components/Sk8lCronjobClient.js';

export default {
  name: 'JobPodListView',
  props: ['namespace', 'cronjobName'],
  // eslint-disable-next-line
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     // need to cancel this when navigating to other pages
  //     vm.rootIntervalId = setInterval(vm.getData, 10000, vm);
  //   });
  // },
  // eslint-disable-next-line
  beforeRouteLeave(to, from) {
    // called when the route that renders this component is about to be navigated away from.
    // As with `beforeRouteUpdate`, it has access to `this` component instance.
    this.stream.cancel();
  },
  data() {
    return {
      componentKey: 20,
      pods: [],
      cronjob: null,
    };
  },
  methods: {
    responseJobPods() {
      // return this.response && this.response['cronjobs'] && this.response['cronjobs'].length > 0;
      return this.pods && this.pods.length > 0;
    },
  },
  mounted() {
    const app = this;

    var request = new CronjobPodsRequest();
    request.setCronjobname(this.cronjobName);
    request.setCronjobnamespace(this.namespace);

    app.stream = Sk8lCronjobClient.getCronjobPods(request, {});

    app.stream.on('data', function(response) {
      let obj = response.toObject();
      app.pods = obj.podsList.reverse();
      app.cronjob = obj.cronjob;
    });
    app.stream.on('status', function(status) {
      console.log(status.code);
      console.log(status.details);
      console.log(status.metadata);
    });
    app.stream.on('end', function(end) {
      // stream end signal
    });
  },
  components: {
    LogoHeader,
    JobPodList,
    RootBlankSlate,
    WiderHeader,
  },
};
</script>
