<template>
  <!-- https://primer.style/css/components/labels#labels -->
  <span class="Label Label--accent Label--inline mr-1" v-if="active">Active</span>
  <span class="Label Label--secondary Label--inline mr-1" v-if="suspended">Success</span>
</template>

<script>
export default {
  name: 'CronjobRowLabels',
  props: ['cronjob'],
  computed: {
    active(_vm) {
      return this.cronjob.active;
    },
    suspended(_vm) {
      return this.cronjob.spec.suspend;
    },
  },
};
</script>
