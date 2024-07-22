import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Image,
  Table,
  InputGroup,
  FormControl,
  Button,
  Dropdown,
  Tab,
  Tabs,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Field, Form as FORM, Formik } from "formik";
import CouponTableFilterModal from "./CouponTableFilterModal";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  couponCodeListStart,
  fetchMoreCouponCodeListStart
} from "../../store/actions/PremiumFolderAction";
import { translate, t } from "react-multi-lang";
import NoDataFound from "../NoDataFound/NoDataFound";
import TableDetails from "./TableDetails";

const CouponDetailsTable = () => {
  const history = useHistory();
  const [modalShow, setModalShow] = useState(false);
  const [filter, setFilter] = useState("");
  const [key, setKey] = useState("all");
  const dispatch = useDispatch();
  const couponCodeList = useSelector((state) => state.folder.couponCodeList);

  const [activeSec, setActiveSec] = useState("all");
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    dispatch(couponCodeListStart({
      skip: 0,
      take: 12
    }));
  }, [activeSec]);

  const fetchMoreData = () => {
    dispatch(fetchMoreCouponCodeListStart({
      skip: couponCodeList.data.promocode.length,
      take: 12
    }));
  };

  const handleSearch = () => {
    dispatch(couponCodeListStart({
      search_key: searchKey
    }));
  }

  return (
      <div className="new-home-page-sec">
        <Container fluid>
            <div className="personalized-request-box">
              <Row className="align-items-center">
                <Col md={12}>
                  {couponCodeList.loading ?
                    "loading"
                    :
                    Object.keys(couponCodeList.data).length > 0 &&
                      couponCodeList.data.promocode.length > 0
                      ?
                      <>
                  <div className="personalized-table-head">
                    <div className="personalized-table-back">
                      <Link to="#" onClick={() => history.goBack()}>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            enableBackground="new 0 0 512 512"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#9f4298"
                              d="M4.943 5.606L1.024 9.525a3.585 3.585 0 000 4.95l3.919 3.919a1.5 1.5 0 102.121-2.121l-2.779-2.781 18.25-.023a1.5 1.5 0 001.5-1.5 1.5 1.5 0 00-1.5-1.5L4.3 10.492l2.764-2.765a1.5 1.5 0 00-2.121-2.121z"
                            ></path>
                          </svg>
                        </span>
                        <span className="personalized-request-back-info">
                          {t("back")}
                        </span>
                      </Link>
                      <div className="table-heading">
                        <h4>{t("coupons")}</h4>
                      </div>
                    </div>
                    <div className="coupon-table-action">
                      <div className="personalized-table-search">
                        <Formik>
                          
                              <FORM className="form">
                                <div className="efi-transation-search">
                                  <InputGroup className="mb-0">
                                    <Field
                                      // placeholder={t("search_placeholder")}
                                      placeholder={"Search"}
                                      type="text"
                                      className="form-control trans-form-control"
                                      onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                          event.preventDefault();
                                          handleSearch();
                                        }
                                      }}
                                      value={searchKey}
                                      onChange={(event) => {
                                        setSearchKey(event.target.value);
                                      }}
                                    />
                                    <InputGroup.Text id="basic-addon1">
                                      <Button className="search-btn" onClick={handleSearch}>
                                        {/* <svg
                                height="30"
                                width="30"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                                focusable="false"
                                class="icon icon-tabler icons-tabler-outline icon-tabler-search"
                              >
                                <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                              </svg> */}
                                      </Button>
                                    </InputGroup.Text>
                                    <InputGroup.Text id="basic-addon1">
                                      <Button className="search-btn" type="submit">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="20"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="#333"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          // class="icon icon-tabler icons-tabler-outline icon-tabler-search"
                                        >
                                          <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                          />
                                          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                          <path d="M21 21l-6 -6" />
                                        </svg>
                                      </Button>
                                    </InputGroup.Text>
                                  </InputGroup>
                                </div>
                              </FORM>
                            </Formik>
                          </div>
                          {/* <div className="coupon-table-filter">
                            <Button onClick={() => setModalShow(true)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="none"
                                viewBox="0 0 18 12"
                              >
                                <path
                                  fill="#9F4298"
                                  d="M8 12h2c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zM0 1c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H1C.45 0 0 .45 0 1zm4 6h10c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1z"
                                ></path>
                              </svg>
                              {t("filter")}
                            </Button>
                          </div> */}
                      <div className="coupon-table-head-btn">
                        <Button
                          onClick={() => history.push("/create-coupon")}
                          className="default-btn profile-sidebar-broadcast-btn"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            fill="none"
                            viewBox="0 0 15 15"
                          >
                             <path fill="#fff" d="M14.5 8.95h-6v6h-2v-6h-6v-2h6v-6h2v6h6v2z"></path>
                          </svg>
                          {t("create_coupon")}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={activeSec}
                      onSelect={(all) => setActiveSec(all)}
                    className="mb-3 coupon-table-tabs"
                  >
                    <Tab eventKey="all" onClick={(event) => setActiveSec("all")} title="All Coupons">
                      {activeSec == "all" &&
                        <TableDetails
                          couponCodeList={couponCodeList}
                          fetchMoreData={fetchMoreData}
                        />
                      }
                    </Tab>
                    <Tab eventKey="active" title="Active Coupons">
                      {activeSec == "active" &&
                          <TableDetails
                            couponCodeList={couponCodeList}
                            fetchMoreData={fetchMoreData}
                          />
                        }
                    </Tab>
                    {/* <Tab eventKey="scheduled" title="Scheduled Coupons (6)">
                      {activeSec == "expired" &&
                          <TableDetails
                            couponCodeList={couponCodeList}
                            fetchMoreData={fetchMoreData}
                          />
                        }
                    </Tab> */}
                    <Tab eventKey="expired" title="Expired Coupons">
                      {activeSec == "expired" &&
                          <TableDetails
                            couponCodeList={couponCodeList}
                            fetchMoreData={fetchMoreData}
                          />
                        }
                    </Tab>
                  </Tabs>
                  </>
                  :
                  <div className="create-coupon-main">
                    <div className="create-coupon-img-sec">
                      <Image
                        src="assets/images/phase4/create-coupon.png"
                        className="create-coupon-img"
                      />
                    </div>
                    <div className="create-coupon-info">
                      <h4>{t("manage_coupon_codes")}</h4>
                      <p>
                        {t("create_coupon_codes_and_automatic_discounts_that")} <br />
                        {t("apply_at_checkout")}
                      </p>
                      <Button
                        className="default-btn profile-sidebar-broadcast-btn"
                        type="button"
                        onClick={() => history.push("/create-coupon")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          fill="none"
                          viewBox="0 0 15 15"
                        >
                          <path
                            fill="#fff"
                            d="M14.5 8.95h-6v6h-2v-6h-6v-2h6v-6h2v6h6v2z"
                          ></path>
                           </svg>
                        {t("create_coupon")}
                      </Button>
                    </div>
                  </div>
              }
                </Col>
              </Row>
            </div>
        </Container>
      </div>
  );
};

export default translate(CouponDetailsTable);
