import React from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import moment from "moment";
import "moment-precise-range-plugin";

function ReservationModalCompleted(props) {
  const { show, handleClose, accommodation, accommodationType, guestInfo } =
    props;

  const checkOut = moment(accommodation.line_checkout, "YYYY-MM-DD")
    .add(moment(accommodation.line_checkin).format("HH:mm:ss"), "t")
    .format("YYYY-MM-DD HH:mm:ss");

  const total =
    rateOfAccommodationType(accommodationType, accommodation) *
    (moment(accommodation.line_checkout).diff(
      moment(accommodation.line_checkin),
      "days"
    ) !== 0
      ? moment(new Date(checkOut)).diff(
          moment(new Date(accommodation.line_checkin)),
          "days"
        )
      : 1);

  return (
    <Modal fullscreen scrollable show={show} onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title
          id="example-custom-modal-styling-title"
          className="tran-title"
        >
          Completed Reservation Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="tran-modal-body">
        <Container>
          {/* GUEST INFORMATION BEGIN */}
          <Row className="tran-row">
            <span className="add-form-header mb-4">Guest Information</span>
            <br />
            <>
              <Col className="mb-3" md={6}>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    readOnly
                    value={guestInfo.firstName}
                  />
                </Form.Group>
              </Col>

              <Col className="mb-3" md={6}>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    readOnly
                    value={guestInfo.lastName}
                  />
                </Form.Group>
              </Col>

              <Col className="mb-3" md={6}>
                <Form.Group controlId="contactNo">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="contactNo"
                    readOnly
                    value={guestInfo.contactNo}
                  />
                </Form.Group>
              </Col>

              <Col className="mb-3" md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    readOnly
                    value={guestInfo.email}
                  />
                </Form.Group>
              </Col>

              <Col className="mb-3" md={6}>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="1"
                    name="address"
                    readOnly
                    value={guestInfo.address}
                  />
                </Form.Group>
              </Col>
            </>
          </Row>
          {/* GUEST INFORMATION END */}
          {/* SERVICES INFORMATION BEGIN */}
          <Row className="tran-row">
            <span className="add-form-header mb-4">
              Accommodation Information
            </span>
            <br />
            <Row>
              {accommodationType === 1 && (
                <>
                  <Col md={6}>
                    <Col className="mb-3" md={12}>
                      <Form.Group controlId="roomNo">
                        <Form.Label>Room No.</Form.Label>
                        <Form.Control
                          type="number"
                          readOnly
                          name="roomNo"
                          value={accommodation.room_no || ""}
                        />
                      </Form.Group>
                    </Col>

                    <Col className="mb-3" md={12}>
                      <Form.Group controlId="roomType">
                        <Form.Label>Room Type</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          name="roomType"
                          value={accommodation.room_type || ""}
                        />
                      </Form.Group>
                    </Col>

                    <Col className="mb-3" md={12}>
                      <Form.Group controlId="roomRate">
                        <Form.Label>Room Rate</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          name="roomRate"
                          value={accommodation.room_rate || ""}
                        />
                      </Form.Group>
                    </Col>
                  </Col>

                  <Col
                    className="d-flex justify-content-center align-items-center"
                    md={6}
                  >
                    {accommodation.room_img_name ? (
                      <img
                        className="tran-add-form-img"
                        src={accommodation.room_img_name || ""}
                        alt="..."
                      />
                    ) : (
                      <div className="tran-add-form-img-blank" />
                    )}
                  </Col>
                </>
              )}

              {accommodationType === 2 && (
                <>
                  <Col md={6}>
                    <Col className="mb-3" md={12}>
                      <Form.Group controlId="cotNo">
                        <Form.Label>Cottage No.</Form.Label>
                        <Form.Control
                          type="number"
                          readOnly
                          name="cotNo"
                          value={accommodation.cot_no || ""}
                        />
                      </Form.Group>
                    </Col>

                    <Col className="mb-3" md={12}>
                      <Form.Group controlId="cotType">
                        <Form.Label>Cottage Type</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          name="cotType"
                          value={accommodation.cot_type || ""}
                        />
                      </Form.Group>
                    </Col>

                    <Col className="mb-3" md={12}>
                      <Form.Group controlId="cotRate">
                        <Form.Label>Cottage Rate</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          name="cotRate"
                          value={accommodation.cot_rate || ""}
                        />
                      </Form.Group>
                    </Col>
                  </Col>

                  <Col
                    className="d-flex justify-content-center align-items-center"
                    md={6}
                  >
                    {accommodation.cot_img_name ? (
                      <img
                        className="tran-add-form-img"
                        src={accommodation.cot_img_name || ""}
                        alt="..."
                      />
                    ) : (
                      <div className="tran-add-form-img-blank" />
                    )}
                  </Col>
                </>
              )}

              {accommodationType === 3 && (
                <>
                  <Col md={6}>
                    <Col className="mb-3" md={12}>
                      <Form.Group controlId="svcsName">
                        <Form.Label>Service Name</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          name="svcsName"
                          value={accommodation.svcs_name || ""}
                        />
                      </Form.Group>
                    </Col>

                    <Col className="mb-3" md={12}>
                      <Form.Group controlId="svcsNo">
                        <Form.Label>Service No.</Form.Label>
                        <Form.Control
                          type="number"
                          readOnly
                          name="svcsNo"
                          value={accommodation.svcs_no || ""}
                        />
                      </Form.Group>
                    </Col>

                    <Col className="mb-3" md={12}>
                      <Form.Group controlId="svcsType">
                        <Form.Label>Service Type</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          name="svcsType"
                          value={accommodation.svcs_type || ""}
                        />
                      </Form.Group>
                    </Col>

                    <Col className="mb-3" md={12}>
                      <Form.Group controlId="svcsRate">
                        <Form.Label>Service Rate</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          name="svcsRate"
                          value={accommodation.svcs_rate || ""}
                        />
                      </Form.Group>
                    </Col>
                  </Col>

                  <Col
                    className="d-flex justify-content-center align-items-center"
                    md={6}
                  >
                    {accommodation.svcs_img_name ? (
                      <img
                        className="tran-add-form-img"
                        src={accommodation.svcs_img_name || ""}
                        alt="..."
                      />
                    ) : (
                      <div className="tran-add-form-img-blank" />
                    )}
                  </Col>
                </>
              )}
            </Row>
          </Row>
          {/* SERVICES INFORMATION END */}
          {/* SERVICES EVENT TRANSACTION BEGIN */}
          {accommodationType === 3 && (
            <Row className="tran-row">
              <span className="add-form-header mb-4">Event Information</span>
              <br />

              <Col className="mb-3" md={6}>
                <Form.Group controlId="eventName">
                  <Form.Label>Event Name</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    name="eventName"
                    value={accommodation.evt_name}
                  />
                  <Form.Text className="text-muted">
                    <span className="text-danger">{}</span>
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col className="mb-3" md={6}>
                <Form.Group controlId="eventDescription">
                  <Form.Label>Event Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    readOnly
                    name="eventDescription"
                    value={accommodation.evt_descr}
                  />
                  <Form.Text className="text-muted">
                    <span className="text-danger">{}</span>
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          )}
          {/* SERVICES EVENT TRANSACTION END */}
          {/* TRANSACTION INFORMATION BEGIN */}
          {/* ROOM TRANSACTION BEGIN */}
          {/* RESERVATION BEGIN */}
          {accommodationType === 1 && (
            <Row className="tran-row">
              <span className="add-form-header mb-4">
                Transaction Information
              </span>
              <br />
              <Col className="mb-3" md={6}>
                <Form.Group controlId="companion">
                  <Form.Label>Companion</Form.Label>
                  <Form.Control
                    type="number"
                    readOnly
                    name="companion"
                    value={accommodation.line_companion}
                  />
                  <Form.Text className="text-muted">
                    <span className="text-danger">{}</span>
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col className="mb-3" md={6}>
                <Form.Group controlId="daysOfStay">
                  <Form.Label>Period of Stay</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    name="daysOfStay"
                    value={totalDayOfStay(
                      accommodation.line_checkin,
                      accommodation.line_checkout
                    )}
                  />
                </Form.Group>
              </Col>

              <Col className="mb-3" md={6}>
                <Form.Group controlId="arrivalDate">
                  <Form.Label>Arrival Date</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    name="arrivalDate"
                    value={moment(accommodation.line_checkin).format(
                      "MMM DD, YYYY - dddd"
                    )}
                  />
                  <Form.Text className="text-muted">
                    <span className="text-danger">{}</span>
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col className="mb-3" md={6}>
                <Form.Group controlId="departureDate">
                  <Form.Label>Departure Date</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    name="departureDate"
                    value={moment(accommodation.line_checkout).format(
                      "MMM DD, YYYY - dddd"
                    )}
                  />
                  <Form.Text className="text-muted">
                    <span className="text-danger">{}</span>
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          )}
          {/* RESERVATION END */}
          {/* ROOM TRANSACTION END */}
          {/* COTTAGE TRANSACTION BEGIN */}
          {/* RESERVATION BEGIN */}
          {accommodationType === 2 && (
            <Row className="tran-row">
              <span className="add-form-header mb-4">
                Transaction Information
              </span>
              <br />
              <Col className="mb-3" md={6}>
                <Form.Group controlId="companion">
                  <Form.Label>Companion</Form.Label>
                  <Form.Control
                    type="number"
                    readOnly
                    name="companion"
                    value={accommodation.line_companion}
                  />
                  <Form.Text className="text-muted">
                    <span className="text-danger">{}</span>
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col className="mb-3" md={6}>
                <Form.Group controlId="daysOfStay">
                  <Form.Label>Period of Stay</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    name="daysOfStay"
                    value={totalDayOfStay(
                      accommodation.line_checkin,
                      accommodation.line_checkout
                    )}
                  />
                </Form.Group>
              </Col>

              <Col className="mb-3" md={6}>
                <Form.Group controlId="arrivalDate">
                  <Form.Label>Arrival Date</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    name="arrivalDate"
                    value={moment(accommodation.line_checkin).format(
                      "MMM DD, YYYY - dddd"
                    )}
                  />
                  <Form.Text className="text-muted">
                    <span className="text-danger">{}</span>
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col className="mb-3" md={6}>
                <Form.Group controlId="departureDate">
                  <Form.Label>Departure Date</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    name="departureDate"
                    value={moment(accommodation.line_checkout).format(
                      "MMM DD, YYYY - dddd"
                    )}
                  />
                  <Form.Text className="text-muted">
                    <span className="text-danger">{}</span>
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          )}
          {/* RESERVATION END */}
          {/* COTTAGE TRANSACTION END */}

          {/* SERVICE TRANSACTION BEGIN */}
          {/* RESERVATION BEGIN */}
          {accommodationType === 3 && (
            <Row className="tran-row">
              <span className="add-form-header mb-4">
                Transaction Information
              </span>
              <br />
              <Col className="mb-3" md={6}>
                <Form.Group controlId="companion">
                  <Form.Label>Companion</Form.Label>
                  <Form.Control
                    type="number"
                    readOnly
                    name="companion"
                    value={accommodation.line_companion}
                  />
                  <Form.Text className="text-muted">
                    <span className="text-danger">{}</span>
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col className="mb-3" md={6}>
                <Form.Group controlId="daysOfStay">
                  <Form.Label>Period of Stay</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    name="daysOfStay"
                    value={totalDayOfStay(
                      accommodation.line_checkin,
                      accommodation.line_checkout
                    )}
                  />
                </Form.Group>
              </Col>

              <Col className="mb-3" md={6}>
                <Form.Group controlId="arrivalDate">
                  <Form.Label>Arrival Date</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    name="arrivalDate"
                    value={moment(accommodation.line_checkin).format(
                      "MMM DD, YYYY - dddd"
                    )}
                  />
                  <Form.Text className="text-muted">
                    <span className="text-danger">{}</span>
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col className="mb-3" md={6}>
                <Form.Group controlId="departureDate">
                  <Form.Label>Departure Date</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    name="departureDate"
                    value={moment(accommodation.line_checkout).format(
                      "MMM DD, YYYY - dddd"
                    )}
                  />
                  <Form.Text className="text-muted">
                    <span className="text-danger">{}</span>
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          )}
          {/* RESERVATION END */}
          {/* SERVICE TRANSACTION END */}
          {/* TRANSACTION INFORMATION END */}

          {/* PAYMENT INFORMATION BEGIN */}
          {/* ROOM BEGIN */}
          {/* {accommodationType === 1 && (
            <Row className="tran-row">
              <span className="tran-total">
                Total: &nbsp;₱
                {accommodation.bill_total}
              </span>
            </Row>
          )} */}
          {/* ROOM END */}

          {/* COTTAGE BEGIN */}
          {/* {accommodationType === 2 && (
            <Row className="tran-row">
              <span className="tran-total">
                Total: &nbsp;₱
                {accommodation.bill_total}
              </span>
            </Row>
          )} */}
          {/* COTTAGE END */}

          {/* SERVICE BEGIN */}
          {/* {accommodationType === 3 && (
            <Row className="tran-row">
              <span className="tran-total">
                Total: &nbsp;₱
                {accommodation.bill_total}
              </span>
            </Row>
          )} */}
          {/* SERVICE END */}
          {/* PAYMENT INFORMATION END */}

          <Row className="tran-row">
            <span className="guest-detail mb-3">Payment</span>
            <hr />
            <span className="tran-total">Amount Payable: &nbsp;₱{total}</span>
            <br />
            <Col className="mb-3" md={12}>
              <Form.Group controlId="billAmountPaid">
                <Form.Label>Amount Paid:</Form.Label>
                <Form.Control
                  className="amount-paid"
                  readOnly
                  type="number"
                  name="billAmountPaid"
                  value={accommodation.bill_amount_paid}
                />
              </Form.Group>
            </Col>

            <Col className="mb-3" md={6}>
              <Form.Group controlId="billAddExp">
                <Form.Label>Additional Charges:</Form.Label>
                <Form.Control
                  type="number"
                  readOnly
                  name="billAddExp"
                  value={accommodation.bill_additional_expenses}
                />
              </Form.Group>
            </Col>

            <Col className="mb-3" md={6}>
              <Form.Group>
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  readOnly
                  name="billAddDescrip"
                  value={accommodation.bill_additional_expenses_descrip || ""}
                />
              </Form.Group>
            </Col>

            <Col className="mb-3" md={6}>
              <Form.Group controlId="billDiscount">
                <Form.Label>Discount:</Form.Label>
                <Form.Control
                  type="number"
                  readOnly
                  name="billDiscount"
                  value={accommodation.bill_discount}
                />
              </Form.Group>
            </Col>

            <Col className="mb-3" md={6}>
              <Form.Group controlId="balance">
                <Form.Label>Balance:</Form.Label>
                <Form.Control
                  type="number"
                  name="balance"
                  readOnly
                  value={balance(
                    accommodation,
                    accommodationType,
                    accommodation
                  )}
                />
              </Form.Group>
            </Col>
            {balance(accommodation, accommodationType, accommodation) === 0 && (
              <p className="text-end fs-1 text-danger">Paid</p>
            )}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const totalDayOfStay = (arrival, departure) => {
  const checkIn = moment(arrival).format("YYYY-MM-DD HH:mm:ss");
  const checkOut = moment(departure).format("YYYY-MM-DD HH:mm:ss");

  const daysHoursOfStay = moment.preciseDiff(checkIn, checkOut, true);
  return `${daysHoursOfStay.days !== 0 ? daysHoursOfStay.days + "d" : ""} ${
    daysHoursOfStay.hours !== 0 ? daysHoursOfStay.hours + "h" : ""
  } ${daysHoursOfStay.minutes !== 0 ? daysHoursOfStay.minutes + "m" : ""}`;
};

function balance(data, type, accom) {
  const checkout = moment(data.line_checkout, "YYYY-MM-DD")
    .add(moment(data.line_checkin).format("HH:mm:ss"), "t")
    .format("YYYY-MM-DD HH:mm:ss");

  const totalDayOfStay = moment(data.line_checkout).diff(
    moment(data.line_checkin),
    "days"
  )
    ? moment(checkout).diff(moment(data.line_checkin), "days")
    : 1;
  const rate = rateOfAccommodationType(type, accom)
    ? rateOfAccommodationType(type, accom)
    : 0;
  const addExpenses = data.bill_additional_expenses
    ? parseInt(data.bill_additional_expenses)
    : 0;
  const discount = data.bill_discount ? parseInt(data.bill_discount) : 0;
  const amountPaid = data.bill_amount_paid
    ? parseInt(data.bill_amount_paid)
    : 0;

  return rate * totalDayOfStay + addExpenses - discount - amountPaid;
}

function rateOfAccommodationType(type, data) {
  if (type === 1) {
    return parseInt(data.room_rate);
  } else if (type === 2) {
    return parseInt(data.cot_rate);
  } else if (type === 3) {
    return parseInt(data.svcs_rate);
  }
}

export default ReservationModalCompleted;
