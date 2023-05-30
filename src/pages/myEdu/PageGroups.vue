<template>
  <q-page padding class="row items-start justify-center">
    <q-card bordered class="fit">
    <module-header/>
      <groups class="q-pa-md"/>
    </q-card>
  </q-page>
</template>

<script>
import ModuleHeader from "components/base/ModuleHeader";
import Groups from "components/myEdu/Groups";
export default {
  name: "PageGroups",
  components: {Groups, ModuleHeader}
}
</script>

<style scoped>

</style>
