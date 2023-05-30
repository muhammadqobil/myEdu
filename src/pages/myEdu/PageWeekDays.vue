<template>
  <q-page padding class="row items-start justify-center">
    <q-card bordered class="fit">
      <module-header/>
      <week-days class="q-pa-md"/>
    </q-card>
  </q-page>
</template>

<script>
import ModuleHeader from "components/base/ModuleHeader";
import WeekDays from "components/myEdu/WeekDays";
export default {
  name: "PageWeekDays",
  components: {WeekDays, ModuleHeader}
}
</script>

<style scoped>

</style>
