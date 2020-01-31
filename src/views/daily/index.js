export default {
  name: "index",
  data(){
    return{
      user_code:'',
      product_list:[],
      tableHeight:600
    }
  },
  created() {
    this.tableHeight = window.innerHeight - 175
  },
  methods:{
    querySearchAsync(val, cb){

    },
    handleSelect(){

    }
  }
}
