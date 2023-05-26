<template>
  <q-page padding class="row items-center justify-center">
    <q-card bordered class="fit">
      <module-header/>
      <teachers class="q-pa-md" />
    </q-card>
  </q-page>
</template>

<script>
import ModuleHeader from "components/base/ModuleHeader";
import Teachers from "components/myEdu/Teachers";
export default {
  name: "PageTeachers",
  components: {Teachers, ModuleHeader}
}
</script>

<style scoped>

</style>
