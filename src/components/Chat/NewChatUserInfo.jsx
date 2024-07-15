import React from "react";
import "./NewChat.css";
import NewChatUserDetails from "./NewChatUserDetails";
import NewChatUserMedia from "./NewChatUserMedia";

const NewChatUserInfo = (props) => {
  return (
    <>
      <NewChatUserDetails selectedUser={props.selectedUser} />
      <NewChatUserMedia selectedUser={props.selectedUser} />
    </>
  );
};

export default NewChatUserInfo;
