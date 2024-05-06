<template>
  <header class="pagehead orghead border-bottom-0 pt-0 ">
    <div class="container-xl pt-4 pt-lg-0 p-responsive clearfix">
      <div class="d-flex flex-wrap flex-items-start flex-md-items-center my-3">
        <div>
          <img itemprop="image" class="avatar flex-shrink-0 mb-3 mr-3 mb-md-0 mr-md-4"
               src="https://sk8l.io/charts/logo.png" alt="sk8l.io" width="100" height="100">
        </div>
        <div class="flex-1">
          <h1 class="h2 lh-condensed">
            {{ namespace }}
          </h1>

          <div class="color-fg-muted">
            <div>
              Cronjob Overview
            </div>
          </div>
        </div>

        <div class="d-flex flex-items-center flex-self-start mt-3">
        </div>
      </div>
    </div>

    <div class="position-relative">
      <nav class="js-profile-tab-count-container UnderlineNav js-responsive-underlinenav overflow-visible" data-url="/users/primer/tab_counts" aria-label="Organization">
        <div class="width-full d-flex position-relative container-xl">
          <ul class="list-style-none UnderlineNav-body width-full p-responsive overflow-hidden">
            <li data-tab-item="org-header-overview-tab" class="d-flex js-responsive-underlinenav-item">
              <router-link :to="{ name: 'home' }"
                           class="UnderlineNav-item mr-1">
                <Octicon name="home" class="UnderlineNav-octicon" />
                Cronjobs
              </router-link>
              <span title="Not available" data-view-component="true" class="Counter js-profile-repository-count">{{  }}</span>
            </li>

            <li data-tab-item="org-header-repositories-tab" class="d-flex js-responsive-underlinenav-item">
              <router-link :to="{ name: 'jobList', params: { namespace: namespace }}"
                           class="UnderlineNav-item mr-1">
                <Octicon name="server" class="UnderlineNav-octicon" />
                Jobs
                <span title="Not available" data-view-component="true" class="Counter js-profile-repository-count">{{  }}</span>
              </router-link>
            </li>

            <li data-tab-item="org-header-repositories-tab" class="d-flex js-responsive-underlinenav-item">
              <DashboardAnnotationsModal text="Dashboard" />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import Octicon from '@/components/Octicon.vue';
import DashboardAnnotationsModal from '@/components/DashboardAnnotationsModal.vue';

export default {
  name: 'CronjobListHeader',
  props: ['cronjobs', 'namespace'],
  computed: {
    cronjobsLength() {
      if (this.cronjobs) {
        return this.cronjobs.length;
      }
      return 0;
    },

  },
  components: {
    Octicon,
    DashboardAnnotationsModal,
  },
};
</script>
