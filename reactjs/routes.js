const routes = module.exports = require('next-routes')(); // eslint-disable-line no-multi-assign

// @see https://github.com/fridays/next-routes
// Additional dynamic routes.
routes
  .add('_recipe', '/recipe/:recipe');
