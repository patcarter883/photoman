import feathersClient, { makeServicePlugin, BaseModel } from '../feathers-client'

class Client extends BaseModel {
  constructor(data, options) { //eslint-disable-line
    super(data, options)
  }
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Client'
  // Define default properties here
  static instanceDefaults () {
    return {
      name: ''
    }
  }
}
const servicePath = 'clients'
const servicePlugin = makeServicePlugin({
  Model: Client,
  service: feathersClient.service(servicePath),
  servicePath
})

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
})

export default servicePlugin
