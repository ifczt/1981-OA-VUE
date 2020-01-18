<template>
  <div>
    <card-plane v-for="(item,i) in list" :btn-icon="'plant-'+i" :btn-text="item.name" :rate="item.rate" />
    <el-card shadow="hover" style="margin: 15px;" :body-style="{ padding: '10px', backgroundColor: '#f9f9f9'}">
      <el-row type="flex" align="middle" justify="center" >
        <el-button icon="el-icon-plus" size="mini" @click="add_rate" circle/>
      </el-row>
    </el-card>
  </div>
</template>

<script src="./index.js" />

<style scoped>

</style>
