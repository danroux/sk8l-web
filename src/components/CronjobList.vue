<template>
  <div v-if="cronJobs" class="container-xl">
    <div class="gutter-condensed gutter-lg width-full flex-column flex-md-row d-flex mb-5">
      <div class="flex-shrink-0 col-12 col-md-9 mb-4 mb-md-0">
        <div class="Box">
          <div class="Box-header">
            <div class="d-table col-12" style="padding: 0px;">
              <div class="col-11 d-table-cell" style="padding-left: 0px;">
                <h3 class="Box-title">
                  Cronjobs <span class="Counter Counter--gray-dark">{{ cronJobs.length }}</span>
                </h3>
              </div>
            </div>
          </div>

          <ul>
            <li is="vue:CronJobRow"
                class="Box-row"
                :key="cronJob.name"
                v-for="(cronJob, index) in cronJobs"
                v-bind:index="index+1"
                :cron-job="cronJob">
            </li>
          </ul>
        </div>
      </div>

      <div class="flex-shrink-0 col-12 col-md-3">
        <div class="BorderGrid BorderGrid--spacious">
          <div class="BorderGrid-row">
            <div class="BorderGrid-cell">
              <h2 class="h4 mt-0 mb-2">Cronjob activity</h2>
              <div class="text-small color-fg-muted">

                <CronjobActivityProgressBar :cronjobs="cronJobs" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <article class="markdown-body entry-content container-xl" itemprop="text">
      <table>
        <thead>
          <tr>
            <th style="width: 40px; text-align: center;">#</th>
            <th v-for="header in cronTableHeaders" :key="header">{{header}}</th>
          </tr>
        </thead>

        <tbody>
          <tr is="vue:CronJobItem"
              :key="cronJob.name"
              v-for="(cronJob, index) in []"
              v-bind:index="index+1"
              :cron-job="cronJob">
          </tr>
        </tbody>
      </table>
    </article>
  </div>

  <ActiveJobs :active-jobs="activeJobs" v-if="activeJobs" />
</template>

<script>
import ActiveJobs from '@/components/ActiveJobs.vue';
import CronJobItem from '@/components/CronJobItem.vue';
import CronJobRow from '@/components/CronJobRow.vue';
import CronjobActivityProgressBar from '@/components/CronjobActivityProgressBar';
import Octicon from '@/components/Octicon.vue';

export default {
  name: 'CronjobList',
  data() {
    return {
      componentKey: 20,
      cronTableHeaders: [
        'Name',
        'Namespace',
        'Schedule',
        'Command',
        'lastScheduleTime',
        'lastSuccessfulTime',
        'creationTimestamp',
        'Original',
        'Active',
        'Last Duration',
        'Current Duration',
        'Status',
        'Actions',
        'Jobs',
        'JobsPods',
      ],
    };
  },
  // props: {
  // msg: String,
  // },
  props: ['cronJobs', 'activeJobs'],
  components: {
    ActiveJobs,
    CronjobActivityProgressBar,
    CronJobItem,
    CronJobRow,
    Octicon,
  },
};
</script>
