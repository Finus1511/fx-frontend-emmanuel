import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Button,
  InputGroup,
  FormControl,
  Image,
  Form,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { translate, t } from "react-multi-lang";
import { Picker } from "emoji-mart3";
import { useDispatch, useSelector } from "react-redux";
import { fetchLiveVideoMessageStart } from "../../store/actions/ProductLiveStreamAction";
import NoDataFound from "../NoDataFound/NoDataFound";
import CustomLazyLoad from "../helper/CustomLazyLoad";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom/cjs/react-router-dom";

const LiveStreamingComments = ({ id, chatSocket }) => {
  const dispatch = useDispatch();
  const [inputMessage, setInputMessage] = useState("");
  const [emojiPickerState, SetEmojiPicker] = useState(false);
  const [liveStreamState, setLiveStreamState] = useState({
    update: false,
    data: null,
  });
  const chatInputRef = useRef();
  const liveVideoChat = useSelector(
    (state) => state.productLiveStream.liveVideoChat
  );
  const profile = useSelector((state) => state.users.profile);
  const [commentsList, setCommentsList] = useState([]);
  const [messageReceived, setMessageReceived] = useState();
  const [descShow, setDescShow] = React.useState(false);
  const productLiveStreamView = useSelector(
    (state) => state.productLiveStream.productLiveStreamView
  );

  const lastMsgRef = useRef();

  const handleEmojiSelect = (emoji) => {
    SetEmojiPicker(false);
    setInputMessage(inputMessage + emoji.native);
    chatInputRef.current.focus();
  };

  function triggerPicker(event) {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  }

  useEffect(() => {
    dispatch(
      fetchLiveVideoMessageStart({
        live_stream_shopping_unique_id: id,
      })
    );
    if (chatSocket !== undefined) {
      chatSocket.on(`live_video_message_${id}`, (newData) => {
        let content = [];
        content.push(newData);
        setMessageReceived(newData);
      });
    }
  }, [chatSocket]);

  const handleChatSubmit = (event) => {
    event.preventDefault();
    if (
      !/<\s*script\s*>|<\s*\/\s*script\s*>|[<>!@#$%^&*()_+=[\]{};':"\\|/]+/i.test(
        inputMessage
      ) &&
      inputMessage.trim().length > 0
    ) {
      let chatData = [
        {
          live_stream_shopping_unique_id: id,
          user_id: localStorage.getItem("userId"),
          message: inputMessage,
          from_displayname: profile.data.name,
          from_userpicture: profile.data.picture,
        },
      ];
      chatSocket.emit("live_video_message", chatData[0]);
      // props.dispatch(addLiveVideoMessageContent(chatData));
      setInputMessage("");
      setCommentsList([...commentsList, ...chatData]);
    }
  };

  useEffect(() => {
    if (!liveVideoChat.loading && Object.keys(liveVideoChat.data).length > 0) {
      setCommentsList([
        ...commentsList,
        ...liveVideoChat.data.live_video_chat_messages,
      ]);
    }
  }, [liveVideoChat]);

  const handleScrollDown = () => {
    if (lastMsgRef?.current) {
      lastMsgRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  useEffect(() => {
    messageReceived &&
      setCommentsList([...commentsList, messageReceived.message]);
  }, [messageReceived]);

  useEffect(() => {
    handleScrollDown();
  }, [commentsList]);

  return (
    <>
      <div className="onlive-stream-desc">
        {Object.keys(productLiveStreamView.data).length > 0 &&
          Object.keys(productLiveStreamView.data.live_stream_shopping).length >
            0 && (
            <>
              <h4> {t("description")}</h4>
              <p>
                {productLiveStreamView.data.live_stream_shopping.description}
              </p>
              {productLiveStreamView.data.live_stream_shopping.description
                .length > 200 && (
                <Link to="#" onClick={() => setDescShow(true)}>
                  {t("read_more")}
                </Link>
              )}
              <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={descShow}
                onHide={() => setDescShow(false)}
                className="buy-product-modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    {t("description")}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    {
                      productLiveStreamView.data.live_stream_shopping
                        .description
                    }
                  </p>
                </Modal.Body>
              </Modal>
            </>
          )}
      </div>
      <div className="onlive-stream-comment-sec">
        <div className="comment-heading">
          <h3>{t("comments")}</h3>
        </div>
        <div className="online-overlay-wrapped">
          <div className="onlive-stream-comment-box">
            {liveVideoChat.loading ? (
              <Skeleton count={3} height={40} />
            ) : Object.keys(liveVideoChat.data).length > 0 ? (
              commentsList.length > 0 ? (
                <React.Fragment>
                  {commentsList.map((comment, key) => (
                    <div className="onlive-stream-comment" key={key}>
                      <div className="onlive-stream-comment-profile">
                        <CustomLazyLoad
                          className="onlive-stream-user-img"
                          src={
                            comment.from_userpicture ||
                            window.location.origin +
                              "/assets/images/products/live-product-user.png"
                          }
                        />
                      </div>
                      <div className="onlive-stream-comment-info">
                        <div className="onlive-stream-comment-head">
                          <h4>{comment.from_displayname}</h4>
                          <p>{comment.created}</p>
                        </div>
                        <p>{comment.message} </p>
                      </div>
                    </div>
                  ))}
                  <div ref={lastMsgRef}></div>
                </React.Fragment>
              ) : (
                <div className="no-data-found-sec">
                  <Row>
                    <Col sm="12" md="12">
                      <div className="no-data-found-img-sec">
                        <Image
                          alt="not-found"
                          src={
                            window.location.origin +
                            "/assets/images/nocomments.png"
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>
      <div className="personalized-table-search">
        <form onSubmit={handleChatSubmit}>
          <InputGroup className="mb-0">
            <InputGroup.Text>
              <Button variant="light" onClick={triggerPicker}>
                <Image
                  className="live-streaming-user-add-comments-icon"
                  src={
                    window.location.origin +
                    "/assets/images/video-call/smiley.svg"
                  }
                />
              </Button>
            </InputGroup.Text>
            <FormControl
              placeholder={t("type_your_comment_here")}
              aria-describedby="basic-addon1"
              value={inputMessage}
              onChange={(event) => setInputMessage(event.target.value)}
              ref={chatInputRef}
            />
            <InputGroup.Text id="basic-addon2">
              <Button
                className="search-btn"
                onClick={(e) => inputMessage && handleChatSubmit(e)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 16 17"
                >
                  <path
                    fill="#9F4298"
                    d="M15.492 7.914L1.061.688a.655.655 0 00-.709.08.657.657 0 00-.216.656l1.738 6.418h7.42v1.313h-7.42L.11 15.553a.658.658 0 00.656.828.656.656 0 00.295-.072l14.431-7.226a.656.656 0 000-1.17z"
                  ></path>
                </svg>
              </Button>
            </InputGroup.Text>
            {emojiPickerState && (
              <div className="emojiWrapper chat-emoji">
                <Picker
                  title=""
                  emoji="point_up"
                  onSelect={(emoji) => handleEmojiSelect(emoji)}
                />
              </div>
            )}
          </InputGroup>
        </form>
      </div>
    </>
  );
};

export default LiveStreamingComments;
