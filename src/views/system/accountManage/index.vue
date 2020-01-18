<template>
  <div>
    <div style="float: left;">
      <card-panel
        class="cardPanelColor"
        btn-text="内部账号管理"
        :btn-marker="u_type"
        btn-icon="user_card"
        @click.native="u_type=true"
      />
      <card-panel
        class="cardPanelColor_company"
        btn-text="企业账号管理"
        :btn-marker="!u_type"
        btn-icon="company"
        @click.native="u_type=false"
      />
      <el-button type="primary" icon="el-icon-circle-plus" style="margin-left: 15px;width: 300px" @click="add_account_visible=true">{{ btn_label }}</el-button>
      <br/>
      <el-button type="warning" style="margin: 10px 0 0 15px;width: 300px" @click="depart_visible=!depart_visible">
        <svg-icon icon-class="manage" style="margin-right: 5px"/>部门管理
      </el-button>
      <transition
        name="fade"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <depart class="depart_h" v-show="depart_visible"/>
      </transition>
    </div>
    <el-card shadow="hover" class="autoWidth_">
      <el-table
        :height="tableHeight"
        :data="user_list"
        fit
        stripe
        highlight-current-row
        style="width: calc(100% - 30px);margin: 15px"
      >
        <el-table-column align="center" label="ID">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户名" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" width="80">
          <template slot-scope="scope">
            <span>
              <el-tag :type="scope.row.state===1?'success':'danger'">
                {{ scope.row.state===1?'已启用':'已禁用' }}
              </el-tag>
            </span>
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
      <pagination
        v-show="user_list_total>0"
        :total="user_list_total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        style="padding: 0 15px 0 15px"
        @pagination="get_user_list_view()"
      />
    </el-card>
    <!--  添加账号-dialog  -->
    <el-dialog
      :title="btn_label"
      :visible.sync="add_account_visible"
      width="500px"
    >
      <el-form ref="add_account_form" :model="add_account_form" :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="account">
          <el-input v-model="add_account_form.account" placeholder="请输入用户名" />
          <el-input style="position: fixed;bottom: -9999px" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input style="position: fixed;bottom: -9999px" show-password />
          <el-input v-model="add_account_form.password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="password">
          <el-input v-model="add_account_form.password_ver" placeholder="请再次输入密码" show-password />
        </el-form-item>
        <el-form-item label="用户类别" prop="auth">
          <el-select v-model="add_account_form.auth" placeholder="请选择用户类别">
            <el-option
              v-for="item in authorList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="add_account_visible = false">取 消</el-button>
        <el-button type="primary" @click="submit_create_account('add_account_form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"/>

<style lang="scss">
  @import "../../../assets/animate.css";
  .autoWidth_ {
    align-content: center;
    display:inline-block;
    float:left;
    margin-top: 15px;
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
