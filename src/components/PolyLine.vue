<template>
  <svg width="155" height="30">
    <defs>
      <linearGradient :id="gradientId" x1="0" x2="0" y1="1" y2="0">
        <stop offset="0%" stop-color="#9be9a8" class="color-calendar-graph-day-L1-bg"></stop>
        <stop offset="10%" stop-color="#40c463" class="color-calendar-graph-day-L2-bg"></stop>
        <stop offset="25%" stop-color="#30a14e" class="color-calendar-graph-day-L3-bg"></stop>
        <stop offset="50%" stop-color="#216e39" class="color-calendar-graph-day-L4-bg"></stop>
      </linearGradient>
      <mask :id="sparklineId" x="0" y="0" width="155" height="28">
        <polyline transform="translate(0, 28) scale(1,-1)"
                  :points="points"
                  fill="transparent"
                  stroke="#8cc665"
                  stroke-width="2">
        </polyline>
      </mask>
    </defs>

    <g transform="translate(0, 2.0)">
      <rect x="0" y="-2" width="155" height="30" :style="rectStyle"></rect>
    </g>
  </svg>
</template>

<script>
/* eslint-disable */

export default {
  name: 'CronJobLi',
  props: ['cronJob'],
  methods: {
    totals() {
      const totals = [];
      const jobs = this.cronJob.jobs;
      for (let i = 0; i < jobs.length; i++) {
        const job = jobs[i];
        const result = {
          startTime: job.status.starttimeins,
          completionTimeInS: job.status.completiontimeins,
          durationTimeInS: job.durationins,
          name: job.name,
          succeeded: job.succeeded,
        };

        totals.push(result);
      }

      return totals;
    },
  },
  computed: {
    points(vm) {
      const startCompletionTuples = this.totals().flatMap((total) => {
        let target = total.durationTimeInS;

        if (target === 0) {
          target = total.startTime + total.durationTimeInS;
        }

        return target;
      });

      const result = [[0, 0]];
      let virtualIndex = 1;

      startCompletionTuples.forEach((timex, index) => {
        let xindex = 3 * virtualIndex;
        const x = [[xindex, (timex / 60) * 2]];
        result.push(x);
        virtualIndex += 1;
        xindex = 3 * virtualIndex;
        result.push([[xindex, 0]]);
        virtualIndex += 1;
      });

      return result.join(', ');
    },
    gradientId(vm) {
      return `gradient-${this.cronJob.uid}`;
    },
    sparklineId(vm) {
      return `sparkline-${this.cronJob.uid}`;
    },
    rectStyle(vm) {
      return `stroke: none; fill: url(#gradient-${this.cronJob.uid}); mask: url(#sparkline-${this.cronJob.uid})`;
    },
  },
};
</script>
