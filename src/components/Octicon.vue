<!-- https://primer.style/design/foundations/icons -->
<!-- https://github.com/primer/octicons -->
<!-- https://unpkg.com/browse/@primer/octicons@19.4.0/ -->
<!-- https://www.npmjs.com/package/@primer/octicons -->
<!-- <script src="https://unpkg.com/@primer/octicons@19.4.0/index.js"></script> -->

<template>
  <svg text="muted"
       aria-hidden="true"
       :height="octiconHeight()"
       viewBox="0 0 16 16"
       version="1.1"
       :width="octiconWidth()"
       class="octicon octicon-people"
       :class="customClass"
       v-html="octicons()">
  </svg>
</template>

<script>
// npm install @primer/octicons
import * as octicons from '@primer/octicons';

export default {
  // Component name "Octicon" should always be multi-word  vue/multi-word-component-names
  // eslint-disable-next-line
  name: 'Octicon',
  props: ['name', 'customClass', 'width', 'height'],
  methods: {
    octicons() {
      const result = octicons[this.name].heights['16'].path;
      return result;
    },
    octiconHeight() {
      return this.height || 16;
    },
    octiconWidth() {
      return this.width || 16;
    },
  },
};
</script>
