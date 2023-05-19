import * as modulesCategories from '../../router/categories'
export function getUser (state) {
  alert(state.user)
  return state.user
}
export function getToken (state) {
  return state.token
}
export function isHaveError(state){
  return !!state.globalError && state.globalError.type != 'warning';
}

export function getGlobalError(state) {
  return state.globalError;
}
export function getPath(state){
  return state.path;
}
export function getLoading (state){
  return state.loading;
}
export function getCurrentRouteName(state) {
  return state.currentRouteName;
}

export function getCurrentRouteCategoryName(state) {
  return state.currentRouteCategoryName;
}

export function getUserCategories(state) {
  const modulesCategoriesArr = Object.keys(modulesCategories).map(key => {
    let deepCloneMC = JSON.parse(JSON.stringify(modulesCategories[key]));
    return deepCloneMC;
  });
  return modulesCategoriesArr
}
