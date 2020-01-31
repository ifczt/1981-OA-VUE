import CardPanel from '@/components/cardPanel/index'
import Depart from './depart/index'
import {creat_user, del_user, get_auth_list, get_user_list} from '@/api/user'
import {rules, serverData_in} from '@/utils/dataView'
import Pagination from '@/components/Pagination'
import {get_list} from "@/api/section";

export default {
  name: 'accountManage',
  data() {
    return {
      update_account_form:{
        auth: '',
        section: '',
        parent: ''
      },
      add_account_form: {
        account: '',
        password: '',
        nickname: '',
        password_ver: '',
        auth: '',
        section: '',
        parent: ''
      },
      add_account_visible: false, // 添加账号显示开关
      section_visible: false,
      section_list: [],
      author_list: [], // 用户组选项列表
      author_list_user: [], // 用户组选项列表
      user_list: [],
      user_list_group: [],
      tableHeight: 600, // 表格高度
      btn_label: '添加内部账号', // 按钮文本
      update_title: '',
      update_dialog_visible: false,
      user_list_total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        u_type: true
      },
      rules: rules
    }
  },
  methods: {
    update_user_show(name,id){
      this.update_dialog_visible = true
      this.update_title = '编辑'+name
    },
    del_user_view(id, index) {
      del_user({id: id}).then(response => {
        this.user_list.splice(index, 1)
      })
    },
    get_user_list_view() {
      get_user_list(this.listQuery).then(response => {
        this.user_list = serverData_in(response.data.list, 'user_list')
        this.user_list_total = response.data.total
      })
    },
    submit_update_account(formName){

    },
    // 提交生成账号
    submit_create_account(formName) {
      this.add_account_form.nickname = this.add_account_form.account
      this.$refs[formName].validate((valid) => {
        if (valid) {
          creat_user(this.add_account_form).then(response => {
            this.add_account_visible = false
            this.user_list.unshift(response.data)
            this.$notify({
              title: '新建成功',
              message: '已成功创建账号',
              type: 'success'
            })
          })
        }
      })
    },
    // 初始化数据
    init_data_add_account_form() {
      this.add_account_form = {
        account: '',
        password: '',
        nickname: '',
        password_ver: '',
        auth: '',
        section: '',
        parent: ''
      }
    },
    async get_section_list() {
      if (this.section_list.length < 1) {
        await get_list().then(response => {
          this.section_list = response.data
        })
      }
      return Promise.resolve(null)
    },
    get_dialog_data(){
      if (this.author_list.length < 1) {
        const this_ = this
        get_auth_list().then(response => {
          this_.author_list = serverData_in(response.data).slice(0, -1)
          this_.author_list_user = serverData_in(response.data).slice(-1)
        })
      }
      this.get_section_list().then(() => {
        if (!this.u_type && this.user_list_group.length < 1) {
          get_user_list({limit: 100, u_type: true}).then(response => {
            this.user_list_group = serverData_in(response.data.list, 'user_list_group', this.section_list)
          })
        }
      })
    }
  },
  created() {
    this.tableHeight = window.innerHeight - 185
    this.get_user_list_view()
  },
  mounted() {

  },
  watch: {
    section_visible(val) {//部门管理
      if (val && this.section_list.length < 1) {
        this.get_section_list()
      }
    },
    u_type(val) { // 内部账号与企业账号 切换
      this.btn_label = val ? '添加公司内部账号' : '添加企业账号'
      if (val) {
        this.user_list_group = []
      }
    },
    add_account_visible(val) {
      if (!val) {
        this.init_data_add_account_form()
        this.$refs['add_account_form'].resetFields()
      } else {
        this.get_dialog_data()
      }
    },
    update_dialog_visible(val){
      if(val){
        this.get_dialog_data()
      }
    }
  },
  computed: {
    u_type: {
      get() {
        return this.listQuery.u_type
      },
      set(val) {
        if (val !== this.listQuery.u_type) {
          this.get_user_list_view()
        }
        this.listQuery.u_type = val
      }
    },
    authorList: function () {
      return this.u_type ? this.author_list : this.author_list_user
    }
  },
  components: {
    Pagination,
    CardPanel,
    Depart
  }
}
