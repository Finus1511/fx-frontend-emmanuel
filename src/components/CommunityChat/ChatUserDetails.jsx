import React, { useEffect, useState } from "react";
import "../Chat/NewChat.css";
import CustomLazyLoad from "../helper/CustomLazyLoad";
import { Image } from "react-bootstrap";
import CropImageModal from "../Accounts/Profile/CropImageModal";
import imageCompression from "browser-image-compression";
import { updateCommunityDetailsStart } from "../../store/actions/CommunityAction";
import { useDispatch } from "react-redux";
import UpdateCommunity from "./UpdateCommunity";

const ChatUserDetails = (props) => {

  const dispatch = useDispatch();

  const userId = localStorage.getItem("userId");

  const [skipRender, setSkipRender] = useState(true);
  const [updateCommunity, setUpdateCommunity] = useState(false);
  const [profileInputData, setProfileInputData] = useState({
    picture: "",
  });
  const [image, setImage] = useState({
    picture: "",
  });
  const [cropModalFlag, setCropModalFlag] = useState({
    flag: false,
    image: "",
    width: "",
    height: "",
    shape: "",
    type: "",
    fileType: "",
    fileName: "",
  });

  const closeUpdateCommunity = () => {
    setUpdateCommunity(false);
  }

  const closeCropModal = () => {
    setCropModalFlag({
      flag: false,
      image: "",
      width: "",
      height: "",
      shape: "",
      cropedProfileImage: "",
      cropedCoverImage: "",
      type: "",
      fileType: "",
      fileName: "",
    });
  };

  const handleChangeImage = (event) => {
    if (event.currentTarget.type === "file") {
      const currentfileType = event.currentTarget?.files[0].type;
      const currentfileName = event.currentTarget?.files[0].name;
      let reader = new FileReader();
      let file = event.currentTarget?.files[0];
      let imageFile = event.currentTarget?.files[0];
      let currentInputName = event.currentTarget.name;
      var options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      imageCompression(imageFile, options)
        .then(function (compressedFile) {
          var croppedReader = new FileReader();
          croppedReader.readAsDataURL(compressedFile);
          croppedReader.onloadend = function () {
            var base64data = croppedReader.result;

            if (currentInputName === "picture") {
              setCropModalFlag({
                ...cropModalFlag,
                image: base64data,
                width: 1,
                height: 1,
                shape: "round",
                flag: true,
                type: "picture",
                fileType: currentfileType,
                fileName: currentfileName,
              });
            }
          };
        })
        .catch(function (error) { });

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  useEffect(() => {
    if (!skipRender) {
      dispatch(
        updateCommunityDetailsStart({
          community_id: props.selectedUser.community_id,
          picture: profileInputData.picture,
        })
      );
    }
    setSkipRender(false);
  }, [profileInputData.picture]);

  return (
    <>
      <div className="new-chat-user-info-card">
        <div className="new-chat-user-info-cover-img-sec">
          <CustomLazyLoad
            src={window.location.origin + "/assets/images/creator-list/creator-list-img-1.png"}
            className={"new-chat-user-info-cover-img-sec"}
          />
        </div>
        <div className="new-chat-user-info-img-sec">
          <div className="image-upload">
            <label for="changePicture">
              <Image
                className="new-settings-user-img profile-image"
                src={props.selectedUser.picture}
              />
              {props.selectedUser.user_id == userId && (
                <div className="upload-cover-icon community-pic-edit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-camera-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                  </svg>
                </div>
              )}
            </label>
            {props.selectedUser.user_id == userId && (
              <input
                accept="image/*"
                id="changePicture"
                type="file"
                name="picture"
                onChange={handleChangeImage}
              />
            )}
          </div>
        </div>
        <div className="new-chat-user-info-item">
          <div>
            <h4>{props.selectedUser.name}
              {props.selectedUser.user_id == userId && (
                <span className="edit-community" onClick={() => setUpdateCommunity(true)}>
                  <Image
                    className="sidebar-links-icon ml-3"
                    src={
                      window.location.origin +
                      "/assets/images/new-home/icon/edit-profile-theme-1.svg"
                    }
                  />
                </span>
              )}
            </h4>
          </div>
        </div>
      </div>
      <CropImageModal
        image={cropModalFlag.image}
        modalFlag={cropModalFlag.flag}
        cropModalFlag={cropModalFlag}
        closeModal={closeCropModal}
        setImage={setImage}
        imageState={image}
        setProfileInputData={setProfileInputData}
        profileInputData={profileInputData}
      />
      {updateCommunity &&
        <UpdateCommunity
          selectedUser={props.selectedUser}
          closeUpdateCommunity={closeUpdateCommunity}
          updateCommunity={updateCommunity}
        />
      }
    </>
  );
};

export default ChatUserDetails;
