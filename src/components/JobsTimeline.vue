<template>
<div class="mb-3 dashboard-changelog color-bg-default border color-border-muted p-3 rounded-2"
     id="jobs-timeline"
     v-if="sortedPods.length > 0">
  <h2 class="f5 text-bold mb-3">Latest completions</h2>

  <ul class="list-style-none">
    <li class="TimelineItem TimelineItem--condensed ml-1 pt-0 pb-3 completed-job" v-for="pod in sortedPods">
      <div class="TimelineItem-badge mt-0 color-bg-transparent">
        <Octicon name="dot-fill" />
      </div>

      <div class="TimelineItem-body mt-n1" v-if="pod.pod.FinishedAt">
        <div class="text-small color-fg-muted dashboard-changelog-timestamp">
          <RelativeTime :target="pod.pod.FinishedAt.seconds" />
        </div>
        <span>{{ pod.pod.metadata.name }}</span>
      </div>
    </li>
  </ul>

</div>
</template>

<script>
import Octicon from '@/components/Octicon.vue';
import RelativeTime from '@/components/RelativeTime.vue';

export default {
  name: 'JobsTimeline',
  props: ['jobs'],
  computed: {
    pods(_vm) {
      let pods = [];

      this.jobs.forEach((job) => {
        job.pods.forEach((pod) => {
          if(pod.FinishedAt) {
            let podItem = {
              pod: pod,
              job: job,
            };
            pods.push(podItem);
          }
        });
      });

      return pods;
    },
    sortedPods() {
      return this.pods.toSorted((a, b) => {
        if (Number(a.pod.FinishedAt.seconds) < Number(b.pod.FinishedAt.seconds)) return 1;
        if (Number(a.pod.FinishedAt.seconds) > Number(b.pod.FinishedAt.seconds)) return -1;
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
