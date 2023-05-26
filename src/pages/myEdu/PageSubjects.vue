<template>
  <q-page padding class="row items-center justify-center">
    <q-card bordered class="fit">
      <module-header/>
      <subjects class="q-pa-md"/>
    </q-card>
  </q-page>
</template>

<script>
import ModuleHeader from "components/base/ModuleHeader";
import Subjects from "components/myEdu/Subjects";
export default {
  name: "PageSubjects",
  components: {Subjects, ModuleHeader}
}
</script>

<style scoped>

</style>
