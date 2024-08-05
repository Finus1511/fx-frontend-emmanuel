import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import UserCard from "../FansFollowing/UserCard";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchFavStart, fetchMoreFavStart } from "../../../store/actions/FavAction";
import NoDataFound from "../../NoDataFound/NoDataFound";
import useInfiniteScroll from "../../helper/useInfiniteScroll";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import FollowingLoader from "../../Loader/FollowingLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";

const FavoritesIndex = (props) => {

  const favList = useSelector((state) => state.fav.fav);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(
      fetchFavStart({
        skip: 0,
        take: 12
      })
    );
  }, []);

  const fetchMoreFavList = () => {
    dispatch(
      fetchMoreFavStart({
        skip: favList.data.fav_users.length,
        take: 12,
      })
    );
  };
  
  console.log("favList ", favList)

  return (
    <div className="lists">
      <Container>
        <Row>
          <Col sm={12} md={12} xs={12}>
            <div className="profile-post-area">
              <div className="bookmarkes-list bookmarks-right-side">
                <div className="pull-left">
                  <h3>
                    <Link
                      className="bookmarkes-list"
                      to={"/list"}>
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/back.svg"
                        }
                        className="svg-clone"
                        width=""
                      />
                      {t("favorites")}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            {favList.loading ? (
              <FollowingLoader />
            ) : Object.keys(favList.data).length > 0 && favList.data.fav_users.length > 0 ? (
              <InfiniteScroll
                dataLength={favList.data.fav_users.length}
                next={fetchMoreFavList}
                hasMore={favList.data.fav_users.length <
                  favList.data.total}
                loader={[...Array(6)].map(() =>
                  <Col sm={12} md={6} lg={4} xs={12}>
                    <Skeleton height={350} />
                  </Col>
                )}
              >
                <>
                {favList.data.fav_users.map((fav_user) =>
                fav_user.fav_user ? (
                    <UserCard user={fav_user.fav_user} key={fav_user.user_id} />
                  ) : null
                )}
                </>
              </InfiniteScroll>
            ) : (
              <NoDataFound></NoDataFound>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default (translate(FavoritesIndex));
