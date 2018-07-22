import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle } from 'reactstrap';

const RecipesList = ({ recipes }) => (
  <Container>

    <Row>
      <Col>
        <h1>Recipes</h1>
        <h3>Explore recipes across every type of occasion, ingredient and skill level</h3>
      </Col>
    </Row>

    <Row>
      {recipes.map(recipe => (
        <Col md={6} key={recipe.id}>
          <Card>
            <CardImg top width="100%" src={recipe.image} alt={recipe.title}/>
            <CardBody>
              <CardTitle>{recipe.title}</CardTitle>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>

  </Container>
);

RecipesList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
};

export default RecipesList;
