<template>
 <div class="fit">
   <div style="height: calc(100vh - 192px) !important;">
     <q-toolbar style="background: #e3ebf3; border-radius: 3px; height: 8%">
       <q-toolbar-title class="row justify-between align-center">
         <div>
           <q-icon name="mdi-bank" color="orange-8" size="md"></q-icon>
           <span class="text-bold text-subtitle2 text-primary q-ml-md">{{ $t('Darsga qatnashgan o\'quvchilar ro\'yhati') }}</span>
         </div>
       </q-toolbar-title>
     </q-toolbar>
     <div v-if="!data[0]" class="q-pt-xl text-center full-width">
       <q-icon name="mdi-cube-off" color="primary" size="md"></q-icon>
       <span class="text-grey-7 text-bold text-subtitle1 q-ml-md">{{ $t('system.l_no_results') }}</span>
     </div>
     <div class="full-width" v-else>
       <q-card class="no-shadow q-ma-sm" bordered>
         <q-card-section class="no-padding">
           <div class="q-pa-sm" v-for="item in data">
             <q-list class="sublist object">
               <q-item class="q-pa-xs" >
                 <q-item-section avatar size="20px" class="q-pa-xs">
                   <q-icon name="mdi-check-circle-outline" size="sm" color="primary"/>
                 </q-item-section>
                 <q-item-section caption>
                   <q-item-label>
                     <div class="flex items-center">
                       <div class="text-subtitle2">{{item.studentFio}}</div>
                     </div>
                   </q-item-label>
                 </q-item-section>
               </q-item>
             </q-list>
             <q-separator/>
           </div>
         </q-card-section>
       </q-card>
     </div>
   </div>
 </div>
</template>

<script>
import StandartTable from "src/mixins/StandartTable";
import {urls} from "src/utils/constants";
import StandartInputDialog from "components/base/StandartInputDialog";
import DateInput from "components/base/DateInput";
import DateInput2 from "components/base/DateInput2";

export default {
  name: "AttendanceMiniCard",
  components: {DateInput2,StandartInputDialog},
  mixins:[StandartTable],
  props:{
    groupsId:{
      type:Number
    }
  },
  data(){
    return{
      apiUrl:urls.ATTENDANCES,
      pagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      filter:{
        groupsId:this.groupsId
      },
      data:[],
      formDialog:false,
      beanDefault:{
        id: null,
      },
      bean:{},
    }
  },
  watch:{
    groupsId:function (val){
      this.filter.groupsId = this.groupsId
    }
  },
  methods:{

  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
