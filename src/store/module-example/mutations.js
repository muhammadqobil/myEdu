
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
