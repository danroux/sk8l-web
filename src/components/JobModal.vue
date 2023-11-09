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
import Octicon from '@/components/Octicon.vue';
import ModalContainer from '@/components/ModalContainer.vue';

const {JobRequest,
       JobYAMLResponse} = require('./protos/sk8l_pb.js');
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
      // simple unary call
      var request = new JobRequest();
      const that = this;
      request.setJobnamespace(jobNamespace);
      request.setJobname(jobName);

      await Sk8lCronjobClient.getJobYAML(request, {}, (err, response) => {
        if (err) {
          console.log(`Unexpected error for getJobYaml: code = ${err.code}` +
          `, message = "${err.message}"`);
        } else {
          that.modalBody = response.toObject().job;
          that.modalHeader = `Job: ${jobName}`;
        }
      });
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
