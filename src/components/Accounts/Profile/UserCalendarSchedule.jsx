import React, { useState } from "react";
import {
    Modal,
    Container,
    Row,
    Col,
    Button,
    Form,
    Image,
    Tab,
    Nav,
    Media,
} from "react-bootstrap";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import InputSpinner from 'react-bootstrap-input-spinner';


const UserCalendarSchedule = (props) => {
    const [selectedDay, setSelectedDay] = useState(null);
    const value = "1";
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="user-calendar-modal"
            >
                {/* <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    </Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    <Row>
                        <Col md={6} lg={6}>
                            <div className="schedule-calendar-frame">
                                <Calendar
                                    value={selectedDay}
                                    onChange={setSelectedDay}
                                    shouldHighlightWeekends
                                />
                            </div>
                        </Col>
                        <Col md={6} lg={6}>
                            <div className="user-schedule-full-sec">
                            <div className="user-schedule-card-wrapped">
                                <div className="user-schedule-card-header">
                                    <h3>Availability</h3>
                                    <p>15 Dec 2023</p>
                                </div>
                                <div className="user-schedule-info-card">
                                    <div className="user-schedule-info-frame">
                                        <h4>Price Per Person</h4>
                                        <h4>$50</h4>
                                    </div>
                                    <div className="user-schedule-info-frame">
                                        <h4>Room Capacity (Max)</h4>
                                        <InputSpinner
                                            type={'real'}
                                            precision={2}
                                            max={100}
                                            min={0}
                                            step={1}
                                            value={value}
                                            onChange={num => console.log(num)}
                                            variant={'dark'}
                                            size="sm"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="user-schedule-card-btn">
                                <Button className="schedule-cancel-btn" onClick={props.onHide}>Cancel</Button>
                                <Button className="settings-submit-btn">Send Request</Button>
                            </div>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
};
export default UserCalendarSchedule;