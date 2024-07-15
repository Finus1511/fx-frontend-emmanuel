import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { translate } from "react-multi-lang";
import CustomLazyLoad from "../../helper/CustomLazyLoad";

const VirtualExperiencsProduct = (props) => {
  return (
      <Link
        to={`/user-virtual-details/${props.post.unique_id}`}
        className="virtual-full-card"
        >
        <div className="virtual-card-img">
          <CustomLazyLoad
            className=" v-e-images "
            src={props.post.files[0]?.file || window.location.origin + "/assets/images/ve.jpeg"}
          />
        </div>
        <div className="virtual-card-info">
          <h4>{props.post.title}</h4>
          <div className="virtual-info-footer">
            <div className="virtual-info-details">
              <h5>{props.post.start_date}</h5>
              <p>
                {props.post.start_time} - {props.post.end_time}
              </p>
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
            {/* {props.post.start_call == 1 && (
              <Button className="start-btn-ve">Start Call</Button>
            )} */}
          </div>
        </div>
      </Link>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapDispatchToProps)(translate(VirtualExperiencsProduct));
