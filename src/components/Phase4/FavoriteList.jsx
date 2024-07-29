import React, { useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import {
  fetchFavoriteListStart,
  fetchMoreFavoriteListStart,
  addFavoriteStart,
} from "../../store/actions/FavoriteAction";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import NoDataFound from "../NoDataFound/NoDataFound";
import InfiniteScroll from "react-infinite-scroll-component";
import { t } from "react-multi-lang";


const FavoriteList = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const favoriteList = useSelector((state) => state.favorite.favoriteList);

  useEffect(() => {
    dispatch(fetchFavoriteListStart({
      skip: 0,
      take: 12
    }));
  }, [])

  const fetchMoreData = () => {
    dispatch(
      fetchMoreFavoriteListStart({
        skip: favoriteList.data.fav_users.length,
        take: 12,
      })
    );
  };

  const removeFavorites = (e, user_id) => {
    e.preventDefault();
    dispatch(
      addFavoriteStart({
        user_id: user_id,
      })
    );
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
                    <h4>{t("favorite_list")}</h4>
                  </div>
                </div>
              </div>
              <Row>
                {favoriteList.loading ?
                  [...Array(4)].map((i) => (
                    <Col md={12} lg={6} xl={3}>
                      <div className="fav-list-card">
                        <Skeleton count={1} width={270} height={180} />
                      </div>
                    </Col>
                  ))
                  :

                  Object.keys(favoriteList.data).length > 0 &&
                    favoriteList.data.fav_users.length > 0 ?
                    <InfiniteScroll
                      className="custom-infinite-scroll"
                      dataLength={favoriteList.data.fav_users.length}
                      next={fetchMoreData}
                      hasMore={favoriteList.data.fav_users.length
                        < favoriteList.data.total}
                      loader={
                        <div className="row">
                          {[...Array(4)].map(() =>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                              <Skeleton height={180} />
                            </div>
                          )}
                        </div>
                      }
                    >
                      {favoriteList.data.fav_users.map((favorite) =>
                        <Col md={12} lg={6} xl={3}>
                          <div className="fav-list-card">
                            <div className="fav-list-card-img-sec">
                              <Image
                                src={favorite.fav_user.cover}
                                className="fav-list-card-img" />
                            </div>
                            <div className="fav-list-card-detail">
                              <span>Premium</span>
                              <span className="favorites-list" onClick={(e) => removeFavorites(e, favorite.fav_user_id)}>
                                {favorite.fav_user.is_fav_user == 1 ?
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    enableBackground="new 0 0 512 512"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="#ff4a4a"
                                      d="M17.5.917a6.4 6.4 0 00-5.5 3.3 6.4 6.4 0 00-5.5-3.3A6.8 6.8 0 000 7.967c0 6.775 10.956 14.6 11.422 14.932l.578.409.578-.409C13.044 22.569 24 14.742 24 7.967a6.8 6.8 0 00-6.5-7.05z"
                                      data-original="#000000"
                                    ></path>
                                  </svg>
                                  :
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    enableBackground="new 0 0 512 512"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="#fff"
                                      d="M17.5.917a6.4 6.4 0 00-5.5 3.3 6.4 6.4 0 00-5.5-3.3A6.8 6.8 0 000 7.967c0 6.775 10.956 14.6 11.422 14.932l.578.409.578-.409C13.044 22.569 24 14.742 24 7.967a6.8 6.8 0 00-6.5-7.05z"
                                      data-original="#000000"
                                    ></path>
                                  </svg>
                                }
                              </span>
                            </div>
                            <div className="fav-list-card-profile">
                              <div className="fav-list-user-img-sec">
                                <Image src={favorite.fav_user.picture}
                                  className="fav-list-user-img" />
                              </div>
                              <div className="fav-list-user-info">
                                <h4>{favorite.fav_user.name}</h4>
                                <p>
                                  <Link
                                    to={`/` + favorite.fav_user.user_unique_id}
                                    className="g-users-realname__wrapper"
                                  >
                                    @{favorite.fav_user.username}
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </div>
                        </Col>
                      )}
                    </InfiniteScroll>
                    :
                    <NoDataFound />
                }
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default FavoriteList;