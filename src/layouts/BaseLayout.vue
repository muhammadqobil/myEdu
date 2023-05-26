<template>
  <div>
    <q-layout view="lHh LpR fFf" >
      <q-header elevated class="bg-white text-primary" style="padding: 3px" >
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="leftDrawer = !leftDrawer"/>

          <q-toolbar-title class="text-subtitle1 logo-text-style  text-uppercase">
            <q-avatar>
              <q-icon name="mdi-file"/>
            </q-avatar>
            <span>
            {{$t('app_name')}}
          </span>
          </q-toolbar-title>


<!--          <q-select-->
<!--            v-model="language"-->
<!--            :options="languages"-->
<!--            option-value="code"-->
<!--            option-label="name"-->
<!--            :display-value="language ? language.name : 'No'"-->
<!--            borderless-->
<!--            transition-show="flip-up"-->
<!--            transition-hide="flip-down"-->
<!--          >-->
<!--            <template v-slot:selected="props">-->
<!--              <div class="text-primary">{{ language.name }}</div>-->
<!--            </template>-->

<!--          </q-select>-->
          <q-btn
            dense flat round
            @click="$q.fullscreen.toggle()"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
          />

          <q-btn dense flat round icon="mdi-exit-to-app" @click="logout"/>
          <q-btn dense flat round icon="menu" @click="rightDrawer = !rightDrawer" toggle-color="red"/>
        </q-toolbar>
      </q-header>

      <q-drawer show-if-above v-model="leftDrawer" side="left" bordered elevated>
        <q-scroll-area class="fit bg-primary my-edu-menu">
          <main-menu-panel/>
        </q-scroll-area>
      </q-drawer>
      <q-drawer v-model="rightDrawer" :width="350" side="right" bordered elevated overlay>
        <user-info-drawer/>
      </q-drawer>

      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import {urls} from "src/utils/constants";
import MainMenuPanel from "components/base/MainMenuPanel";
import {mapMutations} from "vuex";
import UserInfoDrawer from "components/base/UserInfoDrawer";

export default {
  name: "BaseLayout",
  components: {UserInfoDrawer, MainMenuPanel},
  data(){
    return{
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
  computed: {

    leftDrawer: {
      get() {
        return this.$store.state.baseLeftDrawer;
      },
      set(value) {
        this.setBaseLeftDrawer(value);
      }
    },
    rightDrawer: {
      get() {
        return this.$store.state.baseRightDrawer;
      },
      set(value) {
        this.setBaseRightDrawer(value);
      }
    },
    // language: {
    //   get() {
    //     if (!this.$i18n.locale) {
    //       if (this.$i18n.locale = this.$store.state.user) {
    //         this.$i18n.locale = this.$store.state.user.lang_code;
    //       } else {
    //         this.$i18n.locale = 'ru';
    //       }
    //     }
    //     return this.$store.getters.getLocaleByCode(this.$i18n.locale);
    //   },
    //   set(langObj) {
    //     this.$axios.post(urls.SET_LANG, 'lang=' + langObj.code, {headers: {'content-type': 'application/x-www-form-urlencoded'}})
    //       .then(response => {
    //         this.$i18n.locale = langObj.code;
    //         this.setUserLangCode(this.$i18n.locale);
    //         window.location.reload();
    //       })
    //       .catch(e => {
    //         this.showError(e);
    //       });
    //   }
    // },
    languages: function () {
      return this.$store.state.appLocales;
    },


  },
  methods: {
    ...mapMutations([
      'setBaseLeftDrawer',
      'setBaseRightDrawer',
      'resetState',
      'clearUser',
      'clearUserActions',
      'clearUserSession',
      'setUserLangCode'
    ]),

    logout() {
      this.confirmDialog(this.$t('captions.l_confirm'), this.$t('captions.l_you_really_exit'), () => {
            this.clearUserSession();
            this.$router.push('/login');
      });
    },
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
