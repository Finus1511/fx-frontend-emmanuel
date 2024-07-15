import React from "react";
import { Button, Image } from "react-bootstrap";

const SomethingWentWrong = (props) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap:"2em",
      }}
    >
      <Image style={{width:"30em"}} src={window.location.origin + "/assets/images/empty.png"} />
      <h4>Something Went Wrong</h4>
      <div className="custome-call-card-btn">
        <Button className="start-video-call-btn" onClick={()=> props.handleClick}>Refresh</Button>
      </div>
    </div>
  );
};

export default SomethingWentWrong;
