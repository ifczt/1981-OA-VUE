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
      <el-button type="warning" style="margin: 10px 0 0 15px;width: 300px" @click="section_visible=!section_visible">
        <svg-icon icon-class="manage" style="margin-right: 5px"/>部门管理
      </el-button>
      <transition
        name="fade"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <depart class="depart_h" v-show="section_visible" :tags="section_list"/>
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
        <el-table-column align="center" label="用户名" >
          <template slot-scope="scope">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="职位" >
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
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
        <el-table-column align="center" label="操作" width="260px">
          <template slot-scope="scope">
            <el-button  icon="el-icon-edit" @click="update_user_show(scope.row.account,scope.row.id)"/>
            <el-button  icon="el-icon-place" v-show="u_type"/>
            <el-button type="danger" icon="el-icon-delete" @click="del_user_view(scope.row.id,scope.$index)"/>
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
        <el-form-item label="归属部门" :prop="u_type?'section':''" v-show="u_type">
          <el-select v-model="add_account_form.section" placeholder="请选择归属部门">
            <el-option
              v-for="item in section_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
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
        <el-form-item label="指派运营" v-show="!u_type">
          <el-select v-model="add_account_form.parent" placeholder="请选择运营人员">
            <el-option-group
              v-for="g in user_list_group"
              :key="g.label"
              :label="g.label">
              <el-option
                v-for="item in g.options"
                :key="item.u_id"
                :label="item.account"
                :value="item.u_id">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="add_account_visible = false">取 消</el-button>
        <el-button type="primary" @click="submit_create_account('add_account_form')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="update_title" :visible.sync="update_dialog_visible" width="500px">
      <el-form ref="update_account_form" :model="update_account_form" :rules="rules" label-width="100px">
        <el-form-item label="归属部门" :prop="u_type?'section':''" v-show="u_type">
          <el-select v-model="update_account_form.section" placeholder="请选择归属部门">
            <el-option
              v-for="item in section_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户类别" prop="auth">
          <el-select v-model="update_account_form.auth" placeholder="请选择用户类别">
            <el-option
              v-for="item in authorList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="指派运营" v-show="!u_type">
          <el-select v-model="update_account_form.parent" placeholder="请选择运营人员">
            <el-option-group
              v-for="g in user_list_group"
              :key="g.label"
              :label="g.label">
              <el-option
                v-for="item in g.options"
                :key="item.u_id"
                :label="item.account"
                :value="item.u_id">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
      </el-form>
       <span slot="footer" class="dialog-footer">
        <el-button @click="update_dialog_visible = false">取 消</el-button>
        <el-button type="primary" @click="submit_update_account('add_account_form')">确 定</el-button>
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
