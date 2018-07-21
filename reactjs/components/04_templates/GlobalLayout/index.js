import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import GlobalHeader from '../../03_organisms/GlobalHeader';
import GlobalFooter from '../../03_organisms/GlobalFooter';

const GlobalLayout = ({ children }) => (
  <Fragment>
    <GlobalHeader />

    <div className="content">
      <Container>
        <Row>
          <Col>
            {children}
          </Col>
        </Row>
      </Container>
    </div>

    <GlobalFooter />
  </Fragment>
);

export default GlobalLayout;
