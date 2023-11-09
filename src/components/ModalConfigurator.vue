<template>
  <ModalContainer :job-name="resourceName" :job-pod-namespace="resourceNamespace" />
</template>

<script>
import ModalContainer from '@/components/ModalContainer.vue';

export default {
  name: 'ModalConfigurator',
  props: ['resourceName', 'resourceNamespace'],
  components: {
    ModalContainer,
  },
};
</script>
