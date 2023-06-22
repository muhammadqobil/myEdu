<template>
  <div class="q-pa-md full-width full-height bg-amber">
    <div class="row">
      <div class="col-12" style="border: 1px solid #21BA45; height: 160px">header</div>
    </div>
    <div class="row">
      <div class="col-8" style="border:1px solid #21BA45; height: calc(100vh - 248px)">body-1</div>
      <div class="col-4" style="border:1px solid #21BA45">body-2</div>
    </div>
  </div>
</template>

<script>
import {urls} from "src/utils/constants";
import AlarmGraphicWorkTypes from "components/myEdu/Branches";

export default {
  name: "Home",
  components: {AlarmGraphicWorkTypes},
  data(){
    return {
      list_classes_today_arr:[]
    }
  },
  methods:{
    getTest(){
      this.$axios.get(urls.TEST).then(res=>{
        console.log(res)
      })
    },
    listClassesTodey(){
      this.$axios.get(urls.GROUPS + this.tableFilterQuery({today:1})).then(response => {
        this.list_classes_today_arr.splice(0 , this.list_classes_today_arr.length , ...response.data.content)
      }).catch(error => {
        this.showError(error)
      }).finally(() => {})
    }
  },
  mounted() {
    this.getTest();
    this.listClassesTodey()
  }
}
</script>

<style scoped>

</style>
