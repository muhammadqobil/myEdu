import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import Axios from "axios";

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'uz',
  fallbackLocale: 'uz',
  silentTranslationWarn:true,
  messages
})

export default ({ app, Vue }) => {
  // Set i18n instance on app
  app.i18n = i18n;
  //Vue.prototype.$i18n = i18n;
}

export { i18n }

