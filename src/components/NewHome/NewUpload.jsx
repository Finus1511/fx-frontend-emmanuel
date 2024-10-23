import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./NewUpload.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import CreatePostModal from "../Post/CreatePost/CreatePostModal";
import { translate, t } from "react-multi-lang";

const NewUpload = () => {

  const profile = useSelector((state) => state.users.profile);
  const fileUpload = useSelector((state) => state.post.fileUpload);
  const savePost = useSelector((state) => state.post.savePost);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    localStorage.getItem("is_content_creator") == 2 && (
      <>
        <div className="upload">
          <div className="upload-flex">
            <div className="upload-profile">
              <Link to="">
                <img src={profile.data.picture} alt="" />
              </Link>
            </div>
            <div className="upload-modal">
              <Button onClick={handleShow}>What's on your mind, {profile.data.name}?</Button>
            </div>
          </div>
          <div className="upload-btn">
            <Button onClick={handleShow}>
              <img src="assets/images/post/post-image-upload.svg" alt="" />
              <p>Image</p>
            </Button>
            <Button onClick={handleShow}>
              <img src="assets/images/post/post-video-upload.svg" alt="" />
              <p>Video</p>
            </Button>
            <Button onClick={handleShow}>
              <img src="assets/images/post/post-audio-upload.svg" alt="" />
              <p>Audio</p>
            </Button>
            <Button onClick={handleShow}>
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
          <CreatePostModal />
        </Modal>
      </>
    )
  );
};

export default translate(NewUpload);
