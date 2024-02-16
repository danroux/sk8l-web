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

              <div class="mt-4">
                <CronjobsTimeline :cronjobs="cronJobs" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CronjobsTimeline from '@/components/CronjobsTimeline.vue';
import CronJobRow from '@/components/CronJobRow.vue';
import CronjobActivityProgressBar from '@/components/CronjobActivityProgressBar.vue';

export default {
  name: 'CronjobList',
  data() {
    return {};
  },
  // props: {
  // msg: String,
  // },
  props: ['cronJobs'],
  components: {
    CronjobsTimeline,
    CronjobActivityProgressBar,
    CronJobRow,
  },
};
</script>
