import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const GlobalFooter = () => (
  <footer>
    <Container>
      <Row>
        <Col md={6}>
          <strong>Umami magazine & Umami publications</strong> is a fictional
          magazine and publisher for illustrative purposes only.
        </Col>
        <Col md={3}/>
        <Col md={3}>
          © 2018 Terms & Conditions
        </Col>
      </Row>
    </Container>
  </footer>
);

export default GlobalFooter;
