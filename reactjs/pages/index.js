import React, { Fragment } from 'react';
import PromotedRecipes from '../components/02_moleculas/PromotedRecipes';
import MonthEdition from '../components/02_moleculas/MonthEdition';
import HomeWidgets from '../components/02_moleculas/HomeWidgets';
import RecipesList from '../components/02_moleculas/RecipiesList';
import * as recipeApi from '../api/recipe';

class HomePage extends React.Component {
  static async getInitialProps({ res }) {
    const initialProps = {
      promotedRecipes: [],
      latestRecipes: [],
      statusCode: 200,
    };

    // TODO: Run in parallel.

    try {
      // Load 3 latest promoted recipes.
      const data = await recipeApi.getPromoted(3);
      initialProps.promotedRecipes = data.recipes || [];
    }
    catch (e) {
      // Pass status code as internal properly. It is being checked inside of
      // render() method of _app.js.
      initialProps.statusCode = 500;

      // In case of Server Side rendering we want the server to throw the
      // correct error code.
      if (res) res.statusCode = 500;
    }

    try {
      // Load 4 latest recipe without any filters.
      const data = await recipeApi.getAll(4);
      initialProps.latestRecipes = data.recipes || [];
    }
    catch (e) {
      // Pass status code as internal properly. It is being checked inside of
      // render() method of _app.js.
      initialProps.statusCode = 500;

      // In case of Server Side rendering we want the server to throw the
      // correct error code.
      if (res) res.statusCode = 500;
    }

    return initialProps;
  }

  render() {
    const { promotedRecipes, latestRecipes } = this.props;
    return (
      <Fragment>
        <PromotedRecipes recipes={promotedRecipes} />
        <MonthEdition />
        <HomeWidgets />
        <RecipesList recipes={latestRecipes} />
      </Fragment>
    );
  }
}

export default HomePage;
