import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Image, Modal, InputGroup } from "react-bootstrap";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { connect } from 'react-redux'
import { translate, t } from "react-multi-lang";
import { broadcastMessageStart, chatBroadcastAssetSaveStart, updateChatMessagesSuccess } from "../../store/actions/ChatAction";
import configuration from "react-global-configuration";
import io from "socket.io-client";
import dayjs from "dayjs";
import { chatAssetFileUploadStart } from "../../store/actions/ChatAssetAction";

let chatSocket;

const BroadCastModal = (props) => {
  
  const chatSocketUrl = configuration.get("configData.chat_socket_url");
  const userId = localStorage.getItem("userId");
  const [skipRender, setSkipRender] = useState(true);
  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [cursorPointer, setCursorPointer] = useState(0);
  const [inputData, setInputData] = useState({});
  const [fileName, setFileName] = useState("");

  const messageField = useRef();

  useEffect(()=> {
    chatSocketConnect();
  }, [])

  useEffect(() => {
    if (!skipRender) {
      messageField.current.selectionEnd = cursorPointer;
    }
  }, [cursorPointer]);

  const handleToggleEmojis = () => {
    messageField.current.focus();
    setShowEmojis(!showEmojis);
  }

  const onEmojiPick = (data) => {
    const ref = messageField.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const text = start + data.native + end;
    setInputData({ message: text });
    setCursorPointer(start.length + data.native.length);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (inputData.message || inputData.file) {
      // props.dispatch(broadcastMessageStart(inputData));
      const now = new Date();
      const date = `${("0" + now.getDate()).slice(-2)} ${now.toLocaleString(
        "default",
        { month: "short" }
      )} ${now.getFullYear()}`;
      const time = dayjs(now).format("hh:mm a");

      const broadCastData = { ...inputData, date: date, time: time, loggedin_user_id: userId, from_user_id: userId,amount:0,}
      chatSocket.emit("broadcast", broadCastData);
      props.closeBroadCastModal();
      setFileName('');
      setInputData({})
    }
  }

  useEffect(() => {
    if (!skipRender && !props.broadcastMessage.loading && Object.keys(props.broadcastMessage.data).length > 0) {
      // console.log(props.broadcastMessage.data.chat_message);
      // props.dispatch(updateChatMessagesSuccess(props.broadcastMessage.data.chat_message));
      props.closeBroadCastModal();
    }
    setFileName('');
    setSkipRender(false);
    setInputData({})
  }, [props.broadcastMessage])

  const handleChange = (event) => {
    if (event.currentTarget.type === "file") {
      let reader = new FileReader();
      let file = event.currentTarget.files[0];
      setFileName(file.name);
      reader.onloadend = () => {
        // setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);

      setInputData({
        ...inputData,
        file: event.currentTarget.files[0],
        file_type: file.type,
        message: inputData.message || ""
      });

      handleFileSelect(event);
    }
  };

  const chatSocketConnect = () => {
    if (chatSocketUrl) {
      chatSocket = io(chatSocketUrl, {
        query: `commonid:'user_id_${userId}',myid:${userId}`,
      });
      console.log(chatSocket, "socket")
      chatSocket.on("message", (newData) => {
        console.log(newData);
        props.dispatch(updateChatMessagesSuccess(newData));
      });
    }
  };

  const handleFileSelect = e => {
    let files = {};
    if (e.target.files.length > 0) {
      [...e.target.files].forEach((file, key) => {
        let name = 'file[' + key + ']';
        files = { ...files, [name]: file }
      });
      // setTriggeredOnce(true);
      props.dispatch(chatBroadcastAssetSaveStart({
        from_user_id: userId,
        // to_user_id: props.selectedUser.user_id,
        file_type: "image",
        ...files,
      }));
      e.target.value = null;
    }
  }

  useEffect(()=> {
    if(!skipRender && !props.chatBroadcastAsset.loading && Object.keys(props.chatBroadcastAsset.data).length > 0){
      setInputData({
        ...inputData,
        chat_assets_id: props.chatBroadcastAsset.data.chat_asset_file_id,
      })
    }
    setSkipRender(false);
  }, [props.chatBroadcastAsset])

  return (
    <>
      <Modal
        className="modal-dialog-center broadcast-modal"
        size="lg"
        centered
        show={props.broadCast}
      // onHide={props.closeBroadCastModal}
      >
        <Modal.Body>
          <Button className="modal-close" onClick={() => props.closeBroadCastModal()}>
            <Image
              className="close-icon"
              src={
                window.location.origin + "/assets/images/new-chat/close.svg"
              }
            />
          </Button>
          <Form className="broadcast-form">
            <div className="broadcast-box">
              <div className="broadcast-img-sec">
                <Image
                  className="broadcast-img"
                  src={
                    window.location.origin + "/assets/images/new-chat/broadcast-img.png"
                  }
                />
              </div>
              <h4>Broadcast your mesage to all your subcribers at a time</h4>
              <div className="broadcast-preview-box">
                {fileName ?
                  <div className="broadcast-preview-card">
                    {fileName}
                  </div>
                : ''}
              </div>
            </div>
            <div className="new-chat-room-input-sec-1">
              <div className="new-chat-room-form">
                <div className={`emoji-container ${showEmojis ? "show" : "hide"}`}>
                  <Picker data={data} onEmojiSelect={onEmojiPick} onClickOutside={() => {
                    if (showEmojis)
                      setShowEmojis(false);
                  }} />
                </div>
                <InputGroup className="mb-0">
                  <InputGroup.Text onClick={() => handleToggleEmojis()}>
                    <Image
                      className="new-feed-wishlist-icon"
                      src={
                        window.location.origin + "/assets/images/feed-story/comments-emoji.svg"
                      }
                    />
                  </InputGroup.Text>
                  <Form.Control
                    ref={messageField}
                    value={inputData.message}
                    aria-label="Amount (to the nearest dollar)"
                    placeholder="Type something"
                    onChange={e => setInputData({ ...inputData, message: e.target.value })}
                    disabled={props.broadcastMessage.buttonDisable}
                    onKeyPress={e => {
                      if (e.key === "Enter")
                        handleSubmit(e);
                    }}
                  />
                  {props.chatBroadcastAsset.buttonDisable ? <React.Fragment>
                    <InputGroup.Text>
                      <Image
                        src={window.location.origin + "/assets/images/pulse.gif"}
                        className="loader-image"
                        style={{width:"3em"}}
                      />
                  </InputGroup.Text>
                  </React.Fragment> : <React.Fragment>
                  <InputGroup.Text>
                    <div className="broadcast-upload-attachement-file-sec">
                      <div class="upload-btn-wrapper">
                        <Image
                          className="new-feed-wishlist-icon"
                          src={
                            window.location.origin + "/assets/images/new-chat/attach-file.png"
                          }
                        />
                        <input
                          type="file"
                          accept=".gif,.jpg,.jpeg,.gif,.png,.jpg,.jpeg,.png,video/mp4,video/x-m4v,video/*"
                          name="file"
                          id="file"
                          onChange={(event) =>
                            handleChange(event)
                          }
                          disabled={props.chatBroadcastAsset.buttonDisable}
                        />
                      </div>
                    </div>
                  </InputGroup.Text>
                  <InputGroup.Text onClick={handleSubmit}>
                    <Image
                      className="new-feed-wishlist-icon"
                      src={
                        window.location.origin + "/assets/images/feed-story/comments-send.svg"
                      }
                    />
                  </InputGroup.Text>
                    </React.Fragment>}
                </InputGroup>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToPros = (state) => ({
  broadcastMessage: state.chat.broadcastMessage,
  chatFilesUpload: state.chat.chatFilesUpload,
  chatBroadcastAsset: state.chat.chatBroadcastAsset,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(BroadCastModal));