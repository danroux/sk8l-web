<template>
  <span class="Counter Counter--gray-dark">{{ jobPods.length }}</span>
</template>

<script>
export default {
  name: 'PodCounter',
  props: ['jobPods'],
};
</script>
