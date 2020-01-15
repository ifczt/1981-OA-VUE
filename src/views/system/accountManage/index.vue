<template>
  <div>
    <div style="display:inline-block;float: left;">
      <card-panel
        class="cardPanelColor"
        btn-text="内部账号管理"
        :btn-marker="is_indoor_btn_choice"
        btn-icon="user_card"
        @click.native="is_indoor_btn_choice=true"
      />
      <card-panel
        class="cardPanelColor_company"
        btn-text="企业账号管理"
        :btn-marker="!is_indoor_btn_choice"
        btn-icon="company"
        @click.native="is_indoor_btn_choice=false"
      />
      <el-button type="primary" icon="el-icon-circle-plus" style="margin-left: 15px;width: 300px" @click="add_account_visible=true">{{ btn_label }}</el-button>
    </div>
    <div style="'display:inline-block;float:left;padding-top: 15px;" class="autoWidth_">
      <el-table :height="tableHeight" />
    </div>
    <!--  添加账号-dialog  -->
    <el-dialog
      :title="btn_label"
      :visible.sync="add_account_visible"
      width="500px"
    >
      <el-form ref="add_account_form" :model="add_account_form" :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="add_account_form.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="add_account_form.password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="password">
          <el-input v-model="add_account_form.password_ver" placeholder="请再次输入密码" show-password />
        </el-form-item>
        <el-form-item label="用户类别" prop="author">
          <el-select v-model="add_account_form.author" placeholder="请选择用户类别"></el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="add_account_visible = false">取 消</el-button>
        <el-button type="primary" @click="add_account_visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"/>

<style lang="scss">

  .autoWidth_ {
    width: calc(100% - 345px);
  }

  .cardPanelColor {
    .icon-people {
      color: #459b3a;
    }

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #459b3a;
      }
    }
  }

  .cardPanelColor_company {
    .icon-people {
      color: #3283c9;
    }

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #3283c9;
      }
    }
  }
</style>
