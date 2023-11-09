<template>
  <!-- eslint-disable -->
  <div class="Header">
    <div class="Header-item">
      <router-link :to="{ name: 'home' }"
                   class="Header-link f4 d-flex flex-items-center">
        <Octicon name="key-asterisk" />
        <span>&nbsp;sk8l</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import Octicon from '@/components/Octicon.vue';

export default {
  name: 'LogoHeader',
  components: {
    Octicon,
  },
};
</script>
