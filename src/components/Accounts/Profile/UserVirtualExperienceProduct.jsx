import React, { useState } from "react";
import {
  Button,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const UserVirtualExperiencsProduct = (props) => {

  return (
    <>
      <Link className="virtual-full-card" to={`/user-virtual-details/${props.post.unique_id}`}>
        <div className="virtual-card-img">
          <Image
            className=" v-e-images "
            src={props.post.files[0]?.file || window.location.origin + "/assets/images/ve.jpeg"}
          />
        </div>
        <div className="virtual-card-info">
          <h4>{props.post.user_info?.name}</h4>
          <div className="virtual-info-footer">
            <div className="virtual-info-details">
              <h5>{props.post.start_date}</h5>
              <p>{props.post.start_time} - {props.post.end_time}</p>
            </div>
            <div className="virtual-info-details" style={{textAlign:"right"}}>
              <h5>
                {props.post.used_capacity || 0}/{props.post.total_capacity}
              </h5>
              <p>Registered</p>
            </div>
          </div>
          <div className="virtual-info-footer">
            <h4>{props.post.price_per_formatted}/Person</h4>
            {/* {props.post.user_needs_to_pay ? <Button className="start-btn-ve">Book</Button> :  (
              <Button className="start-btn-ve">Join Call</Button>
            )} */}
          </div>
        </div>
      </Link>
    </>
  );
};
export default UserVirtualExperiencsProduct;
