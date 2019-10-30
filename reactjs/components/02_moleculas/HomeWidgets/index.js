import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from '../../../routes';

const HomeWidgets = () => (
  <Container>
    <Row>

      <Col md={3} xs={6}>
        <h4>Dinners to impress</h4>
        <Link to="/recipes"><a>List recipes</a></Link>
      </Col>

      <Col md={3} xs={6}>
        <h4>Learn to cook</h4>
        <Link to="/recipes"><a>Recipes for beginners</a></Link>
      </Col>

      <Col md={3} xs={6}>
        <h4>Baked up</h4>
        <Link to="/recipes"><a>Delicious cake and bakes</a></Link>
      </Col>

      <Col md={3} xs={6}>
        <h4>Quick and easy</h4>
        <Link to="/recipes"><a>20 minutes or less</a></Link>
      </Col>

    </Row>
  </Container>
);

export default HomeWidgets;
