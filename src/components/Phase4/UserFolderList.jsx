import React, { useState } from 'react'
import { Container, Image, Button, Row, Col, Dropdown } from 'react-bootstrap'
import CollectionsPaymentModal from './CollectionsPaymentModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import NoDataFound from '../NoDataFound/NoDataFound';
import { translate, t } from "react-multi-lang";
import { Link } from "react-router-dom";

const UserFolderList = (props) => {

  const { premiumFolderList, fetchMorePost } = props;
  const [modalShow, setModalShow] = useState(false);
  const [collectionDetails, setCollectionDetails] = useState({
    amount: "",
    collectionId: ""
  });

  const closeFolderModal = () => {
    setModalShow(false);
  }


  return (
    <>
      {premiumFolderList.loading ?
        <div className="premium-folder-list-box mt-5">
          {[...Array(6)].map((i) => (
            <Skeleton count={1} height={270} width={290} />
          ))}
        </div>
        :
        Object.keys(premiumFolderList.data).length > 0 &&
          premiumFolderList.data.collections.length > 0
          ?
          <InfiniteScroll
            dataLength={premiumFolderList.data.collections.length}
            next={fetchMorePost}
            hasMore={premiumFolderList.data.collections.length <
              premiumFolderList.data.total}
            loader={<div className="premium-folder-list-box mt-5">
              {[...Array(6)].map((i) => (
                <Skeleton count={1} height={270} width={290} />
              ))}
            </div>}
          >
            <div className="premium-folder-list-box mt-5">
              {premiumFolderList.data.collections.map((collection) =>
                <div className="premium-folder-list-card">
                  <div className="folder-list-card-img-sec">
                    <Image src={collection.thumbnail}
                      className="folder-list-card-img" />
                  </div>
                  <div className="folder-list-card-action">
                    <div className="folder-list-detail">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          enableBackground="new 0 0 512 512"
                          viewBox="0 0 24 24"
                        >
                          <g fill="#fff">
                            <path
                              d="M19.5 0h-15A4.505 4.505 0 000 4.5v15A4.505 4.505 0 004.5 24h15a4.505 4.505 0 004.5-4.5v-15A4.505 4.505 0 0019.5 0zm-15 3h15A1.5 1.5 0 0121 4.5v15a1.492 1.492 0 01-.44 1.06l-8.732-8.732a4 4 0 00-5.656 0L3 15V4.5A1.5 1.5 0 014.5 3z"
                              data-original="#000000"
                            ></path>
                            <circle cx="15.5" cy="7.5" r="2.5" data-original="#000000"></circle>
                          </g>
                        </svg>
                        <p>{collection.collection_files_count}</p>
                      </span>
                      {/* <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          enableBackground="new 0 0 512 512"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#fff"
                            d="M19 24H5a5.006 5.006 0 01-5-5V5a5.006 5.006 0 015-5h14a5.006 5.006 0 015 5v14a5.006 5.006 0 01-5 5zM5 2a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3zm4.342 15.005a2.368 2.368 0 01-1.186-.323 2.313 2.313 0 01-1.164-2.021V9.339a2.337 2.337 0 013.5-2.029l5.278 2.635a2.336 2.336 0 01.049 4.084l-5.376 2.687a2.2 2.2 0 01-1.101.289zm-.025-8a.314.314 0 00-.157.042.327.327 0 00-.168.292v5.322a.337.337 0 00.5.293l5.376-2.688a.314.314 0 00.12-.266.325.325 0 00-.169-.292L9.545 9.073a.462.462 0 00-.228-.068z"
                            data-original="#000000"
                          ></path>
                        </svg>
                        <p>12</p>
                      </span> */}
                    </div>
                  </div>
                  <div className="folder-list-card-img-info">
                    <h4>{collection.name}</h4>
                    <p> {collection.description}</p>
                    <div className="buy-folder-price">
                      <h3>{collection.amount} {t("tokens")}</h3>
                      {collection.user_needs_to_pay ?
                        <Button className="default-btn"
                          onClick={() => {
                            setModalShow(true)
                            setCollectionDetails({
                              ...collectionDetails,
                              amount: collection.amount,
                              collectionId: collection.unique_id
                            })
                          }
                          }
                        >
                          {t("buy")}
                        </Button>
                        : <Link to={`/collection-files/${collection.unique_id}`} className="default-link-btn">
                        {t("view")}
                      </Link>}
                    </div>
                  </div>
                </div>)
              }
            </div>
          </InfiniteScroll>
          :
          <NoDataFound />
      }
      {modalShow &&
        <CollectionsPaymentModal
          modalShow={modalShow}
          closeFolderModal={closeFolderModal}
          collectionDetails={collectionDetails}
        />
      }
    </>

  )
}

export default translate(UserFolderList);