<template>
  <slot name="actionElement">
    <button type="button" class="btn btn-sm" name="button" @click="clickAction">
      <Octicon name="code-square" />
    </button>
  </slot>

  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <Modal :show="showModal" @close="$emit('closeModal')">
        <template #header>
          <h3>{{ modalHeader }}</h3>
        </template>

    </Modal>
  </Teleport>
</template>

<script>
import { computed, Teleport } from 'vue';
import Modal from '@/components/Modal.vue';
import Octicon from '@/components/Octicon.vue';

export default {
  name: 'ModalContainer',
  emits: ['closeModal'],
  props: ['showModal', 'body', 'modalHeader'],
  provide() {
    return {
      body: computed(() => this.body),
    };
  },
  methods: {
  },
  components: {
    Modal,
    Octicon,
    Teleport,
  },
};
</script>
