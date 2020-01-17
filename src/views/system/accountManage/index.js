import CardPanel from '@/components/cardPanel/index'
import { creat_user, get_auth_list, get_user_list} from '@/api/user'
import { rules, serverData_in } from '@/utils/dataView'
import Pagination from '@/components/Pagination'

export default {
  name: 'accountManage',
  data() {
    return {
      // 表单区-START
      add_account_form: {
        account: '',
        password: '',
        nickname: '',
        password_ver: '',
        auth: ''
      },
      // 开关控制器-变量区-START
      add_account_visible: false, // 添加账号显示开关
      // 开关控制器-变量区-END

      author_list: [], // 用户组选项列表
      author_list_user: [], // 用户组选项列表
      user_list: [],
      // 基础设置-变量区-START
      tableHeight: 600, // 表格高度
      btn_label: '添加内部账号', // 按钮文本
      // 基础设置-变量区-END
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
    get_user_list_view() {
      get_user_list(this.listQuery).then(response => {
        this.user_list = response.data.list
        this.user_list_total = response.data.total
      })
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
        auth: ''
      }
    }
  },
  created() {
    this.tableHeight = window.innerHeight - 185
    this.get_user_list_view()
  },
  mounted() {

  },
  watch: {
    u_type(val) {
      this.btn_label = val ? '添加公司内部账号' : '添加企业账号'
    },
    add_account_visible(val) {
      if (!val) {
        this.init_data_add_account_form()
        this.$refs['add_account_form'].resetFields()
      } else {
        if (this.author_list.length < 1) {
          const this_ = this
          get_auth_list().then(response => {
            this_.author_list = serverData_in(response.data).slice(0, -1)
            this_.author_list_user = serverData_in(response.data).slice(-1)
          })
        }
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
    CardPanel
  }
}
