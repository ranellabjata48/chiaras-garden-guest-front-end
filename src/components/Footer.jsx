import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";

function Footer() {
  return (
    <Container fluid className="footer-container">
      <Row>
        <Col>
          <p>
            &copy; {moment().format("YYYY")} Copyright: by{" "}
            <span className="footer-dev-name">Team IT</span>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
