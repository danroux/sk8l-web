<style scoped>
  button {
    border: 0px;
    line-height: 0px;
    padding: 0px 4px;
    float: right;
  }
</style>

<template>
  <ModalContainer :key="cronjob.name"
                  :show-modal="showCronjobModal"
                  :body="modalBody"
                  :modal-header="modalHeader"
                  @close-modal="closeCronjobModal()">
    <template #actionElement>
      <button type="button" class="btn btn-sm" name="button" @click="getCronjobYAML(cronjob.namespace, cronjob.name)" >
        <Octicon name="code-square" />
      </button>
    </template>
  </ModalContainer>
</template>

<script>
import Octicon from '@/components/Octicon.vue';
import ModalContainer from '@/components/ModalContainer.vue';

const {CronjobRequest,
       CronjobYAMLResponse} = import('./protoz/sk8l_pb.ts');
import Sk8lCronjobClient from '@/components/Sk8lCronjobClient.js';

export default {
  name: 'CronjobModal',
  props: ['cronjob'],
  data() {
    return {
      showCronjobModal: false,
      modalBody: "",
      modalHeader: "",
    };
  },
  methods: {
    getCronjobYAML: async function(namespace, name) {
      // simple unary call
      var request = new CronjobRequest();
      const that = this;
      request.setCronjobnamespace(namespace);
      request.setCronjobname(name);

      await Sk8lCronjobClient.getCronjobYAML(request, {}, (err, response) => {
        if (err) {
          console.log(`Unexpected error for getPodYAML: code = ${err.code}` +
          `, message = "${err.message}"`);
        } else {
          that.modalBody = response.toObject().cronjob;
          that.modalHeader = `Cronjob: ${name}`;
        }
      });
      this.showCronjobModal = true;
    },
    closeCronjobModal() {
      this.showCronjobModal = false;
    },
  },
  components: {
    ModalContainer,
    Octicon,
  },
}
</script>
