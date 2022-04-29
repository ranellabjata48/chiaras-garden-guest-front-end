import React, { useReducer, useEffect, useState } from "react";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import moment from "moment";
import AddReservationModal from "./common/AddReservationModal";
import {
  getRooms,
  getCottages,
  getServices,
  postRoomReservation,
  postCottageReservation,
  postServiceReservation,
} from "../services/userAccommodation";
import {
  Container,
  ListGroup,
  Row,
  Col,
  Card,
  Button,
  Modal,
} from "react-bootstrap";

const apiInitialState = {
  activeList: 1,
  selectedItem: {},
  roomData: [],
  cottageData: [],
  serviceData: [],
  eventName: "",
  eventDescription: "",
  companion: 0,
  arrivalDate: "",
  departureDate: "",
};

const apiReducer = (state, action) => {
  switch (action.type) {
    case "getActiveList":
      return { ...state, activeList: action.payload };
    case "getRooms":
      return { ...state, roomData: action.payload };
    case "getCottages":
      return { ...state, cottageData: action.payload };
    case "getServices":
      return { ...state, serviceData: action.payload };
    case "getSelectedItem":
      return { ...state, selectedItem: action.payload };
    case "getFormData":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "clearFormData":
      return {
        ...state,
        selectedItem: {},
        eventName: "",
        eventDescription: "",
        companion: 0,
        arrivalDate: "",
        departureDate: "",
      };
    default: {
      return apiInitialState;
    }
  }
};

function Accommodation() {
  const [api, setApi] = useReducer(apiReducer, apiInitialState);

  const [error, setError] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showReserveForm, setShowReserveForm] = useState(false);
  const handleCloseReserveForm = () => {
    setShowReserveForm(false);
    setApi({ type: "clearFormData" });
  };
  const handleShowReserveForm = () => setShowReserveForm(true);

  useEffect(() => {
    let isMounted = true;

    async function getDataRoom() {
      if (isMounted) {
        const { data } = await getRooms();
        setApi({ type: "getRooms", payload: data });
      }
    }
    getDataRoom();

    async function getDataCottage() {
      if (isMounted) {
        const { data } = await getCottages();
        setApi({ type: "getCottages", payload: data });
      }
    }
    getDataCottage();

    async function getDataService() {
      if (isMounted) {
        const { data } = await getServices();
        setApi({ type: "getServices", payload: data });
      }
    }
    getDataService();

    return () => {
      isMounted = false;
    };
  }, [api.activeList, showReserveForm]);

  const token = localStorage.getItem("token");
  const guestInfo = jwt_decode(token);

  const handleReservation = async () => {
    const guestId = guestInfo.id;
    let formData = undefined;

    setError({});

    try {
      if (api.activeList === 1) {
        formData = {
          guestId,
          room_id: api.selectedItem.room_id,
          companion: parseInt(api.companion),
          arrivalDate: api.arrivalDate,
          departureDate: api.departureDate,
          bill_total: amountPayableRoom(
            api.arrivalDate,
            api.departureDate,
            api.selectedItem.room_rate
          ),
        };
        await postRoomReservation(formData);

        toast.success("Request sent.", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
        });
        handleCloseReserveForm();
      }

      if (api.activeList === 2) {
        formData = {
          guestId,
          cot_id: api.selectedItem.cot_id,
          companion: parseInt(api.companion),
          arrivalDate: api.arrivalDate,
          bill_total: parseInt(api.selectedItem.cot_rate),
        };
        await postCottageReservation(formData);

        toast.success("Request sent.", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
        });
        handleCloseReserveForm();
      }

      if (api.activeList === 3) {
        formData = {
          guestId,
          svcs_id: api.selectedItem.svcs_id,
          eventName: api.eventName,
          eventDescription: api.eventDescription,
          companion: parseInt(api.companion),
          arrivalDate: api.arrivalDate,
          bill_total: parseInt(api.selectedItem.svcs_rate),
        };
        await postServiceReservation(formData);

        toast.success("Request sent.", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
        });
        handleCloseReserveForm();
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

  console.log("render outside");

  return (
    <Container className="accommodation-container">
      <Row>
        <Col>
          <ListGroup horizontal>
            <ListGroup.Item
              active={activeList(1, api.activeList)}
              onClick={() => setApi({ type: "getActiveList", payload: 1 })}
            >
              Rooms
            </ListGroup.Item>
            <ListGroup.Item
              active={activeList(2, api.activeList)}
              onClick={() => setApi({ type: "getActiveList", payload: 2 })}
            >
              Cottages
            </ListGroup.Item>
            <ListGroup.Item
              active={activeList(3, api.activeList)}
              onClick={() => setApi({ type: "getActiveList", payload: 3 })}
            >
              Services
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="g-4 mt-3">
        {/* ROOM CART BEGIN */}
        {api.activeList === 1 &&
          currentAccommodation(
            api.activeList,
            api.roomData,
            api.cottageData,
            api.serviceData
          ).map((data) => (
            <Col
              key={data.room_id}
              xs={6}
              sm={6}
              md={4}
              lg={4}
              xl={4}
              xxl={4}
              className="d-flex justify-content-center"
            >
              <Card className="card-container">
                <Card.Img
                  variant="top"
                  src={data.room_img_name}
                  className="card-image"
                  onClick={() => {
                    setApi({ type: "getSelectedItem", payload: data });
                    handleShow();
                  }}
                />
                <Card.Body>
                  <Card.Title>
                    <span className="cart-text-grey cart-title">
                      {`Room Type: ${data.room_type}`}
                    </span>
                  </Card.Title>
                  <Card.Text className="cart-text">
                    <span className="cart-text-grey">{`No. ${data.room_no}`}</span>
                    <br />
                    <span className="cart-text-grey cart-rate">{`Rate: ₱${data.room_rate}`}</span>
                    <br />
                    <br />
                    <span className="cart-description">
                      {data.room_descr.substring(0, 35) + " . . ."}
                    </span>
                  </Card.Text>
                  <Button
                    variant="primary"
                    size="sm"
                    className="cart-btn"
                    onClick={() => {
                      setApi({ type: "getSelectedItem", payload: data });
                      handleShowReserveForm();
                    }}
                  >
                    reservation
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        {/* ROOM CART END */}

        {/* COTTAGE CART BEGIN */}
        {api.activeList === 2 &&
          currentAccommodation(
            api.activeList,
            api.roomData,
            api.cottageData,
            api.serviceData
          ).map((data) => (
            <Col
              key={data.cot_id}
              xs={6}
              sm={6}
              md={4}
              lg={4}
              xl={4}
              xxl={4}
              className="d-flex justify-content-center"
            >
              <Card className="card-container">
                <Card.Img
                  variant="top"
                  src={data.cot_img_name}
                  className="card-image"
                  onClick={() => {
                    setApi({ type: "getSelectedItem", payload: data });
                    handleShow();
                  }}
                />
                <Card.Body>
                  <Card.Title>
                    <span className="cart-text-grey cart-title">
                      {`Cottage Type: ${data.cot_type}`}
                    </span>
                  </Card.Title>
                  <Card.Text className="cart-text">
                    <span className="cart-text-grey">{`No. ${data.cot_no}`}</span>
                    <br />
                    <span className="cart-text-grey cart-rate">{`Rate: ₱${data.cot_rate}`}</span>
                    <br />
                    <br />
                    <span className="cart-description">
                      {data.cot_descr.substring(0, 35) + " . . ."}
                    </span>
                  </Card.Text>
                  <Button
                    variant="primary"
                    size="sm"
                    className="cart-btn"
                    onClick={() => {
                      setApi({ type: "getSelectedItem", payload: data });
                      handleShowReserveForm();
                    }}
                  >
                    reservation
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        {/* COTTAGE CART END */}

        {/* SERVICE CART BEGIN */}
        {api.activeList === 3 &&
          currentAccommodation(
            api.activeList,
            api.roomData,
            api.cottageData,
            api.serviceData
          ).map((data) => (
            <Col
              key={data.svcs_id}
              xs={6}
              sm={6}
              md={4}
              lg={4}
              xl={4}
              xxl={4}
              className="d-flex justify-content-center"
            >
              <Card className="card-container">
                <Card.Img
                  variant="top"
                  src={data.svcs_img_name}
                  className="card-image"
                  onClick={() => {
                    setApi({ type: "getSelectedItem", payload: data });
                    handleShow();
                  }}
                />
                <Card.Body>
                  <Card.Title>
                    <span className="cart-text-grey cart-title">
                      {data.svcs_name}
                    </span>
                  </Card.Title>
                  <Card.Text className="cart-text">
                    <span className="cart-text-grey">{`Type: ${data.svcs_type}`}</span>
                    <br />
                    <span className="cart-text-grey">{`No. ${data.svcs_no}`}</span>
                    <br />
                    <span className="cart-text-grey cart-rate">{`Rate: ₱${data.svcs_rate}`}</span>
                    <br />
                    <br />
                    <span className="cart-description">
                      {data.svcs_descr.substring(0, 35) + " . . ."}
                    </span>
                  </Card.Text>
                  <Button
                    variant="primary"
                    size="sm"
                    className="cart-btn"
                    onClick={() => {
                      setApi({ type: "getSelectedItem", payload: data });
                      handleShowReserveForm();
                    }}
                  >
                    reservation
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        {/* SERVICE CART END */}
      </Row>

      {/* ROOM MODAL BEGIN */}
      {api.activeList === 1 && (
        <Modal show={show} onHide={handleClose} scrollable>
          <Modal.Body>
            <img
              src={api.selectedItem.room_img_name}
              className="modal-img"
              alt=""
            />
            <span className="cart-text-grey modal-title">
              {`Room Type: ${api.selectedItem.room_type}`}
            </span>
            <br />
            <span className="cart-text-grey modal-text">{`No. ${api.selectedItem.room_no}`}</span>
            <br />
            <span className="cart-text-grey cart-rate modal-rate">{`Rate: ₱${api.selectedItem.room_rate}`}</span>
            <br />
            <br />
            <span className="cart-text-grey modal-description cart-descrip-format">
              {api.selectedItem.room_descr}
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {/* ROOM MODAL END */}

      {/* COTTAGE MODAL BEGIN */}
      {api.activeList === 2 && (
        <Modal show={show} onHide={handleClose} scrollable>
          <Modal.Body>
            <img
              src={api.selectedItem.cot_img_name}
              className="modal-img"
              alt=""
            />
            <span className="cart-text-grey modal-title">
              {`Cottage Type: ${api.selectedItem.cot_type}`}
            </span>
            <br />
            <span className="cart-text-grey modal-text">{`No. ${api.selectedItem.cot_no}`}</span>
            <br />
            <span className="cart-text-grey cart-rate modal-rate">{`Rate: ₱${api.selectedItem.cot_rate}`}</span>
            <br />
            <br />
            <span className="cart-text-grey modal-description cart-descrip-format">
              {api.selectedItem.cot_descr}
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {/* COTTAGE MODAL END */}

      {/* SERVICES MODAL BEGIN */}
      {api.activeList === 3 && (
        <Modal show={show} onHide={handleClose} scrollable>
          <Modal.Body>
            <img
              src={api.selectedItem.svcs_img_name}
              className="modal-img"
              alt=""
            />
            <span className="cart-text-grey modal-title">
              {api.selectedItem.svcs_name}
            </span>
            <br />
            <span className="cart-text-grey modal-text">
              {`Type: ${api.selectedItem.svcs_type}`}
            </span>
            <br />
            <span className="cart-text-grey modal-text">{`No. ${api.selectedItem.svcs_no}`}</span>
            <br />
            <span className="cart-text-grey cart-rate modal-rate">{`Rate: ₱${api.selectedItem.svcs_rate}`}</span>
            <br />
            <br />
            <span className="cart-text-grey modal-description cart-descrip-format">
              {api.selectedItem.svcs_descr}
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {/* SERVICES MODAL END */}

      {/* ROOM RESERVATION MODAL BEGIN */}
      {api.activeList === 1 && (
        <AddReservationModal
          showReserveForm={showReserveForm}
          handleCloseReserveForm={handleCloseReserveForm}
          accommodation={api.selectedItem}
          api={api}
          setApi={setApi}
          accommodationType={api.activeList}
          guestInfo={guestInfo}
          handleReservation={handleReservation}
          error={error}
        />
      )}
      {/* ROOM RESERVATION MODAL END */}

      {/* COTTAGE RESERVATION MODAL BEGIN */}
      {api.activeList === 2 && (
        <AddReservationModal
          showReserveForm={showReserveForm}
          handleCloseReserveForm={handleCloseReserveForm}
          accommodation={api.selectedItem}
          api={api}
          setApi={setApi}
          accommodationType={api.activeList}
          guestInfo={guestInfo}
          handleReservation={handleReservation}
          error={error}
        />
      )}
      {/* COTTAGE RESERVATION MODAL END */}

      {/* SERVICE RESERVATION MODAL BEGIN */}
      {api.activeList === 3 && (
        <AddReservationModal
          showReserveForm={showReserveForm}
          handleCloseReserveForm={handleCloseReserveForm}
          accommodation={api.selectedItem}
          api={api}
          setApi={setApi}
          accommodationType={api.activeList}
          guestInfo={guestInfo}
          handleReservation={handleReservation}
          error={error}
        />
      )}
      {/* SERVICE RESERVATION MODAL END */}
    </Container>
  );
}

function activeList(listNum, currentList) {
  if (listNum === currentList) {
    return true;
  } else if (listNum === currentList) {
    return true;
  } else if (listNum === currentList) {
    return true;
  } else {
    return false;
  }
}

const currentAccommodation = (
  activeList,
  roomData,
  cottageData,
  serviceData
) => {
  if (activeList === 1) {
    return roomData;
  } else if (activeList === 2) {
    return cottageData;
  } else if (activeList === 3) {
    return serviceData;
  }
};

const amountPayableRoom = (arrival, departure, rate) => {
  const diff = moment(departure).diff(moment(arrival), "days");

  if (diff > 0) {
    return diff * parseInt(rate);
  } else {
    return parseInt(rate);
  }
};
export default Accommodation;
