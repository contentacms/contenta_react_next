import React from 'react';
import Layout from '../components/04_templates/GlobalLayout';
import request from '../utils/request';
import * as transforms from '../utils/transforms';

class Page extends React.Component {
  static async getInitialProps() {
    let initialProps = {
      promotedRecipes: [],
    };

    /* response = await request
      .get('/recipes')
      .query({
        'sort': '-created',
        'page[limit]': 4,
        'include': 'image,image.thumbnail',
        'fields[recipes]': 'title,difficulty,image',
        'fields[images]': 'name,thumbnail',
        'fields[files]': 'filename,url'
      }); */


    try {
      const response = await request
        .get('/recipes')
        .query({
          'include': 'image,image.thumbnail',
          'fields[recipes]': 'id,title,image',
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
    // console.log(this.props.promotedRecipes);
    return (
      <Layout />);
  }
}

export default Page;
