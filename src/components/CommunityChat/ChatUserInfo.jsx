import React from "react";
import "../Chat/NewChat.css";
import ChatUserDetails from "./ChatUserDetails";
import ChatUserMedia from "./ChatUserMedia";

const ChatUserInfo = (props) => {
  return (
    <>
      <ChatUserDetails selectedUser={props.selectedUser} />
      <ChatUserMedia selectedUser={props.selectedUser} />
    </>
  );
};

export default ChatUserInfo;
