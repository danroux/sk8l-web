<template>
  <li class="Box-row Box-row--hover-gray" :class="jobStatusClass">
    <div class="d-flex flex-items-center">
      <div class="flex-auto">
        <strong>{{ job.name }}</strong> <RowLabels :job="job" /><br/>
        <p class="color-fg-muted mb-0 wb-break-word">
          Uuid:  {{ job.uuid }}
        </p>

        <p class="color-fg-muted mb-0 wb-break-word" v-if="job.failed" v-for="(tl, index) in job.terminationreasonsList">
          Container {{ tl.containername }} Error: {{ tl.terminationdetails.reason }} - {{ tl.terminationdetails.exitcode }}
        </p>
      </div>

      <JobModal :job="job" />

      <PodModal v-for="(pod, index) in pods"
                :pod="pod" />
    </div>
    <div class="color-fg-muted f6 mt-2">
      <StatusProp :propText="status" />

      <span class="mr-2"><Octicon name="stack" />{{ job.spec.completions }}</span>
      <span class="mr-2"><Octicon name="versions" /> {{ job.spec.parallelism }}</span>
      {{ job.spec.suspend }} -
      <span class="mr-2"><Octicon name="sparkle-fill" /> {{ luxs(job.status.starttime.seconds) }}</span>
      <span class="mr-2"><Octicon name="stopwatch" /> Duration {{ job.duration }}</span>
      <span class="mr-2" v-if="job.failed">
        <Octicon name="x-circle-fill" /> {{ lux1(lastFailureTime) }}
      </span>
      <span class="mr-2" v-if="job.status.succeeded && job.status.completiontime">
        <Octicon name="goal" /> Completed {{ luxs(job.status.completiontime.seconds) }}
      </span>
    </div>
  </li>
</template>

<script>
import { DateTime } from 'luxon';

import JobModal from '@/components/JobModal.vue';
import Octicon from '@/components/Octicon.vue';
import PodModal from '@/components/PodModal.vue';
import PodsGenerator from '@/components/PodsGenerator.js';
import RowLabels from '@/components/RowLabels.vue';
import StatusProp from '@/components/StatusProp.vue';

export default {
  name: 'JobRow',
  props: ['job'],
  setup() {
    return {
      PodsGenerator,
    };
  },
  data() {
    return {
      showJobModal: false,
      modalBody: "",
      modalHeader: "",
    };
  },
  computed: {
    status(vm) {
      // if (this.job.status.failed > 0) {
      //   return 'Failed';
      // }
      if (vm.pods.failingPods.length > 0) {
          if (this.job.status.active > 0) {
            return 'Failing';
          }
          return 'Failed';
      }
      if (this.job.status.active > 0) {
        return 'Active';
      }
      if (this.job.succeeded) {
        return 'Succeeded';
      }
    },
    jobStatusClass(vm) {
      if (vm.pods.failingPods.length > 0) {
          return 'Box-row--danger';
      }
      // if last execution failed but is no longer active, class is removed and
      // state is not visible anymore.
      if (this.job.status.active > 0) {
        return 'Box-row--active';
      }
      if (this.job.succeeded === true) {
        return 'Box-row--success';
      }
      if (this.job.status.failed > 0) {
        return 'Box-row--danger';
      }
    },
    lastFailureTime() {
      if (this.job.failure_condition) {
        return lastTransitionTime = this.job.lastFailed.failure_condition.lastTransitionTime;
      }

      const dt = DateTime.fromSeconds(this.job.terminationreasonsList.find((first) => first).terminationdetails.finishedat.seconds);
      return dt;
    },
    pods(vm) {
      return PodsGenerator.pods(vm.job.podsList);
    },
  },
  methods: {
    luxs(t) {
      return DateTime.fromSeconds(t).toRelative();
    },
    lux1(t) {
      return DateTime.fromISO(t).toRelative();
    },
  },
  components: {
    JobModal,
    Octicon,
    PodModal,
    RowLabels,
    StatusProp,
  },
};
</script>
