import React from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Image,
  Button,
  InputGroup,
  FormControl
} from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminBookingList = () => {
  return (
    <>
      <div className="admin-booking-list-wrapped">
        <Container>
          <Row>
            <Col sm={12} md={12}>
              <div className="admin-booking-list-info">
                <Link
                  className="bookmarkes-list notify-title back-button"
                >
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/back.svg"
                    }
                    className="svg-clone"
                  />
                  Booking List
                </Link>
                <p className="text-muted f-2">
                  The list contains the call requests which made by you, it will contain the requests which you received from other users.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md={12}>
            <div className="table-wrap">
              <div className="new-feed-search-sec admin-booking-search">
                <InputGroup className="mb-0">
                  <FormControl
                    placeholder="search"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Text id="basic-addon2">
                    <Image
                      className="new-feeds-search-icon"
                      src={
                        window.location.origin +
                        "/assets/images/feed-story/search-icon.svg"
                      }
                    />
                  </InputGroup.Text>
                </InputGroup>
              </div>
              <div className="admin-booking-table">
              <Table  hover className="m-0">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Creator Name</th>
                    <th>User Name</th>
                    <th>Amount</th>
                    <th>Scheduled at</th>
                    <th>End Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Steeve</td>
                    <td>10.00 Token</td>
                    <td>14 Dec 2023 12:30 PM</td>
                    <td>01:00 PM</td>
                    <td>Request Accepted</td>
                    <td> <span className=" booking-status start-status"> Start Call</span></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Mark</td>
                    <td>Steeve</td>
                    <td>10.00 Token</td>
                    <td>14 Dec 2023 12:30 PM</td>
                    <td>01:00 PM</td>
                    <td>Request Accepted</td>
                    <td><span className=" booking-status end-status"> End Call</span></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Mark</td>
                    <td>Steeve</td>
                    <td>10.00 Token</td>
                    <td>14 Dec 2023 12:30 PM</td>
                    <td>01:00 PM</td>
                    <td>Request Accepted</td>
                    <td><span className=" booking-status end-status"> End Call</span></td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Mark</td>
                    <td>Steeve</td>
                    <td>10.00 Token</td>
                    <td>14 Dec 2023 12:30 PM</td>
                    <td>01:00 PM</td>
                    <td>Request Accepted</td>
                    <td><span className=" booking-status end-status"> End Call</span></td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Mark</td>
                    <td>Steeve</td>
                    <td>10.00 Token</td>
                    <td>14 Dec 2023 12:30 PM</td>
                    <td>01:00 PM</td>
                    <td>Request Accepted</td>
                    <td><span className=" booking-status end-status"> End Call</span></td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Mark</td>
                    <td>Steeve</td>
                    <td>10.00 Token</td>
                    <td>14 Dec 2023 12:30 PM</td>
                    <td>01:00 PM</td>
                    <td>Request Accepted</td>
                    <td><span className=" booking-status end-status"> End Call</span></td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>Mark</td>
                    <td>Steeve</td>
                    <td>10.00 Token</td>
                    <td>14 Dec 2023 12:30 PM</td>
                    <td>01:00 PM</td>
                    <td>Request Accepted</td>
                    <td><span className=" booking-status end-status"> End Call</span></td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>Mark</td>
                    <td>Steeve</td>
                    <td>10.00 Token</td>
                    <td>14 Dec 2023 12:30 PM</td>
                    <td>01:00 PM</td>
                    <td>Request Accepted</td>
                    <td><span className=" booking-status end-status"> End Call</span></td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>Mark</td>
                    <td>Steeve</td>
                    <td>10.00 Token</td>
                    <td>14 Dec 2023 12:30 PM</td>
                    <td>01:00 PM</td>
                    <td>Request Accepted</td>
                    <td><span className=" booking-status end-status"> End Call</span></td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>Mark</td>
                    <td>Steeve</td>
                    <td>10.00 Token</td>
                    <td>14 Dec 2023 12:30 PM</td>
                    <td>01:00 PM</td>
                    <td>Request Accepted</td>
                    <td><span className=" booking-status end-status"> End Call</span></td>
                  </tr>
                  <tr>
                    <td>11</td>
                    <td>Mark</td>
                    <td>Steeve</td>
                    <td>10.00 Token</td>
                    <td>14 Dec 2023 12:30 PM</td>
                    <td>01:00 PM</td>
                    <td>Request Accepted</td>
                    <td><span className=" booking-status end-status"> End Call</span></td>
                  </tr>
                </tbody>
              </Table>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default AdminBookingList;