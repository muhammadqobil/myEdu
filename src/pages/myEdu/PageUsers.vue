<template>
  <q-page padding class="row items-start justify-center">
    <q-card bordered class="fit">
      <module-header/>
      <users/>
    </q-card>
  </q-page>
</template>

<script>
import ModuleHeader from "components/base/ModuleHeader";
import Users from "components/myEdu/Users";
export default {
  name: "PageUsers",
  components: {Users, ModuleHeader}
}
</script>

<style scoped>

</style>
