import initState from './state';

export function incrementAjaxRequestsCnt (state  , val) {
  state.ajaxRequestsCnt++;
}
export function decrementAjaxRequestsCnt(state , val){
  state.ajaxRequestsCnt--;
}
export function resetAjaxRequestsCnt(state){
  state.ajaxRequestsCnt = 0
}

export function setToken(state , val){
  state.token=val
}
export function setUser(state , val){
  state.user=val
}
export function clearUserSession(state){
  state.user = null;
  state.path = null;
}
export function setUserAals (state , val){
  state.userActions.splice(0 , state.userActions.length , ...val)
}

export function setGlobalError(state, val) {
  state.globalError = val;
}
export function setLoading(state , val){
  state.loading = val;
}
export function setPath(state, val){
  state.path = val
}
export function setCurrentRouteName(state , val){
  state.currentRouteName = val
}
export function setCurrentRouteCategoryName(state , val){
  state.currentRouteCategoryName = val
}
export function setBaseLeftDrawer(state, val) {
  state.baseLeftDrawer = val;
}

export function setBaseRightDrawer(state, val) {
  state.baseRightDrawer = val;
}

export function resetState(state) {
  Object.keys(initState).forEach(key => {
    state[key] = initState[key]
  });
}
export function clearUser(state) {
  state.user = null;
}
export function clearUserActions(state) {
  state.userActions.splice(0, state.userActions.length);

}
export function setUserLangCode(state, code) {
  if(!state.user){
    return;
  }
  state.user.lang_code = code;
}
