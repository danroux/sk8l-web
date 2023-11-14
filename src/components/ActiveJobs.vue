<template>
  <article class="markdown-body entry-content container-xl" itemprop="text">
    <table v-if="activeJobs">
      <thead>
        <tr>
          <th style="width: 40px; text-align: center;">#</th>
          <th v-for="header in jobTableHeaders" :key="header">{{header}}</th>
        </tr>
      </thead>

      <tbody>
        <tr is="vue:ActiveJob"
            :key="activeJob.name"
            v-for="(activeJob, index) in activeJobs"
            :index="index+1"
            :active-job="activeJob">
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
// DEPRECATED
import ActiveJob from '@/components/ActiveJob.vue';

export default {
  name: 'ActiveJobs',
  data() {
    return {
      jobTableHeaders: [
        'Name',
        'Namespace',
        'Uuid',
        'Generation',
        'CreationTimestamp',
        'Active',
        'Failed',
        'StartTime',
        'CompletionTime',
        'Duration',
        'Duration In Ms',
        'Job status',
      ],
    };
  },
  props: ['activeJobs'],
  components: {
    ActiveJob,
  },
};
</script>
