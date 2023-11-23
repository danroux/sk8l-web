<style scoped>
.markdown-body blockquote {
  font-size: 13px;
}
</style>

<template>
  <!-- eslint-disable -->
  <li>
    <div class="d-block">
      <div class="d-flex flex-justify-between">
        <div class="mb-0 col-9">
          <router-link :to="{ name: 'cronDetails', params: { namespace: cronJob.namespace, name: cronJob.name }}" class="text-bold mr-1">
            {{ cronJob.namespace }} / {{ cronJob.name }}
          </router-link> <CronjobRowLabels :cronjob="cronJob" /><br/>

          <p class="color-fg-muted wb-break-word">
            {{ schedule(cronJob.definition) }}
          </p>
        </div>

        <div class="flex-items-center d-none d-md-flex col-3">
          <span class="tooltipped tooltipped-s" aria-label="Recent Activity">
            <PolyLine :cronJob="cronJob" />
          </span>
        </div>
      </div>

      <div class="color-fg-muted f6">
        <StatusProp :propText="status" />

        <span class="mr-2">
          <Octicon name="north-star" /> {{ cronJob.namespace }}
        </span>
        <span class="mr-2">
          <Octicon name="stack" />{{ cronJob.spec.jobtemplate.spec.completions || "1" }}
        </span>
        <span class="mr-2">
          <Octicon name="versions" /> {{ cronJob.spec.jobtemplate.spec.parallelism || "1" }}
        </span>
        <span class="mr-2">
          <Octicon name="sun" /> {{ cronJob.creationtimestamp }}
        </span>
        <template v-if="all.length > 0">
          <span class="mr-2">
            <Octicon name="stopwatch" /> {{ duration(cronJob.lastduration) }}
          </span>
          <span class="mr-2" v-if="lastFailed && showLastFailure">
            <Octicon name="x-circle-fill" /> {{ lux1(lastFailureTime) }}
          </span>

          <template v-if="lastSuccedded">
            <span class="mr-2"><Octicon name="calendar" /> {{ lux1(cronJob.lastsuccessfultime) }}</span>
            <span class="mr-2">
              <Octicon name="goal" /> Completed {{ lux1(lastSuccedded.status.completiontime) }}
            </span>
          </template>
        </template>
      </div>
    </div>
  </li>
</template>

<script>
/* eslint-disable */

// npm install --save luxon
import { DateTime, Duration } from 'luxon';
// npm i -S cronstrue
import cronstrue from 'cronstrue';
import CronjobRowLabels from '@/components/CronjobRowLabels.vue';
import GhSVG from '@/components/GhSVG.vue';
import Octicon from '@/components/Octicon.vue';
import PolyLine from '@/components/PolyLine.vue';
import StatusProp from '@/components/StatusProp.vue';

export default {
  name: 'CronJobRow',
  props: ['cronJob'],
  methods: {
    lux1(t) {
      return DateTime.fromISO(t).toRelative();
    },
    schedule() {
      return cronstrue.toString(this.cronJob.definition);
    },
    duration(t) {
      return Duration.fromObject({ seconds: t }).rescale().toHuman({ unitDisplay: 'short' });
    },
  },
  computed: {
    jobsByStatus() {
      const m = {
        active: [],
        succeeded: [],
        failed: [],
        all: [],
      };

      this.cronJob.jobsList.forEach((job) => {
        if (job.succeeded && job.failed !== true) {
          m.succeeded.push(job);
        } else if (job.failed) {
          m.failed.push(job);
        }

        m.all.push(job);
      });

      return m;
    },
    all() {
      return this.jobsByStatus.all;
    },
    active() {
      return this.jobsByStatus.active;
    },
    succeeded() {
      return this.jobsByStatus.succeeded;
    },
    failed() {
      return this.jobsByStatus.failed;
    },
    lastCompleted() {
      const sgt = this.all;
      if (sgt.length > 0) {
        return sgt[sgt.length - 1];
      }

      return null;
    },
    lastFailureTime() {
      const possible = this.lastFailed;
      if (possible.failure_condition) {
        return lastTransitionTime = this.lastFailed.failure_condition.lastTransitionTime;
      }

      const dt = DateTime.fromSeconds(possible.terminationreasonsList.find((first) => first).terminationdetails.finishedat.seconds);
      return dt;
    },
    lastFailed() {
      const sgt = this.failed;

      if (sgt.length > 0) {
        return sgt[sgt.length - 1];
      }

      return null;
    },
    lastSuccedded() {
      const sgt = this.succeeded;
      if (sgt.length > 0) {
        return sgt[sgt.length - 1];
      }

      return null;
    },
    showLastFailure() {
      if (this.lastSuccedded && this.lastFailed) {
          if (this.lastFailed.failure_condition) {
              const lastTransitionTime = this.lastFailed.failure_condition.lastTransitionTime;
          } else {
              const target = this.terminationreasonsList.find((first) => first).terminationdetails.finishedat.seconds;
              const lastTransitionTime = DateTime.fromSeconds(target);
          }
        const completionTime = this.lastSuccedded.status.completion_time;

        return lastTransitionTime > completionTime;
      }

      if (this.lastFailed) {
        return true;
      }

      return false;
    },
    status(_vm) {
      if (this.all.length < 1) {
        return 'Pending';
      }

      if (!this.showLastFailure) {
        if (this.cronJob.active) {
          return 'Active';
        }

        if (this.succeeded.length > 0) {
          return 'Succeeded';
        }
      }

      if (this.showLastFailure) {
        if (this.cronJob.active) {
          return 'Failing';
        }

        if (!this.cronJob.active) {
          return 'Failed';
        }
      }

      return '';
    },
  },
  components: {
    CronjobRowLabels,
    GhSVG,
    Octicon,
    PolyLine,
    StatusProp,
  },
};
</script>
