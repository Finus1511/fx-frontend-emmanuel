import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Image,
  Form,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./Phase4.css";

const PremiunFolderDetail = () => {
  const history = useHistory();

  return (
    <div className="new-home-page-sec mb-0">
      <Container fluid>
        <div className="personalized-request-box">
          <Row className="align-items-center">
            <Col md={12}>
              <div className="personalized-table-head">
                <div className="personalized-table-back">
                  <Link to="#" onClick={() => history.goBack()}>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        enableBackground="new 0 0 512 512"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#9f4298"
                          d="M4.943 5.606L1.024 9.525a3.585 3.585 0 000 4.95l3.919 3.919a1.5 1.5 0 102.121-2.121l-2.779-2.781 18.25-.023a1.5 1.5 0 001.5-1.5 1.5 1.5 0 00-1.5-1.5L4.3 10.492l2.764-2.765a1.5 1.5 0 00-2.121-2.121z"
                        ></path>
                      </svg>
                    </span>
                    <span className="personalized-request-back-info">Back</span>
                  </Link>
                  <div className="table-heading">
                    <h4>Mermaids</h4>
                    <p>
                      The list goes on and on. Because we know that you're
                      pressing questions standard dummy text ever since the
                      1500s standard dummy since
                    </p>
                  </div>
                </div>
              </div>
              <div className="premium-folder-file-upload">
                <div className="tabs-create-folder-sec">
                  <div className="folder-img-sec">
                    <Image
                      src="assets/images/phase4/folder-img.png"
                      className="folder-img"
                    />
                  </div>
                  <div className="create-folder-info">
                    <h4>No Files</h4>
                    <p className="create-folder-info-text">
                      There are currently no folders to display. Please create a{" "}
                      <br />
                      new folder to get started
                      {/* latter have to remove */}
                      {/* <Link to="/premium-folder-file">See Uploads</Link> */}
                    </p>
                  </div>
                  <div className="premium-folder-upload-btn">
                    <Button className="default-btn">Upload</Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default PremiunFolderDetail;
