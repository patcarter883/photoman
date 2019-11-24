const { authenticate } = require('@feathersjs/authentication').hooks;
const dauria = require('dauria');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      function (context) {
        if (!context.data.uri && context.params.file) {
          const file = context.params.file;
          const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
          context.data = { ...context.data, uri: uri };
        }
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      async function (context) {
        const imageService = context.app.service('images');
        const newImage = await imageService._create({
          blobId: context.result.id,
          name: context.params.file.originalname,
          galleryId: context.data.galleryId
        });
        context.result = newImage; //eslint-disable-line
      }
    ],
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
