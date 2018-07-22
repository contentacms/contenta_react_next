import React from 'react';
import Layout from '../components/04_templates/GlobalLayout';
import PromotedRecipes from '../components/02_moleculas/PromotedRecipes';
import MonthEdition from '../components/02_moleculas/MonthEdition';
import HomeWidgets from '../components/02_moleculas/HomeWidgets';
import RecipesList from '../components/02_moleculas/RecipiesList';
import request from '../utils/request';
import * as transforms from '../utils/transforms';

class HomePage extends React.Component {
  static async getInitialProps() {
    let initialProps = {
      promotedRecipes: [],
      latestRecipes: [],
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

    try {
      const response = await request
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
          'page[limit]': 3,
        });

      // Transform backend data into standardized frontend format.
      initialProps.promotedRecipes = response.body.data.map(recipe => transforms.recipe(recipe));
    } catch (e) {
      // TODO.
    }

    return initialProps;
  }

  render() {
    const { promotedRecipes, latestRecipes } = this.props;
    return (
      <Layout>
        <PromotedRecipes recipes={promotedRecipes} />
        <MonthEdition/>
        <HomeWidgets/>
        <RecipesList recipes={latestRecipes}/>
      </Layout>
    );
  }
}

export default HomePage;
