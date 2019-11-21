// Initializes the `upload` service on path `/upload`
const createModel = require('../../models/upload.model');
const hooks = require('./upload.hooks');
// const filters = require('./uploads.filters');

// feathers-blob service
const blobService = require('feathers-blob');
// Here we initialize a FileSystem storage,
// but you can use feathers-blob with any other
// storage service like AWS or Google Drive.
const fs = require('fs-blob-store');

const multer = require('multer');
const multipartMiddleware = multer();


// File storage location. Folder must be created before upload.
// Example: './uploads' will be located under feathers app top level.
const blobStorage = fs('./uploads');

module.exports = function (app) {

  const Model = createModel(app) //eslint-disable-line
  const paginate = app.get('paginate') //eslint-disable-line


  // Initialize our service with any options it requires
  app.use('/upload',
    // multer parses the file named 'uri'.
    // Without extra params the data is
    // temporarely kept in memory
    multipartMiddleware.single('uri'),

    // another middleware, this time to
    // transfer the received file to feathers
    function (req, res, next) {
      req.feathers.file = req.file;
      next();
    },
    blobService({ Model: blobStorage }));

  // Get our initialized service so that we can register hooks
  const service = app.service('upload');

  service.hooks(hooks);

  // if (service.filter) {
  //   service.filter(filters);
  // }
};
