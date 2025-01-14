import React, { useEffect, useRef } from 'react';
import { Image, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeChatAudio } from '../../store/actions/ChatAction';
import AltraChatAudioPlayer from '../CustomComponents/AudioPlayer/AltraChatAudioPlayer';
import ChatDocument from '../Chat/ChatDocument';
import { communityMessageDeleteStart } from '../../store/actions/CommunityAction';

const SendChat = ({ message, handleSocketDelete }) => {

  const chatMessageDelete = useSelector(state => state.community.communityMessageDelete);

  const dispatch = useDispatch();

  const handleChatDelete = () => {
    if (window.confirm("Delete this message?")) {
      dispatch(communityMessageDeleteStart(message.chat_message_id ? { chat_message_id: message.chat_message_id } : {chat_reference_id: message.chat_message_reference_id}));
      handleSocketDelete(message.reference_id || message.chat_message_reference_id);
    }
  }

  return (
    <>
      <div className="new-chat-room-right-sec">
        <div className="new-chat-room-right-msg-card">
          <div className="new-chat-room-right-msg-container">
            <Button className="delete-msg-left-btn" disabled={chatMessageDelete.buttonDisable} onClick={handleChatDelete}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path fill="#fff" d="M4 7H15V13H4z"></path>
                <path
                  fill="#000"
                  d="M10 0l.324.001.318.004.616.017.299.013.579.034.553.046c4.785.464 6.732 2.411 7.196 7.196l.046.553.034.579c.005.098.01.198.013.299l.017.616L20 10l-.005.642-.017.616-.013.299-.034.579-.046.553c-.464 4.785-2.411 6.732-7.196 7.196l-.553.046-.579.034c-.098.005-.198.01-.299.013l-.616.017L10 20l-.642-.005-.616-.017-.299-.013-.579-.034-.553-.046C2.526 19.421.579 17.474.115 12.689l-.046-.553-.034-.579c-.005-.1-.01-.2-.013-.299l-.017-.616C.002 10.432 0 10.218 0 10l.001-.324.004-.318.017-.616.013-.299.034-.579.046-.553C.579 2.526 2.526.579 7.311.115l.553-.046.579-.034c.098-.005.198-.01.299-.013l.616-.017C9.568.002 9.782 0 10 0zM8.511 7.14a1 1 0 00-1.218 1.567L8.585 10l-1.292 1.293-.083.094a1 1 0 001.497 1.32L10 11.415l1.293 1.292.094.083a1 1 0 001.32-1.497L11.415 10l1.292-1.293.083-.094a1 1 0 00-1.497-1.32L10 8.585 8.707 7.293l-.094-.083-.102-.07z"
                ></path>
              </svg>
            </Button>
            {message.chat_assets?.length > 0 ?
              <>
                {message.file_type === "image" || message.file_type === "video" ?
                  <div className={
                    message.chat_assets.length > 1 ?
                      "uploaded-chat-room-multiple-img-card" : "uploaded-chat-room-single-img-card"
                  }>
                    {message.chat_assets.map((chatAsset, i) =>
                      <SendChatAsset
                        chatAsset={chatAsset}
                        key={i}
                        i={i}
                        length={message.chat_assets.length}
                      />
                    )}
                  </div>
                  : <div className="uploaded-chat-room-audio-card">
                    {message.chat_assets.map((chatAsset, i) =>
                      message.file_type === "audio" ?
                        <AltraChatAudioPlayer src={chatAsset.asset_file} />
                        : <ChatDocument chatAsset={chatAsset} />
                    )}
                  </div>
                }
              </> : null
            }
            {message.message ?
              <h6>{message.message}</h6>
              : null
            }
            <p>
              <span>
                {message.amount > 0 ?

                  message.is_user_paid === 1 ?
                    <span className="text-success">
                      {message.amount_formatted}{" "}
                      <Image
                        className="new-chat-room-time-tick"
                        src={
                          window.location.origin + "/assets/images/new-chat/ppv_paid.svg"
                        }
                      />
                    </span>
                    : <span className="text-danger">
                      {message.amount_formatted}{" "}
                      <Image
                        className="new-chat-room-time-tick"
                        src={
                          window.location.origin + "/assets/images/new-chat/token-icon-new.svg"
                        }
                      />
                    </span>
                  : null}
              </span>
              <span className='text-uppercase'>{message.time_formatted}</span>
            </p>
          </div>
          {/* <div className="new-chat-room-time-tick-card">
            <Image
              className="new-chat-room-time-tick"
              src={
                window.location.origin + "/assets/images/new-chat/msg-tick.svg"
              }
            />
            
          </div> */}
        </div>
      </div >
    </>
  );
}

const SendChatAsset = ({ chatAsset, i, length }) => {
  const dispatch = useDispatch();
  const assetImage = useRef(null);

  const triggerFancyBox = e => {
    e.preventDefault();
    console.log("Ref", assetImage.current);
    if (assetImage.current) {
      assetImage.current.click();
      stopAudio();
    }
  }

  const stopAudio = () => {
    dispatch(changeChatAudio({ src: "" }));
  }

  return (
    chatAsset.file_type === "image" ?
      <div style={{ position: "relative", display: i > 3 ? "none" : "block" }}>
        <Image
          className="uploaded-chat-room-multiple-img"
          src={chatAsset.asset_file}
          data-fancybox-chat
          ref={assetImage}
          onClick={() => stopAudio()}
        />
        {length > 4 && i === 3 ? <div
          className="uploaded-chat-room-video-icon-sec"
          onClick={triggerFancyBox}>
          <div className="chat-more-sec">+{length - 3}</div>
        </div>
          : null
        }
      </div>
      : <div style={{ position: "relative", display: i > 3 ? "none" : "block" }}>
        <Image
          ref={assetImage}
          className={`uploaded-chat-room-multiple-img`}
          src={chatAsset.blur_file}
          data-fancybox-chat
          href={chatAsset.asset_file}
          onClick={() => stopAudio()}
        />
        <div
          className="uploaded-chat-room-video-icon-sec cursor-pointer"
          onClick={triggerFancyBox}>
          {length > 4 && i === 3 ?
            <div className="chat-more-sec">+{length - 3}</div>
            : <Image
              src={window.location.origin + "/assets/images/new-home/icon/video-icon.png"}
              className="uploaded-chat-room-video-icon"
            />
          }
        </div>
      </div>
  );
}

export default SendChat;