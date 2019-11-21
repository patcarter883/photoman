const users = require('./users/users.service.js');
const images = require('./images/images.service.js');
const orders = require('./orders/orders.service.js');
const galleries = require('./galleries/galleries.service.js');
const upload = require('./upload/upload.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(images);
  app.configure(orders);
  app.configure(galleries);
  app.configure(upload);
};
