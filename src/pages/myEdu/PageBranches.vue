<template>
  <q-page padding class="row items-start justify-center">
    <q-card bordered class="fit">
      <module-header/>
      <branches class="q-pa-md"/>
    </q-card>
  </q-page>
</template>

<script>
import Branches from "components/myEdu/Branches";
import ModuleHeader from "components/base/ModuleHeader";
export default {
  name: "PageBranches",
  components: {ModuleHeader, Branches}
}
</script>

<style scoped>

</style>
