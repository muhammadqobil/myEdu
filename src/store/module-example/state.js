export default function () {
  return {
    appLocales: [
      {'name': 'Русский', 'code': 'ru'},
      {'name': 'Узбек', 'code': 'uk'},
      {'name': 'O`zbek', 'code': 'uz'}
    ],
    token:null,
    user:null,
    ajaxRequestsCnt: 0,
    userActions: [],
    globalError: undefined,
    path: '',
    loading: true
  }
}
