<style scoped>
  .copyable-terminal {
    padding: 13px 10px 18px 10px;
  }

  .col-md-mine-2 {
    width: 12.5%;
  }
</style>

<template>
  <div class="d-flex flex-column flex-sm-row">
    <div class="flex-1">
      <div class="Box">
        <div class="Box-header">
          <div class="Box-row p-0 d-flex flex-wrap" style="border: 0px;">
            <div class="col-12 col-md-11 float-left">
              <h3 class="Box-title">Overview</h3>
            </div>

            <div class="col-12 col-md-1 float-left">
              <CronjobModal :cronjob="cronJob" />

              <div class="float-right px-2">
                <a href="#graph" class="color-fg-muted">
                  <Octicon name="graph" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <ul>
          <li class="Box-row p-0 d-flex flex-wrap">
            <div class="col-12 px-3 py-4">
              <ProgressBar :cronJob="cronJob" text="Jobs" />
            </div>
          </li>

          <li class="Box-row p-0">
            <ul class="list-style-none text-center d-flex flex-wrap">
              <li class="p-3 col-12 col-sm-12 col-md-mine-2 border-bottom border-sm-right border-md-bottom-0 color-border-muted">
                <span class="d-block h4 color-fg-default">
                  <Octicon name="issue-opened" customClass="color-fg-done" />
                  {{ cronJob.jobsList.length }}
                </span>
                <span class="color-fg-muted">Total jobs</span>
              </li>
              <li class="p-3 col-12 col-sm-12 col-md-mine-2 border-bottom border-md-bottom-0 border-md-right color-border-muted">
                <span class="d-block h4 color-fg-default">
                  <Octicon name="issue-closed" customClass="color-fg-success" />
                  {{ succeeded }}
                </span>
                <span class="color-fg-muted">Successful Jobs</span>
              </li>
              <li class="p-3 col-12 col-sm-12 col-md-mine-2 border-bottom border-sm-bottom-0 border-sm-right color-border-muted">
                <span class="d-block h4 color-fg-default">
                  <Octicon name="issue-draft" customClass="color-fg-accent" />
                  {{ active }}
                </span>
                <span class="color-fg-muted">Active Jobs</span>
              </li>
              <li class="p-3 col-12 col-sm-12 col-md-mine-2 border-bottom border-sm-bottom-0 border-sm-right color-border-muted">
                <span class="d-block h4 color-fg-default">
                  <Octicon name="x-circle" customClass="color-fg-danger" />
                  {{ failed }}
                </span>
                <span class="color-fg-muted">Failed Jobs</span>
              </li>
              <li class="p-3 col-12 col-sm-12 col-md-mine-2 border-bottom border-sm-bottom-0 border-sm-right color-border-muted">
                <div v-if="cronJob.runningjobsList.length > 0">
                  <span class="d-block h4 color-fg-default">
                    <Octicon name="stopwatch" customClass="color-fg-accent" />
                    {{ duration(cronJob.currentduration) }}
                  </span>
                  <span class="color-fg-muted">Current Duration</span>
                </div>
                <div v-else>
                  <span class="d-block h4 color-fg-default">
                    <Octicon name="horizontal-rule" customClass="color-fg-done" />
                  </span>
                  <span class="color-fg-muted">Current Duration</span>
                </div>
              </li>
              <li class="p-3 col-12 col-sm-12 col-md-mine-2 border-bottom border-sm-right border-md-bottom-0 color-border-muted">
                <span class="d-block h4 color-fg-default">
                  <Octicon name="history" customClass="color-fg-done" />
                    {{ duration(cronJob.lastduration) }}
                </span>
                <span class="color-fg-muted">Last Duration</span>
              </li>
              <li class="p-3 col-12 col-sm-12 col-md-mine-2 border-bottom border-md-bottom-0 border-md-right color-border-muted">
                <span class="d-block h4 color-fg-default">
                  <Octicon name="sparkle-fill" customClass="color-fg-attention" />
                  {{ meanDurationTimes }}
                </span>
                <span class="color-fg-muted">Avg. Duration</span>
              </li>
              <li class="p-3 col-12 col-sm-12 col-md-mine-2">
                <span class="d-block h4 color-fg-default">
                  <Octicon name="check" customClass="color-fg-success" v-if="cronJob.lastsuccessfultime" />
                  <Octicon name="question" v-else />
                  {{ lux1(cronJob.lastsuccessfultime) }}
                </span>
                <span class="color-fg-muted">Last Successful</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import cronstrue from 'cronstrue';
import { DateTime, Duration } from 'luxon';
import CronjobModal from '@/components/CronjobModal.vue';
import Octicon from '@/components/Octicon.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import * as ss from 'simple-statistics';

export default {
  name: 'Overview',
  props: ['cronJob'],
  computed: {
    jobsByStatus() {
      const m = {
        active: 0,
        succeeded: 0,
        failed: 0,
      };

      // NOTE: Update and improve this... logic from PodsGenerator
      this.cronJob.jobsList.forEach((job) => {
        if (job.succeeded) {
          m.succeeded += 1;
        } else if (job.status.failed > 0 || job.failed) {
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
    schedule() {
      return cronstrue.toString(this.cronJob.definition);
    },
    durationTimes() {
      if (this.cronJob == null || this.cronJob.jobsList == null) {
        return [];
      }

      const datesx = this.cronJob.jobsList.flatMap(
        (job) => job.durationins
      );
      return datesx;
    },
    meanDurationTimes() {
      if (this.durationTimes.length === 0) {
        return 0;
      }
      const m = ss.mean(this.durationTimes).toFixed(0);
      return Duration.fromObject({ seconds: m }).rescale().toHuman({ unitDisplay: 'short' });
    },
  },
  methods: {
    lux1(t) {
      return DateTime.fromISO(t).toRelative({ style: 'narrow' });
    },
    duration(t) {
      return Duration.fromObject({ seconds: t }).rescale().toHuman({ unitDisplay: 'short' });
    },
  },
  components: {
    CronjobModal,
    Octicon,
    ProgressBar,
  },
};
</script>
