<template>
  <span class="mr-2">
    <span class="repo-language-color" :class="itemPropClass"></span>&nbsp;
    <span itemprop="programmingLanguage">{{ propText }}</span>
  </span>
</template>

<script>
export default {
  name: 'StatusProp',
  props: ['propText'],
  computed: {
    itemPropClass(_vm) {
      switch (this.propText) {
        case 'Pending':
          return 'color-bg-subtle';
        case 'Retrying':
          return 'color-bg-danger';
        case 'Active':
          return 'item-pop--active';
        case 'Failed':
          return 'item-pop--danger';
        case 'Failing':
          return 'item-pop--danger';
        case 'Succeeded':
          return 'item-pop--success';
      }
    },
  },
};
</script>
