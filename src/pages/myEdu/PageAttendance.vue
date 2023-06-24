<template>
  <q-page padding class="row items-start justify-center">
    <q-card bordered class="fit">
      <module-header/>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="1" class="no-padding">
          <attendance @toAttendanceCard="refreshTab($event)" @refresh="refresh"/>
        </q-tab-panel>

        <q-tab-panel name="2" class="no-padding">
          <attendance-card @goBack="refreshTab" @refresh="refresh" :group_id="group_id"/>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import ModuleHeader from "components/base/ModuleHeader";
import Attendance from "components/myEdu/Attendance";
import Students from "components/myEdu/Students";
import AttendanceCard from "components/myEdu/AttendanceCard";
export default {
  name: "PageAttendance",
  components: {AttendanceCard, Students, Attendance, ModuleHeader},
  data(){
    return{
      tab:'1',
      group_id:null,
    }
  },
  methods:{
    refresh(e) {
      this.tab = e.tab;
      this.group_id = e.id;
    },
    refreshTab(val) {
      alert(val)
      if (this.tab === '1') {
        this.group_id = val.group_id;
        this.tab = '2';
      } else {
        this.tab = '1'
        this.group_id = null
      }
    },
  }
}
</script>

<style scoped>

</style>
