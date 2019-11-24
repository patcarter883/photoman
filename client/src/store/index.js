import Vue from 'vue'
import Vuex from 'vuex'
import { FeathersVuex } from './feathers-client'
import auth from './store.auth'

// import example from './module-example'

Vue.use(Vuex)
Vue.use(FeathersVuex)

const requireModule = require.context(
  // The path where the service modules live
  './services',
  // Whether to look in subfolders
  false,
  // Only include .js files (prevents duplicate imports`)
  /.js$/
)
const servicePlugins = requireModule
  .keys()
  .map(modulePath => requireModule(modulePath).default)

const Store = new Vuex.Store({
  modules: {
    // example
  },
  plugins: [...servicePlugins, auth],
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})

export default Store
