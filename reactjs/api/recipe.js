import request from '../utils/request';
import * as transforms from '../utils/transforms';

/**
 * Returns single recipes from the backend by uuid.
 *
 * @param id
 *   Drupal UUID of the recipe.
 *
 * @returns {Promise<any>}
 */
export const get = id => new Promise((resolve, reject) => {
  request
    .get(`/recipes/${id}`)
    .query({
      'include': 'category,tags,image,image.thumbnail',
      'fields[recipes]': 'id,title,image,category,difficulty,ingredients,instructions,numberOfServices,tags,totalTime',
      'fields[categories]': 'id,name',
      'fields[tags]': 'id,name',
      'fields[images]': 'thumbnail',
      'fields[files]': 'url',
    })
  // Tell superagent to consider any valid Drupal response as successful.
  // Later we can capture error codes if needed.
    .ok(resp => resp.statusCode)
    .then((response) => {
      resolve({
        recipe: response.statusCode === 200 ? transforms.recipe(response.body.data) : {},
        statusCode: response.statusCode,
      });
    })
    .catch((error) => {
      console.error('Could not fetch the recipe.', error);
      reject(error);
    });
});

/**
 * Returns all recipes from the backend.
 *
 * @param pageLimit
 *   Recipes per page.
 *
 * @param pageOffset
 *   Amount of recipes to skip from the beginning (for pagination).
 *
 * @returns {Promise<any>}
 */
export const getAll = (pageLimit = 24, pageOffset = 0) => new Promise((resolve, reject) => {
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
  // Tell superagent to consider any valid Drupal response as successful.
  // Later we can capture error codes if needed.
    .ok(resp => resp.statusCode)
    .then((response) => {
      resolve({
        recipes: response.statusCode === 200 ? response.body.data.map(recipe => transforms.recipe(recipe)) : [],
        hasNextPage: !!response.body.links.next,
        hasPrevPage: !!response.body.links.prev,
        statusCode: response.statusCode,
      });
    })
    .catch((error) => {
      console.error('Could not fetch list of recipes.', error);
      reject(error);
    });
});

/**
 * Returns promoted recipes from the backend.
 *
 * @param pageLimit
 *   Recipes per page.
 *
 * @param pageOffset
 *   Amount of recipes to skip from the beginning (for pagination).
 *
 * @returns {Promise<any>}
 */
export const getPromoted = (pageLimit = 4, pageOffset = 0) => new Promise((resolve, reject) => {
  request
    .get('/recipes')
    .query({
      'include': 'category,image,image.thumbnail',
      'fields[recipes]': 'id,category,title,image',
      'fields[categories]': 'name',
      'fields[images]': 'thumbnail',
      'fields[files]': 'url',
      'filter[isPromoted][value]': 1,
      'filter[isPublished][value]': 1,
      'sort': '-created',
      'page[limit]': pageLimit,
      'page[offset]': pageOffset,
    })
  // Tell superagent to consider any valid Drupal response as successful.
  // Later we can capture error codes if needed.
    .ok(resp => resp.statusCode)
    .then((response) => {
      resolve({
        recipes: response.statusCode === 200 ? response.body.data.map(recipe => transforms.recipe(recipe)) : [],
        hasNextPage: !!response.body.links.next,
        hasPrevPage: !!response.body.links.prev,
        statusCode: response.statusCode,
      });
    })
    .catch((error) => {
      console.error('Could not fetch promoted recipes.', error);
      reject(error);
    });
});
