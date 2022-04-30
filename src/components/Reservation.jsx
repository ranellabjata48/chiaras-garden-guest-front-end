import React, { useReducer, useEffect, useState } from "react";
import ReservationModalPending from "./common/ReservationModalPending";
import ReservationModalReserved from "./common/ReservationModalReserved";
import ReservationModalCanceled from "./common/ReservationModalCanceled";
import ReservationModalCompleted from "./common/ReservationModalCompleted";
import { toast } from "react-toastify";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import jwt_decode from "jwt-decode";
import {
  getPendingRoom,
  getReservedRoom,
  getCompletedRoom,
  getCanceledRoom,
  cancelRoomReservation,
  getPendingCottage,
  getReservedCottage,
  getCompletedCottage,
  getCanceledCottage,
  cancelCottageReservation,
  getPendingService,
  getReservedService,
  getCompletedService,
  getCanceledService,
  cancelServiceReservation,
} from "../services/userReservation";

const apiInitialState = {
  statusList: 1,
  selectedItem: {},
  reason: "",
  roomData: [],
  cottageData: [],
  serviceData: [],
};

const apiReducer = (state, action) => {
  switch (action.type) {
    case "getStatList":
      return { ...state, statusList: action.payload };
    case "getRoomData":
      return { ...state, roomData: action.payload };
    case "getCottageData":
      return { ...state, cottageData: action.payload };
    case "getServiceData":
      return { ...state, serviceData: action.payload };
    case "getSelectedItem":
      return { ...state, selectedItem: action.payload };
    case "getForm":
      return { ...state, [action.payload.name]: action.payload.value };
    case "clearReason":
      return { ...state, reason: "" };
    default: {
      return apiInitialState;
    }
  }
};

function Reservation() {
  const [api, setApi] = useReducer(apiReducer, apiInitialState);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setApi({ type: "clearReason" });
  };

  const [error, setError] = useState({});

  const handleShowCancelModal = () => setShowCancelModal(true);

  const token = localStorage.getItem("token");
  const guestInfo = jwt_decode(token);

  useEffect(() => {
    let isMounted = true;

    const token = localStorage.getItem("token");
    const guestInfo = jwt_decode(token);
    const guestId = guestInfo.id;

    async function getRoomPending() {
      if (isMounted && api.statusList === 1) {
        const { data } = await getPendingRoom(guestId);
        setApi({ type: "getRoomData", payload: data });
      }
    }

    getRoomPending();

    async function getCottagePending() {
      if (isMounted && api.statusList === 1) {
        const { data } = await getPendingCottage(guestId);
        setApi({ type: "getCottageData", payload: data });
      }
    }

    getCottagePending();

    async function getSerivePending() {
      if (isMounted && api.statusList === 1) {
        const { data } = await getPendingService(guestId);
        setApi({ type: "getServiceData", payload: data });
      }
    }

    getSerivePending();

    async function getRoomReserved() {
      if (isMounted && api.statusList === 2) {
        const { data } = await getReservedRoom(guestId);
        setApi({ type: "getRoomData", payload: data });
      }
    }

    getRoomReserved();

    async function getCottageReserved() {
      if (isMounted && api.statusList === 2) {
        const { data } = await getReservedCottage(guestId);
        setApi({ type: "getCottageData", payload: data });
      }
    }

    getCottageReserved();

    async function getServiceReserved() {
      if (isMounted && api.statusList === 2) {
        const { data } = await getReservedService(guestId);
        setApi({ type: "getServiceData", payload: data });
      }
    }

    getServiceReserved();

    async function getRoomCanceled() {
      if (isMounted && api.statusList === 4) {
        const { data } = await getCanceledRoom(guestId);
        setApi({ type: "getRoomData", payload: data });
      }
    }

    getRoomCanceled();

    async function getCottageCanceled() {
      if (isMounted && api.statusList === 4) {
        const { data } = await getCanceledCottage(guestId);
        setApi({ type: "getCottageData", payload: data });
      }
    }

    getCottageCanceled();

    async function getServiceCanceled() {
      if (isMounted && api.statusList === 4) {
        const { data } = await getCanceledService(guestId);
        setApi({ type: "getServiceData", payload: data });
      }
    }

    getServiceCanceled();

    async function getRoomCompleted() {
      if (isMounted && api.statusList === 3) {
        const { data } = await getCompletedRoom(guestId);
        setApi({ type: "getRoomData", payload: data });
      }
    }

    getRoomCompleted();

    async function getCottageCompleted() {
      if (isMounted && api.statusList === 3) {
        const { data } = await getCompletedCottage(guestId);
        setApi({ type: "getCottageData", payload: data });
      }
    }

    getCottageCompleted();

    async function getServiceCompleted() {
      if (isMounted && api.statusList === 3) {
        const { data } = await getCompletedService(guestId);
        setApi({ type: "getServiceData", payload: data });
      }
    }

    getServiceCompleted();

    return () => {
      isMounted = false;
    };
  }, [api.statusList, showCancelModal]);

  const handleCancelReservation = async () => {
    let formData = undefined;
    setError({});

    try {
      if (api.selectedItem.room_no) {
        formData = {
          tran_num: api.selectedItem.tran_num,
          line_num: api.selectedItem.line_num,
          room_id: api.selectedItem.room_id,
          bill_num: api.selectedItem.bill_num,
          reason: api.reason,
        };

        await cancelRoomReservation(formData);

        toast.success("Reservation successfully canceled.", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
        });

        handleClose();
        handleCloseCancelModal();
      }

      if (api.selectedItem.cot_no) {
        formData = {
          tran_num: api.selectedItem.tran_num,
          line_num: api.selectedItem.line_num,
          cot_id: api.selectedItem.cot_id,
          bill_num: api.selectedItem.bill_num,
          reason: api.reason,
        };

        await cancelCottageReservation(formData);

        toast.success("Reservation successfully canceled.", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
        });

        handleClose();
        handleCloseCancelModal();
      }

      if (api.selectedItem.svcs_no) {
        formData = {
          tran_num: api.selectedItem.tran_num,
          line_num: api.selectedItem.line_num,
          svcs_id: api.selectedItem.svcs_id,
          bill_num: api.selectedItem.bill_num,
          reason: api.reason,
        };

        await cancelServiceReservation(formData);

        toast.success("Reservation successfully canceled.", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
        });

        handleClose();
        handleCloseCancelModal();
      }
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
    <Container className="reservation-container">
      <Row className="reservation-list">
        <Col>
          <ListGroup horizontal>
            <ListGroup.Item
              active={statList(1, api.statusList)}
              onClick={() => setApi({ type: "getStatList", payload: 1 })}
            >
              Pending
            </ListGroup.Item>
            <ListGroup.Item
              active={statList(2, api.statusList)}
              onClick={() => setApi({ type: "getStatList", payload: 2 })}
            >
              Reserved
            </ListGroup.Item>
            <ListGroup.Item
              active={statList(3, api.statusList)}
              onClick={() => setApi({ type: "getStatList", payload: 3 })}
            >
              Completed
            </ListGroup.Item>
            <ListGroup.Item
              active={statList(4, api.statusList)}
              onClick={() => setApi({ type: "getStatList", payload: 4 })}
            >
              Canceled
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      <Row>
        <Container className="reservation-body">
          {/* PENDING ROOM BEGIN */}
          {api.statusList === 1 && (
            <Row>
              {api.roomData.length !== 0 && (
                <>
                  {api.roomData.map((item) => (
                    <Col
                      className="mb-4"
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      key={item.tran_num}
                    >
                      <Card
                        onClick={() => {
                          setApi({ type: "getSelectedItem", payload: item });
                          handleShow();
                        }}
                      >
                        <Card.Header className="reservation-card-body" as="h5">
                          <div className="d-flex justify-content-between">
                            <span>Room</span>
                            <span className="text-success">
                              Status:{" "}
                              {parseInt(item.line_status) === 1
                                ? "Pending"
                                : ""}
                            </span>
                          </div>
                        </Card.Header>
                        <Card.Body className="reservation-card-body">
                          <Card.Title>Accommodation Details</Card.Title>
                          <div className="reservation-card-img-text">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center">
                                <img
                                  className="reservation-card-img"
                                  src={item.room_img_name}
                                  alt="..."
                                />
                                <div className="inline">
                                  No. {item.room_no}
                                  <br />
                                  Type: {item.room_type}
                                  <br />
                                  Rate: {item.room_rate}
                                </div>
                              </div>
                              <div className="d-flex align-items-end">
                                <span className="text-primary pointer">
                                  view more
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </>
              )}
            </Row>
          )}
          {/* PENDING ROOM END */}
          {/* PENDING COTTAGE BEGIN */}
          {api.statusList === 1 && (
            <Row>
              {api.cottageData.length !== 0 && (
                <>
                  {api.cottageData.map((item) => (
                    <Col
                      className="mb-4"
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      key={item.tran_num}
                    >
                      <Card
                        onClick={() => {
                          setApi({ type: "getSelectedItem", payload: item });
                          handleShow();
                        }}
                      >
                        <Card.Header className="reservation-card-body" as="h5">
                          <div className="d-flex justify-content-between">
                            <span>Cottage</span>
                            <span className="text-success">
                              Status:{" "}
                              {parseInt(item.line_status) === 1
                                ? "Pending"
                                : ""}
                            </span>
                          </div>
                        </Card.Header>
                        <Card.Body className="reservation-card-body">
                          <Card.Title>Accommodation Details</Card.Title>
                          <div className="reservation-card-img-text">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center">
                                <img
                                  className="reservation-card-img"
                                  src={item.cot_img_name}
                                  alt="..."
                                />
                                <div className="inline">
                                  No. {item.cot_no}
                                  <br />
                                  Type: {item.cot_type}
                                  <br />
                                  Rate: {item.cot_rate}
                                </div>
                              </div>
                              <div className="d-flex align-items-end">
                                <span className="text-primary pointer">
                                  view more
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </>
              )}
            </Row>
          )}
          {/* PENDING COTTAGE END */}
          {/* PENDING SERVICE BEGIN */}
          {api.statusList === 1 && (
            <Row>
              {api.serviceData.length !== 0 && (
                <>
                  {api.serviceData.map((item) => (
                    <Col
                      className="mb-4"
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      key={item.tran_num}
                    >
                      <Card
                        onClick={() => {
                          setApi({ type: "getSelectedItem", payload: item });
                          handleShow();
                        }}
                      >
                        <Card.Header className="reservation-card-body" as="h5">
                          <div className="d-flex justify-content-between">
                            <span>{item.svcs_name}</span>
                            <span className="text-success">
                              Status:{" "}
                              {parseInt(item.line_status) === 1
                                ? "Pending"
                                : ""}
                            </span>
                          </div>
                        </Card.Header>
                        <Card.Body className="reservation-card-body">
                          <Card.Title>Accommodation Details</Card.Title>
                          <div className="reservation-card-img-text">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center">
                                <img
                                  className="reservation-card-img"
                                  src={item.svcs_img_name}
                                  alt="..."
                                />
                                <div className="inline">
                                  No. {item.svcs_no}
                                  <br />
                                  Type: {item.svcs_type}
                                  <br />
                                  Rate: {item.svcs_rate}
                                </div>
                              </div>
                              <div className="d-flex align-items-end">
                                <span className="text-primary pointer">
                                  view more
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </>
              )}
            </Row>
          )}
          {/* PENDING SERVICE END */}
          {/* RESERVED ROOM BEGIN */}
          {api.statusList === 2 && (
            <Row>
              {api.roomData.length !== 0 && (
                <>
                  {api.roomData.map((item) => (
                    <Col
                      className="mb-4"
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      key={item.tran_num}
                    >
                      <Card
                        onClick={() => {
                          setApi({ type: "getSelectedItem", payload: item });
                          handleShow();
                        }}
                      >
                        <Card.Header className="reservation-card-body" as="h5">
                          <div className="d-flex justify-content-between">
                            <span>Room</span>
                            <span className="text-success">
                              Status:{" "}
                              {parseInt(item.line_status) === 2
                                ? "Reserved"
                                : ""}
                            </span>
                          </div>
                        </Card.Header>
                        <Card.Body className="reservation-card-body">
                          <Card.Title>Accommodation Details</Card.Title>
                          <div className="reservation-card-img-text">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center">
                                <img
                                  className="reservation-card-img"
                                  src={item.room_img_name}
                                  alt="..."
                                />
                                <div className="inline">
                                  No. {item.room_no}
                                  <br />
                                  Type: {item.room_type}
                                  <br />
                                  Rate: {item.room_rate}
                                </div>
                              </div>
                              <div className="d-flex align-items-end">
                                <span className="text-primary pointer">
                                  view more
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </>
              )}
            </Row>
          )}
          {/* RESERVED ROOM END */}
          {/* RESERVED COTTAGE BEGIN */}
          {api.statusList === 2 && (
            <Row>
              {api.cottageData.length !== 0 && (
                <>
                  {api.cottageData.map((item) => (
                    <Col
                      className="mb-4"
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      key={item.tran_num}
                    >
                      <Card
                        onClick={() => {
                          setApi({ type: "getSelectedItem", payload: item });
                          handleShow();
                        }}
                      >
                        <Card.Header className="reservation-card-body" as="h5">
                          <div className="d-flex justify-content-between">
                            <span>Cottage</span>
                            <span className="text-success">
                              Status:{" "}
                              {parseInt(item.line_status) === 2
                                ? "Reserved"
                                : ""}
                            </span>
                          </div>
                        </Card.Header>
                        <Card.Body className="reservation-card-body">
                          <Card.Title>Accommodation Details</Card.Title>
                          <div className="reservation-card-img-text">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center">
                                <img
                                  className="reservation-card-img"
                                  src={item.cot_img_name}
                                  alt="..."
                                />
                                <div className="inline">
                                  No. {item.cot_no}
                                  <br />
                                  Type: {item.cot_type}
                                  <br />
                                  Rate: {item.cot_rate}
                                </div>
                              </div>
                              <div className="d-flex align-items-end">
                                <span className="text-primary pointer">
                                  view more
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </>
              )}
            </Row>
          )}
          {/* RESERVED COTTAGE END*/}
          {/* RESERVED SERVICE BEGIN */}
          {api.statusList === 2 && (
            <Row>
              {api.serviceData.length !== 0 && (
                <>
                  {api.serviceData.map((item) => (
                    <Col
                      className="mb-4"
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      key={item.tran_num}
                    >
                      <Card
                        onClick={() => {
                          setApi({ type: "getSelectedItem", payload: item });
                          handleShow();
                        }}
                      >
                        <Card.Header className="reservation-card-body" as="h5">
                          <div className="d-flex justify-content-between">
                            <span>{item.svcs_name}</span>
                            <span className="text-success">
                              Status:{" "}
                              {parseInt(item.line_status) === 2
                                ? "Reserved"
                                : ""}
                            </span>
                          </div>
                        </Card.Header>
                        <Card.Body className="reservation-card-body">
                          <Card.Title>Accommodation Details</Card.Title>
                          <div className="reservation-card-img-text">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center">
                                <img
                                  className="reservation-card-img"
                                  src={item.svcs_img_name}
                                  alt="..."
                                />
                                <div className="inline">
                                  No. {item.svcs_no}
                                  <br />
                                  Type: {item.svcs_type}
                                  <br />
                                  Rate: {item.svcs_rate}
                                </div>
                              </div>
                              <div className="d-flex align-items-end">
                                <span className="text-primary pointer">
                                  view more
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </>
              )}
            </Row>
          )}
          {/* RESERVED SERVICE END */}
          {/* COMPLETED ROOM BEGIN */}
          {api.statusList === 3 && (
            <Row>
              {api.roomData.length !== 0 && (
                <>
                  {api.roomData.map((item) => (
                    <Col
                      className="mb-4"
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      key={item.tran_num}
                    >
                      <Card
                        onClick={() => {
                          setApi({ type: "getSelectedItem", payload: item });
                          handleShow();
                        }}
                      >
                        <Card.Header className="reservation-card-body" as="h5">
                          <div className="d-flex justify-content-between">
                            <span>Room</span>
                            <span className="text-success">
                              Status:{" "}
                              {parseInt(item.line_status) === 4
                                ? "Completed"
                                : ""}
                            </span>
                          </div>
                        </Card.Header>
                        <Card.Body className="reservation-card-body">
                          <Card.Title>Accommodation Details</Card.Title>
                          <div className="reservation-card-img-text">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center">
                                <img
                                  className="reservation-card-img"
                                  src={item.room_img_name}
                                  alt="..."
                                />
                                <div className="inline">
                                  No. {item.room_no}
                                  <br />
                                  Type: {item.room_type}
                                  <br />
                                  Rate: {item.room_rate}
                                </div>
                              </div>
                              <div className="d-flex align-items-end">
                                <span className="text-primary pointer">
                                  view more
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </>
              )}
            </Row>
          )}
          {/* COMPLETED ROOM END */}
          {/* COMPLETED COTTAGE BEGIN */}
          {api.statusList === 3 && (
            <Row>
              {api.cottageData.length !== 0 && (
                <>
                  {api.cottageData.map((item) => (
                    <Col
                      className="mb-4"
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      key={item.tran_num}
                    >
                      <Card
                        onClick={() => {
                          setApi({ type: "getSelectedItem", payload: item });
                          handleShow();
                        }}
                      >
                        <Card.Header className="reservation-card-body" as="h5">
                          <div className="d-flex justify-content-between">
                            <span>Cottage</span>
                            <span className="text-success">
                              Status:{" "}
                              {parseInt(item.line_status) === 4
                                ? "Completed"
                                : ""}
                            </span>
                          </div>
                        </Card.Header>
                        <Card.Body className="reservation-card-body">
                          <Card.Title>Accommodation Details</Card.Title>
                          <div className="reservation-card-img-text">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center">
                                <img
                                  className="reservation-card-img"
                                  src={item.cot_img_name}
                                  alt="..."
                                />
                                <div className="inline">
                                  No. {item.cot_no}
                                  <br />
                                  Type: {item.cot_type}
                                  <br />
                                  Rate: {item.cot_rate}
                                </div>
                              </div>
                              <div className="d-flex align-items-end">
                                <span className="text-primary pointer">
                                  view more
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </>
              )}
            </Row>
          )}
          {/* COMPLETED COTTAGE END*/}
          {/* COMPLETED SERVICE BEGIN */}
          {api.statusList === 3 && (
            <Row>
              {api.serviceData.length !== 0 && (
                <>
                  {api.serviceData.map((item) => (
                    <Col
                      className="mb-4"
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      key={item.tran_num}
                    >
                      <Card
                        onClick={() => {
                          setApi({ type: "getSelectedItem", payload: item });
                          handleShow();
                        }}
                      >
                        <Card.Header className="reservation-card-body" as="h5">
                          <div className="d-flex justify-content-between">
                            <span>{item.svcs_name}</span>
                            <span className="text-success">
                              Status:{" "}
                              {parseInt(item.line_status) === 4
                                ? "Completed"
                                : ""}
                            </span>
                          </div>
                        </Card.Header>
                        <Card.Body className="reservation-card-body">
                          <Card.Title>Accommodation Details</Card.Title>
                          <div className="reservation-card-img-text">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center">
                                <img
                                  className="reservation-card-img"
                                  src={item.svcs_img_name}
                                  alt="..."
                                />
                                <div className="inline">
                                  No. {item.svcs_no}
                                  <br />
                                  Type: {item.svcs_type}
                                  <br />
                                  Rate: {item.svcs_rate}
                                </div>
                              </div>
                              <div className="d-flex align-items-end">
                                <span className="text-primary pointer">
                                  view more
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </>
              )}
            </Row>
          )}
          {/* COMPLETED SERVICE END */}

          {/* CANCELED ROOM BEGIN */}
          {api.statusList === 4 && (
            <Row>
              {api.roomData.length !== 0 && (
                <>
                  {api.roomData.map((item) => (
                    <Col
                      className="mb-4"
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      key={item.tran_num}
                    >
                      <Card
                        onClick={() => {
                          setApi({ type: "getSelectedItem", payload: item });
                          handleShow();
                        }}
                      >
                        <Card.Header className="reservation-card-body" as="h5">
                          <div className="d-flex justify-content-between">
                            <span>Room</span>
                            <span className="text-success">
                              Status:{" "}
                              {parseInt(item.line_status) === 5
                                ? "Canceled"
                                : ""}
                            </span>
                          </div>
                        </Card.Header>
                        <Card.Body className="reservation-card-body">
                          <Card.Title>Accommodation Details</Card.Title>
                          <div className="reservation-card-img-text">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center">
                                <img
                                  className="reservation-card-img"
                                  src={item.room_img_name}
                                  alt="..."
                                />
                                <div className="inline">
                                  No. {item.room_no}
                                  <br />
                                  Type: {item.room_type}
                                  <br />
                                  Rate: {item.room_rate}
                                </div>
                              </div>
                              <div className="d-flex align-items-end">
                                <span className="text-primary pointer">
                                  view more
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </>
              )}
            </Row>
          )}
          {/* CANCELED ROOM END */}
          {/* CANCELED COTTAGE BEGIN */}
          {api.statusList === 4 && (
            <Row>
              {api.cottageData.length !== 0 && (
                <>
                  {api.cottageData.map((item) => (
                    <Col
                      className="mb-4"
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      key={item.tran_num}
                    >
                      <Card
                        onClick={() => {
                          setApi({ type: "getSelectedItem", payload: item });
                          handleShow();
                        }}
                      >
                        <Card.Header className="reservation-card-body" as="h5">
                          <div className="d-flex justify-content-between">
                            <span>Cottage</span>
                            <span className="text-success">
                              Status:{" "}
                              {parseInt(item.line_status) === 5
                                ? "Canceled"
                                : ""}
                            </span>
                          </div>
                        </Card.Header>
                        <Card.Body className="reservation-card-body">
                          <Card.Title>Accommodation Details</Card.Title>
                          <div className="reservation-card-img-text">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center">
                                <img
                                  className="reservation-card-img"
                                  src={item.cot_img_name}
                                  alt="..."
                                />
                                <div className="inline">
                                  No. {item.cot_no}
                                  <br />
                                  Type: {item.cot_type}
                                  <br />
                                  Rate: {item.cot_rate}
                                </div>
                              </div>
                              <div className="d-flex align-items-end">
                                <span className="text-primary pointer">
                                  view more
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </>
              )}
            </Row>
          )}
          {/* CANCELED COTTAGE END */}
          {/* CANCELED SERVICE BEGIN */}
          {api.statusList === 4 && (
            <Row>
              {api.serviceData.length !== 0 && (
                <>
                  {api.serviceData.map((item) => (
                    <Col
                      className="mb-4"
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      key={item.tran_num}
                    >
                      <Card
                        onClick={() => {
                          setApi({ type: "getSelectedItem", payload: item });
                          handleShow();
                        }}
                      >
                        <Card.Header className="reservation-card-body" as="h5">
                          <div className="d-flex justify-content-between">
                            <span>{item.svcs_name}</span>
                            <span className="text-success">
                              Status:{" "}
                              {parseInt(item.line_status) === 5
                                ? "Canceled"
                                : ""}
                            </span>
                          </div>
                        </Card.Header>
                        <Card.Body className="reservation-card-body">
                          <Card.Title>Accommodation Details</Card.Title>
                          <div className="reservation-card-img-text">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center">
                                <img
                                  className="reservation-card-img"
                                  src={item.svcs_img_name}
                                  alt="..."
                                />
                                <div className="inline">
                                  No. {item.svcs_no}
                                  <br />
                                  Type: {item.svcs_type}
                                  <br />
                                  Rate: {item.svcs_rate}
                                </div>
                              </div>
                              <div className="d-flex align-items-end">
                                <span className="text-primary pointer">
                                  view more
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </>
              )}
            </Row>
          )}
          {/* CANCELED SERVICE END */}
        </Container>
      </Row>

      {/* PENDING ROOM MODAL BEGIN */}
      {api.statusList === 1 && (
        <>
          {api.roomData.length !== 0 && api.selectedItem.room_id && (
            <ReservationModalPending
              show={show}
              handleClose={handleClose}
              accommodation={api.selectedItem}
              accommodationType={1}
              guestInfo={guestInfo}
            />
          )}
        </>
      )}
      {/* PENDING ROOM MODAL END */}

      {/* PENDING COTTAGE MODAL BEGIN */}
      {api.statusList === 1 && (
        <>
          {api.cottageData.length !== 0 && api.selectedItem.cot_id && (
            <ReservationModalPending
              show={show}
              handleClose={handleClose}
              accommodation={api.selectedItem}
              accommodationType={2}
              guestInfo={guestInfo}
            />
          )}
        </>
      )}
      {/* PENDING COTTAGE MODAL END */}

      {/* PENDING SERVICE MODAL BEGIN */}
      {api.statusList === 1 && (
        <>
          {api.serviceData.length !== 0 && api.selectedItem.svcs_id && (
            <ReservationModalPending
              show={show}
              handleClose={handleClose}
              accommodation={api.selectedItem}
              accommodationType={3}
              guestInfo={guestInfo}
            />
          )}
        </>
      )}
      {/* PENDING SERVICE MODAL END */}

      {/* RESERVED ROOM MODAL BEGIN */}

      {api.statusList === 2 && (
        <>
          {api.roomData.length !== 0 && api.selectedItem.room_id && (
            <ReservationModalReserved
              show={show}
              handleClose={handleClose}
              accommodation={api.selectedItem}
              accommodationType={1}
              guestInfo={guestInfo}
              handleShowCancelModal={handleShowCancelModal}
            />
          )}
        </>
      )}
      {/* RESERVED ROOM MODAL END */}

      {/* RESERVED COTTAGE MODAL BEGIN */}
      {api.statusList === 2 && (
        <>
          {api.cottageData.length !== 0 && api.selectedItem.cot_id && (
            <ReservationModalReserved
              show={show}
              handleClose={handleClose}
              accommodation={api.selectedItem}
              accommodationType={2}
              guestInfo={guestInfo}
              handleShowCancelModal={handleShowCancelModal}
            />
          )}
        </>
      )}
      {/* RESERVED COTTAGE MODAL END */}

      {/* RESERVED SERVICE MODAL BEGIN */}
      {api.statusList === 2 && (
        <>
          {api.serviceData.length !== 0 && api.selectedItem.svcs_id && (
            <ReservationModalReserved
              show={show}
              handleClose={handleClose}
              accommodation={api.selectedItem}
              accommodationType={3}
              guestInfo={guestInfo}
              handleShowCancelModal={handleShowCancelModal}
            />
          )}
        </>
      )}
      {/* RESERVED SERVICE MODAL END */}

      {/* COMPLETED ROOM MODAL BEGIN */}
      {api.statusList === 3 && (
        <>
          {api.roomData.length !== 0 && api.selectedItem.room_id && (
            <ReservationModalCompleted
              show={show}
              handleClose={handleClose}
              accommodation={api.selectedItem}
              accommodationType={1}
              guestInfo={guestInfo}
            />
          )}
        </>
      )}
      {/* COMPLETED ROOM MODAL END */}

      {/* COMPLETED COTTAGE MODAL BEGIN */}
      {api.statusList === 3 && (
        <>
          {api.cottageData.length !== 0 && api.selectedItem.cot_id && (
            <ReservationModalCompleted
              show={show}
              handleClose={handleClose}
              accommodation={api.selectedItem}
              accommodationType={2}
              guestInfo={guestInfo}
            />
          )}
        </>
      )}
      {/* COMPLETED COTTAGE MODAL END */}

      {/* COMPLETED SERVICE MODAL BEGIN */}
      {api.statusList === 3 && (
        <>
          {api.serviceData.length !== 0 && api.selectedItem.svcs_id && (
            <ReservationModalCompleted
              show={show}
              handleClose={handleClose}
              accommodation={api.selectedItem}
              accommodationType={3}
              guestInfo={guestInfo}
            />
          )}
        </>
      )}
      {/* COMPLETED SERVICE MODAL END */}

      {/* CANCEL ROOM MODAL BEGIN */}
      {api.statusList === 4 && (
        <>
          {api.roomData.length !== 0 && api.selectedItem.room_id && (
            <ReservationModalCanceled
              show={show}
              handleClose={handleClose}
              accommodation={api.selectedItem}
              accommodationType={1}
              guestInfo={guestInfo}
            />
          )}
        </>
      )}
      {/* CANCEL ROOM MODAL END */}

      {/* CANCEL COTTAGE MODAL BEGIN */}
      {api.statusList === 4 && (
        <>
          {api.cottageData.length !== 0 && api.selectedItem.cot_id && (
            <ReservationModalCanceled
              show={show}
              handleClose={handleClose}
              accommodation={api.selectedItem}
              accommodationType={2}
              guestInfo={guestInfo}
            />
          )}
        </>
      )}
      {/* CANCEL COTTAGE MODAL END */}

      {/* CANCEL SERVICE MODAL BEGIN */}
      {api.statusList === 4 && (
        <>
          {api.serviceData.length !== 0 && api.selectedItem.svcs_id && (
            <ReservationModalCanceled
              show={show}
              handleClose={handleClose}
              accommodation={api.selectedItem}
              accommodationType={3}
              guestInfo={guestInfo}
            />
          )}
        </>
      )}
      {/* CANCEL SERVICE MODAL END */}

      {/* CANCEL RESERVATION REASON MODAL BEGIN */}
      {api.statusList === 2 && (
        <Modal
          show={showCancelModal}
          onHide={handleCloseCancelModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Reason for cancellation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicReason">
                <Form.Control
                  as="textarea"
                  rows="5"
                  placeholder="Enter your reason for reservation cancellation"
                  name="reason"
                  value={api.reason}
                  onChange={(e) =>
                    setApi({
                      type: "getForm",
                      payload: { name: e.target.name, value: e.target.value },
                    })
                  }
                />
                <Form.Text className="text-muted">
                  <span className="text-danger">{error.reason}</span>
                </Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCancelModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => handleCancelReservation()}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {/* CANCEL RESERVATION REASON MODAL END */}
    </Container>
  );
}

function statList(listNum, currentList) {
  if (listNum === currentList) {
    return true;
  } else {
    return false;
  }
}

export default Reservation;
