<template>
  <LogoHeader />

  <CronjobListHeader :namespace="namespace" />

  <div class="container-xl pt-3">
    <JobList :jobs="jobs" v-if="responseJobs()" />
    <RootBlankSlate v-else />
  </div>
</template>

<script>
import JobList from '@/components/JobList.vue';
import CronjobListHeader from '@/components/CronjobListHeader.vue';
import LogoHeader from '@/components/LogoHeader.vue';
import RootBlankSlate from '@/views/RootBlankSlate.vue';

import {JobsRequest,
       JobsResponse} from '@/components/protos/sk8l_pb.ts';
import Sk8lCronjobClient from '@/components/Sk8lCronjobClient.js';
import {ConnectError} from "@connectrpc/connect";

export default {
  name: 'JobListView',
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
      jobs: [],
    };
  },
  methods: {
    responseJobs() {
      // return this.response && this.response['cronjobs'] && this.response['cronjobs'].length > 0;
      return this.jobs && this.jobs.length > 0;
    },
    async getJobs(app, request) {
      let str = Sk8lCronjobClient.getJobs(
        request,
        (response, err) => {
          if (!err) {
            app.jobs = response.jobs;
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
    var request = new JobsRequest();
    const app = this;

    app.stream = await this.getJobs(app, request);
  },
  components: {
    CronjobListHeader,
    JobList,
    LogoHeader,
    RootBlankSlate,
  },
};
</script>
