const routes = module.exports = require('next-routes')(); // eslint-disable-line no-multi-assign

// @see https://github.com/fridays/next-routes
// Additional dynamic routes.
routes
  // Single recipe path pattern.
  .add('_recipe', '/recipes/:recipe');
