<template>
  <div class="blankslate blankslate-large blankslate-spacious">
    <Octicon name="shield" custom-class="blankslate-icon" :width="24" :height="24" />

    <h3 class="blankslate-heading">It looks like no cronjobs exist for this namespace</h3>
    <p>
      CronJob is meant for performing regular scheduled actions such as backups, report generation,
      and so on.<br/>

      One CronJob object is like one line of a crontab (cron table) file on a Unix system.<br/>

      It runs a job periodically on a given schedule, written in Cron format.
    </p>

    <div class="blankslate-action" v-if="false">
      <a href="#" class="btn btn-primary Button--primary Button--medium Button">
        <span class="Button-content">
          <span class="Button-label">Fix issue</span>
        </span>
      </a>
    </div>

    <div class="blankslate-action">
      <a href="https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/" class="Link" target="_blank">
        Learn more about cronjobs in K8s.
      </a>
    </div>
  </div>
</template>

<script>
import Octicon from '@/components/Octicon.vue';

export default {
  name: 'RootBlankSlate',
  components: {
    Octicon,
  },
};
</script>
