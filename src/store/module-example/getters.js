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
