import Vue from "vue";
import {Cookies} from 'quasar'

const cookieWorker = {
  setUserLogin: function (userLogin) {
    Cookies.set("user_name", userLogin);
  },
  getUserLogin: function () {
    return Cookies.get("user_name");
  },
  isHasUserLogin: function () {
    return Cookies.has('user_name');
  },

  clearUserLogin: function () {
    Cookies.remove("user_name");
  },

};

Vue.prototype.$cookie = cookieWorker;
