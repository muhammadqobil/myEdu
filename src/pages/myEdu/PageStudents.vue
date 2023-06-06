<template>
  <q-page padding class="row items-start justify-center">
    <q-card bordered class="fit">
      <module-header/>
      <students class="q-pa-md"/>
    </q-card>
  </q-page>
</template>

<script>
import Students from "components/myEdu/Students";
import ModuleHeader from "components/base/ModuleHeader";
export default {
  name: "PageStudents",
  components: {ModuleHeader, Students}
}
</script>

<style scoped>

</style>
