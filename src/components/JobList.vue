<template>
  <div v-if="jobs" class="container-xl">
    <div class="gutter-condensed gutter-lg width-full flex-column flex-md-row d-flex mb-5">
      <div class="flex-shrink-0 col-12 col-md-9 mb-4 mb-md-0">
        <Jobs :jobs="jobs" />
      </div>

      <div class="flex-shrink-0 col-12 col-md-3">
        <div class="BorderGrid BorderGrid--spacious">
          <div class="BorderGrid-row">
            <div class="BorderGrid-cell">
              <h2 class="h4 mt-0 mb-2">Job activity</h2>
              <div class="text-small color-fg-muted">

              </div>

              <div class="mt-4">
                <JobsTimeline :jobs="jobs" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Jobs from '@/components/Jobs.vue';
import JobsTimeline from '@/components/JobsTimeline.vue';

export default {
  name: 'JobList',
  data() {
    return {};
  },
  // props: {
  // msg: String,
  // },
  props: ['jobs'],
  components: {
    Jobs,
    JobsTimeline,
  },
};
</script>
