<template>
  <div>
    <el-card shadow="hover" style="margin: 15px;height: 80px;">
      <el-row type="flex" align="middle" >
        <svg-icon :icon-class="btnIcon" style="height: 22px;width: 22px;margin-right: 5px"/>
        <el-col>
          <el-row type="flex" align="middle" >
          <el-tag style="margin:0 5px">1{{ btnText }}</el-tag>
          <el-tag type="success">=</el-tag>
          <el-tag style="margin:0 5px">{{ rate }}人民币</el-tag>
          <el-divider direction="vertical"/>
          <input v-model.number="input_num" style="margin-left: 5px" type="number" name="input_num">
          <el-switch
            v-model="change_bool"
            style="width: 150px"
            :active-text="btnText"
            inactive-text="人民币"
          />
          <count-to
            :decimals='4'
            ref="switch_num"
            :start-val="0"
            :end-val="switch_num"
            style="font-size: 20px;color: #f6416c;font-weight:bold"
          />
          <span style="width: 60px;margin-left: 5px">{{ change_bool?'人民币':this.btnText }}</span>
          <el-divider direction="vertical"/>
          </el-row>
        </el-col>
        <el-button style="" type="primary" icon="el-icon-refresh" size="mini" @click="refresh"/>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  name: 'CardPlane',
  components: {
    CountTo
  },
  methods: {
    refresh() {
      this.$emit('refresh')
    }
  },
  watch: {
    change_bool(val) {
      if (!this.change_bool) {
        this.switch_num = this.input_num / this.rate
      } else {
        this.switch_num = this.input_num * this.rate
      }
      this.$refs.switch_num.start()
    },
    input_num(val) {
      if (!this.change_bool) {
        this.switch_num = val / this.rate
      } else {
        this.switch_num = val * this.rate
      }
      this.$refs.switch_num.start()
    }
  },
  props: {
    btnText: {
      type: String,
      default: '美元'
    },
    btnIcon: {
      type: String,
      default: 'plant0'
    },
    rate: {
      type: Number
    },
    btnIconCountry: {
      type: String
    }
  },
  data() {
    return {
      change_bool: true,
      input_num: 0,
      switch_num: 0
    }
  }
}
</script>

<style lang="scss">
  @import "../../../../assets/animate.css";
  input {
    position: relative;
    display: inline-block;
    padding: 4px 7px;
    width: 70px;
    height: 28px;
    cursor: text;
    font-size: 12px;
    line-height: 1.5;
    color: rgba(0, 0, 0, .65);
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    -webkit-transition: all .3s;
    transition: all .3s;
    margin-right: 15px;
  }
</style>
