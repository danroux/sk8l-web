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
       CronjobsResponse} = require('../components/protoz/sk8l_pb.ts');
import Sk8lCronjobClient from '@/components/Sk8lCronjobClient.js';
import {ConnectError} from "@connectrpc/connect";

export default {
  name: 'HomeView',
  // eslint-disable-next-line
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     // access to component public instance via `vm`
  //     // need to cancel this when navigating to other pages
  //     // eslint-disable-next-line
  //     vm.getData(vm);
  //     vm.rootIntervalId = setInterval(vm.getData, 10000, vm);
  //   });
  // },
  // eslint-disable-next-line
  beforeRouteLeave(to, from) {
    // called when the route that renders this component is about to be navigated away from.
    // As with `beforeRouteUpdate`, it has access to `this` component instance.
    // this.stream.cancel();
    this.stream();
  },
  data() {
    return {
      componentKey: 20,
      namespace: import.meta.env.VITE_SK8L_K8_NAMESPACE,
      cronjobs: [],
    };
  },
  methods: {
    responseCronJobs() {
      // return this.response && this.response['cronjobs'] && this.response['cronjobs'].length > 0;
      return this.cronjobs && this.cronjobs.length > 0;
    },
    async getCronjobs(app, request) {
      let str = Sk8lCronjobClient.getCronjobs(
        request,
        (response, err) => {
          if (!err) {
            app.cronjobs = response.cronjobs;
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
  async mounted() {
    window.onbeforeunload = this.leaving;
    var request = new CronjobsRequest();
    const app = this;

    app.stream = await this.getCronjobs(app, request);
  },
  components: {
    CronjobList,
    CronjobListHeader,
    LogoHeader,
    RootBlankSlate,
  },
};
</script>
