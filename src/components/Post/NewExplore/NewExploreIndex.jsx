import React, { useState, useEffect } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media, Nav, Tab, InputGroup, FormControl } from "react-bootstrap";
import "./NewExplore.css";
import { Link } from "react-router-dom";
import NewExploreCard from "./NewExploreCard";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import { searchUserStart } from "../../../store/actions/HomeAction";
import CommonCenterLoader from "../../Loader/CommonCenterLoader";
import VerifiedBadgeNoShadow from "../../Handlers/VerifiedBadgeNoShadow";

const NewExploreIndex = (props) => {

  const [search, setSearch] = useState({
    content_creator_id: "",
    name: ""
  });

  const clearSearch = () => {
    setSearch({
      content_creator_id: "",
      name: ""
    });
  }

  const [showCreators, setShowCreators] = useState(false);

  const handleSearch = (event) => {
    setSearch({
      ...search, 
      name: event.currentTarget.value
    }); 
    if (event.currentTarget.value === "") {
      setShowCreators(false);
    } else {
      setShowCreators(true);
      props.dispatch(searchUserStart({ key: event.currentTarget.value }));
    }
  };

  return (
    <>
      <div className="new-explore-sec">
        <Container>
          <Row>
            <Col md={12}>
              <div className="new-explore-tab-sec">
                <Tab.Container id="left-tabs-example" defaultActiveKey="explore">
                  <Row>
                    <Col sm={12}>
                      <div className="new-explore-tab-header-sec">
                        <Nav variant="pills">
                          <Nav.Item>
                            <Link
                              className="nav-link active"
                              eventKey="explore"
                              // onClick={() => setActiveTab("explore")}
                              to="/explore"
                            >{t("explore")}</Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Link
                              className="nav-link"
                              eventKey="category"
                              // onClick={() => setActiveTab("category")}
                              to="/explore-categories"
                            >{t("category")}</Link>
                          </Nav.Item>
                        </Nav>
                        <div className="new-explore-search-sec">
                          <div className="new-explore-search-card">
                            <InputGroup className="mb-0">
                              <FormControl
                                placeholder={t("search")}
                                aria-describedby="basic-addon2"
                                onChange={handleSearch}
                                value={search.name}
                              />
                              {search.content_creator_id ?
                                <InputGroup.Text className="padding-zero">
                                  <Button className="search-go-btn" onClick={() => clearSearch()}>
                                    <i className="fa fa-times align-self-center"></i>
                                  </Button>
                                </InputGroup.Text>
                              :
                              <InputGroup.Text id="basic-addon2">
                                <Image
                                  className="new-feeds-search-icon"
                                  src={
                                    window.location.origin +
                                    "/assets/images/feed-story/search-icon.svg"
                                  }
                                />
                              </InputGroup.Text>
                            }
                            </InputGroup>
                            {showCreators && (
                              <div className="search-dropdown-sec">
                                <ul className="list-unstyled search-dropdown-list-sec">
                                  {props.searchUser.loading ? (
                                    <CommonCenterLoader />
                                  ) : props.searchUser.data.users.length > 0 ? (
                                    props.searchUser.data.users.map((user) => (
                                      <Media as="li" key={user.user_unique_id}>
                                        {/* <Link to={`/${user.user_unique_id}`}> */}
                                          <div 
                                            className="search-body" 
                                            onClick={() => { 
                                              setSearch({content_creator_id: user.user_id, name: user.name}); 
                                              setShowCreators(false)
                                            }}
                                          >
                                            <div className="user-img-sec">
                                              <Image
                                                alt="#"
                                                src={user.picture}
                                                className="user-img"
                                              />
                                            </div>
                                            <div className="search-content">
                                              <h5>
                                                {user.name}{" "}
                                                {user.is_verified_badge == 1 ? (
                                                  <div className="pl-2">
                                                    <VerifiedBadgeNoShadow />
                                                  </div>
                                                ) : null}
                                              </h5>
                                              <p className="text-muted f-12">@{user.username}</p>
                                            </div>
                                          </div>
                                        {/* </Link> */}
                                      </Media>
                                    ))
                                  ) : (
                                    t("no_user_found")
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col sm={12}>
                      <NewExploreCard contentCreator={search} />
                    </Col>
                  </Row>
                </Tab.Container>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  searchUser: state.home.searchUser,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(NewExploreIndex));
