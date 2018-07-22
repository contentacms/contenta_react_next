import React from 'react';
import PropTypes from 'prop-types';
import CardAsLink from '../../01_atoms/Bootstrap/CardAsLink';
import { Container, Row, Col, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Link } from '../../../routes';

const PromotedRecipes = ({ recipes }) => (
  <Container>
    <Row>
      {recipes.map((recipe, index) => (
        <Col md={!index ? 6 : 3} key={recipe.id}>
          <CardAsLink href={recipe.url}>
            <CardImg top width="100%" src={recipe.image} alt={recipe.title}
                     className={!index ? 'd-block d-md-none' : ''}/>
            <CardBody>
              {recipe.category.length > 0 &&
              <CardSubtitle>{recipe.category}</CardSubtitle>
              }
              <CardTitle>{recipe.title}</CardTitle>
            </CardBody>
            {index === 0 &&
            <CardImg bottom width="100%" src={recipe.image} alt={recipe.title}
                     className="d-none d-md-block"/>
            }
          </CardAsLink>
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
    category: PropTypes.string,
  })).isRequired,
};

export default PromotedRecipes;
