import React from 'react';
import { Container, Row, Col } from 'reactstrap';
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
          'fields[categories]': 'id,name',
          'fields[tags]': 'id,name',
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
        <Container>

          <Row>
            <Col md={8}>
              <h1>{recipe.title}</h1>
            </Col>

            <Col md={4}>
              <div>{recipe.category.name}</div>
              <div>
                {recipe.tags.map((tag, index) => (
                  <span key={tag.id}>
                    {tag.name}{index === recipe.tags.length - 1 ? '' : ', '}
                  </span>
                ))}
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <img src={recipe.image} alt={recipe.title} width="100%" />
            </Col>

            <Col md={6}>
              <Row>
                <Col md={6}>{recipe.preparationTime}</Col>
                <Col md={6}>{recipe.totalTime}</Col>
                <Col md={6}>{recipe.difficulty}</Col>
                <Col md={6}>{recipe.serves}</Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col>
              <h2>What you'll need to make a dish</h2>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </Col>
            <Col md={6}>{recipe.instructions}</Col>
          </Row>

          </Container>
      </Layout>
    );
  }
}

export default RecipePage;
