import React, { Fragment } from 'react';
import RecipesList from '../components/02_moleculas/RecipiesList';
import MiniPager from '../components/01_atoms/Bootstrap/MiniPager';
import NoResultsMessage from '../components/01_atoms/NoResultsMessage';
import { Router } from '../routes';
import * as recipeApi from '../api/recipe';

/**
 * Amount of recipes to display per page.
 */
const RECIPES_PER_PAGE = 12;

class RecipesPage extends React.Component {
  static async getInitialProps({ res, query }) {
    let initialProps = {
      recipes: [],
      hasNextPage: false,
      hasPrevPage: false,
      statusCode: 200,
    };

    // Get the current page from /recipes?page=[num] query. If "?page" is
    // missing, then defaults to the first page.
    const currentPage = query && query.page ? parseInt(query.page, 10) : 0;

    try {
      // Get list of recipes from Drupal backend.
      const data = await recipeApi.getAll(RECIPES_PER_PAGE, currentPage * RECIPES_PER_PAGE);

      // Merge initial props values with data returned from the backend.
      initialProps = { ...initialProps, ...data };
    }
    catch (e) {
      // Pass status code as internal properly. It is being checked inside of
      // render() method of _app.js.
      initialProps.statusCode = 500;

      // In case of Server Side rendering we want the server to throw the
      // correct error code.
      if (res) res.statusCode = 500;
    }

    // If certain page does not contain recipes, we throw "Page not found"
    // header. It's needed for the right SEO.
    if (!initialProps.recipes.length && currentPage > 0) {
      // Pass status code as internal properly. It is being checked inside of
      // render() method of _app.js.
      initialProps.statusCode = 404;

      // In case of Server Side rendering we want the server to throw the
      // correct error code.
      if (res) res.statusCode = 404;
    }

    return initialProps;
  }

  render() {
    const { recipes, hasPrevPage, hasNextPage } = this.props;
    return (
      <Fragment>
        {recipes.length > 0 &&
        <Fragment>
          <RecipesList
            recipes={recipes}
            cols={3}
          />
          <MiniPager
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
          />
        </Fragment>
        }

        {!recipes.length &&
        <NoResultsMessage message="There are no recipes." />
        }
      </Fragment>
    );
  }
}

export default RecipesPage;
