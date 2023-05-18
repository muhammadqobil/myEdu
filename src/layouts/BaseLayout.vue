<template>
  <div>
    <q-layout view="lHh Lpr lff" container style="height: calc(100vh)" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>Header</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="300"
        :breakpoint="400"
      >
        <q-scroll-area
          style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
          :thumb-style="thumbStyle" :bar-style="barStyle">
          <q-expansion-item
            default-opened
            v-model="showOpened"
            :label="$t('fp_captions.login')"
            :label-lines="2"
            :caption-lines="3"
            expand-separator
            icon="mdi-bank"
            expand-icon-class="text-white"
            class="bg-primary text-white"
          >
            <q-list class="q-pl-none  bg-secondary">
              <q-item
                to="/login"
                clickable
                v-ripple
                active-class="text-white text-italic text-bold"
              >
                <q-item-section avatar class="q-pl-md q-pr-none">
                  <q-icon name="mdi-file"/>
                </q-item-section>
                <q-item-section class="q-pl-none">test</q-item-section>
              </q-item>
            </q-list>

          </q-expansion-item>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>@rstoenescu</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import {urls} from "src/utils/constants";

export default {
  name: "BaseLayout",
  data(){
    return{
      drawer : false,
      showOpened: true,
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        width: '5px',
      },

      barStyle: {
        right: '2px',
        borderRadius: '5px',
        width: '5px',
      },
    }
  },
  methods:{
    getBranches(){
      this.$axios.get(urls.TEST).then(res=>{

      }).catch(error=>{})
    }
  },
  mounted() {
    this.getBranches()
  }
}
</script>

<style scoped>

</style>
