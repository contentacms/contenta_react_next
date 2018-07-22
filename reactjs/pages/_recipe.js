import React from 'react';
import Layout from '../components/04_templates/GlobalLayout';
import request from '../utils/request';
import * as transforms from '../utils/transforms';

class RecipePage extends React.Component {
  static async getInitialProps({ query }) {
    let initialProps = {
      recipe: {}
    };

    // Get recipe's ID from the url.
    const recipeId = query.recipe || '';

    // TODO: Move to API & run in parallel.

    try {
      const response = await request
        .get(`/recipes/${recipeId}`)
        .query({
          'include': 'category,tags,image,image.thumbnail',
          'fields[recipes]': 'id,title,image,category,difficulty,ingredients,instructions,numberOfServices,tags,totalTime',
          'fields[categories]': 'name',
          'fields[images]': 'thumbnail',
          'fields[files]': 'url',
        });

      // Transform backend data into standardized frontend format.
      initialProps.recipe = transforms.recipe(response.body.data);
      console.log(response.body.data);
    } catch (e) {
      // TODO.
    }

    console.log(initialProps.recipe);

    return initialProps;
  }

  render() {
    const { recipe } = this.props;
    return (
      <Layout>

      </Layout>
    );
  }
}

export default RecipePage;
