<style scoped>
  button {
    border: 0px;
    line-height: 0px;
    padding: 0px 4px;
    float: right;
  }
</style>

<template>
  <ModalContainer :key="job.name"
                  :show-modal="showJobModal"
                  :body="modalBody"
                  :modal-header="modalHeader"
                  @close-modal="closeJobModal()">
    <template #actionElement>
      <button type="button" class="btn btn-sm" name="button" @click="getJobYAML(job.namespace, job.name)" >
        <Octicon name="code-square" />
      </button>
    </template>
  </ModalContainer>
</template>

<script>
import ModalContainer from '@/components/ModalContainer.vue';
import Octicon from '@/components/Octicon.vue';

import {JobRequest,
       JobYAMLResponse} from '@/components/protos/sk8l_pb.ts';
import Sk8lCronjobClient from '@/components/Sk8lCronjobClient.js';

export default {
  name: 'JobModal',
  props: ['job'],
  data() {
    return {
      showJobModal: false,
      modalBody: "",
      modalHeader: "",
    };
  },
  methods: {
    getJobYAML: async function(jobNamespace, jobName) {
      var request = new JobRequest({ jobNamespace: jobNamespace, jobName: jobName });
      const that = this;

      await Sk8lCronjobClient.getJobYAML(
        request,
        (err, response) => {
          if (!err) {
            that.modalBody = response.job;
            that.modalHeader = `Job: ${jobName}`;
          } else {
            console.log(`Unexpected error for getJobYaml: code = ${err.code}` +
            `, message = "${err.message}"`);
          }
        }
      );
      this.showJobModal = true;
    },
    closeJobModal() {
      this.showJobModal = false;
    },
  },
  components: {
    ModalContainer,
    Octicon,
  },
}
</script>
