import CardPanel from '@/components/cardPanel/index'
import { creat_user, get_auth_list } from '@/api/user'
import { rules, serverData_in } from '@/utils/dataView'

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
      is_indoor_btn_choice: true, // 企业内部账号按钮选中状态
      add_account_visible: false, // 添加账号显示开关
      // 开关控制器-变量区-END
      author_list: [], // 用户组选项列表
      // 基础设置-变量区-START
      tableHeight: 600, // 表格高度
      btn_label: '添加内部账号', // 按钮文本
      // 基础设置-变量区-END
      rules: rules
    }
  },
  methods: {
    // 提交生成账号
    submit_create_account(formName) {
      this.add_account_form.nickname = this.add_account_form.account
      this.$refs[formName].validate((valid) => {
        if (valid) {
          creat_user(this.add_account_form).then(response => {
            this.add_account_visible = false
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
    this.tableHeight = window.innerHeight - 80
    get_auth_list().then(response => {
      this.author_list = serverData_in(response.data)
    })
  },
  mounted() {

  },
  watch: {
    is_indoor_btn_choice(val) {
      this.btn_label = val ? '添加公司内部账号' : '添加企业账号'
    },
    add_account_visible(val) {
      if (!val) {
        this.init_data_add_account_form()
        this.$refs['add_account_form'].resetFields()
      }
    }
  },
  computed: {},
  components: {
    CardPanel
  }
}
