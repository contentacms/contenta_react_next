import * as recipeHelpers from '../helpers/recipe';

/**
 * Transforms data from the backend into something more
 * beautiful and readable on the frontend.
 */
export const recipe = data => ({
  id: data.id,
  title: data.title,
  url: recipeHelpers.url(data.id),
  totalTime: data.totalTime || 0,
  preparationTime: data.preparationTime || 0,
  image: data.image && data.image.thumbnail && data.image.thumbnail.url || '',
  category: data.category || {},
  difficulty: data.difficulty || '',
  serves: data.numberOfServes || 0,
  ingredients: data.ingredients || [],
  instructions: data.instructions || '',
  tags: data.tags || [],
});
