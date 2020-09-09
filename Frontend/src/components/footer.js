import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/css/footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <Container fluid className="dark d1" md="auto">
      <Row className="r1">
        <Col sm={2} className="dark d1">
          <a href="#how-information">How it Works</a>
        </Col>
        <Col sm={2} className="dark d1">
          <Link to="/">About Us</Link>
        </Col>
        <Col sm={2} className="dark d1">
          <Link to="/payment">Pricing</Link>
        </Col>
        <Col sm={2} className="dark d1">
          <Link to="/">Ads Categories</Link>
        </Col>
        <Col sm={2} className="dark d1">
          <Link to="/">Terms of Conditions</Link>
        </Col>
        <Col sm={2} className="dark d1">
          <Link to="/">Blog</Link>
        </Col>
      </Row>
      <Row className="r1">
        <Col>
          <p>Copyright &copy; Enlevin Solutions Pvt Ltd.</p>
        </Col>
        <Col>
          <a href="#" className="social">
            <FaFacebookF />
            </a>{" "}
          
          <a href="#" className="social">
            <FaTwitter />
            </a>{" "}
          
          <a href="#" className="social">
            <FaLinkedinIn />
            </a>{" "}
          
          <a href="#"  className="social">
            <FaEnvelope />
            </a>{" "}
          
        </Col>
      </Row>
    </Container>
  );
}
export default Footer;
