<template>
  <!-- https://primer.style/css/components/labels#labels -->
  <span class="Label Label--accent Label--inline mr-1" v-if="active">Active</span>
  <span class="Label Label--secondary Label--inline mr-1" v-if="suspended">Success</span>
  <span class="Label Label--danger Label--inline mr-1" v-if="failed">Failed</span>
  <span class="Label Label--danger Label--inline mr-1" v-if="failing">Failing</span>
</template>

<script>
export default {
  name: 'CronjobRowLabels',
  props: ['cronjob'],
  computed: {
    active(_vm) {
      return this.cronjob.active && !this.cronjob.failed;
    },
    suspended(_vm) {
      return this.cronjob.spec.suspend;
    },
    failed(_vm) {
      return this.cronjob.failed && !this.cronjob.active;
    },
    failing(_vm) {
      return this.cronjob.active && this.cronjob.failed;
    },
  },
};
</script>
