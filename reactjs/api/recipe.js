import request from '../utils/request';
import * as transforms from '../utils/transforms';

/**
 * Returns all recipes on the backend.
 *
 * @param pageLimit
 *   Recipes per page.
 *
 * @param pageOffset
 *   Amount of recipes to skip from the beginning (for pagination).
 *
 * @returns {Promise<any>}
 */
export const getAll = (pageLimit = 24, pageOffset = 0) =>
  new Promise((resolve, reject) => {
    request
      .get('/recipes')
      .query({
        'include': 'image,image.thumbnail',
        'fields[recipes]': 'id,title,image',
        'fields[categories]': 'name',
        'fields[images]': 'thumbnail',
        'fields[files]': 'url',
        'sort': '-created',
        'page[limit]': pageLimit,
        'page[offset]': pageOffset,
      })
      .then(response => {
        resolve({
          recipes: response.body.data.map(recipe => transforms.recipe(recipe)),
          hasNextPage: !!response.body.links.next,
          hasPrevPage: !!response.body.links.prev,
        });
      })
      .catch(error => {
        console.error('Could not fetch current user.', error);
        reject(error);
      });
  });
