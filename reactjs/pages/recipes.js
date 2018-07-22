import React from 'react';
import Layout from '../components/04_templates/GlobalLayout';
import request from '../utils/request';
import * as transforms from '../utils/transforms';

class RecipesPage extends React.Component {
  static async getInitialProps() {
    let initialProps = {

    };

    // TODO: Move to API & run in parallel.

    try {
      const response = await request
        .get('/recipes')
        .query({
          'include': 'image,image.thumbnail',
          'fields[recipes]': 'id,title,image,category',
          'fields[categories]': 'name',
          'fields[images]': 'thumbnail',
          'fields[files]': 'url',
          'sort': '-created',
          'page[limit]': 4,
        });

      // Transform backend data into standardized frontend format.
      initialProps.latestRecipes = response.body.data.map(recipe => transforms.recipe(recipe));
    } catch (e) {
      // TODO.
    }

    return initialProps;
  }

  render() {
    const {  } = this.props;
    return (
      <Layout>

      </Layout>
    );
  }
}

export default RecipesPage;
