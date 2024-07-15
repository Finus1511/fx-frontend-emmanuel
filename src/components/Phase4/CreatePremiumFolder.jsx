import React from "react";
import { Image, Button } from "react-bootstrap";
import CreateFolderModal from "./CreateFolderModal";

const CreatePremiumFolder = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="tabs-create-folder-sec">
      <div className="folder-img-sec">
        <Image
          src="assets/images/phase4/folder-img.png"
          className="folder-img"
        />
      </div>
      <div className="create-folder-info">
        <h4>No Folders</h4>
        <p>
          There are currently no folders to display. Please create a <br /> new
          folder to get started{" "}
        </p>
        <Button
          className="default-btn profile-sidebar-broadcast-btn"
          type="button"
          onClick={() => setModalShow(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="none"
            viewBox="0 0 15 15"
          >
            <path
              fill="#fff"
              d="M14.5 8.95h-6v6h-2v-6h-6v-2h6v-6h2v6h6v2z"
            ></path>
          </svg>
          Create Folder
        </Button>
        <CreateFolderModal
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            resetForm();
            setSelectedImages(null);
          }}
        />
      </div>
    </div>
  );
};

export default CreatePremiumFolder;
