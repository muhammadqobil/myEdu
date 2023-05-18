import Axios from 'axios'
import {cfghttp} from '../utils/constants'

const axios = Axios.create({
  baseURL: cfghttp.BASE_URL,
  timeout: cfghttp.BASE_TIMEOUT,
  withCredentials:true
})

export default ({app, router, store, Vue}) => {

  axios.interceptors.response.use(
    (response) => {
      store.commit("decrementAjaxRequestsCnt");
      return response;
    },
    (error) => {
      store.commit("decrementAjaxRequestsCnt");
      if (!error.response) {
        return Promise.reject({
          type: 'warning',
          errorCode: -200,
          errorDescription: "",
          errorMessage: app.i18n.t("http.base_error")
        });
      }
      if (!error.response.data) {
        return Promise.reject({
          type: 'warning',
          errorCode: -200,
          errorDescription: "",
          errorMessage: app.i18n.t("http.base_error")
        });
      }
      if (error.response.data.ERROR.status === 401) {
        store.commit('clearUserSession');
        router.push('/login');
        return Promise.reject({
          type: 'warning',
          errorCode: 401,
          errorDescription: "",
          errorMessage: app.i18n.t("http.session_timeout")
        });
      }
      if (error.response.data.ERROR.status === 403) {
        return Promise.reject({
          type: 'warning',
          errorCode: error.response.data.ERROR.code,
          errorDescription: error.response.data.ERROR.description,
          errorMessage: error.response.data.ERROR.message
        });
      }
      return Promise.reject({
        type: 'error',
        errorCode: error.response.data.ERROR.code,
        errorDescription: error.response.data.ERROR.description,
        errorMessage: error.response.data.ERROR.message
      });

    }
  );
  axios.interceptors.request.use(
    function (request) {

      if (store.state.user !== null) {
        request.headers.Authorization = `Bearer ${store.state.user.token}`;
      }
      // request.headers['Language'] = store.getters.getCurLocale;
      store.commit("incrementAjaxRequestsCnt");
      return request;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.prototype.sayhello=function(){
    console.log('---say hello');
  };
  Vue.prototype.$axios = axios;
}



