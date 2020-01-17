<template>
  <div>
    <el-card shadow="hover" style="margin: 15px;height: 100px;">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="btnIcon"/>
      </svg>
      <el-tag style="margin-left: 20px">1{{ btnText }}</el-tag>
      <el-tag type="success">=</el-tag>
      <el-tag>{{ rate }}人民币</el-tag>
      <el-button style="float: right" type="primary" icon="el-icon-refresh" size="mini"/>
      <count-to
        :start-val="200"
        :end-val="1000"
        style="height:100%;font-size: 20px;"
      />
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
    props: {
      btnText: {
        type: String,
        default: '美元'
      },
      btnIcon: {
        type: String,
        default: '#icon-plant-0'
      },
      rate: {
        type: String
      },
      btnIconCountry: {
        type: String
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../../assets/animate.css";
</style>
