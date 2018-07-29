import React from 'react';
import Layout from '../components/04_templates/GlobalLayout';
import RecipesList from '../components/02_moleculas/RecipiesList';
import MiniPager from '../components/01_atoms/Bootstrap/MiniPager';
import { Router } from '../routes';
import * as recipeApi from '../api/recipe';

const RECIPES_PER_PAGE = 12;

class RecipesPage extends React.Component {
  static async getInitialProps({ query }) {
    let initialProps = {
      recipes: [],
      hasNextPage: false,
      hasPrevPage: false,
    };

    try {
      const currentPage = query && query.page || 0;
      initialProps = await recipeApi.getAll(RECIPES_PER_PAGE, currentPage * RECIPES_PER_PAGE);
    } catch (e) {
      console.error(e);
      // TODO: Handle error properly.
    }

    // TODO: Handle case when recipes is empty and it's the first page.
    // TODO: Handle case when recipes is empty and it's not the first page.

    return initialProps;
  }

  render() {
    const { recipes, hasPrevPage, hasNextPage } = this.props;
    return (
      <Layout>
        <RecipesList
          recipes={recipes}
          cols={3}
        />
        <MiniPager
          prevPageAllowed={hasPrevPage}
          nextPageAllowed={hasNextPage}
        />
      </Layout>
    );
  }
}

export default RecipesPage;
