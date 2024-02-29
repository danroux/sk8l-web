<style scoped>
  button {
    border: 0px;
    line-height: 0px;
    padding: 0px 4px;
  }
</style>

<template>
  <ModalContainer :show-modal="showDashboardAnnotationsModal"
                  :body="modalBody"
                  :modal-header="modalHeader"
                  @close-modal="closeDashboardAnnotationsModal()">

    <template #headerActionContent>
      <button type="button" class="btn btn-sm" name="button" @click="copyDashboardAnnotations()">
        <Octicon name="copy" />
      </button>
    </template>

    <template #actionElement>
      <a class="UnderlineNav-item" href="#" @click="getDashboardAnnotations()">
        <button type="button" class="btn btn-sm" name="button"  >
          <Octicon name="graph" class="UnderlineNav-octicon" />
        </button>
        {{ text }}
      </a>
    </template>
  </ModalContainer>
</template>

<script>
import ModalContainer from '@/components/ModalContainer.vue';
import Octicon from '@/components/Octicon.vue';

import {DashboardAnnotationsRequest,
       DashboardAnnotationsResponse} from '@/components/protos/sk8l_pb.ts';
import Sk8lCronjobClient from '@/components/Sk8lCronjobClient.js';

export default {
  name: 'DashboardAnnotationsModal',
  props: ['text'],
  data() {
    return {
      showDashboardAnnotationsModal: false,
      modalBody: "",
      modalHeader: "",
    };
  },
  methods: {
    copyDashboardAnnotations: async function() {
      var request = new DashboardAnnotationsRequest({});
      const that = this;

      await Sk8lCronjobClient.getDashboardAnnotations(
        request,
        (err, response) => {
          if (!err) {
            console.log("dali");
            navigator.clipboard.writeText(response.annotations);
          } else {
            console.log(`Unexpected error for getDashboardAnnotations: code = ${err.code}` +
            `, message = "${err.message}"`);
          }
        }
      );
    },
    getDashboardAnnotations: async function() {
      var request = new DashboardAnnotationsRequest({});
      const that = this;

      await Sk8lCronjobClient.getDashboardAnnotations(
        request,
        (err, response) => {
          if (!err) {
            that.modalBody = response.annotations;
            that.modalHeader = `sk8l-grafana-annotations.json`;
          } else {
            console.log(`Unexpected error for getDashboardAnnotations: code = ${err.code}` +
            `, message = "${err.message}"`);
          }
        }
      );
      this.showDashboardAnnotationsModal = true;
    },
    closeDashboardAnnotationsModal() {
      this.showDashboardAnnotationsModal = false;
    },
  },
  components: {
    ModalContainer,
    Octicon,
  },
}
</script>
