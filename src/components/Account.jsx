import React, { useState, useReducer, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import {
  getGuest,
  updateUserAccount,
  updateUserPassword,
} from "../services/userAccountServices";

const formInitialState = {
  id: undefined,
  firstName: "",
  lastName: "",
  email: "",
  contactNo: undefined,
  address: "",
  password: "",
  currentPass: "",
  newPass: "",
  confirmPass: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "getFormInitialData":
      return {
        ...state,
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        contactNo: action.payload.contactNo,
        address: action.payload.address,
      };
    case "getFormUpdateData":
      return {
        ...state,
        firstName: action.payload.gst_firstname,
        lastName: action.payload.gst_lastname,
        email: action.payload.gst_email,
        contactNo: action.payload.gst_contact_no,
        address: action.payload.gst_address,
      };
    case "getFormData":
      return { ...state, [action.payload.name]: action.payload.value };
    case "clearChangePassForm":
      return { ...state, currentPass: "", newPass: "", confirmPass: "" };
    default:
      return formInitialState;
  }
};

function Account() {
  const [editSave, setEditSave] = useState(true);

  const [form, setForm] = useReducer(formReducer, formInitialState);

  const [error, setError] = useState({});

  const [showChangePass, setShowChangePass] = useState(false);

  const handleClose = () => {
    setShowChangePass(false);
    setForm({ type: "clearChangePassForm" });
  };
  const handleShow = () => setShowChangePass(true);

  useEffect(() => {
    let isMounted = true;

    async function getGuestData() {
      if (isMounted) {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);

        const { data } = await getGuest(decoded.id);
        setForm({
          type: "getFormInitialData",
          payload: {
            id: data.gst_id,
            firstName: data.gst_firstname,
            lastName: data.gst_lastname,
            email: data.gst_email,
            contactNo: data.gst_contact_no,
            address: data.gst_address,
          },
        });
      }
    }

    getGuestData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = form.id;

    const formData = {
      gst_firstname: form.firstName,
      gst_lastname: form.lastName,
      gst_contact_no: form.contactNo,
      gst_address: form.address,
    };

    setError({});

    try {
      const { data } = await updateUserAccount(id, formData);
      setForm({
        type: "getFormUpdateData",
        payload: {
          gst_firstname: data.gst_firstname,
          gst_lastname: data.gst_lastname,
          gst_email: data.gst_email,
          gst_contact_no: data.gst_contact_no,
          gst_address: data.gst_address,
        },
      });

      toast.success("Saved.", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
      });

      setEditSave(true);
    } catch (err) {
      setError((prevState) => {
        return {
          ...prevState,
          [err.response.data.path[0]]: err.response.data.message,
        };
      });
    }
  };

  const handleChangePass = async () => {
    const id = form.id;

    const formData = {
      currentPass: form.currentPass,
      newPass: form.newPass,
      confirmPass: form.confirmPass,
    };
    setError({});

    try {
      await updateUserPassword(id, formData);

      toast.success("Successfully change.", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
      });

      setForm({ type: "clearChangePassForm" });
      handleClose();
    } catch (err) {
      setError((prevState) => {
        return {
          ...prevState,
          [err.response.data.path[0]]: err.response.data.message,
        };
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };

  return (
    <>
      <Container className="account-body">
        <div className="account-header">
          <div className="account-title">My Profile</div>
          <div>Manage your account</div>
          <hr />
        </div>
        <Row>
          <Col className="mt-4 d-flex justify-content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              fill="currentColor"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <div className="account-form">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Row className="g-2">
                    <Col>
                      <Form.Control
                        type="text"
                        disabled={editSave}
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
                        disabled={editSave}
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
                      {error.gst_firstname || error.gst_lastname}
                    </span>
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    readOnly
                    value={form.email ? form.email : ""}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicContactNo">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="number"
                    disabled={editSave}
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
                    <span className="text-danger">{error.gst_contact_no}</span>
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    disabled={editSave}
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
                    <span className="text-danger">{error.gst_address}</span>
                  </Form.Text>
                </Form.Group>
                <Row className="pt-3 mb-4">
                  <Col className="d-flex justify-content-center">
                    {editSave && (
                      <Button
                        variant="success"
                        onClick={() => setEditSave(false)}
                      >
                        Edit profile
                      </Button>
                    )}

                    {!editSave && (
                      <Button variant="primary" type="submit">
                        Save
                      </Button>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-center">
                    {editSave && (
                      <Button variant="secondary" onClick={handleShow}>
                        Change password
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="account-body-logout hover-object">
        <div className="account-logout" onClick={() => handleLogout()}>
          Logout
        </div>
      </Container>

      {
        <Modal
          show={showChangePass}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Change password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicCurrentPass">
                <Form.Control
                  type="password"
                  placeholder="Current password"
                  name="currentPass"
                  value={form.currentPass ? form.currentPass : ""}
                  onChange={(e) =>
                    setForm({
                      type: "getFormData",
                      payload: { name: e.target.name, value: e.target.value },
                    })
                  }
                />
                <Form.Text className="text-muted">
                  <span className="text-danger">{error.currentPass}</span>
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicNewPass">
                <Form.Control
                  type="password"
                  placeholder="New password"
                  name="newPass"
                  value={form.newPass ? form.newPass : ""}
                  onChange={(e) =>
                    setForm({
                      type: "getFormData",
                      payload: { name: e.target.name, value: e.target.value },
                    })
                  }
                />
                <Form.Text className="text-muted">
                  <span className="text-danger">{error.newPass}</span>
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicConfirmNewPass">
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  name="confirmPass"
                  value={form.confirmPass ? form.confirmPass : ""}
                  onChange={(e) =>
                    setForm({
                      type: "getFormData",
                      payload: { name: e.target.name, value: e.target.value },
                    })
                  }
                />
                <Form.Text className="text-muted">
                  <span className="text-danger">{error.confirmPass}</span>
                </Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={() => handleChangePass()}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </>
  );
}

export default Account;
