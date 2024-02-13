<style scoped>
  button {
    border: 0px;
    line-height: 0px;
    padding: 0px 4px;
    float: right;
  }
</style>

<template>
  <ModalContainer :key="pod.name"
                  :show-modal="showPodModal"
                  :body="modalBody"
                  :modal-header="modalHeader"
                  @close-modal="closePodModal()">
    <template #actionElement>
      <button type="button" class="btn btn-sm" name="button" @click="getPodYAML(pod.namespace, pod.name)">
        <Octicon name="container" />
      </button>
    </template>
  </ModalContainer>
</template>

<script>
import ModalContainer from '@/components/ModalContainer.vue';
import Octicon from '@/components/Octicon.vue';

const {PodRequest,
       PodYAMLResponse} = import('./protoz/sk8l_pb.ts');
import Sk8lCronjobClient from '@/components/Sk8lCronjobClient.js';

export default {
  name: 'PodModal',
  props: ['pod'],
  data() {
    return {
      showPodModal: false,
      modalBody: "",
      modalHeader: "",
    };
  },
  methods: {
    getPodYAML: async function(podNamespace, podName) {
      // simple unary call
      var request = new PodRequest();
      const that = this;
      request.setPodnamespace(podNamespace);
      request.setPodname(podName);

      await Sk8lCronjobClient.getPodYAML(request, {}, (err, response) => {
        if (err) {
          console.log(`Unexpected error for getPodYAML: code = ${err.code}` +
          `, message = "${err.message}"`);
        } else {
          that.modalBody = response.toObject().pod;
          that.modalHeader = `Pod: ${podName}`;
        }
      });
      this.showPodModal = true;
    },
    closePodModal() {
      this.showPodModal = false;
    },
  },
  components: {
    ModalContainer,
    Octicon,
  },
}
</script>
