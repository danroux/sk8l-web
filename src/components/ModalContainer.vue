<template>
  <slot name="actionElement">
    <button type="button" class="btn btn-sm" name="button" @click="clickAction">
      <Octicon name="code-square" />
    </button>
  </slot>

  <Teleport to="body">
    <Modal :show="showModal" @close="$emit('closeModal')">
      <template #header>
        <span>{{ modalHeader }}</span>
      </template>
      <template #headerActionContent>
        <slot name="headerActionContent"></slot>
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
  props: ['showModal', 'body', 'modalHeader', 'headerActionContent'],
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
