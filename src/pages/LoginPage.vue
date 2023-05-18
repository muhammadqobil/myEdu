<template>
  <q-page padding class="row items-center justify-center q-pa-md no-border no-padding">
    <q-card bordered class="fit flex justify-center no-border no-shadow">
      <login/>
    </q-card>
  </q-page>
</template>

<script>
import Login from "components/Login";
export default {
    name: "LoginPage",
    components: {Login},
}

</script>

<style scoped>

</style>
