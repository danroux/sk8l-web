<template>
  <LogoHeader />

  <CronjobListHeader :namespace="namespace" :cronjobs="cronjobs" />

  <div class="container-xl pt-3">
    <CronjobList :cron-jobs="cronjobs" v-if="responseCronJobs()" />
    <RootBlankSlate v-else />
  </div>
</template>

<script>
// @ is an alias to /src
import CronjobList from '@/components/CronjobList.vue';
import CronjobListHeader from '@/components/CronjobListHeader.vue';
import LogoHeader from '@/components/LogoHeader.vue';
import RootBlankSlate from '@/views/RootBlankSlate.vue';

const {CronjobsRequest,
       CronjobsResponse} = require('../components/protos/sk8l_pb.js');
import Sk8lCronjobClient from '@/components/Sk8lCronjobClient.js';

export default {
  name: 'HomeView',
  // eslint-disable-next-line
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // access to component public instance via `vm`
      // need to cancel this when navigating to other pages
      // eslint-disable-next-line
      vm.rootIntervalId = setInterval(vm.getData, 15000, vm);
    });
  },
  // eslint-disable-next-line
  beforeRouteLeave(to, from) {
    // called when the route that renders this component is about to be navigated away from.
    // As with `beforeRouteUpdate`, it has access to `this` component instance.
    clearInterval(this.rootIntervalId);
  },
  data() {
    return {
      componentKey: 20,
      namespace: process.env.VUE_APP_SK8L_K8_NAMESPACE,
      cronjobs: [],
    };
  },
  methods: {
    getData(app) {
      var request = new CronjobsRequest();

      Sk8lCronjobClient.getCronjobs(request, {}, (err, response) => {
        if (err) {
          console.log(`Unexpected error for getCronjobs: code = ${err.code}` +
          `, message = "${err.message}"`);
        } else {
          // need to reset because of setInterval
          let resp = response.toObject();
          app.cronjobs = resp.cronjobsList;
        }
      });
    },
    responseCronJobs() {
      // return this.response && this.response['cronjobs'] && this.response['cronjobs'].length > 0;
      return this.cronjobs && this.cronjobs.length > 0;
    },
  },
  mounted() {
    const app = this;
    app.getData(app);
  },
  components: {
    CronjobList,
    CronjobListHeader,
    LogoHeader,
    RootBlankSlate,
  },
};
</script>
