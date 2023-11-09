<template>
  <!-- https://primer.style/css/components/labels#labels -->
  <span class="Label mr-1 Label--accent Label--inline" v-if="active">Active</span>
  <span class="Label mr-1 Label--success Label--inline" v-if="job.succeeded">Success</span>
  <span class="Label mr-1 Label--done Label--inline" v-if="job.succeeded">Done</span>
  <span class="Label mr-1 Label--danger Label--inline" v-if="failed">Failed</span>
</template>

<script>
export default {
  name: 'BoxRow',
  props: ['job'],
  computed: {
    active(_vm) {
      return this.job.status.active > 0;
    },
    failed(_vm) {
      return this.job.status.failed > 0;
    },
  },
};
</script>
