import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import CardAsLink from '../../01_atoms/Bootstrap/CardAsLink';

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
          <CardAsLink href={recipe.url}>
            <CardImg top width="100%" src={recipe.image} alt={recipe.title}/>
            <CardBody>
              {recipe.category.length > 0 &&
              <CardSubtitle>{recipe.category}</CardSubtitle>
              }
              <CardTitle>{recipe.title}</CardTitle>
            </CardBody>
          </CardAsLink>
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
    category: PropTypes.string,
  })).isRequired,
};

export default RecipesList;
