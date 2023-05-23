<template>
  <div class="q-pa-md"></div>
</template>

<script>
import {urls} from "src/utils/constants";
import AlarmGraphicWorkTypes from "components/myEdu/Branches";

export default {
  name: "Home",
  components: {AlarmGraphicWorkTypes},
  methods:{
    getTest(){
      this.$axios.get(urls.TEST).then(res=>{
        console.log(res)
      })
    }
  },
  mounted() {
    this.getTest()
  }
}
</script>

<style scoped>

</style>
