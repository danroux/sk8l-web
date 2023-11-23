<style scoped>
.BorderGrid {
    display: table;
    width: 100%;
    margin-top: -16px;
    margin-bottom: -16px;
    table-layout: fixed;
    border-collapse: collapse;
    border-style: hidden;
}

.BorderGrid-row {
    display: table-row;
}

.BorderGrid-cell {
    display: table-cell;
    border: 1px solid rgb(214,207,222);
}

.BorderGrid--spacious {
  margin-top: -24px;
  margin-bottom: -24px;
}

.BorderGrid--spacious .BorderGrid-cell {
    padding-top: 24px;
    padding-bottom: 24px;
}
</style>

<template>
  <!-- eslint-disable -->
  <LogoHeader />

  <div v-if="cronJob">
    <WiderHeader :cronjob="cronJob" :pods="cronJob.jobspodsList" />

    <div class="container-xl clearfix px-md-4 px-lg-5 px-3 mt-4">
      <Overview class="pb-1" :cronJob="cronJob" />

      <div class="gutter-condensed gutter-lg width-full flex-column flex-md-row d-flex mb-5">
        <div class="flex-shrink-0 col-12 col-md-9 mb-4 mb-md-0">
          <div class="container-xl clearfix py-3" v-if="cronJob">
            <Jobs :jobs="cronJob.jobsList" />
          </div>
        </div>

        <div class="flex-shrink-0 col-12 col-md-3">
          <div class="BorderGrid BorderGrid--spacious">
            <div class="BorderGrid-row">
              <div class="BorderGrid-cell">
                <h2 class="h4 mt-3 mb-2">Schedule</h2>
                <div class="text-small color-fg-muted">
                  <Octicon name="clock" class="mr-1" /> {{ schedule(cronJob.definition) }}
                </div>
              </div>
            </div>

            <div class="BorderGrid-row" v-if="initContainerCommands.length > 0">
              <div class="BorderGrid-cell">
                <h2 class="f4 mb-2">Init Container Commands</h2>
                <div class="text-small color-fg-muted my-2" v-for="(command, index) in initContainerCommands">
                  <Octicon name="triangle-right" class="mr-1" />{{ command }}
                </div>
              </div>
            </div>

            <div class="BorderGrid-row" v-if="containerCommands.length > 0">
              <div class="BorderGrid-cell">
                <h2 class="f4 mb-2">Container Commands</h2>
                <div class="text-small color-fg-muted my-2" v-for="(command, index) in containerCommands">
                  <Octicon name="triangle-right" class="mr-1" />{{ command }}
                </div>
              </div>
            </div>

            <div class="BorderGrid-row" v-if="ephemeralCommands.length > 0">
              <div class="BorderGrid-cell">
                <h2 class="f4 mb-2">Ephemeral Commands</h2>
                <div class="text-small color-fg-muted my-2" v-for="(command, index) in ephemeralCommands">
                  <Octicon name="triangle-right" class="mr-1" />{{ command }}
                </div>
              </div>
            </div>

            <div class="BorderGrid-row">
              <div class="BorderGrid-cell">
                <h2 class="f4 mb-2">Spec</h2>
                <div class="text-small color-fg-muted">
                  <Octicon :name="specIcon" class="mr-1" /> Completions {{ cronJob.spec.jobtemplate.spec.completions || "1" }}
                </div>
                <div class="text-small color-fg-muted mt-2">
                  <Octicon :name="specIcon" class="mr-1" /> Parallelism {{ cronJob.spec.jobtemplate.spec.parallelism || "1" }}
                </div>
                <div class="text-small color-fg-muted mt-2">
                  <Octicon :name="specIcon" class="mr-1" /> concurrencyPolicy {{ cronJob.spec.concurrencypolicy }}
                </div>
                <div class="text-small color-fg-muted mt-2">
                  <Octicon :name="specIcon" class="mr-1" /> startingDeadlineSeconds {{ cronJob.spec.startingdeadlineseconds }}
                </div>
                <div class="text-small color-fg-muted mt-2">
                  <Octicon :name="specIcon" class="mr-1" /> suspend {{ cronJob.spec.suspend }}
                </div>
                <div class="text-small color-fg-muted mt-2">
                  <Octicon :name="specIcon" class="mr-1" /> successfulJobsHistoryLimit {{ cronJob.spec.successfuljobshistorylimit }}
                </div>
                <div class="text-small color-fg-muted mt-2">
                  <Octicon :name="specIcon" class="mr-1" /> failedJobsHistoryLimit {{ cronJob.spec.failedjobshistorylimit }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
// import axios, { isCancel, AxiosError } from 'axios';
// npm install --save luxon
import { DateTime } from 'luxon';
import Overview from '@/components/Overview.vue';
// import Chart from '@/components/Chart.vue';
import Jobs from '@/components/Jobs.vue';
import CronjobList from '@/components/CronjobList.vue';
import LogoHeader from '@/components/LogoHeader.vue';
import Octicon from '@/components/Octicon.vue';
import WiderHeader from '@/components/WiderHeader.vue';
import cronstrue from 'cronstrue';

const {CronjobRequest,
       CronjobResponse} = require('./protos/sk8l_pb.js');
import Sk8lCronjobClient from '@/components/Sk8lCronjobClient.js';

export default {
  name: 'CronJob',
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.getData(vm);
  //     // vm.cronJobIntervalId = setInterval(vm.getData, 10000);
  //   });
  // },
  beforeRouteLeave(to, from) {
    // called when the route that renders this component is about to be navigated away from.
    this.stream.cancel();
  },
  data() {
    return {
      cronJob: null,
      cronJobs: [],
    };
  },
  props: ['namespace', 'name'],
  computed: {
    commands(vm) {
      return Object.fromEntries(vm.cronJob.containercommandsMap);
    },
    initContainerCommands(vm) {
      return vm.commands["InitContainers"].commandsList;
    },
    containerCommands(vm) {
      return vm.commands["Containers"].commandsList;
    },
    ephemeralCommands(vm) {
      return vm.commands["EphemeralContainers"].commandsList;
    },
    specIcon(_vm) {
        return "chevron-right";
    },
  },
  methods: {
    lux1(t) {
      return DateTime.fromISO(t).toRelative();
    },
    schedule() {
      return cronstrue.toString(this.cronJob.definition);
    },
  },

  mounted() {
    var request = new CronjobRequest();
    request.setCronjobname(this.name);
    request.setCronjobnamespace(this.namespace);
    const app = this;

    app.stream = Sk8lCronjobClient.getCronjob(request, {});

    app.stream.on('data', function(response) {
      app.cronJob = response.toObject();
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
    // Chart,
    Overview,
    Jobs,
    LogoHeader,
    Octicon,
    WiderHeader,
  },
};
</script>
