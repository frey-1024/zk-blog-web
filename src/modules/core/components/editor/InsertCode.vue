<template>
  <zk-modal size="sm" :visible.sync="openModal">
    <span slot="title">插入代码</span>
    <slot slot="body">
      <div class="flex-row row-left mb-10">
        <span class="pr-10">请选择语言：</span>
        <zk-select
          placeholder="请选择语言"
          width="240px"
          v-model="value"
          :options="options">
        </zk-select>
      </div>
      <textarea placeholder="请添加代码" ref="insertCode" class="form-control code-input"></textarea>
    </slot>
    <slot slot="footer">
      <zk-button class="btn btn-blue" @click="save">插入</zk-button>
    </slot>
  </zk-modal>
</template>

<script>
  import { languages } from '../../utils/editor/menu';
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true,
      }
    },
    data() {
      return {
        openModal: this.visible,
        options: languages,
        value: languages[0],
      };
    },
    methods: {
      save() {
        const el = this.$refs.insertCode;
        let val = el.value;
        if (val === '' || val.trim() === '') {
          return;
        }
        const lang = this.value.value;
        // 处理标签
        if (lang === 'html' || lang === 'xml') {
          val = val.replace(/[<>]/g, (v) => {
            if (v === '<') return '&lt;';
            if (v === '>') return '&gt;';
          });
        }
        this.$emit('code', { code: val, lang });
      }
    },
    components: {
      ZkModal: () => import('../ZkModal.vue'),
      ZkSelect: () => import('../ZkSelect.vue'),
    },
    watch: {
      openModal(newVal) {
        if (!newVal) {
          this.$emit('update:visible', false);
        }
      },
      visible(newVal) {
        this.openModal = newVal;
        if (!newVal) {
          const el = this.$refs.insertCode;
          el.value = '';
        }
      }
    }
  };
</script>

<style lang="scss">
  @import "../../styles/color";
  .code-input{
    min-height: 200px;
    resize: vertical;
  }
</style>
