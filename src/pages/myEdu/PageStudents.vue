<template>
  <q-page padding class="row items-start justify-center">
    <q-card bordered class="fit">
      <module-header/>
      <students/>
    </q-card>
  </q-page>
</template>

<script>
import ModuleHeader from "components/base/ModuleHeader";
import Students from "components/myEdu/Students";
export default {
  name: "PageStudents",
  components: {Students, ModuleHeader}
}
</script>

<style scoped>

</style>
