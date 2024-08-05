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
  folderFilesListForOthersStart,
  fetchMorefolderFilesListForOthersStart,
  folderFileViewStart
} from "../../store/actions/PremiumFolderAction";
import InfiniteScroll from "react-infinite-scroll-component";
import FilesUploadModal from "./FilesUploadModal";
import NoDataFound from "../NoDataFound/NoDataFound";
import { getErrorNotificationMessage } from "../helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import { connect } from "react-redux";

const PremiumFolderFileOthers = (props) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const folderFilesList = useSelector((state) => state.folder.folderFilesListForOthers);
  const folderFileView = useSelector((state) => state.folder.folderFileView);

  console.log("folderFilesList", folderFilesList)

  useEffect(() => {
    dispatch(folderFileViewStart({
      collection_unique_id: params.unique_id,
    }))
    dispatch(folderFilesListForOthersStart({
      skip: 0,
      take: 12,
      collection_unique_id: params.unique_id,
    }));
  }, [params.unique_id]);

  const fetchMorePost = () => {
    dispatch(
        fetchMorefolderFilesListForOthersStart({
        skip: folderFilesList.data.collection_files.length,
        take: 12,
        collection_unique_id: params.unique_id,
      })
    );
  };

  useEffect(() => {
    if (!folderFileView.loading && Object.keys(folderFileView.data).length > 0) {
        if (folderFileView.data.collection && folderFileView.data.collection.user_needs_to_pay == 1) {
            const notificationMessage = getErrorNotificationMessage("Please pay for the collection to view the files");
            props.dispatch(createNotification(notificationMessage));
            props.history.goBack()
            
        }
    }
  }, [folderFileView]);

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
                      </div>
                      {!folderFileView.data.collection.user_needs_to_pay && Object.keys(folderFilesList.data).length > 0 &&
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
                              </div>
                            </div>
                          )}
                        </div>
                      </InfiniteScroll>
                      : <NoDataFound /> }
                    </>
                  ) : (
                    <NoDataFound />
                  )}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

function mapDispatchToProps(dispatch) {
    return { dispatch };
  }
  
  export default connect(
    mapDispatchToProps
  )(translate(PremiumFolderFileOthers));
  