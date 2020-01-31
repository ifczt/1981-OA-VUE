<template>
  <div>
    <card-plane
        v-for="(item,i) in list"
        :btn-icon="'plant-'+i"
        :btn-text="item.name"
        :rate="item.rate"
        @refresh="add_rate_view(item.currency_code)"/>
    <el-card shadow="hover" style="margin: 15px;" :body-style="{ padding: '10px', backgroundColor: '#f9f9f9'}">
      <el-row type="flex" align="middle" justify="center">
        <el-button icon="el-icon-plus" size="mini" @click="add_exchange_visible = true" circle/>
      </el-row>
    </el-card>
    <el-dialog
      :visible.sync="add_exchange_visible"
      width="30%">
      <el-input v-model="scur" placeholder="请输入货币缩写如：USD"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="add_exchange_visible = false">取 消</el-button>
        <el-button type="primary" @click="add_rate_view">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script src="./index.js"/>

<style scoped>

</style>
