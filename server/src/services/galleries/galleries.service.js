// Initializes the `galleries` service on path `/galleries`
const { Galleries } = require('./galleries.class');
const createModel = require('../../models/galleries.model');
const hooks = require('./galleries.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/galleries', new Galleries(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('galleries');

  service.hooks(hooks);
};
