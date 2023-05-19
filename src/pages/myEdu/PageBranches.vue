<template>
  <q-page padding class="row items-start justify-center">
    <q-card bordered class="fit">
      <alarm-graphic-work-types class="q-pa-md"/>
    </q-card>
  </q-page>
</template>

<script>
import AlarmGraphicWorkTypes from "components/myEdu/AlarmGraphicWorkTypes";
export default {
  name: "PageBranches",
  components: {AlarmGraphicWorkTypes}
}
</script>

<style scoped>

</style>
