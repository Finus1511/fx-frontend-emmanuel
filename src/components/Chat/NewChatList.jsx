import React, { useState, useEffect } from "react";
import { Button, Form, Image, InputGroup } from "react-bootstrap";
import "./NewChat.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import { chatUser, fetchChatUsersStart, fetchMoreChatUsersStart, forceChatUsersSuccess } from "../../store/actions/ChatAction";
import CommonCenterLoader from "../Loader/CommonCenterLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import BroadCastModal from "./BroadCastModal";
import CustomLazyLoad from "../helper/CustomLazyLoad";

const NewChatList = (props) => {

  const [skipRender, setSkipRender] = useState(true);
  const [search, setSearch] = useState("");
  const [broadCast, setBroadCast] = useState(false);

  const closeBroadCastModal = () => {
    setBroadCast(false);
  };

  useEffect(() => {
    props.dispatch(fetchChatUsersStart({
      search_key: search,
    }));
  }, [search]);

  useEffect(() => {
    if (!skipRender && !props.chatMessages.loading && Object.keys(props.chatMessages.data).length > 0) {
      if (props.chatMessages.data.messages.length > 0) {
        const latestMsg = props.chatMessages.data.messages[0];
        const updatedUsers = {
          ...props.chatUsers.data,
          users: props.chatUsers.data.users.map((user) =>
            user.from_user_id === props.chatUser.user_id || user.to_user_id === props.chatUser.user_id
              ? {
                ...user,
                message: latestMsg.message ? latestMsg.message : latestMsg?.file_type?.toUpperCase(),
                time_formatted: latestMsg.time_formatted,
              }
              : user
          )
        };
        props.dispatch(forceChatUsersSuccess(updatedUsers));
      }
    }
  }, [props.chatMessages]);

  useEffect(() => {
    if (!skipRender && !props.chatUsers.loading) {
      if (!Object.keys(props.chatUsers.data).length > 0) {
        props.setShowContent(false);
      }
    }
    setSkipRender(false);
  }, [props.chatUsers]);

  const fetchMoreUsers = () => {
    props.dispatch(fetchMoreChatUsersStart({
      skip: props.chatUsers.data.users.length,
      take: 12,
      search_key: search,
    }));
  }

  return (
    <>
      <div className="new-chat-list-sec">
        <div className="new-chat-title-sec" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>{t("chats")}</h2>
          {props.profile.data.is_content_creator == 2 ? <Button className="default-btn" type="submit" onClick={() => setBroadCast(true)}>
            Broadcast
            <Image
              className="broadcast-icon"
              src={
                window.location.origin + "/assets/images/new-chat/broadcast-icon.svg"
              }
            />
          </Button> : null}
          <Link to='/community' className="default-btn community-btn">Community</Link>
        </div>
        <div className="new-chat-search-sec">
          <Form onSubmit={e => e.preventDefault()}>
            <InputGroup className="mb-0">
              <Form.Control
                placeholder={t("search")}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <InputGroup.Text id="basic-addon2">
                <Image
                  className="new-feeds-search-icon"
                  onClick={() => setSearch("")}
                  src={
                    search
                      ? window.location.origin +
                      "/assets/images/new-chat/close.png"
                      : window.location.origin +
                      "/assets/images/new-chat/search-icon.svg"
                  }
                />
              </InputGroup.Text>
            </InputGroup>
          </Form>
        </div>
        <div className="new-chat-list-wrapper-card">

          {props.chatUsers.loading ?
            <div className="new-chat-list-box">
              {[...Array(6)].map((val, i) =>
                <div className="new-chat-list-card" key={i} >
                  <div className="new-chat-list-user-msg-sec">
                    <div className="new-chat-list-user-img-sec">
                      <Skeleton circle={true} className="new-chat-list-user-img" />
                    </div>
                    <div className="new-chat-list-user-msg">
                      <Skeleton height={50} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            : props.chatUsers.data.users &&
              props.chatUsers.data.users.length > 0 ?
              <>
                <div style={{
                  maxHeight: 'calc(100vh - 190px)',
                  overflowY: 'auto',
                  // paddingRight: '1em',
                  marginTop: '2em'
                }} id="usersDiv">
                  <InfiniteScroll
                    dataLength={props.chatUsers.data.users.length}
                    next={fetchMoreUsers}
                    hasMore={props.chatUsers.data.users.length < props.chatUsers.data.total}
                    loader={<div className="new-chat-list-box">
                      {[...Array(6)].map((val, i) =>
                        <div className="new-chat-list-card" key={i} >
                          <div className="new-chat-list-user-msg-sec">
                            <div className="new-chat-list-user-img-sec">
                              <Skeleton circle={true} className="new-chat-list-user-img" />
                            </div>
                            <div className="new-chat-list-user-msg">
                              <Skeleton height={50} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    }
                    scrollableTarget="usersDiv"
                  >
                    <div className="new-chat-list-box">
                      {props.chatUsers.data.users.map((user, i) =>
                        <div className={`new-chat-list-card 
                        ${(!user.admin_id ? (user.to_user.user_id === props.chatUser?.user_id) : (user.admin.id == props.chatUser?.id))
                            ? "active" : ""
                          }
                        `}
                          key={i}
                          onClick={() => props.dispatch(chatUser(user.admin_id ? { ...user.admin, is_admin: 1, } : { ...user.to_user, is_admin: 0, is_user_needs_pay: user.is_user_needs_pay }))}>
                          <div className="new-chat-list-user-msg-sec">
                            <div className="new-chat-list-user-img-sec">
                              <CustomLazyLoad
                                className="new-chat-list-user-img"
                                src={user.admin_id ? user.admin.picture : user.to_userpicture}
                              />
                            </div>
                            <div className="new-chat-list-user-msg">
                              <h4>{!user.admin_id ? user.to_displayname : "Admin*"}</h4>
                              <p>{user.message}</p>
                            </div>
                          </div>
                          <div className="new-chat-list-notify-sec">
                            <div className="new-chat-list-time-sec">
                              <p>{user.time_formatted}</p>
                            </div>
                            {/* <div className="new-chat-list-new-msg-notify-sec">
                          5
                        </div> */}
                          </div>
                        </div>
                      )}
                    </div>
                  </InfiniteScroll>
                </div>
              </>
              : <>
                {search ?
                  <Image
                    style={{ width: "100%" }}
                    alt="No user found"
                    src={window.location.origin + "/assets/images/new-chat/no-user-found.png"} />
                  : <div className="no-chats-container">
                    <Image
                      style={{ width: "100%" }}
                      src={window.location.origin + "/assets/images/new-chat/no-chats-yet.png"} />
                    <Link to="/explore">
                      {t("explore")}
                    </Link>
                  </div>
                }
              </>
          }
        </div>
      </div>
      {broadCast ?
        <BroadCastModal
          broadCast={broadCast}
          closeBroadCastModal={closeBroadCastModal}
          setBroadCast={setBroadCast}
        />
        : null}
    </>
  );
};

const mapStateToPros = (state) => ({
  chatUsers: state.chat.chatUsers,
  chatUser: state.chat.chatUser,
  chatMessages: state.chat.chatMessages,
  profile: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(NewChatList));