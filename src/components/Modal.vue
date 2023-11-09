<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">default header</slot>
        </div>

        <div slot="top-right">
          <button @click="$emit('close')">
            ❌
          </button>
        </div>

        <div class="modal-body">
          <slot name="body">
            <pre>{{ body }}</pre>
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            default footer
            <button class="modal-default-button"
                    @click="$emit('close')">
              OK
            </button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { Transition } from 'vue';

export default {
  name: 'Modal',
  props: ['show'],
  inject: ['body'],
  components: {
    Transition,
  },
};
</script>
