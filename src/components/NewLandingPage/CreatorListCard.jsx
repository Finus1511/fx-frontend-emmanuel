import React, { useEffect, useState } from "react";
import { Container, Image, Nav, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { featuredCreatorsListStart } from "../../store/actions/HomeAction";
import PageLoader from "../Loader/PageLoader";
import NoDataFound from "../NoDataFound/NoDataFound";
import CustomLazyLoad from "../helper/CustomLazyLoad";
import { translate, t } from "react-multi-lang";

const CreatorListCard = (props) => {
  const setting = {
    dots: false,
    infinite: false,
    speed: 500,
    arrow: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1195,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const dispatch = useDispatch();
  const featuredCreators = useSelector((state) => state.home.featuredCreators);

  useEffect(()=> {
    dispatch(featuredCreatorsListStart())
  }, [])

  return (
    <>
      <div className="creator-list-sec sm-padding">
        <Container>
          <Row className="justify-content-md-center">
            <Col md={8} lg={9} className="text-center">
              <div className="section-title">
                <div className="title-before">
                  <h2>{t("landing_page.featured.header")}</h2>
                  <p>{t("landing_page.featured.content")}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col md={12}>
                {featuredCreators.loading ? <PageLoader/> : Object.keys(featuredCreators.data).length > 0 ? <Slider {...setting}>
                  {featuredCreators.data.featured_users.map((creator, key)=> (
                    <div className="creator-list-item" key={key}>
                      <Link target="_blank" to={`/${creator.user_unique_id}`}>
                        <div className="creator-list-card">
                          <div className="creator-list-img-sec">
                            <CustomLazyLoad
                              className="creator-list-img"
                              src={creator.cover || window.location.origin + "/assets/images/creator-list/creator-list-img-1.png"}
                              type="image/png"
                            />
                          </div>
                          <div className="creator-list-user-info-card">
                            <div className="creator-list-user-info">
                              <CustomLazyLoad
                                className="creator-list-user-img"
                                src={creator.picture || window.location.origin + "/assets/images/creator-list/creator-user-img.png"}
                                type="image/png"
                              />
                              <div className="creator-list-user-details">
                                <h4>
                                  {creator.name}
                                  <span>
                                    <Image
                                      className="sidebar-verified-icon"
                                      src={
                                        window.location.origin +
                                        "/assets/images/new-home/verified-icon.png"
                                      }
                                      type="image/png"
                                    />
                                  </span>
                                </h4>
                                <span className="creator-list-user-name">
                                  @{creator.username}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </Slider> : <NoDataFound/>}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CreatorListCard;
