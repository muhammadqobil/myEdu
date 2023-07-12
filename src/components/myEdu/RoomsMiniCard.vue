<template>
  <div class="fit">
    <div style="height: calc(100vh - 192px) !important;">
      <q-toolbar style="background: #e3ebf3; border-radius: 3px; height: 8%">
        <q-toolbar-title class="row justify-between align-center">
          <div>
            <q-icon name="mdi-bank" color="orange-8" size="md"></q-icon>
            <span class="text-bold text-subtitle2 text-primary q-ml-md">{{ $t('Guruhdagi o\'quvchilar') }}</span>
          </div>
        </q-toolbar-title>
      </q-toolbar>
      <div v-if="!data[0]" class="q-pt-xl text-center full-width">
        <q-icon name="mdi-cube-off" color="primary" size="md"></q-icon>
        <span class="text-grey-7 text-bold text-subtitle1 q-ml-md">{{ $t('system.l_no_results') }}</span>
      </div>
      <div class="full-width" v-else>
        <q-card class="no-shadow q-ma-sm">
          <q-card-section class="no-padding">
            <q-scroll-area style="height: calc(100vh - 255px);">
              <div class="full-width" v-for="item in data">
                <q-card bordered class="shadow-1 full-width q-my-sm">
                  <q-card-section>
                    <div class="flex justify-between items-center">
                      <span>{{item.daysName}}</span>
                      <span class="text-h6">{{item.name}}</span>
                    </div>
                    <div class="text-subtitle2 flex justify-between">
                      <span class="text-grey-7">O'qituvchi:</span>
                      <span class="">{{item.teacherFio}}</span>
                    </div>
                  </q-card-section>
                  <q-separator inset />
                  <q-card-section>
                    <div class="text-subtitle2 flex justify-between">
                      <span class="text-grey-7">Vaqti:</span>
                      <span class="">
                    <span style="background: #b1d3f6; padding: 0 5px; border-radius: 3px">{{item.timeFrom}}</span>
                    <span class="q-mx-xs">-</span>
                    <span style="background: #f6edb1; padding: 0 5px; border-radius: 3px">{{item.timeTo}}</span>
                  </span>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import {urls} from "src/utils/constants";

export default {
  name: "RoomsMiniCard",
  props:{
    roomsId : {
      type:Number,
    }
  },
  data(){
    return{
      pagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      filter:{
        roomsId:this.roomsId
      },
      data:[],
    }
  },
  watch:{
    roomsId : function (val){
      this.filter.roomsId = this.roomsId;
      this.getData();
    }
  },
  methods:{
    getData(){
      let all = Object.assign(this.pagination , this.filter)
      this.$axios.get(urls.GROUPS + '/rooms' + this.tableFilterQuery(all)).then(res =>{
        this.data.splice(0, this.data.length , ...res.data.content)
      })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style scoped>

</style>
