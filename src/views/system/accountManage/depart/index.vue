<template>
  <div style="border: 2px dashed rgba(0,0,0,0.31);width: 300px;margin: 15px;padding: 15px;text-align: center">
    <el-tag
      v-for="tag in tags"
      :key="tag.id"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    style="margin-top: 15px">
      {{tag.name}}
    </el-tag>
    <div style="margin-top: 15px">
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加部门</el-button>
    </div>
  </div>
</template>

<script>
  import {add_section, del_section} from "../../../../api/section";

  export default {
    data() {
      return {
        inputVisible: false,
        inputValue: ''
      };
    },
    props:{
      tags:{
        type: Array
      }
    },
    methods: {
      handleClose(tag) {
        del_section({id:tag.id}).then(response => {
          this.tags.splice(this.tags.indexOf(tag), 1);
        })
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if(inputValue.length<1){
          return
        }
        add_section({'name':inputValue}).then(response=>{
          if (inputValue) {
            this.tags.push(response.data);
          }
          this.inputVisible = false;
          this.inputValue = '';
        })

      }
    }
  }
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
