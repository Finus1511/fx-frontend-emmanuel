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
  Tabs
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Field, Form as FORM, Formik } from "formik";
import {
  couponCodeListStart,
  fetchMoreCouponCodeListStart
} from "../../store/actions/PremiumFolderAction";
import { useDispatch, useSelector } from "react-redux";
import { translate, t } from "react-multi-lang";
import TableDetails from "./TableDetails";
import NoDataFound from "../NoDataFound/NoDataFound";
import Skeleton from "react-loading-skeleton";

const CouponDetailsTable = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const [activeSec, setActiveSec] = useState("all");
  const [searchKey, setSearchKey] = useState("");
  const [clearItems, setClearItems] = useState(false);

  const couponCodeList = useSelector((state) => state.folder.couponCodeList);

  useEffect(() => {
    dispatch(couponCodeListStart({
      sort_by: activeSec == "expiry" ? "expiry" : "",
      status: activeSec == 1 ? 1 : "",
      skip: 0,
      take: 12
    }));
  }, [activeSec]);

  const fetchMoreData = () => {
    dispatch(fetchMoreCouponCodeListStart({
      sort_by: activeSec == "expiry" ? "expiry" : "",
      status: activeSec == 1 ? 1 : "",
      skip: couponCodeList.data.promocode.length,
      take: 12
    }));
  };

  const handleSearch = () => {
    dispatch(couponCodeListStart({
      search_key: searchKey,
      sort_by: activeSec == "expiry" ? "expiry" : "",
      status: activeSec == 1 ? 1 : "",
    }));
    setClearItems(true)
  }

  return (
    <div className="new-home-page-sec">
      <Container fluid>
        <div className="personalized-request-box">
          <Row className="align-items-center">
            <Col md={12}>
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
                    <Formik
                    >
                      <FORM className="form">
                        <div className="efi-transation-search">
                          <InputGroup className="mb-0">
                            <Field
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

                              {clearItems ?
                                <svg className="clear-search-btn"
                                  onClick={() => {
                                    setClearItems(false)
                                    dispatch(couponCodeListStart());
                                  }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  x="0px" y="0px" width="19" height="20"
                                  viewBox="0 0 50 50">
                                  <path
                                    d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875
                                L 25 26.4375 L 42.28125 43.71875 L 43.71875 
                                42.28125 L 26.4375 25 L 43.71875 7.71875 L 
                                42.28125 6.28125 L 25 23.5625 Z">
                                  </path>
                                </svg>
                                :
                                <Button
                                  type="submit"
                                  onClick={() => {
                                    dispatch(couponCodeListStart({
                                      search_key: searchKey
                                    }));
                                    setClearItems(true)
                                  }}
                                  className="search-btn"
                                >
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
                              }
                            </InputGroup.Text>
                          </InputGroup>
                        </div>
                      </FORM>
                    </Formik>
                  </div>
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
                <Tab eventKey="all"
                  onClick={(event) => setActiveSec("all")}
                  title="All Coupons">
                  {activeSec == "all" &&
                    <TableDetails
                      couponCodeList={couponCodeList}
                      fetchMoreData={fetchMoreData}
                    />
                  }
                </Tab>
                <Tab eventKey="1" title="Active Coupons">
                  {activeSec == 1 &&
                    <TableDetails
                      couponCodeList={couponCodeList}
                      fetchMoreData={fetchMoreData}
                    />
                  }
                </Tab>
                <Tab eventKey="expiry" title="Expired Coupons">
                  {activeSec == "expiry" &&
                    <TableDetails
                      couponCodeList={couponCodeList}
                      fetchMoreData={fetchMoreData}
                    />
                  }
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </div>
      </Container >
    </div >
  );
};
export default CouponDetailsTable;