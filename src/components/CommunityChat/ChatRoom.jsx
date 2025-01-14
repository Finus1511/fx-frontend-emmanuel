import React, { useEffect, useRef, useState } from "react";
import { Form, Image, InputGroup } from "react-bootstrap";
import "../Chat/NewChat.css";
import { useHistory } from "react-router-dom";
import ReceivedChat from "../Chat/ReceivedChat";
import { translate, t } from "react-multi-lang";
import { connect } from "react-redux";
import FancyBox from "../NewHome/NewSingleView/FancyBox";
import InfiniteScroll from "react-infinite-scroll-component";
import configuration from "react-global-configuration";
import io from "socket.io-client";
import dayjs from "dayjs";
import NewChatUserInfo from "../Chat/NewChatUserInfo";
import useWindowDimensions from "../helper/WindowHelper";
import CustomLazyLoad from "../helper/CustomLazyLoad";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import ChatUploadModal from "./ChatUploadModal";
import { fetchCommunityMessagesStart, fetchMoreCommunityMessagesStart, forceCommunityMessagesSuccess, updateCommunityMessagesSuccess } from "../../store/actions/CommunityAction";
import SendChat from "./SendChat";

let chatSocket;

const ChatRoom = (props) => {
  const history = useHistory();
  const { width } = useWindowDimensions();

  const userId = localStorage.getItem("userId");

  const chatSocketUrl = configuration.get("configData.chat_socket_url");
  const [skipRender, setSkipRender] = useState(true);
  const [newChatUpload, setNewChatUpload] = useState(false);
  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [cursorPointer, setCursorPointer] = useState(0);
  const [isChat, setIsChat] = useState(true);
  const [newMsg, setNewMsg] = useState(false);
  const messageField = useRef();
  const latest = useRef();

  let chatDate = "";
  let index = 0;

  useEffect(() => {
    if (width >= 992) {
      setIsChat(true);
    }
  }, [width]);

  useEffect(() => {
    if (newMsg) {
      const rect = latest.current.getBoundingClientRect();
      const container = document
        .getElementById("scrollableDiv")
        .getBoundingClientRect();
      if (rect.bottom > container.bottom + 10) {
        // showNewMsg(true);
        // const notificationMessage = getSuccessNotificationMessage("New Message Received");
        // props.dispatch(createNotification(notificationMessage));
      }
    }
    setNewMsg(false);
  }, [newMsg]);

  useEffect(() => {
    props.chatUser && props.dispatch(
      fetchCommunityMessagesStart({
        community_id: props.chatUser.community_id,
      })
    );
    if (chatSocket) {
      chatSocket.disconnect();
    }
    chatSocketConnect(props.selectedUser.user_id);
    setIsChat(true);
    return () => {
      if (chatSocket) {
        chatSocket.disconnect();
      }
    };
  }, [props.selectedUser.user_id]);

  useEffect(() => {
    if (!skipRender) {
      messageField.current.selectionEnd = cursorPointer;
    }
  }, [cursorPointer]);

  const fetchMoreMessages = () => {
    props.dispatch(
      fetchMoreCommunityMessagesStart({
        skip: props.chatMessages.data.messages.length,
        take: 12,
        community_id: props.chatUser.community_id,
      })
    );
  };

  useEffect(() => {
    if (!skipRender && !props.chatMessages.loading) {
      if (!Object.keys(props.chatMessages.data).length > 0) {
        props.setShowContent(false);
      }
    }
    setSkipRender(false);
  }, [props.chatMessages]);

  const closeNewChatUploadModal = () => {
    setNewChatUpload(false);
  };

  const chatSocketConnect = (to_user_id) => {
    // check the socket url is configured
    console.log("chatSocket", chatSocketUrl);
    console.log("Input ID", to_user_id);
    if (chatSocketUrl) {
      chatSocket = io(chatSocketUrl, {
        query: `commonid:'community_id_${props.chatUser.community_id}',room: community_id_${props.chatUser.community_id}`,
      });
      console.log("chatSocket", chatSocket);
      chatSocket.emit("update sender", {
        commonid: `community_id_${props.chatUser.community_id}`,
        myid: userId,
        room: `community_id_${props.chatUser.community_id}`,
      });
      chatSocket.on("community_message", (newData) => {
        console.log(newData);
        setNewMsg(true);
        const now = new Date();
        const date = `${("0" + now.getDate()).slice(-2)} ${now.toLocaleString(
          "default",
          { month: "short" }
        )} ${now.getFullYear()}`;
        const time = dayjs(now).format("hh:mm a");
        props.dispatch(updateCommunityMessagesSuccess({
          ...newData, date_formatted: date,
          time_formatted: time
        }));
        const updatedUsers = {
          ...props.chatUsers.data,
          communities: props.chatUsers.data.communities.map((user) =>
            user.community_id == newData.community_id
              ? {
                ...user,
                message: newData.message ? newData.message : newData?.file_type?.toUpperCase(),
                time_formatted: newData.time_formatted,
              }
              : user
          )
        };
        props.dispatch(forceCommunityMessagesSuccess(updatedUsers));
      });
    }
  };

  // Message Send
  const handleMessageSubmit = ({
    fileType = "text",
    chatAssets = [],
  }) => {
    if ((message && message.trim()) || chatAssets.length > 0) {
      const now = new Date();
      const date = `${("0" + now.getDate()).slice(-2)} ${now.toLocaleString(
        "default",
        { month: "short" }
      )} ${now.getFullYear()}`;
      const time = dayjs(now).format("hh:mm a");

      const chatData = {
        community_id: props.chatUser.community_id,
        from_user_id: userId,
        message: message,
        file_type: fileType,
        loggedin_user_id: userId,
        chat_asset_id: chatAssets
          .map((asset) => asset.community_asset_id)
          .toString(),
        date_formatted: date,
        time_formatted: time,
        chat_message_reference_id: generateString(6),
      };
      chatSocket.emit("community_message", chatData);

      setMessage("");
      props.dispatch(
        updateCommunityMessagesSuccess({ ...chatData, chat_assets: chatAssets })
      );
      setNewChatUpload(false);
      setShowEmojis(false);
      messageField.current.focus();
      latest.current.scrollIntoView();
    }
  };

  const handleToggleEmojis = () => {
    messageField.current.focus();
    setShowEmojis(!showEmojis);
  };

  const onEmojiPick = (data) => {
    const ref = messageField.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const text = start + data.native + end;
    setMessage(text);
    setCursorPointer(start.length + data.native.length);
  };

  if (props.chatMessages.data.messages && props.chatMessages.data.messages.length > 0) {
    chatDate = props.chatMessages.data.messages[0].date_formatted;
    index = props.chatMessages.data.messages.length;
  }

  const updateChatDate = (newDate) => {
    chatDate = newDate;
    index--;
  };

  useEffect(() => {
    if (!skipRender && !props.chatMessageDelete.loading && Object.keys(props.chatMessageDelete.data).length > 0) {
      props.dispatch(
        fetchCommunityMessagesStart({
          community_id: props.chatUser.community_id
        })
      );
    }
    setSkipRender(false);
  }, [props.chatMessageDelete])

  function generateString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result = Date.now() + result;
    return result.replace(" ", '');
  }

  const handleSocketDelete = (chat_message_reference_id) => {
    chatSocket.emit('community message delete', {
      chat_message_reference_id: chat_message_reference_id,
    })
  }

  useEffect(() => {
    if (props.chatMessages?.data?.messages?.length > 0) {
      if (chatSocket) {
        chatSocket.on("community message delete", (newData) => {
          props.dispatch(updateCommunityMessagesSuccess({
            delete: 1,
            messages: props.chatMessages?.data?.messages.filter(item => item.reference_id != newData.chat_message_reference_id)
          }));
        });
      }
    }
  }, [props.chatMessages])

  return (
    <>
      <div className="new-chat-room-header-sec">
        <div
          className="new-chat-room-user-details"
          onClick={(e) =>
            width < 992 ? setIsChat(!isChat) : e.preventDefault()
          }
        >
          <div
            className="back-btn-mobile-show"
            onClick={() => history.push("/inbox")}
          >
            <Image
              className="back-btn-mobile"
              src={
                window.location.origin + "/assets/images/new-chat/back-icon.svg"
              }
            />
          </div>
          <div className="new-chat-room-user-img-sec">
            <CustomLazyLoad
              src={props.selectedUser.picture}
              className={"new-chat-room-user-img"}
            />
          </div>
          <div className="new-chat-room-user-name">
            <h4>{props.selectedUser.name}</h4>
          </div>
        </div>
      </div>
      {isChat ? (
        <>
          {props.chatMessages.data.messages ? (
            <>
              <div
                className="new-chat-room-message-sec"
                id="scrollableDiv"
                style={{
                  minHeight: "calc(100vh - 220px)",
                  maxHeight: "calc(100vh - 215px)",
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column-reverse",
                  marginTop: "0em",
                }}
              >
                <InfiniteScroll
                  dataLength={props.chatMessages.data.messages.length}
                  next={fetchMoreMessages}
                  hasMore={
                    props.chatMessages.data.messages.length <
                    props.chatMessages.data.total
                  }
                  loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
                  inverse={true}
                  style={{
                    padding: "2em",
                    display: "flex",
                    flexDirection: "column-reverse",
                    overflow: "inherit",
                  }}
                  scrollableTarget="scrollableDiv"
                >
                  <div ref={latest} />
                  <FancyBox
                    delegate={"[data-fancybox-chat]"}
                    options={{ groupAll: true }}
                  >
                    {props.chatMessages.data.messages.map((message, i) => (
                      <>
                        {/* {chatDate != message.date_formatted ? (
                          <div
                            className="chat-day-container"
                            style={{ zIndex: index }}
                          >
                            <div className="chat-day">
                              {chatDate}
                              {updateChatDate(message.date_formatted)}
                            </div>
                          </div>
                        ) : null} */}
                        {message.from_user_id == userId ? (
                          <SendChat message={message} handleSocketDelete={handleSocketDelete} key={i} />
                        ) : (
                          <ReceivedChat message={message} key={i} />
                        )}
                      </>
                    ))}
                    {chatDate ? (
                      <div
                        className="chat-day-container"
                        style={{ zIndex: index }}
                      >
                        <div className="chat-day">{chatDate}</div>
                      </div>
                    ) : null}
                  </FancyBox>
                </InfiniteScroll>
              </div>
              {props.chatUser.user_id == userId && (
                <div className="new-chat-room-input-sec">
                  <Form
                    className="new-chat-room-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleMessageSubmit({});
                    }}
                  >
                    <div
                      className={`emoji-container ${showEmojis ? "show" : "hide"
                        }`}
                    >
                      <Picker
                        data={data}
                        onEmojiSelect={onEmojiPick}
                        onClickOutside={() => {
                          console.log("Outside triggered");
                          if (showEmojis) setShowEmojis(false);
                        }}
                      />
                    </div>
                    <InputGroup className="mb-0">
                      <InputGroup.Text onClick={() => handleToggleEmojis()}>
                        <Image
                          className="new-chat-emoji-icon"
                          src={
                            window.location.origin +
                            "/assets/images/feed-story/comments-emoji.svg"
                          }
                        />
                      </InputGroup.Text>
                      <Form.Control
                        ref={messageField}
                        placeholder={t("type_something")}
                        value={!newChatUpload ? message : ""}
                        onChange={(e) => setMessage(e.target.value)}
                        // onKeyPress={e => {
                        //   if (e.key === "Enter")
                        //     handleMessageSubmit({})
                        // }}
                        autoFocus={true}
                        on
                      />
                      <InputGroup.Text onClick={() => setNewChatUpload(true)}>
                        <Image
                          className="new-chat-file-icon"
                          src={
                            window.location.origin +
                            "/assets/images/new-chat/attach-file.png"
                          }
                        />
                      </InputGroup.Text>
                      <InputGroup.Text onClick={() => handleMessageSubmit({})}>
                        <Image
                          className="new-chat-send-icon"
                          src={
                            window.location.origin +
                            "/assets/images/feed-story/comments-send.svg"
                          }
                        />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form>
                </div>
              )}
            </>
          ) : null}
        </>
      ) : (
        <NewChatUserInfo selectedUser={props.selectedUser} />
      )}
      {newChatUpload ? (
        <ChatUploadModal
          newChatUpload={newChatUpload}
          selectedUser={props.selectedUser}
          message={message}
          setMessage={setMessage}
          handleMessageSubmit={handleMessageSubmit}
          closeNewChatUploadModal={closeNewChatUploadModal}
          setNewChatUpload={setNewChatUpload}
        />
      ) : null}
    </>
  );
};

const mapStateToPros = (state) => ({
  chatMessages: state.community.communityMessages,
  chatMessageDelete: state.community.communityMessageDelete,
  profile: state.users.profile,
  chatUser: state.community.communityUser,
  chatUsers: state.community.communityUsers,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(ChatRoom));
