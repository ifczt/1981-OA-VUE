import CardPlane from './card/index'
import {add_rate, get_list} from '../../../api/exchange_rate'

export default {
  name: 'Index',
  components: {
    CardPlane
  },
  data() {
    return {
      list: [],
      add_exchange_visible: false,
      scur: ''
    }
  },
  computed: {},
  methods: {
    add_rate_view(scur) {
      add_rate({ scur:scur || this.scur, refresh:true }).then(response => {
        if(scur){
          return
        }
        this.list.unshift(response.data)
        this.add_exchange_visible = false
        this.scur = ''
      })
    }
  },
  created() {
    get_list().then(response => {
      this.list = response.data
    })
  }
}
