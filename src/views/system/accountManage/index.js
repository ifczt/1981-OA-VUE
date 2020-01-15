import CardPanel from '@/components/cardPanel/index'

export default {
  name: 'accountManage',
  data() {
    return {
      // 表单区-START
      add_account_form: {

      },
      // 开关控制器-变量区-START
      is_indoor_btn_choice: true, // 企业内部账号按钮选中状态
      add_account_visible: false, // 添加账号显示开关
      // 开关控制器-变量区-END

      // 基础设置-变量区-START
      tableHeight: 600, // 表格高度
      btn_label: '添加内部账号', // 按钮文本
      // 基础设置-变量区-END
      rules: {}
    }
  },
  methods: {

  },
  created() {
    this.tableHeight = window.innerHeight - 80
  },
  mounted() {

  },
  watch: {
    is_indoor_btn_choice(val) {
      this.btn_label = val ? '添加公司内部账号':'添加企业账号'
    }
  },
  computed: {},
  components: {
    CardPanel
  }
}
