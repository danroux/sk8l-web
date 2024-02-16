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

import {CronjobPodsRequest,
       CronjobPodsResponse} from '@/components/protos/sk8l_pb.ts';
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
    this.stream();
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
    getCronjobPods(app, request) {
      let str = Sk8lCronjobClient.getCronjobPods(
        request,
        (response, err) => {
          if (!err) {
            app.pods = response.pods.reverse();
            app.cronjob = response.cronjob;
          } else {
            console.log("requestErr: ", err, response);
          }
        },
        (err) => {
          if (err) {
            console.log("onError: ", err);
          }
        }
      );

      return str;
    },
    leaving(event) {
      // window.addEventListener('beforeunload', this.handler)
      // https://laracasts.com/discuss/channels/vue/detect-page-refreshchange-in-vue
      // window.onblur = this.leaving;
      this.stream();
    }
  },
  mounted() {
    window.onbeforeunload = this.leaving;
    var request = new CronjobPodsRequest({ cronjobName: this.cronjobName, cronjobNamespace: this.namespace });
    const app = this;

    app.stream = this.getCronjobPods(app, request);
  },
  components: {
    LogoHeader,
    JobPodList,
    RootBlankSlate,
    WiderHeader,
  },
};
</script>
