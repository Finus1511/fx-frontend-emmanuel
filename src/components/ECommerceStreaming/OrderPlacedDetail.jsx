import React, { useEffect, useRef, useState } from "react";
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
import { Link, useHistory, useLocation } from "react-router-dom";
import Select from "react-select";
import Skeleton from "react-loading-skeleton";
import { productOrderListStart } from "../../store/actions/ProductLiveStreamAction";
import { useDispatch, useSelector } from "react-redux";
import "./GoLiveProduct.css";
import NoDataFound from "../NoDataFound/NoDataFound";
import { translate, t } from "react-multi-lang";
import InfiniteScroll from "react-infinite-scroll-component";
import { Field, Form as FORM, Formik } from "formik";
import { useSearchParams } from "../../hooks/useSearchParams";
import * as Yup from "yup";

const OrderPlacedDetail = () => {
  const formRef = useRef();
  const location = useLocation();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const productOrderList = useSelector(
    (state) => state.productLiveStream.productOrderList
  );
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState(null);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(12);
  const [filter, setFilter] = useState({
    search_key: searchParams.get("search_key")
      ? searchParams.get("search_key")
      : "",
  });

  const customStyles = {
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      left: "0px",
      borderRadius: "8px",
      overflow: "hidden",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
      minWidth: 250,
      fontSize: "1.2em",
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
        borderRadius: "3px",
        backgroundColor: "#fff",
      },
      "&::-webkit-scrollbar": {
        width: "4px",
        backgroundColor: "#fff",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "3px",
        boxShadow: "inset 0 0 6px rgba(0, 0, 0, .3)",
        backgroundColor: "#555",
      },
    }),
    container: (provided) => ({ ...provided, width: "250px" }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent!important",
      border: "1px solid #E7E7E7!important",
      borderRadius: "6px!important",
      boxShadow: "none!important",
      height: "45px",
      display: "flex",
      alignItems: "center",
      alignItemsContent: "center",
      cursor: "pointer",
      fontSize: "0.9em",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#8a96a3",
      fontSize: "1.4em",
      fontWeight: "400",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#242529",
      display: "flex",
      alignItems: "center",
      gap: "0.5em",
      fontSize: "1.4em",
      fontWeight: "400",
    }),
    indicatorContainer: (provided) => ({
      ...provided,
      color: "#32089F!important",
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      svg: {
        fill: "#111",
      },
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected ? "#f7f7f7" : "#fff",
        color: "#000",
        "&:hover": {
          backgroundColor: "#f7f7f7",
          color: "#242529",
        },
      };
    },
  };

  const options = [
    { value: "option 1", label: "Last three month" },
    { value: "option 2", label: "One month" },
    { value: "option 3", label: "One Week" },
    { value: "option 4", label: "One Year" },
  ];

  useEffect(() => {
    dispatch(productOrderListStart({ skip: skip, take: take, ...filter }));
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
    search_key: Yup.string()
      .required(t("required"))
      .matches(/^(?=\S*$)/, t("white_space")),
  });

  return (
    <div className="new-home-page-sec">
      <Container fluid>
        {productOrderList.loading ? (
          <div className="personalized-request-box">
            <Row className="align-items-center">
              <Col md={12}>
                <div className="personalized-table-head">
                  <div className="personalized-table-back">
                    <Link to="/live-history-detail">
                      <span className="personalized-request-back-info">
                        <Skeleton height={20} width={75} />
                      </span>
                    </Link>
                    <div className="table-heading">
                      <Skeleton height={20} width={100} />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="order-placed-box">
                  {[...Array(4)].map((data) => (
                    <Skeleton height={170} borderRadius={10} />
                  ))}
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <div className="personalized-request-box">
            <Row className="align-items-center">
              <Col md={12}>
                <div className="personalized-table-head">
                  <div className="personalized-table-back">
                    <Link
                      to="#"
                      onClick={() => {
                        history.goBack();
                      }}
                    >
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
                      <h4>{t("my_order")}</h4>
                    </div>
                  </div>
                  {/* {Object.keys(productOrderList.data).length > 0 && (
                    <div className="order-placed-detail-head">
                      <div>
                        <h4>
                          {productOrderList.data.total} {t("orders_placed_in")}{" "}
                        </h4>
                      </div>
                      <div>
                        <Select
                          isClearable
                          styles={customStyles}
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                        />
                      </div>
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
                              ? `/order-placed-detail?search_key=${
                                  val.search_key
                                }&sort_by=${searchParams.get("sort_by")}`
                              : `/order-placed-detail?search_key=${val.search_key}`
                            // { state: { value: value } }
                          );
                        }}
                        innerRef={formRef}
                      >
                        {({ values, setFieldValue, resetForm }) => (
                          <FORM className="form">
                            <div className="personalized-table-search">
                              <InputGroup className="mb-0">
                                <Field
                                  className="form-control"
                                  name="search_key"
                                  placeholder="Search"
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
                                            ? `/order-placed-detail?sort_by=${searchParams.get(
                                                "sort_by"
                                              )}`
                                            : `/order-placed-detail`
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
                                    <Button
                                      className="search-btn"
                                      type="submit"
                                    >
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
                            </div>
                          </FORM>
                        )}
                      </Formik>
                    </div>
                  )} */}
                </div>
              </Col>
            </Row>
            {Object.keys(productOrderList.data).length > 0 &&
            productOrderList.data.live_stream_shopping_orders.length > 0 ? (
              <Row>
                <Col md={12}>
                  <InfiniteScroll
                    dataLength={
                      productOrderList.data.live_stream_shopping_orders.length
                    }
                    next={() => {
                      setSkip(skip + take);
                    }}
                    hasMore={
                      productOrderList.data.live_stream_shopping_orders
                        .length <= productOrderList.data.total
                    }
                    loader={
                      productOrderList.infiniteLoading && (
                        <div className="order-placed-box">
                          {[...Array(4)].map((data) => (
                            <Skeleton height={170} borderRadius={10} />
                          ))}
                        </div>
                      )
                    }
                  >
                    <div className="order-placed-box">
                      {productOrderList.data.live_stream_shopping_orders.map(
                        (product) => (
                          <div className="order-placed-card">
                            <div className="order-placed-card-head">
                              <div className="order-placed-card-left">
                                <div className="order-placed-card-info-new">
                                  <h4>{t("order_placed")} :</h4>
                                  <p>{product?.created_at}</p>
                                </div>
                                <div className="order-placed-card-info-new">
                                  <h4>{t("ship_to")} :</h4>
                                  <span className="order-placed-span">
                                    {/* <Image
                                      className="product-stream-user-img"
                                      src={product.user_details.picture}
                                    /> */}
                                    <p>{product?.user_details?.name}</p>
                                  </span>
                                </div>
                              </div>
                              <div className="order-placed-card-right">
                                <div className="order-placed-card-info">
                                  <h4>
                                    {t("order_id")} :
                                    <span>{product?.unique_id}</span>
                                  </h4>
                                  <a
                                    href="#"
                                    onClick={() => {
                                      history.push(
                                        `/order-product-detail/${product?.unique_id}`
                                      );
                                    }}
                                  >
                                    {t("view_order_details")}
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="order-placed-card-body ">
                              <div className="order-placed-detail">
                                <div className="">
                                  <Image
                                    className="order-placed-product-img"
                                    src={
                                      product?.order_product_details?.picture
                                    }
                                  />
                                </div>
                                <div className="order-placed-card-info">
                                  <h5>
                                    {product?.order_product_details?.name}
                                  </h5>
                                  <h4>
                                    {
                                      product?.order_product_details
                                        ?.description
                                    }
                                  </h4>
                                  <h3>{product?.user_amount}Tokens</h3>
                                  {/* <span className="product-quantify">
                            </div>
                            <div className="order-placed-card-body ">
                              <div className="order-placed-detail">
                                <div className="">
                                  <Image
                                    className="order-placed-product-img"
                                    src={
                                      product?.order_product_details?.picture
                                    }
                                  />
                                </div>
                                <div className="order-placed-card-info">
                                  <h4>
                                    {
                                      product?.order_product_details
                                        ?.description
                                    }
                                  </h4>
                                  <h3>{product?.amount_formatted}</h3>
                                  {/* <span className="product-quantify">
                                    <p>{t("quantity")}</p>
                                    <div className="product-quantify-box">
                                      2
                                    </div>
                                  </span> */}
                                </div>
                              </div>
                              <div className="shiping-status">
                                <span className="shiping-status-badge">
                                  <p>
                                    {product?.shipping_url == ""
                                      ? t("shipping_pending")
                                      : product?.is_shipped !== 1
                                      ? t("shipping_process")
                                      : t("shipped")}
                                  </p>

                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="19"
                                    height="20"
                                    fill="none"
                                    viewBox="0 0 19 20"
                                  >
                                    <g clipPath="url(#clip0_448_2113)">
                                      <path
                                        fill="#9F4298"
                                        d="M11.875 14.75H0V3.667a2.375 2.375 0 012.375-2.375H9.5a2.375 2.375 0 012.375 2.375V14.75zm1.583 0H19v-3.958h-5.542v3.958zm1.584-10.292h-1.584v4.75H19v-.791a3.963 3.963 0 00-3.958-3.959zM2.42 16.333c-.03.13-.044.263-.046.396a1.98 1.98 0 003.958 0 1.917 1.917 0 00-.046-.396H2.421zm11.083 0c-.029.13-.044.263-.046.396a1.98 1.98 0 003.959 0 1.93 1.93 0 00-.046-.396h-3.867z"
                                      ></path>
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_448_2113">
                                        <path
                                          fill="#fff"
                                          d="M0 0H19V19H0z"
                                          transform="translate(0 .5)"
                                        ></path>
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </InfiniteScroll>
                </Col>
              </Row>
            ) : (
              <NoDataFound />
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default translate(OrderPlacedDetail);
