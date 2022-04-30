import React, { useReducer, useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import {
  postGuestAuth,
  postGuestCreateNewAccountAuth,
} from "../services/authServices";

const formInitialState = {
  firstName: "",
  lastName: "",
  contactNo: "",
  address: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "getFormData":
      return { ...state, [action.payload.name]: action.payload.value };
    case "clearFormData":
      return {
        ...state,
        firstName: "",
        lastName: "",
        contactNo: "",
        address: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
    case "clearLoginForm":
      return {
        ...state,
        email: "",
        password: "",
      };
    default: {
      return formInitialState;
    }
  }
};

function Login() {
  const [form, setForm] = useReducer(formReducer, formInitialState);
  const [error, setError] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: form.email,
      password: form.password,
    };

    try {
      setError({});

      const { data: token } = await postGuestAuth(formData);
      localStorage.setItem("token", token);

      const newAddedToken = localStorage.getItem("token");
      const decoded = jwt_decode(newAddedToken);

      toast.success(`Welcome ${decoded.firstName} ${decoded.lastName}`, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
      });

      window.location = "/";
    } catch (err) {
      setError((prevState) => {
        return {
          ...prevState,
          [err.response.data.path[0]]: err.response.data.message,
        };
      });
    }
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    const formData = {
      firstName: form.firstName,
      lastName: form.lastName,
      contactNo: form.contactNo,
      address: form.address,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
    };

    try {
      setError({});

      const { data: token } = await postGuestCreateNewAccountAuth(formData);
      localStorage.setItem("token", token);

      const newAddedToken = localStorage.getItem("token");
      const decoded = jwt_decode(newAddedToken);

      setForm({ type: "clearFormData" });

      toast.success(`Welcome ${decoded.firstName} ${decoded.lastName}`, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
      });

      window.location = "/";
    } catch (err) {
      setError((prevState) => {
        return {
          ...prevState,
          [err.response.data.path[0]]: err.response.data.message,
        };
      });
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center login">
        <Row>
          <Col>
            <div className="login-col">
              <div className="d-flex justify-content-center mb-3">
                <span>Welcome to Chiaras Garden</span>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={form.email}
                    name="email"
                    onChange={(e) =>
                      setForm({
                        type: "getFormData",
                        payload: { name: e.target.name, value: e.target.value },
                      })
                    }
                  />
                  <Form.Text className="text-muted">
                    <span className="text-danger">{error.email}</span>
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    name="password"
                    onChange={(e) =>
                      setForm({
                        type: "getFormData",
                        payload: { name: e.target.name, value: e.target.value },
                      })
                    }
                  />
                  <Form.Text className="text-muted">
                    <span className="text-danger">{error.password}</span>
                  </Form.Text>
                </Form.Group>
                <div>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xlg={12}>
                      <Button variant="primary" type="submit" className="w-100">
                        Log In
                      </Button>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xlg={12}>
                      <hr />
                    </Col>
                    <Col
                      className="d-flex justify-content-center"
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xlg={12}
                    >
                      <Button
                        variant="success"
                        onClick={() => {
                          setForm({ type: "clearLoginForm" });
                          setError({});
                          handleShow();
                        }}
                        className="w-70"
                      >
                        Create new account
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      {
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmitSignUp}>
              <Form.Group className="mb-3">
                <Row className="g-2">
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="First name"
                      name="firstName"
                      value={form.firstName ? form.firstName : ""}
                      onChange={(e) =>
                        setForm({
                          type: "getFormData",
                          payload: {
                            name: e.target.name,
                            value: e.target.value,
                          },
                        })
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Last name"
                      name="lastName"
                      value={form.lastName ? form.lastName : ""}
                      onChange={(e) =>
                        setForm({
                          type: "getFormData",
                          payload: {
                            name: e.target.name,
                            value: e.target.value,
                          },
                        })
                      }
                    />
                  </Col>
                </Row>
                <Form.Text className="text-muted">
                  <span className="text-danger">
                    {error.firstName} {error.lastName}
                  </span>
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicContact">
                <Form.Control
                  type="number"
                  placeholder="Contact number"
                  name="contactNo"
                  value={form.contactNo ? form.contactNo : ""}
                  onChange={(e) =>
                    setForm({
                      type: "getFormData",
                      payload: {
                        name: e.target.name,
                        value: e.target.value,
                      },
                    })
                  }
                />
                <Form.Text className="text-muted">
                  <span className="text-danger">{error.contactNo}</span>
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Control
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={form.address ? form.address : ""}
                  onChange={(e) =>
                    setForm({
                      type: "getFormData",
                      payload: {
                        name: e.target.name,
                        value: e.target.value,
                      },
                    })
                  }
                />
                <Form.Text className="text-muted">
                  <span className="text-danger">{error.address}</span>
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={form.email ? form.email : ""}
                  onChange={(e) =>
                    setForm({
                      type: "getFormData",
                      payload: {
                        name: e.target.name,
                        value: e.target.value,
                      },
                    })
                  }
                />
                <Form.Text className="text-muted">
                  <span className="text-danger">{error.email}</span>
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={form.password ? form.password : ""}
                  onChange={(e) =>
                    setForm({
                      type: "getFormData",
                      payload: {
                        name: e.target.name,
                        value: e.target.value,
                      },
                    })
                  }
                />
                <Form.Text className="text-muted">
                  <span className="text-danger">{error.password}</span>
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicConPassword">
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={form.confirmPassword ? form.confirmPassword : ""}
                  onChange={(e) =>
                    setForm({
                      type: "getFormData",
                      payload: {
                        name: e.target.name,
                        value: e.target.value,
                      },
                    })
                  }
                />
                <Form.Text className="text-muted">
                  <span className="text-danger">{error.confirmPassword}</span>
                </Form.Text>
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button
                  variant="success"
                  type="submit"
                  className="create-account-btn"
                >
                  Sign Up
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      }
    </>
  );
}

export default Login;
