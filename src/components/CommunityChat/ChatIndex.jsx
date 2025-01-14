import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import "../Chat/NewChat.css";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import useWindowDimensions from "../helper/WindowHelper";
import { translate, t } from "react-multi-lang";
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import ChatUserInfo from "./ChatUserInfo";

const ChatIndex = (props) => {
  const history = useHistory();

  const [showContent, setShowContent] = useState(true);
  const [skipRender, setSkipRender] = useState(true);
  const [selectedUser, setSelectedUser] = useState();
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (props.chatUser) {
      setTimeout(() => {
        setSelectedUser(props.chatUser);
        if (!skipRender && width < 768) {
          history.push("/chat-room");
        }
      }, 100);
    }
    setSkipRender(false);
  }, [props.chatUser]);

  // useEffect(() => {
  //   if (selectedUser) {
  //     props.dispatch(chatUser(selectedUser));
  //   }
  // }, [selectedUser]);

  return (
    <>
      <div className="new-chat-sec">
        {showContent ? (
          <div className="new-chat-box">
            <ChatList
              setShowContent={setShowContent}
              setSelectedUser={setSelectedUser}
            />
            {selectedUser ? (
              <>
                <div className="new-chat-room-sec mobile-hide">
                  <ChatRoom
                    selectedUser={selectedUser}
                    setShowContent={setShowContent}
                  />
                </div>
                <div className="new-chat-user-info">
                  <ChatUserInfo selectedUser={selectedUser} />
                </div>
              </>
            ) : (
              <div className="new-chat-room-sec start-conversation-container mobile-hide">
                <Image
                  className="start-conversation"
                  src={
                    window.location.origin +
                    "/assets/images/new-chat/start-new-conversation.png"
                  }
                />
              </div>
            )}
          </div>
        ) : (
          <div className="chat-something-went-wrong">
            <Image
              src={
                window.location.origin +
                "/assets/images/new-chat/something-went-wrong.png"
              }
            />
            <button
              className="btn gradient-btn gradientcolor btn btn-primary retry-btn"
              onClick={() => {
                setSelectedUser(null);
                setShowContent(true);
              }}
            >
              {t("retry")}
            </button>
            <Link to="/home">{"home"}</Link>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  chatUser: state.community.communityUser,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(ChatIndex));
