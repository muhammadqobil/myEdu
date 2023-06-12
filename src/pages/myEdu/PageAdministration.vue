<template>
  <q-page padding class="row items-start justify-center">
    <q-card bordered class="fit">
      <module-header/>
      <administration class="q-pa-md"/>
    </q-card>
  </q-page>
</template>

<script>
import Students from "components/myEdu/Administration";
import ModuleHeader from "components/base/ModuleHeader";
import Administration from "components/myEdu/Administration";
export default {
  name: "PageAdministration",
  components: {Administration, ModuleHeader}
}
</script>

<style scoped>

</style>
