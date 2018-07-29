import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import * as recipeApi from '../api/recipe';

class RecipePage extends React.Component {
  static async getInitialProps({ query, res }) {
    let initialProps = {
      recipe: {},
      statusCode: 200,
    };

    // Get recipe's ID from the url.
    const recipeId = query.recipe || '';

    try {
      // Recipe data about currently opened recipe.
      const data = await recipeApi.get(recipeId);

      // Merge initially defined props with response from the backend.
      initialProps = { ...initialProps, ...data };
    }
    catch (e) {
      // Pass status code as internal properly. It is being checked inside of
      // render() method of _app.js.
      initialProps.statusCode = 500;

      // In case of Server Side Rendering, we want the server to throw the
      // correct error code.
      if (res) res.statusCode = 500;
    }

    return initialProps;
  }

  render() {
    const { recipe } = this.props;
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default RecipePage;
