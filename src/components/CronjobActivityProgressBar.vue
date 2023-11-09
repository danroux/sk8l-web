<template>
  <span class="Progress" v-if="show">
    <span class="Progress-item" :style="activityStyle(index, cronjob)" v-for="(cronjob, index) in cronjobs"></span>

  </span>

  <div class="mt-2">
    <span class="mr-1" style="margin-left:-2px;" v-for="(cronjob, index) in cronjobs">
      <Octicon name="dot-fill" custom-class="color-fg-success" :style="colorStyle(index)" class="mr-1" />
      <span class="color-fg-default text-bold mr-1">{{ cronjob.name }}</span> <span>{{ cronjobPctg(cronjob).width }}</span>
    </span>
  </div>
</template>

<script>
import Octicon from '@/components/Octicon.vue';

export default {
  name: 'CronjobActivityProgressBar',
  props: ['cronjobs'],
  computed: {
    pctgs(vm) {
      const container = {};

      vm.cronjobs.forEach((cronjob) => {
        if(container[cronjob.name]) {
          container[cronjob.name] += cronjob.jobsList.length;
        } else {
          container[cronjob.name] = cronjob.jobsList.length;
        }
      });

      const jobsLength = vm.cronjobs.reduce((sum, cronjob) => cronjob.jobsList.length+sum, 0);
      vm.cronjobs.forEach((cronjob) => {
        let val = container[cronjob.name];
        container[cronjob.name] = (((val / jobsLength) || 0) * 100).toFixed(2);
      });

      return container;
    },
    show(_vm) {
      return this.cronjobs.length > 0;
    },
  },
  methods: {
    cronjobPctg(cronjob) {
        return { width: `${this.pctgs[cronjob.name]}%` };
    },
    width(cronjob) {
      return { width: `${this.pctgs[cronjob.name]}%` };
    },
    colors(index) {
      let colors = [
        "#3572A5",
        "#e34c26",
        "#563d7c",
        "#89e051",
        "#3178c6",
        "#00ADD8",
        "#724b3b",
        "#f1e05a",
        "#384d54",
      ];

      return colors[index];
    },
    colorStyle(index) {
      let color = this.colors(index);

      return { color: `${color} !important` };
    },
    bgs(index) {
      let color = this.colors(index);
      return `background-color: ${color} !important;`;
    },
    activityStyle(index, cronjob) {
      let widthStyle = this.width(cronjob).width;
      let bg = this.bgs(index);

      return `width: ${widthStyle};${bg}`;
    },
  },
  components: {
    Octicon,
  },
};
</script>
