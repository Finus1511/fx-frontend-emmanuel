import React from "react";
import { Image } from "react-bootstrap";

const PageLoader = (props) => {
  return (
    <div style={{width:"100vw", height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
      <Image
        src={window.location.origin + "/assets/images/pulse.gif"}
        className="loader-image"
        style={{width:"20em"}}
      />
    </div>
  );
};

export default PageLoader;
