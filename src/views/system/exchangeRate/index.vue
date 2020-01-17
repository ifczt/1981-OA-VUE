<template>
  <div>
    <card-plane :btn-icon="btnIcon()" btn-text="美元-USD" rate="6.88" btn-icon-country="#icon-meiguo"/>

  </div>
</template>

<script>
import CardPlane from './card/index'
let btnIcon_index = 0
export default {
  name: 'Index',
  components: {
    CardPlane
  },
  data() {
    return {
    }
  },
  computed: {

  },
  methods:{
    btnIcon() {
      btnIcon_index += 1
      btnIcon_index = btnIcon_index > 19 ? 0 : btnIcon_index
      return '#icon-plant-' + btnIcon_index
    }
  }
}
</script>

<style scoped>

</style>
