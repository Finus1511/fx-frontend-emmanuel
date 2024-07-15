import React, { useState } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media } from "react-bootstrap";
import "./NewHome.css";
import { Link } from "react-router-dom";
import NewFeedDisplayCard from "./NewFeedDisplayCard";

const NewFeedIndex = (props) => {

    return (
        <>
            <div className="new-feed-sec">
                <NewFeedDisplayCard/>
            </div>
        </>
    );
};

export default NewFeedIndex;
