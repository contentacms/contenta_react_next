import React from 'react';
import Layout from '../components/04_templates/GlobalLayout';
import RecipesList from '../components/02_moleculas/RecipiesList';
import MiniPager from '../components/01_atoms/Bootstrap/MiniPager';
import request from '../utils/request';
import * as transforms from '../utils/transforms';

class RecipesPage extends React.Component {
  static async getInitialProps() {
    let initialProps = {
      recipes: [],
    };

    // TODO: Move to API & run in parallel.

    try {
      const response = await request
        .get('/recipes')
        .query({
          'include': 'image,image.thumbnail',
          'fields[recipes]': 'id,title,image',
          'fields[categories]': 'name',
          'fields[images]': 'thumbnail',
          'fields[files]': 'url',
          'sort': '-created',
          'page[limit]': 24,
        });

      // Transform backend data into standardized frontend format.
      initialProps.recipes = response.body.data.map(recipe => transforms.recipe(recipe));
    } catch (e) {
      // TODO.
    }

    return initialProps;
  }

  handleNextPageClick() {

  }

  handlePreviousPageClick() {

  }

  constructor(props) {
    super(props);

    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
  }

  render() {
    const { recipes } = this.props;
    return (
      <Layout>
        <RecipesList recipes={recipes} cols={3} />
        <MiniPager
          prevPageClick={this.handlePreviousPageClick}
          nextPageClick={this.handleNextPageClick}
        />
      </Layout>
    );
  }
}

export default RecipesPage;
