<template>
  <!-- eslint-disable max-len -->
  <div class="pagehead orghead border-bottom-0 pt-0 ">
    <div id="repository-container-header"  class="pt-3 hide-full-screen">
      <div class="d-flex flex-wrap flex-justify-end mb-3  px-3 px-md-4 px-lg-5" style="gap: 1rem;">
        <div class="flex-auto min-width-0 width-fit mr-3">
          <div class=" d-flex flex-wrap flex-items-center wb-break-word f3 text-normal">
            <Octicon name="repo" />
            <span class="author flex-self-stretch" itemprop="author">

              <router-link :to="{ name: 'home' }">
                {{ cronjob.namespace }}
              </router-link>
            </span>

            <span class="mx-1 flex-self-stretch color-fg-muted">/</span>
            <strong itemprop="name" class="mr-2 flex-self-stretch">
              <router-link :to="{ name: 'cronDetails', params: { namespace: cronjob.namespace, name: cronjob.name }}">
                {{ cronjob.name }}
              </router-link>
            </strong>
          </div>
        </div>

        <div id="repository-details-container">
          <ul class="pagehead-actions flex-shrink-0 d-none d-md-inline" style="padding: 2px 0;">
            <li>
            </li>
          </ul>
        </div>
      </div>

      <div class="position-relative">
        <nav class="js-profile-tab-count-container UnderlineNav js-responsive-underlinenav overflow-visible" data-url="/users/primer/tab_counts" aria-label="Organization">
          <div class="width-full d-flex position-relative container">
            <ul class="list-style-none UnderlineNav-body width-full p-responsive overflow-hidden">
              <li data-tab-item="org-header-overview-tab" class="d-flex js-responsive-underlinenav-item">
                <router-link :to="{ name: 'cronDetails', params: { namespace: cronjob.namespace, name: cronjob.name }}" class="UnderlineNav-item">
                  <Octicon name="home" class="UnderlineNav-octicon" />
                  Overview
                </router-link>
              </li>

              <li data-tab-item="org-header-projects-tab" class="d-flex js-responsive-underlinenav-item">
                <Octicon name="table" custom-class="UnderlineNav-octicon" />
                Jobs
                <span title="Not available" data-view-component="true" class="Counter js-profile-project-count">
                  {{ cronjob.jobsList.length }}
                </span>
              </li>

              <li data-tab-item="org-header-repositories-tab" class="d-flex js-responsive-underlinenav-item">
                <router-link :to="{ name: 'jobPodList', params: { namespace: cronjob.namespace, cronjobName: cronjob.name }}" class="UnderlineNav-item ">
                  <Octicon name="repo" class="UnderlineNav-octicon" />
                    Pods
                  <span title="Not available" data-view-component="true" class="Counter js-profile-repository-count">{{ pods.length }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import Octicon from '@/components/Octicon.vue';

export default {
  name: 'WiderHeader',
  props: ['cronjob', 'pods'],
  components: {
    Octicon,
  },
};
</script>
