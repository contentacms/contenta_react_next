import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle } from 'reactstrap';

const PromotedRecipes = ({ recipes }) => (
  <Container>
    <Row>
      {recipes.map((recipe, index) => (
        <Col md={!index ? 6 : 3} key={recipe.id}>
          <Card>
            <CardImg top width="100%" src={recipe.image} alt={recipe.title} className={!index ? 'd-block d-md-none' : ''}/>
            <CardBody>
              <CardTitle>{recipe.title}</CardTitle>
            </CardBody>
            {index === 0 &&
            <CardImg bottom width="100%" src={recipe.image} alt={recipe.title} className="d-none d-md-block"/>
            }
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

PromotedRecipes.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
};

export default PromotedRecipes;
