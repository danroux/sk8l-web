<template>
  <div class="Box">
    <div class="Box-header">
      <div class="d-table col-12" style="padding: 0px;">
        <div class="col-11 d-table-cell" style="padding-left: 0px;">
          <h3 class="Box-title">
            Jobs <JobCounter :jobs="jobs" />
          </h3>
        </div>

      </div>
    </div>

    <div class="Box-body" v-if="jobs.length == 0">
      We found love in a hopeless place
    </div>

    <ul>
      <JobRow v-for="(job, index) in sortedJobs"
              :key="job.name"
              :job="job" />
    </ul>
  </div>
</template>

<script>
import JobRow from '@/components/JobRow.vue';
import JobCounter from '@/components/JobCounter.vue';

export default {
  name: 'Jobs',
  props: ['jobs'],
  computed: {
    sortedJobs() {
      const jobsCopy = [...this.jobs];
      return jobsCopy.sort((a, b) => {
        if (a.status.completion_time < b.status.completion_time) return -1;
        if (a.status.completion_time > b.status.completion_time) return 1;
        return 0;
      }).reverse();
    },
  },
  components: {
    JobRow,
    JobCounter,
  },
};
</script>
