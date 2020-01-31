<template>
  <div>
    <el-card shadow="hover" style="margin: 15px;height: 80px;">
      <el-autocomplete
        v-model="user_code"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入企业名称（支持模糊搜索）"
        @select="handleSelect"
        style="width: 350px"
      >
        <template slot="prepend">选择企业</template>
      </el-autocomplete>
      <el-button type="primary">添加产品</el-button>
      <span style="float: right;margin-top: 4px">
        <el-tag>操作员：null</el-tag>
      </span>
    </el-card>
    <el-table
      :height="tableHeight"
      :data="product_list"
      fit
      stripe
      highlight-current-row
      style="width: calc(100% - 30px);margin: 15px"
      show-summary
    >
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="产品名称">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="今日销售额">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="本月销售额">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="较上月增幅">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="总销售额">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" />
          <el-button type="warning" size="mini" icon="el-icon-error" />
          <el-button type="danger" size="mini" icon="el-icon-delete" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script src="./index.js" />

<style scoped>

</style>
