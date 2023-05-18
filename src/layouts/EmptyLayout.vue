<template>
  <q-layout>
    <error-dialog/>
    <q-page-container>
      <q-linear-progress stripe dark indeterminate size="5px" :value="0.4" v-if="$store.state.ajaxRequestsCnt > 0" />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import ErrorDialog from "components/base/ErrorDialog";
export default {
  name: "EmptyLayout",
  components: {ErrorDialog}
}
</script>

<style scoped>

</style>
