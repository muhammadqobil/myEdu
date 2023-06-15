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
           <q-btn @click="rowAdd()" dense color="primary" icon="add">
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
               <q-btn-group>
                 <q-btn size="sm" dense color="purple-8" icon="mdi-cash-check">
                   <q-tooltip content-class="bg-purple-8">
                     {{$t('To`lov qilish')}}
                   </q-tooltip>
                 </q-btn>
                 <q-separator vertical/>
                 <q-btn size="sm" dense color="red-7" icon="mdi-account-remove">
                   <q-tooltip content-class="bg-red-7">
                     {{$t('Guruhdan chiqarish')}}
                   </q-tooltip>
                 </q-btn>
               </q-btn-group>
             </div>
             <div class="text-subtitle2 flex justify-between">
               <span class="text-grey-7">o'qituvchi:</span>
               <span class="">{{item.teacherName}}</span>
             </div>
           </q-card-section>

           <q-separator inset />

           <q-card-section v-if="item.lastPaymentDate">
            <div class="text-subtitle2 flex justify-between">
              <span class="text-grey-7">To'lov sanasi:</span>
              <span class="text-right" style="background: #b1d3f6; padding: 0 5px; border-radius: 3px">{{$dateutil.formatDate(item.lastPaymentDate , "DD.MM.YYYY")}}</span>
            </div>
           </q-card-section>
           <q-card-section style="padding-top: 0" v-if="item.nextPaymentDate">
            <div class="text-subtitle2 flex justify-between">
              <span class="text-grey-7">Keyingi to'lov sanasi:</span>
              <span class="text-right" style="background: #f6edb1; padding: 0 5px; border-radius: 3px">{{$dateutil.formatDate(item.nextPaymentDate , "DD.MM.YYYY")}}</span>
            </div>
           </q-card-section>
           <q-separator inset v-if="item.status === 1" />
           <q-card-section>
            <div class="text-subtitle2 flex justify-between">
              <span class="text-grey-7">Holati:</span>
              <q-chip outline square :color="item.status === 0 ? 'negative' :'positive'" size="sm">
                <span v-if="item.status===0" class="text-subtitle2">To'lov qilinmagan</span>
                <span v-if="item.status===1" class="text-subtitle2">To'lov qilingan</span>
              </q-chip>
            </div>
           </q-card-section>
         </q-card>
       </div>
     </q-scroll-area>
   </div>
   <!--  ADD GROUP DIALOG -->
   <standart-input-dialog v-model="formDialog" :model-id="bean.id" :on-submit="addGroupToStudent"
                          :on-validation-error="onValidationError">

     <div class="row">
       <q-select
         v-model="bean.groupsId"
         emit-value
         map-options
         :options="groups"
         option-value="id"
         option-label="name"
         :label="$t('fp_captions.l_groups')"
         transition-show="scale"
         transition-hide="scale"
         class="q-pa-md col-xs-12" dense
       >
         <template v-slot:append>
           <q-icon v-if="bean.groupsId" name="close" color="primary" @click.stop="bean.groupsId = null"
                   class="cursor-pointer"/>
         </template>
         <template v-slot:selected-item="props">
           <div>{{props.opt.name}}</div>
         </template>
       </q-select>
     </div>
   </standart-input-dialog>
 </div>
</template>

<script>
import StandartTable from "src/mixins/StandartTable";
import {urls} from "src/utils/constants";
import StandartInputDialog from "components/base/StandartInputDialog";

export default {
  name: "StudentsMiniCard",
  components: {StandartInputDialog},
  mixins:[StandartTable],
  props:{
    data:{
      type:Array
    }
  },
  data(){
    return{
      groupsBean: {
        studentsId:null,
        groupsId:null,
      },
      formDialog:false,
      beanDefault:{
        id: null,
        studentsId:this.data[0].studentsId,
        groupsId:null,
      },
      bean:{},
      groups:[]
    }
  },
  watch:{
    data:function (val){
      this.$set(this.beanDefault , 'studentsId' ,this.data[0].studentsId )
    }
  },
  methods:{
    /**ADDING GROUP TO STUDENT**/
    addGroupToStudent(){
      this.$axios.post(urls.STUDENTS + '/add-group', this.bean).then(response => {
        this.$emit('addGroup' , 1)
        this.formDialog = false;
        this.showInfo(this.$t('fp_captions.l_upload_successfully'));
      }).catch(err => {
        this.showError(err);
      })
    },
    getGroupsAll(){
      this.$axios.get(urls.GROUPS).then(response=>{
        this.groups.splice(0,this.groups.length , ...response.data.content)
      }).catch((error)=>{
        this.showError(error)
        console.log(error)
      }).finally(()=>{})
    },
  },
  mounted() {
    this.getGroupsAll()
  }
}
</script>

<style scoped>

</style>
