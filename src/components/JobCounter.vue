<template>
  <span class="Counter Counter--gray-dark">{{ jobs.length }}</span>
  <span class="Counter mr-1 color-bg-success-emphasis color-fg-on-emphasis">{{ succeeded }}</span>
  <span class="Counter mr-1 color-bg-accent-emphasis color-fg-on-emphasis">{{ active }}</span>
  <span class="Counter mr-1 color-bg-danger-emphasis color-fg-on-emphasis">{{ failed }}</span>
</template>

<script>
export default {
  name: 'JobCounter',
  props: ['jobs'],
  computed: {
    jobsByStatus() {
      const m = {
        active: 0,
        succeeded: 0,
        failed: 0,
      };

      this.jobs.forEach((job) => {
        if (job.succeeded) {
          m.succeeded += 1;
        } else if (job.status.failed > 0) {
          m.failed += 1;
        } else if (job.status.active > 0) {
          m.active += 1;
        }
      });

      return m;
    },
    succeeded() {
      return this.jobsByStatus.succeeded;
    },
    failed() {
      return this.jobsByStatus.failed;
    },
    active() {
      return this.jobsByStatus.active;
    },
  },
};
</script>
