// import something here
import store from 'app/src/store/index'
import Vue from 'vue'

const hasRoles = function (roles) {
  return roles.some(r => store.state.auth.user.permissions.includes(r))
}

Vue.prototype.$hasRoles = hasRoles
