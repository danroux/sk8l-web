<style scoped>
  textarea{
    resize: none;
    margin-top: -2px;
    padding-left: 92px;
    width: calc(100% - 70px);
    background-color: #fff;
    color: #000;
    position: absolute;
    border: medium;
    tab-size: 8;
    outline: none;
    overflow: auto hidden;
    height: 35680px;
    font-size: 12px;
    line-height: 20px;
    overflow-wrap: normal;
    white-space: pre;

    background-color: unset;
    position: relative;
    width: calc(100% - 15px);
  }

  textarea, .line-numbers {
    font-family: ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace !important;
  }

  .Box-header {
    height: 46px;
    padding: 10px;
  }

  button {
    background: none;
    border: 0px;
  }

  button:hover {
    background: inherit;
  }

  .line-numbers {
    position: absolute;
    width: 92px;
    background: white;
    height: 200px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    z-index: 100;
  }

  .line-number {
    color: rgb(110, 119, 129);
  }
</style>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="Box">
          <div class="Box-header">
            <div class="d-table col-12">
              <div class="col-11 d-table-cell">
                <span class="Box-title">
                  <slot name="header">default header</slot>
                </span>
              </div>

              <div class="col-1 d-table-cell">
                <div slot="top-right" style="text-align: right;">
                  <slot name="headerActionContent"></slot>
                  <button @click="$emit('close')">
                    <Octicon name="x" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="line-numbers" :style="textareaStyle()" v-if="body">
                <div class="line-number" v-for="number in noOfLines()">
                  {{ number }}
                </div>
              </div>
              <textarea :style="textareaStyle()" >{{ body }}</textarea>
            </slot>
          </div>

          <div class="modal-footer" v-if="false">
            <slot name="footer">
              default footer
              <button class="modal-default-button"
                      @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import Octicon from '@/components/Octicon.vue';
import { Transition } from 'vue';

export default {
  name: 'Modal',
  props: ['show'],
  inject: ['body'],
  methods: {
      noOfLines() {
          return this.body.split("\n").length;
      },
      textareaStyle() {
          const height = (this.noOfLines() * 20) + 20;
          return `height: ${height}px;`;
      }
  },
  components: {
    Octicon,
    Transition,
  },
};
</script>
