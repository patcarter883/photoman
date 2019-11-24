const { authenticate } = require('@feathersjs/authentication').hooks;

const tenantFilter = require('../../hooks/tenant_filter');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [tenantFilter()],
    get: [tenantFilter()],
    create: [tenantFilter()],
    update: [],
    patch: [],
    remove: [tenantFilter()]
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
};
