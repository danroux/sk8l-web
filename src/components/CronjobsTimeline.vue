<template>
<div class="mb-3 dashboard-changelog color-bg-default border color-border-muted p-3 rounded-2" v-if="jobs.length > 0">
  <h2 class="f5 text-bold mb-3">Latest completions</h2>

  <ul class="list-style-none">
    <li class="TimelineItem TimelineItem--condensed ml-1 pt-0 pb-3" v-for="job in sortedJobs">
      <div class="TimelineItem-badge mt-0 color-bg-transparent">
        <Octicon name="dot-fill" />
      </div>

      <div class="TimelineItem-body mt-n1">
        <div class="text-small color-fg-muted dashboard-changelog-timestamp" v-if="job.job.status.completionTime">
          <RelativeTime :target="job.job.status.completionTimeInS" />
        </div>
        <span>{{ job.cronjob.name }}</span>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import Octicon from '@/components/Octicon.vue';
import RelativeTime from '@/components/RelativeTime.vue';

export default {
  name: 'CronjobsTimeline',
  props: ['cronjobs'],
  computed: {
    jobs(_vm) {
      let jobs = [];

      this.cronjobs.forEach((cronjob) => {
        cronjob.jobs.forEach((job) => {
          if(job.status.completionTime) {
            let jobCollector = {
              cronjob: cronjob,
              job: job,
            };
            jobs.push(jobCollector);
          }
        });
      });

      return jobs;
    },
    sortedJobs() {
      return this.jobs.toSorted((a, b) => {
        if (a.job.status.completionTimeInS < b.job.status.completionTimeInS) return 1;
        if (a.job.status.completionTimeInS > b.job.status.completionTimeInS) return -1;
        return 0;
      }).slice(0, 20);
    },
  },
  components: {
    Octicon,
    RelativeTime,
  },
};
</script>
