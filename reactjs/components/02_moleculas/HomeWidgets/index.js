import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from '../../../routes';

const HomeWidgets = () => (
  <Container>
    <Row>

      <Col md={3} xs={6}>
        <h4>Dinners to impress</h4>
        <Link to="/recipes">List recipes</Link>
      </Col>

      <Col md={3} xs={6}>
        <h4>Learn to cook</h4>
        <Link to="/recipes">Recipes for beginners</Link>
      </Col>

      <Col md={3} xs={6}>
        <h4>Baked up</h4>
        <Link to="/recipes">Delicious cake and bakes</Link>
      </Col>

      <Col md={3} xs={6}>
        <h4>Quick and easy</h4>
        <Link to="/recipes">20 minutes or less</Link>
      </Col>

    </Row>
  </Container>
);

export default HomeWidgets;
