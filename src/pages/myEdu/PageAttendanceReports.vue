<template>
  <q-page padding class="row items-start justify-center">
    <q-card bordered class="fit">
      <module-header/>
      <attendance-reports class="q-pa-md"/>
    </q-card>
  </q-page>
</template>

<script>
import ModuleHeader from "components/base/ModuleHeader";
import AttendanceReports from "components/myEdu/AttendanceReports";
export default {
  name: "PageAttendanceReports",
  components: {AttendanceReports, ModuleHeader}
}
</script>

<style scoped>

</style>
