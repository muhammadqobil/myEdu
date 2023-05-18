import {date} from 'quasar'
const _f = date.formatDate;
// "async" is optional
export default async ({ app, router, Vue }) => {
  date.formatDate = function(xdate,pattern){
    if (!xdate)
      return '';
    return _f(xdate,pattern);
  }
  Vue.prototype.$dateutil=date;
}
