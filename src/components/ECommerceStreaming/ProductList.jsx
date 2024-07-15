import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Tab,
  Button,
  InputGroup,
  FormControl,
  Image,
  Form,
} from "react-bootstrap";
import "./GoLiveProduct.css";
import BuyNowModal from "./BuyNowModal";
import { liveStreamShoppingsProuctsListStart } from "../../store/actions/ProductLiveStreamAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Skeleton from "react-loading-skeleton";
import CustomLazyLoad from "../helper/CustomLazyLoad";
import { translate, t } from "react-multi-lang";
const ProductList = (props) => {
  const { lssProductsList } = props;
  const profile = useSelector((state) => state.users.profile);
  const productLiveStreamView = useSelector(
    (state) => state.productLiveStream.productLiveStreamView
  );
  const [modalShow, setModalShow] = useState(false);
  const [purchasedProduct, setPurchasedProduct] = useState([]);
  const [searchKey, setSearchKey] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleSubmit = (searchKey) => {
    dispatch(
      liveStreamShoppingsProuctsListStart({
        live_stream_shopping_unique_id: id,
        search_key: searchKey,
      })
    );
  };

  return (
    <>
      <div className="onlive-stream-product">
        <Tab.Container id="left-tabs-example" defaultActiveKey="available">
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link
                eventKey="available"
                onClick={(event) => props.setActiveSection(event, "available")}
              >
                {t("available")}
                <span className="onlive-stream-tabs-info">
                  <p>
                    {lssProductsList.loading
                      ? 0
                      : lssProductsList.data.available_user_products_count}
                  </p>
                </span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="sold"
                onClick={(event) => props.setActiveSection(event, "sold")}
              >
                {t("sold")}
                <span className="onlive-stream-tabs-info">
                  <p>
                    {lssProductsList.loading
                      ? 0
                      : lssProductsList.data.sold_products_count}
                  </p>
                </span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="available">
              <div className="personalized-table-search">
                <Form
                  onSubmit={(event) => {
                    event.preventDefault();
                    searchKey && handleSubmit(searchKey);
                  }}
                >
                  <InputGroup className="mb-0">
                    <Form.Control
                      type="text"
                      placeholder={t("search_products")}
                      aria-describedby="basic-addon2"
                      value={searchKey}
                      onChange={(event) => {
                        setSearchKey(event.target.value);
                      }}
                    />
                    <InputGroup.Text id="basic-addon2">
                      {searchKey && (
                        <InputGroup.Text id="basic-addon1">
                          <Button
                            className="search-btn"
                            onClick={() => {
                              setSearchKey("");
                              handleSubmit("");
                            }}
                          >
                            <svg
                              height="24"
                              width="24"
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                              focusable="false"
                              fill="#7d7474"
                            >
                              <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                            </svg>
                          </Button>
                        </InputGroup.Text>
                      )}
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
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                            <path d="M21 21l-6 -6" />
                          </svg>
                        </Button>
                      </InputGroup.Text>
                    </InputGroup.Text>
                  </InputGroup>
                </Form>
              </div>
              <div className="onlive-stream-product-list">
                {lssProductsList.loading ? (
                  <Skeleton
                    count={3}
                    height={112}
                    className="mb3"
                    borderRadius={10}
                  />
                ) : Object.keys(lssProductsList.data).length > 0 &&
                  lssProductsList.data.user_products.length > 0 &&
                  lssProductsList.data.available_user_products_count > 0 ? (
                  lssProductsList.data.user_products.map((product, index) =>
                    product.quantity > 0 || product.quantity !== "" ? (
                      <div className="onlive-stream-product-card">
                        <div className="onlive-stream-product-card-img">
                          <CustomLazyLoad
                            className="live-stream-product-img"
                            src={product.picture}
                            alt=""
                          />
                        </div>
                        <div className="onlive-stream-product-card-info">
                          <h4>{product.name}</h4>
                          <p>{product.description}</p>
                          <div className="onlive-stream-product-pricing">
                            <h4>{product.price} Tokens</h4>
                            {profile.data.user_id ==
                              productLiveStreamView.data?.live_stream_shopping
                                ?.user_details.id && (
                              <p>
                                {t("qty")} <span>{product.quantity}</span>
                              </p>
                            )}
                          </div>
                          {profile.data.user_id !==
                            productLiveStreamView.data?.live_stream_shopping
                              ?.user_details.id &&
                            !purchasedProduct.includes(
                              product.user_product_unique_id
                            ) && (
                              <div className="onlive-stream-buy-btn">
                                <Button
                                  className="buy-product-btn"
                                  onClick={() =>
                                    setModalShow({
                                      ...product,
                                      liveVideo: id,
                                    })
                                  }
                                >
                                  {t("buy_now")}
                                </Button>
                              </div>
                            )}
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  )
                ) : (
                  <div className="no-data-found-sec">
                    <Image
                      className="no-product-found"
                      src={
                        window.location.origin + "/assets/images/no-product.png"
                      }
                    />
                    <h4>No Product Found</h4>
                  </div>
                )}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="sold">
              <div className="personalized-table-search">
                <Form
                  onSubmit={(event) => {
                    event.preventDefault();
                    searchKey && handleSubmit(searchKey);
                  }}
                >
                  <InputGroup className="mb-0">
                    <Form.Control
                      type="text"
                      placeholder={t("search_products")}
                      aria-describedby="basic-addon2"
                      value={searchKey}
                      onChange={(event) => {
                        setSearchKey(event.target.value);
                      }}
                    />
                    <InputGroup.Text id="basic-addon2">
                      {searchKey && (
                        <InputGroup.Text id="basic-addon1">
                          <Button
                            className="search-btn"
                            onClick={() => {
                              setSearchKey("");
                              handleSubmit("");
                            }}
                          >
                            <svg
                              height="24"
                              width="24"
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                              focusable="false"
                              fill="#7d7474"
                            >
                              <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                            </svg>
                          </Button>
                        </InputGroup.Text>
                      )}
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
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                          <path d="M21 21l-6 -6" />
                        </svg>
                      </Button>
                    </InputGroup.Text>
                  </InputGroup>
                </Form>
              </div>
              <div className="onlive-stream-product-list">
                {lssProductsList.loading ? (
                  <Skeleton
                    count={3}
                    height={112}
                    borderRadius={10}
                    className="mb3"
                  />
                ) : Object.keys(lssProductsList.data).length > 0 &&
                  lssProductsList.data.user_products.length > 0 &&
                  lssProductsList.data.sold_products_count > 0 ? (
                  lssProductsList.data.user_products.map((product, index) =>
                    product.quantity <= 0 || product.quantity == "" ? (
                      <div className="onlive-stream-product-card">
                        <div className="onlive-stream-product-card-img">
                          <CustomLazyLoad
                            className="live-stream-product-img"
                            src={product.picture}
                            alt=""
                          />
                        </div>
                        <div className="onlive-stream-product-card-info">
                          <h4>{product.name}</h4>
                          <p>{product.description}</p>
                          {/* <div className="onlive-stream-product-pricing">
                          <h4>{product.price} Tokens</h4>
                          {profile.data.user_id ==
                            productLiveStreamView.data?.live_stream_shopping
                              ?.user_details.id && (
                            <p>
                              {t("qty")} <span>{product.quantity}</span>
                            </p>
                          )}
                        </div> */}
                        </div>
                      </div>
                    ) : null
                  )
                ) : (
                  <div className="no-data-found-sec">
                    <Image
                      className="no-product-found"
                      src={
                        window.location.origin + "/assets/images/no-product.png"
                      }
                    />
                    <h4>No Product Found</h4>
                  </div>
                )}
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        {modalShow && (
          <BuyNowModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            paymentType="liveStream"
            setPurchasedProduct={(data) =>
              setPurchasedProduct((prevProducts) => [...prevProducts, data])
            }
          />
        )}
      </div>
    </>
  );
};

export default translate(ProductList);
