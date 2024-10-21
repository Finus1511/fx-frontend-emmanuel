import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./NewUpload.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CreatePostIndex from "../Post/CreatePost/CreatePostIndex";

const NewUpload = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="upload">
        <div className="upload-flex">
          <div className="upload-profile">
            <Link to="">
              <img src="assets/images/profile-img.png" alt="" />
            </Link>
          </div>
          <div className="upload-modal">
            <Button onClick={handleShow}>What's on your mind, username?</Button>
          </div>
        </div>
        <div className="upload-btn">
          <Button>
            <img src="assets/images/post/post-image-upload.svg" alt="" />
            <p>Image</p>
          </Button>
          <Button>
            <img src="assets/images/post/post-video-upload.svg" alt="" />
            <p>Video</p>
          </Button>
          <Button>
            <img src="assets/images/post/post-audio-upload.svg" alt="" />
            <p>Audio</p>
          </Button>
          <Button>
            <img src="assets/images/post/link.svg" alt="" />
            <p>Link</p>
          </Button>
        </div>
      </div>

      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
        onHide={handleClose}
        className="pay-amount-modal new-upload"
      >
        <Modal.Header closeButton>
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreatePostIndex />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn gradient-btn postBtn gradientcolor text-uppercase w-unset"
            onClick={handleClose}
          >
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewUpload;
