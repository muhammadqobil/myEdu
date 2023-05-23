<template>
  <q-page padding class="row items-start justify-center">
    <q-card bordered class="fit">
      <module-header/>
      <rooms class="q-pa-md"/>
    </q-card>
  </q-page>
</template>

<script>
import Branches from "components/myEdu/Branches";
import Rooms from "components/myEdu/Rooms";
import ModuleHeader from "components/base/ModuleHeader";
export default {
  name: "PageRooms",
  components: {ModuleHeader, Rooms},
}
</script>

<style scoped>

</style>
