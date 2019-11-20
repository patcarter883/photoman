import feathersClient, { makeServicePlugin, BaseModel } from '../feathers-client'

class Image extends BaseModel {
  constructor(data, options) { //eslint-disable-line
    super(data, options)
  }
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Image'
  // Define default properties here
  static instanceDefaults () {
    return {
    }
  }
}
const servicePath = 'images'
const servicePlugin = makeServicePlugin({
  Model: Image,
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
