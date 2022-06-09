import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Footer: React.FC = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="py-3">
            <ul className="footer-menu-list">
              <li>Shop Online</li>

              <LinkContainer to="/products/category/bracelets">
                <li>Bracelets</li>
              </LinkContainer>
              <LinkContainer to="/products/category/earings">
                <li>Earings</li>
              </LinkContainer>
              <LinkContainer to="/products/category/necklaces">
                <li>Necklaces</li>
              </LinkContainer>
              <LinkContainer to="/products/category/rings">
                <li>Rings</li>
              </LinkContainer>
            </ul>
          </Col>

          <Col className="py-3">
            <ul className="footer-menu-list">
              <li>Support</li>
              <li>FAQ</li>
              <li>Shiping & Return</li>
              <li>Care & Repair</li>
              <li>Policy</li>
            </ul>
          </Col>

          <Col className="py-3">
            <ul className="footer-menu-list">
              <li>Contact</li>
              <li>Email Us</li>
              <li className="footer-menu-icon">
                <img
                  src="https://img.icons8.com/material-rounded/30/undefined/facebook.png"
                  alt="fb-icon"
                />
                <img
                  src="https://img.icons8.com/ios-glyphs/30/undefined/instagram-new.png"
                  alt="insta-icon"
                />
                <img
                  src="https://img.icons8.com/ios-filled/30/undefined/twitter-squared.png"
                  alt="twitter-icon"
                />
              </li>
            </ul>
          </Col>

          <Col className="py-3">
            <p className="footer-cta">
              Join our community. Sign up for 10% OFF your first order. Plus,
              gain exclusive early access to sales, collections and more.
            </p>
            <div>
              <input
                className="footer-cta-form"
                type="text"
                placeholder="Enter your email address"
                id="inputSmall"
              />
              <img
                src="https://img.icons8.com/serif/32/undefined/experimental-right-serif.png"
                alt="right-arrow"
                className="footer-arrow-icon"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3 separator-top">
            &copy; Solmate. All rights reserved. Built by Ha Quang 2022.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
