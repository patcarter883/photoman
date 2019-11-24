// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// Application hooks that run for every service
const { setField } = require('feathers-authentication-hooks');
const checkPermissions = require('feathers-permissions');
const { iff } = require('feathers-hooks-common');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    checkPermissions({
      roles: ['superadmin'],
      error: false
    }),
    iff(context => !context.params.permitted,
      setField({
        from: 'params.user.clientId',
        as: 'params.query.clientId'
      })
    );
    return context;
  };
};
