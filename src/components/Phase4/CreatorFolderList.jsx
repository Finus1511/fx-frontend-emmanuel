import React, { useState } from "react";
import { Container, Image, Button, Row, Col, Dropdown } from "react-bootstrap";
import CreateFolderModal from "./CreateFolderModal";
import { translate, t } from "react-multi-lang";
import Skeleton from "react-loading-skeleton";
import NoDataFound from "../NoDataFound/NoDataFound";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFolderFileStart,
  folderFileViewStart
} from "../../store/actions/PremiumFolderAction";
import InfiniteScroll from "react-infinite-scroll-component";
import EditFolderModal from "./EditFolderModal";
import { Link, useHistory } from "react-router-dom";

const CreatorFolderList = (props) => {

  const dispatch = useDispatch();
  const { premiumFolderList, fetchMorePost } = props;
  const [modalShow, setModalShow] = useState(false);
  const [collectionId, setCollectionId] = useState(null);
  const [editFolderModal, setEditFolderModal] = useState(false);

  const closeFolderModal = () => {
    setModalShow(false);
  }

  const closeEditFolderModal = () => {
    setEditFolderModal(false);
  }

  const editCollection = (unique_id, id) => {
    setEditFolderModal(true)
    setCollectionId(id)
    dispatch(folderFileViewStart({
      collection_unique_id: unique_id
    }));
  }

  return (
    <>
      <div className="personalized-table-head">
        <div className="personalized-table-back">
          <div className="table-heading">
            <h4>{t("premium_folder")}</h4>
          </div>
        </div>
        <div className="coupon-table-head-btn">
          <Button
            className="default-btn profile-sidebar-broadcast-btn"
            type="button"
            onClick={() => setModalShow(true)}
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
            {t("create_folder")}
          </Button>

          {modalShow &&
            <CreateFolderModal
              modalShow={modalShow}
              setModalShow={setModalShow}
              closeFolderModal={closeFolderModal}
            />
          }
        </div>
      </div>
      {premiumFolderList.loading ?
        <div className="premium-folder-list-box">
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
            loader={<div className="premium-folder-list-box">
              {[...Array(6)].map((i) => (
                <Skeleton count={1} height={270} width={290} />
              ))}
            </div>}
          >
            <div className="premium-folder-list-box">
              {premiumFolderList.data.collections.map((collection) =>
                <div className="premium-folder-list-card">
                  <Link to={`/premium-folder-file/${collection.unique_id}`}>
                    <div className="folder-list-card-img-sec"
                    >
                      <Image
                        src={collection.thumbnail}
                        className="folder-list-card-img"
                      />
                    </div>
                  </Link>
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
                            <circle
                              cx="15.5"
                              cy="7.5"
                              r="2.5"
                              data-original="#000000"
                            ></circle>
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
                    <span>
                      <Dropdown className="table-dropdown">
                        <Dropdown.Toggle id="dropdown-basic">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            enableBackground="new 0 0 512 512"
                            viewBox="0 0 512 512"
                          >
                            <g fill="#fff">
                              <circle
                                cx="458.667"
                                cy="256"
                                r="53.333"
                                data-original="#000000"
                              ></circle>
                              <circle
                                cx="256"
                                cy="256"
                                r="53.333"
                                data-original="#000000"
                              ></circle>
                              <circle
                                cx="53.333"
                                cy="256"
                                r="53.333"
                                data-original="#000000"
                              ></circle>
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => {
                              editCollection(collection.unique_id, collection.id)
                            }}
                          >{t("edit")}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              if (
                                window.confirm(
                                  t("delete_collection")
                                )
                              ) {
                                dispatch(
                                  deleteFolderFileStart({
                                    collection_unique_id: collection.unique_id,
                                  })
                                )
                              }
                            }}
                          >{t("delete")}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </span>
                  </div>
                  <div className="folder-list-card-img-info">
                    <h4>{collection.name}</h4>
                    <p>
                      {collection.description}
                    </p>
                    <h3>{collection.amount} {t("tokens")}</h3>
                  </div>
                </div>
              )
              }
            </div>
          </InfiniteScroll>
          :
          <NoDataFound />

      }
      {editFolderModal &&
        <EditFolderModal
          editFolderModal={editFolderModal}
          closeEditFolderModal={closeEditFolderModal}
          collectionId={collectionId}
        />
      }
    </>
  );
};

export default CreatorFolderList;
