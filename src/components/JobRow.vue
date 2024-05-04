<template>
  <li class="Box-row Box-row--hover-gray job-row"
      :class="jobStatusClass" :id="`job-${job.name}`">
    <div class="d-flex flex-items-center">
      <div class="flex-auto">
        <div>
          <JobModal :job="job" />

          <PodModal v-for="(pod, index) in pods"
                    :pod="pod" />
        </div>
        <div>
          <strong class="job-name">{{ job.name }}</strong> <RowLabels :job="job" /><br/>
          <p class="color-fg-muted mb-0 wb-break-word job-uuid">
            Uuid:  {{ job.Uuid }}
          </p>

          <p class="color-fg-muted mb-0 wb-break-word" v-if="job.failed"
             v-for="(tl, index) in job.terminationReasons">
            Error: {{ tl.terminationDetails.reason }} - {{ tl.terminationDetails.exitCode }}<br/>
            <span v-if="tl.terminationDetails.message">
              Message: {{ tl.terminationDetails.message }}<br/>
            </span>
            Container: {{ tl.containerName }}
          </p>

          <p class="color-fg-muted mb-0 wb-break-word" v-if="job.failureCondition">
            <span class="job-failure-condition" >
              {{ job.failureCondition.reason }} - {{ job.failureCondition.message }}
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="color-fg-muted f6 mt-2 job-row-footer">
      <StatusProp :propText="status" />

      <span class="mr-2 job-completions">
        <Octicon name="stack" /> {{ job.spec.completions }}
      </span>
      <span class="mr-2 job-parallelism">
        <Octicon name="versions" /> {{ job.spec.parallelism }}
      </span>
      <span class="mr-2 job-suspend">
        <Octicon name="strikethrough" /> {{ job.spec.suspend }}
      </span>
      <span class="mr-2 job-start-time">
        <Octicon name="sparkle-fill" /> {{ luxs(job.status.startTime.seconds) }}
      </span>
      <span class="mr-2 job-duration-time">
        <Octicon name="stopwatch" /> {{ duration(job.durationInS) }}
      </span>
      <span class="mr-2 job-failure-time" v-if="job.failed">
        <Octicon name="x-circle-fill" /> {{ luxs(lastFailureTime) }}
      </span>
      <span class="mr-2 job-completion-time" v-if="job.status.succeeded && job.status.completionTime">
        <Octicon name="goal" /> {{ luxs(job.status.completionTime.seconds) }}
      </span>
    </div>
  </li>
</template>

<script>
import { DateTime, Duration } from 'luxon';

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
      // when it failed
      if (this.job.failureCondition) {
          if (this.job.failed) {
              let lastTransitionTime = this.job.failureCondition.lastTransitionTime.seconds;
              return lastTransitionTime;
          }
      }

      // while is failing
      const finishedAt = this.job.terminationReasons.find((first) => first).terminationDetails.finishedAt.seconds;
      return finishedAt;
    },
    pods(vm) {
      return PodsGenerator.pods(vm.job.pods);
    },
  },
  methods: {
    luxs(t) {
      return DateTime.fromSeconds(Number(t)).toRelative();
    },
    lux1(t) {
      return DateTime.fromISO(Number(t)).toRelative();
    },
    duration(t) {
      return Duration.fromObject({ seconds: Number(t) }).rescale().toHuman({ unitDisplay: 'short' });
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
