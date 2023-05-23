<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="fit q-pa-none bg-primary text-white">
    <q-item
      to="/"
      clickable
      v-ripple
      :active="getCurrentRouteName()==='home'"
      active-class="text-white"
      class="text-white bg-primary shadow-1"
      style="height: 55px;"
    >
      <q-item-section avatar >
        <q-icon name="mdi-home"/>
      </q-item-section>
      <q-item-section>{{$t('system.l_home')}}</q-item-section>
    </q-item>
    <q-list>

      <q-expansion-item
        v-for="(category,index) in getUserCategories()"
        :label="$t(category.meta.title)"
         default-opened
        :label-lines="1"
        :caption="$t(category.meta.description)"
        :caption-lines="3"
        :key="index"
        expand-separator
        :icon="category.meta.icon"
        expand-icon-class="text-white"
        style="z-index: 99;  rgba(20,153,109,0.51);"
        class="bg-transparent relative-position my-menu"

      >
        <q-list class="q-pl-none inset-shadow">
          <q-item
            v-for="(module,index1) in category.children"
            :key="index1"
            :to="category.path+'/'+module.path"
            clickable
            v-ripple
            :active="getCurrentRouteName() === module.name"
            active-class="text-white text-bold shadow-2"
            style="background: rgb(4 82 56 / 0.2);"
          >
            <q-item-section avatar class="q-pl-md q-pr-none">
              <q-icon :name="module.meta.icon"/>
            </q-item-section>
            <q-item-section class="q-pl-none">{{$t(module.meta.title)}}</q-item-section>
          </q-item>
        </q-list>

      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'MainMenuPanel',
  data() {
    return {}
  },
  computed: {
  },
  methods: {
    ...mapGetters([
      'getCurrentRouteName',
      'getCurrentRouteCategoryName',
      'getUserCategories'
    ]),
  }
}
</script>

<style lang="scss" scoped>
.active-menu {
  color: white;
  background: #F2C037;
}
</style>
