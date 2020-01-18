import CardPlane from './card/index'
import {get_list} from "../../../api/exchange_rate";

export default {
  name: 'Index',
  components: {
    CardPlane
  },
  data() {
    return {
      list: []
    }
  },
  computed: {},
  methods: {
    add_rate(){

    }
  },
  created() {
    get_list().then(response => {
      this.list = response.data
    })
  }
}
