import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userAction";

const LogInPage = () => {
  const [name, setName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const registerHandler = (e) => {
    e.preventDefault();
    if (registerPassword === !confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      // dispatch(login(email, password));
    }
  };

  return (
    <Container>
      <Row className="login">
        <Col md={5}>
          <FormContainer>
            <h1 className="login-title">Login</h1>
            <p className="login-description">
              Welcome back! Log into your account to continue.
            </p>
            {loading && <Loader />}
            {message && <Message variant="danger">{message}</Message>}
            {!loading && error && <Message variant="danger">{error}</Message>}
            <Form onSubmit={loginHandler}>
              <Form.Group controlId="email">
                <input
                  className="login-input"
                  type="email"
                  placeholder="Email Address"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                ></input>
              </Form.Group>

              <Form.Group controlId="password">
                <input
                  className="login-input lastchild"
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                ></input>
              </Form.Group>

              <button className="btn-block" type="submit">
                Log In
              </button>
            </Form>
          </FormContainer>
        </Col>

        <Col md={5} className="separator-left">
          <FormContainer>
            <h1 className="login-title">Register</h1>
            <p className="login-description">
              Are you new Solmate? We are happy to have you.
            </p>
            <Form onSubmit={registerHandler}>
              <Form.Group controlId="email">
                <input
                  className="login-input"
                  type="fullname"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </Form.Group>

              <Form.Group controlId="email">
                <input
                  className="login-input"
                  type="email"
                  placeholder="Email Address"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                ></input>
              </Form.Group>

              <Form.Group controlId="password">
                <input
                  className="login-input"
                  type="password"
                  placeholder="Password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                ></input>
              </Form.Group>

              <Form.Group controlId="passwordConfirm">
                <input
                  className="login-input lastchild"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
              </Form.Group>

              <button className="btn-block" type="submit">
                Create Account
              </button>
            </Form>
          </FormContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default LogInPage;
