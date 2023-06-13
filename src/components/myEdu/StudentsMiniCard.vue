<template>
 <div class="fit">
   <div style="height: calc(100vh - 192px) !important;">
     <q-toolbar style="background: #e3ebf3; border-radius: 3px; height: 8%">
       <q-toolbar-title class="row justify-between align-center">
         <div>
           <q-icon name="mdi-bank" color="orange-8" size="md"></q-icon>
           <span class="text-bold text-subtitle2 text-primary q-ml-md">{{ $t('Guruhlar') }}</span>
         </div>
         <q-btn-group spread>
           <q-btn @click="rowAdd" dense color="primary" icon="add">
             <q-tooltip content-class="bg-primary">
               {{ $t('fp_captions.l_new') }}
             </q-tooltip>
           </q-btn>
         </q-btn-group>
       </q-toolbar-title>
     </q-toolbar>
     <q-scroll-area style="height: 91%" class="q-px-md">
       <div v-if="!data[0]" class="q-pt-xl text-center">
         <q-icon name="mdi-cube-off" color="primary" size="md"></q-icon>
         <span class="text-grey-7 text-bold text-subtitle1 q-ml-md">{{ $t('system.l_no_results') }}</span>
       </div>
       <div v-else class="q-pt-md" v-for="item in data">
         <q-card bordered class="my-card">
           <q-card-section>
             <div class="text-h6 flex justify-between items-center">
               <span>{{item.groupsName}}</span>
               <q-btn color="grey-7" size="md" round flat icon="more_vert"></q-btn>
             </div>
             <div class="text-subtitle2 flex justify-between">
               <span class="text-grey-7">o'qituvchi:</span>
               <span class="">{{item.teacherName}}</span>
             </div>
           </q-card-section>

           <q-separator inset />

           <q-card-section>
            <div class="text-subtitle2 flex justify-between">
              <span class="text-grey-7">To'lov sanasi:</span>
              <span class="text-right" style="background: #b1d3f6; padding: 0 5px; border-radius: 3px">{{'12.06.2022'}}</span>
            </div>
           </q-card-section>
           <q-card-section style="padding-top: 0">
            <div class="text-subtitle2 flex justify-between">
              <span class="text-grey-7">Keyingi to'lov sanasi:</span>
              <span class="text-right" style="background: #f6edb1; padding: 0 5px; border-radius: 3px">{{'12.06.2022'}}</span>
            </div>
           </q-card-section>
         </q-card>
       </div>
     </q-scroll-area>
   </div>
 </div>
</template>

<script>
import StandartTable from "src/mixins/StandartTable";

export default {
  name: "StudentsMiniCard",
  mixins:[StandartTable],
  props:{
    data:{
      type:Array
    }
  },
  data(){
    return{

    }
  }
}
</script>

<style scoped>

</style>
