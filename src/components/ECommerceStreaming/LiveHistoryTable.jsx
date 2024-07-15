import React, { useEffect, useState, useRef } from "react";
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
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import Skeleton from "react-loading-skeleton";
import { productLiveStreamHistoryListStart } from "../../store/actions/ProductLiveStreamAction";
import { useDispatch, useSelector } from "react-redux";
import NoDataFound from "../NoDataFound/NoDataFound";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "../../hooks/useSearchParams";
import { Field, Form as FORM, Formik } from "formik";
import * as Yup from "yup";

const PersonalRequestTable = () => {
  const formRef = useRef();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const productLiveStreamHistoryList = useSelector(
    (state) => state.productLiveStream.productLiveStreamHistoryList
  );
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(12);
  const [filter, setFilter] = useState({
    search_key: searchParams.get("search_key")
      ? searchParams.get("search_key")
      : "",
  });

  useEffect(() => {
    dispatch(
      productLiveStreamHistoryListStart({ skip: skip, take: take, ...filter })
    );
  }, [skip, filter]);

  useEffect(() => {
    setFilter({
      ...filter,
      search_key: searchParams.get("search_key")
        ? searchParams.get("search_key")
        : "",
    });
  }, [searchParams.get("search_key")]);

  const validationSchema = Yup.object().shape({
    search_key: Yup.string().required(t("required")),
  });

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
                    <h4>{t("live_history")}</h4>
                  </div>
                </div>
                {Object.keys(productLiveStreamHistoryList.data).length > 0 && (
                  <div className="personalized-table-search">
                    <Formik
                      initialValues={{
                        search_key: searchParams.get("search_key")
                          ? searchParams.get("search_key")
                          : "",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={(val) => {
                        setFilter({
                          ...filter,
                          search_key: val.search_key,
                        });

                        history.push(
                          searchParams.get("sort_by")
                            ? `/live-history-detail?search_key=${
                                val.search_key
                              }&sort_by=${searchParams.get("sort_by")}`
                            : `/live-history-detail?search_key=${val.search_key}`
                          // { state: { value: value } }
                        );
                      }}
                      innerRef={formRef}
                    >
                      {({ values, setFieldValue, resetForm }) => (
                        <FORM className="form">
                          <InputGroup className="mb-0">
                            <Field
                              className="form-control"
                              name="search_key"
                              placeholder={t("search")}
                              aria-describedby="basic-addon2"
                            />
                            {searchParams.get("search_key") ? (
                              <InputGroup.Text id="basic-addon1">
                                <Button
                                  className="search-btn"
                                  onClick={() => {
                                    setFieldValue("search_key", "");
                                    setFilter({
                                      ...filter,
                                      search_key: "",
                                    });
                                    history.push(
                                      searchParams.get("sort_by")
                                        ? `/live-history-detail?sort_by=${searchParams.get(
                                            "sort_by"
                                          )}`
                                        : `/live-history-detail`
                                    );
                                  }}
                                >
                                  <svg
                                    height="30"
                                    width="30"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                    focusable="false"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-search"
                                  >
                                    <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                                  </svg>
                                </Button>
                              </InputGroup.Text>
                            ) : (
                              <InputGroup.Text id="basic-addon2">
                                <Button className="search-btn" type="submit">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon-tabler icons-tabler-outline icon-tabler-search"
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
                            )}
                          </InputGroup>
                        </FORM>
                      )}
                    </Formik>
                  </div>
                )}
              </div>
              {productLiveStreamHistoryList.loading ? (
                [...Array(5)].map(() => (
                  <Skeleton height={85} borderRadius={10} />
                ))
              ) : Object.keys(productLiveStreamHistoryList.data).length > 0 &&
                Object.keys(
                  productLiveStreamHistoryList.data
                    .live_stream_shoppings_history
                ).length > 0 ? (
                <InfiniteScroll
                  dataLength={
                    productLiveStreamHistoryList.data
                      .live_stream_shoppings_history.length
                  }
                  next={() => {
                    setSkip(skip + take);
                  }}
                  hasMore={
                    productLiveStreamHistoryList.data
                      .live_stream_shoppings_history.length <
                    productLiveStreamHistoryList.data.total
                  }
                  loader={
                    productLiveStreamHistoryList.infiniteLoading &&
                    [...Array(4)].map(() => (
                      <Skeleton height={60} borderRadius={10} />
                    ))
                  }
                >
                  <Table responsive className="personalized-request-table">
                    <thead>
                      <tr>
                        <th>{t("si_no")}</th>
                        <th>{t("title")}</th>
                        <th>{t("streamed_date")}</th>
                        <th>{t("streamed_end_date")}</th>
                        <th>{t("stream_type")}</th>
                        <th>{t("payment_type")}</th>
                        <th>{t("revenue")}</th>
                        <th>{t("status")}</th>
                        <th>{t("actions")}</th>
                      </tr>
                    </thead>
                    {productLiveStreamHistoryList.data.live_stream_shoppings_history.map(
                      (stream, index) => (
                        <tbody>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{stream.title ? stream.title : ""}</td>
                            <td>
                              {stream.schedule_time
                                ? stream.schedule_time
                                : "-"}
                            </td>
                            <td>{stream.end_time ? stream.end_time : "-"}</td>
                            <td>
                              {stream.stream_type ? stream.stream_type : ""}
                            </td>
                            <td>
                              {stream.payment_type ? stream.payment_type : ""}
                            </td>
                            <td>
                              {stream.overall_revenue
                                ? stream.overall_revenue
                                : ""}
                            </td>
                            <td>
                              <span className="table-outline-btn">
                                {stream.status_formatted
                                  ? stream.status_formatted
                                  : ""}
                              </span>
                            </td>
                            <td>
                              <div className="table-btn-sec">
                                {stream.status !== 1 && (
                                  <Button
                                    className="table-download-btn"
                                    onClick={() =>
                                      history.push(
                                        `/order-recieved-detail/${stream.unique_id}`,
                                        { title: stream.title }
                                      )
                                    }
                                  >
                                    {t("orders")}
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      )
                    )}
                  </Table>
                </InfiniteScroll>
              ) : (
                <NoDataFound />
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default translate(PersonalRequestTable);
