/**
 * Transforms data from the backend into something more
 * beautiful and readable on the frontend.
 */
export const recipe = data => ({
  id: data.id,
  title: data.title,
  totalTime: data.totalTime || 0,
  preparationTime: data.preparationTime || 0,
  image: data.image.thumbnail.url || '',
});
