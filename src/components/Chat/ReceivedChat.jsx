import React, { useState, useRef } from 'react';
import { Image, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changeChatAudio } from '../../store/actions/ChatAction';
import AltraChatAudioPlayer from '../CustomComponents/AudioPlayer/AltraChatAudioPlayer';
import CustomLazyLoad from '../helper/CustomLazyLoad';
import ChatAssetPaymentModal from '../Model/PaymentModal/ChatAssetPaymentModal';
import ChatDocument from './ChatDocument';

const ReceivedChat = ({ message }) => {

  const [chatPayment, setChatPayment] = useState(false);

  const closePaymentModal = () => {
    setChatPayment(false);
  }


  return (
    <>
      <div className="new-chat-room-left-sec">
        <div className="new-chat-room-left-msg-card">
          <div className="new-chat-room-left-msg-container">
            {/* <Button className="delete-msg-right-btn">
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
            </Button> */}
            {message.chat_assets?.length > 0 ?
              <>
                {message.file_type === "image" || message.file_type === "video" ?
                  <div className={
                    message.chat_assets.length > 1 ?
                      "uploaded-chat-room-multiple-img-card" : "uploaded-chat-room-single-img-card"
                  }>
                    {message.chat_assets.map((chatAsset, i) =>
                      <ReceivedChatAsset
                        chatAsset={chatAsset}
                        key={i}
                        i={i}
                        length={message.chat_assets.length}
                        payment={message.is_user_needs_pay}
                      />
                    )}
                    {message.is_user_needs_pay ?
                      <div className="payment-overlay" onClick={() => setChatPayment(true)}>
                        {message.amount_formatted}
                      </div>
                      : null
                    }
                  </div>
                  : <div className="uploaded-chat-room-audio-card">
                    {message.is_user_needs_pay ?
                      <>
                        {message.chat_assets.map((chatAsset, i) =>
                          <>
                            <Image
                              className="uploaded-chat-room-audio-img"
                              src={message.file_type === "audio" ?
                                window.location.origin +
                                "/assets/images/new-chat/audio-preview.png"
                                : window.location.origin +
                                "/assets/images/new-chat/file-preview.png"
                              }
                            />
                          </>
                        )}
                        <div className="payment-overlay" onClick={() => setChatPayment(true)}>
                          {message.amount_formatted}
                        </div>
                      </>
                      : message.chat_assets.map((chatAsset, i) =>
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
              <span>{message.amount > 0 && message.is_user_needs_pay == 0 ? message.amount_formatted : ""}</span>
              <span>{message.time_formatted}</span>
            </p>
          </div>
        </div>
      </div>
      {
        chatPayment ?
          <ChatAssetPaymentModal
            paymentsModal={chatPayment}
            closepaymentsModal={closePaymentModal}
            paymentData={message}
          />
          : null
      }
    </>
  );
}

const ReceivedChatAsset = ({ chatAsset, i, length, payment }) => {
  const dispatch = useDispatch();
  const assetImage = useRef(null);

  const handleClick = e => {
    e.preventDefault();
    if (assetImage.current) {
      assetImage.current.click();
      stopAudio();
    }
  }

  const stopAudio = () => {
    dispatch(changeChatAudio({ src: "" }));
  }

  return (
    payment ?
      chatAsset.file_type === "image" ?
        <div style={{ position: "relative", display: i > 3 ? "none" : "block" }}>
          <Image
            className="uploaded-chat-room-multiple-img"
            src={chatAsset.asset_file}
          />
          {length > 4 && i === 3 ?
            <div className="uploaded-chat-room-video-icon-sec">
              <div className="chat-more-sec">+{length - 3}</div>
            </div>
            : null
          }
        </div>
        : <div style={{ position: "relative", display: i > 3 ? "none" : "block" }}>
          <Image
            className={`uploaded-chat-room-multiple-img`}
            src={chatAsset.blur_file}
          />
          <div className="uploaded-chat-room-video-icon-sec">
            {length > 4 && i === 3 ?
              <div className="chat-more-sec">+{length - 3}</div>
              : <Image
                src={window.location.origin + "/assets/images/new-home/icon/video-icon.png"}
                className="uploaded-chat-room-video-icon"
              />
            }
          </div>
        </div>
      : chatAsset.file_type === "image" ?
        <div style={{ position: "relative", display: i > 3 ? "none" : "block" }}>
          <Image
            ref={assetImage}
            className="uploaded-chat-room-multiple-img"
            src={chatAsset.asset_file}
            data-fancybox-chat
            onClick={() => stopAudio()}
          />
          {length > 4 && i === 3 ? <div
            className="uploaded-chat-room-video-icon-sec"
            onClick={handleClick}>
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
            className="uploaded-chat-room-video-icon-sec"
            onClick={handleClick}>
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

export default ReceivedChat;
