<template>
  <div class="q-pa-md full-width full-height">
    <div class="row">
      <div class="col-3 q-px-sm">
        <div class="card-style"></div>
      </div>
      <div class="col-3 q-px-sm">
        <div class="card-style"></div>
      </div>
      <div class="col-3 q-px-sm">
        <div class="card-style"></div>
      </div>
      <div class="col-3 q-px-sm">
        <div class="card-style"></div>
      </div>
    </div>
    <div class="row q-my-sm">
      <div class="col-8" style="border:1px solid #21BA45; height: calc(100vh - 248px)">body-1</div>
      <div class="col-4 q-px-sm">
        <div class="row">
          <q-toolbar class="text-white no-shadow" style="background: #e3ebf3; border-radius: 3px; height: 8%">
            <q-toolbar-title class="flex justify-between items-center">
              <div>
                <q-icon name="mdi-bank" color="orange-8" size="md"></q-icon>
                <span class="text-bold text-subtitle2 text-primary q-ml-md">{{ $t('Bugungi darslar ro\'yhati') }}</span>
              </div>
            </q-toolbar-title>
          </q-toolbar>
        </div>
          <q-scroll-area style="height: calc(100vh - 285px)">
            <div class="full-width" v-for="item in list_classes_today_arr">
              <q-card bordered class="shadow-1 full-width q-my-sm">
                <q-card-section>
                  <span class="text-h6">{{item.name}}</span>
                  <div class="text-subtitle2 flex justify-between">
                    <span class="text-grey-7">O'qituvchi:</span>
                    <span class="">{{item.teacherFio}}</span>
                  </div>
                </q-card-section>
                <q-separator inset />
                <q-card-section>
                  <div class="text-subtitle2 flex justify-between">
                    <span class="text-grey-7">Xona:</span>
                    <span>
                    {{item.roomName}}
                    <q-chip outline square color="grey-7" size="12px">{{item.roomNumber}}</q-chip>
                  </span>
                  </div>
                  <div class="text-subtitle2 flex justify-between">
                    <span class="text-grey-7">Vaqti:</span>
                    <span class="">
                    <span style="background: #b1d3f6; padding: 0 5px; border-radius: 3px">{{item.timeFrom}}</span>
                    <span class="q-mx-xs">-</span>
                    <span style="background: #f6edb1; padding: 0 5px; border-radius: 3px">{{item.timeFrom}}</span>
                  </span>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-scroll-area>
      </div>
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
.card-style{
  border: 1px solid rgba(166, 162, 162, 0.27);
  height: 130px;
}
</style>
