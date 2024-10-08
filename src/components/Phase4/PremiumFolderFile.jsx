import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
} from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { Field, Form as FORM, Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import CouponTableFilterModal from "./CouponTableFilterModal";
import Skeleton from "react-loading-skeleton";
import PremiunFolderDetail from "./PremiumFolderDetail";
import { translate, t } from "react-multi-lang";
import {
  fetchMorefolderFilesListStart,
  folderFilesRemoveStart,
  folderFilesListStart,
  folderFileViewStart,
} from "../../store/actions/PremiumFolderAction";
import InfiniteScroll from "react-infinite-scroll-component";
import FilesUploadModal from "./FilesUploadModal";
import NoDataFound from "../NoDataFound/NoDataFound";

const PremiumFolderFile = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const folderFilesList = useSelector((state) => state.folder.folderFilesList);
  const folderFileView = useSelector((state) => state.folder.folderFileView);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    dispatch(folderFileViewStart({
      collection_unique_id: params.unique_id,
    }))
    dispatch(folderFilesListStart({
      skip: 0,
      take: 12,
      collection_unique_id: params.unique_id,
    }));
  }, [params.unique_id]);

  const fetchMorePost = () => {
    dispatch(
      fetchMorefolderFilesListStart({
        skip: folderFilesList.data.collection_files.length,
        take: 12,
        collection_unique_id: params.unique_id,
      })
    );
  };

  const closeFolderModal = () => {
    setModalShow(false);
  }

  return (
    <>
      <div className="new-home-page-sec">
        <Container fluid>
          <div className="personalized-request-box">
            <Row className="align-items-center">
              <Col md={12}>
                {folderFileView.loading ? (
                  <>
                    <div className="personalized-table-head">
                      <div className="personalized-table-back">
                        <Skeleton width={75} height={25} borderRadius={10} />
                        <div className="table-heading">
                          <Skeleton width={100} height={15} borderRadius={10} />
                          <Skeleton width={400} height={10} borderRadius={10} />
                        </div>
                      </div>
                      <div className="coupon-table-action">
                        <div className="premium-folder-upload-btn">
                          <Skeleton width={100} height={45} borderRadius={10} />
                        </div>
                      </div>
                    </div>
                    <div className="premium-folder-count">
                      <Skeleton width={200} height={20} />
                    </div>
                    <div className="premium-folder-box">
                      {[...Array(4)].map(() => (
                        <Skeleton height={250} borderRadius={10} />
                      ))}
                    </div>
                  </>
                ) : Object.keys(folderFileView.data).length > 0
                  ? (
                    <>
                      <div className="personalized-table-head">
                        <div className="personalized-table-back">
                          <Link to="#" onClick={() => history.goBack()}>
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
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
                            <h4>{folderFileView.data.collection.name}</h4>
                            <p>
                              {folderFileView.data.collection.description}
                            </p>
                          </div>
                        </div>
                        <div className="coupon-table-action">
                          <div className="premium-folder-upload-btn">
                            <Button
                              className="default-btn"
                              type="button"
                              onClick={() => setModalShow(true)}
                            >{t("upload")}</Button>
                          </div>
                        </div>
                      </div>
                      {/* <div className="premium-folder-count">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            enableBackground="new 0 0 512 512"
                            viewBox="0 0 24 24"
                          >
                            <g fill="#9f4298">
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
                          <p>
                            Image: <strong>232</strong>
                          </p>
                        </span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            enableBackground="new 0 0 512 512"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#9f4298"
                              d="M19 24H5a5.006 5.006 0 01-5-5V5a5.006 5.006 0 015-5h14a5.006 5.006 0 015 5v14a5.006 5.006 0 01-5 5zM5 2a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3zm4.342 15.005a2.368 2.368 0 01-1.186-.323 2.313 2.313 0 01-1.164-2.021V9.339a2.337 2.337 0 013.5-2.029l5.278 2.635a2.336 2.336 0 01.049 4.084l-5.376 2.687a2.2 2.2 0 01-1.101.289zm-.025-8a.314.314 0 00-.157.042.327.327 0 00-.168.292v5.322a.337.337 0 00.5.293l5.376-2.688a.314.314 0 00.12-.266.325.325 0 00-.169-.292L9.545 9.073a.462.462 0 00-.228-.068z"
                              data-original="#000000"
                            ></path>
                          </svg>
                          <p>
                            Video: <strong>12</strong>
                          </p>
                        </span>
                      </div> */}
                      {Object.keys(folderFilesList.data).length > 0 &&
                  folderFilesList.data.collection_files.length > 0 ?
                      <InfiniteScroll
                        dataLength={folderFilesList.data.collection_files.length}
                        next={fetchMorePost}
                        hasMore={folderFilesList.data.collection_files.length <
                          folderFilesList.data.total}
                        loader={<div className="premium-folder-box">
                          {[...Array(4)].map(() => (
                            <Skeleton height={250} borderRadius={10} />
                          ))}
                        </div>}
                      >
                        <div className="premium-folder-box">
                          {folderFilesList.data.collection_files.map((collection) =>
                            <div className="premium-folder-card">
                              <div className="premium-folder-img">
                                {collection.file_type == "image" ?
                                  <Image
                                    src={collection.file}
                                    className="premium-img"
                                  />
                                  :
                                  <video
                                    autoplay
                                    controls
                                    id="myVideo"
                                    className="user-profile1 w-100"
                                  >
                                    <source src={collection.file} type="video/mp4" />
                                  </video>
                                }
                              </div>
                              <div className="premium-img-action">
                                <Button 
                                  className="premium-img-download"
                                  type="button"
                                  onClick={() =>
                                    window.open(
                                      collection.file,
                                      "_blank",
                                      "noreferrer"
                                    )
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    fill="none"
                                    viewBox="0 0 21 22"
                                  >
                                    <path
                                      fill="#fff"
                                      d="M10.47 13.932a.642.642 0 01-.458-.19L7.8 11.529a.652.652 0 010-.916c.251-.251.666-.251.917 0l1.755 1.754 1.755-1.755c.25-.25.665-.25.916 0 .25.251.25.666 0 .917l-2.213 2.213a.641.641 0 01-.458.19z"
                                    ></path>
                                    <path
                                      fill="#fff"
                                      d="M10.47 13.872a.653.653 0 01-.648-.649V4.431c0-.354.294-.648.649-.648.354 0 .648.294.648.648v8.792a.653.653 0 01-.648.649z"
                                    ></path>
                                    <path
                                      fill="#fff"
                                      d="M10.576 19.067c-4.452 0-7.564-3.112-7.564-7.564 0-.354.294-.648.648-.648.355 0 .648.293.648.648 0 3.691 2.577 6.267 6.268 6.267s6.267-2.576 6.267-6.267c0-.354.294-.648.649-.648.354 0 .648.293.648.648 0 4.452-3.112 7.564-7.564 7.564z"
                                    ></path>
                                  </svg>
                                </Button>
                                <Button
                                  type="button"
                                  className="premium-img-delete"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        t("delete_files")
                                      )
                                    ) {
                                      dispatch(
                                        folderFilesRemoveStart({
                                          collection_file_unique_id: collection.unique_id,
                                        })
                                      )
                                    }
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    fill="none"
                                    viewBox="0 0 14 16"
                                  >
                                    <path
                                      stroke="#fff"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="1.353"
                                      d="M13.092 4.542H.914M11.569 6.825l-.51 5.602a3.045 3.045 0 01-3.044 2.77H5.96a3.045 3.045 0 01-3.045-2.77l-.48-5.602M5.48 8.347v2.284M8.518 8.347v2.284M10.428 4.542h-6.85l.38-1.606a1.888 1.888 0 011.865-1.439h2.36a1.888 1.888 0 011.865 1.439l.38 1.606z"
                                    ></path>
                                  </svg>
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </InfiniteScroll>
                      : <PremiunFolderDetail /> }
                    </>
                  ) : (
                    <NoDataFound />
                  )}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      {modalShow &&
        <FilesUploadModal
          modalShow={modalShow}
          setModalShow={setModalShow}
          closeFolderModal={closeFolderModal}
        />
      }
    </>
  );
};

export default translate(PremiumFolderFile);
