import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Dropdown,
} from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { translate, t } from "react-multi-lang";
import {
  deleteCouponCodeStart,
  promoCodeStatusUpdateStart
} from "../../store/actions/PremiumFolderAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import NoDataFound from "../NoDataFound/NoDataFound";
import Skeleton from "react-loading-skeleton";

const TableDetails = (props) => {

  const { couponCodeList, fetchMoreData } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      {couponCodeList.loading ?
        [...Array(6)].map(() =>
          <Skeleton className="mb-2" height={60} width={"100%"} />)
        :
        Object.keys(couponCodeList.data).length > 0 &&
          couponCodeList.data.promocode.length > 0
          ?
          <InfiniteScroll
            dataLength={couponCodeList.data.promocode.length}
            next={fetchMoreData}
            hasMore={couponCodeList.data.promocode.length <
              couponCodeList.data.total}
            loader={[...Array(6)].map(() =>
              <Skeleton className="mb-2" height={60} width={"100%"} />)}
          >
            <Table responsive className="personalized-request-table">
              <thead>
                <tr>
                  <th>{t("coupon_code")}</th>
                  <th>{t("amount")}</th>
                  <th>{t("start_date")}</th>
                  <th>{t("end_date")}</th>
                  <th>{t("no_of_users_limit")}</th>
                  <th>{t("no_of_uses_per_customer")}</th>
                  <th>{t("status")}</th>
                  <th>{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {couponCodeList.data.promocode.map((coupon) =>
                  <tr>
                    <td className="coupon-name">{coupon.promo_code}</td>
                    <td>{coupon.amount} {""} {coupon.amount_type == 0 ? "%" : t("tokens")}</td>
                    <td>{coupon.start_date}</td>
                    <td>{coupon.expiry_date ? coupon.expiry_date : "-"}</td>
                    <td><b>{coupon.no_of_users_limit}</b></td>
                    <td><b>{coupon.per_users_limit}</b></td>
                    <td>{coupon.status == 1 ?
                      <div className="coupon-enable">{t("enabled")}</div>
                      :
                      <div className="coupon-disabled">{t("disabled")}</div>
                    }
                    </td>
                    <td>
                      <Dropdown className="table-dropdown">
                        <Dropdown.Toggle id="dropdown-basic">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            enableBackground="new 0 0 512 512"
                            viewBox="0 0 512 512"
                          >
                            <g fill="#9f4298">
                              <circle
                                cx="458.667"
                                cy="256"
                                r="53.333"
                                data-original="#000000"
                              ></circle>
                              <circle cx="256" cy="256" r="53.333" data-original="#000000"></circle>
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
                          {coupon.status == 1 ?
                            <Dropdown.Item
                              onClick={() => {
                                dispatch(promoCodeStatusUpdateStart({
                                  promo_code_unique_id: coupon.promo_code_unique_id
                                }));
                              }}
                            >{t("disable")}
                            </Dropdown.Item>
                            :
                            <Dropdown.Item
                              onClick={() => {
                                dispatch(promoCodeStatusUpdateStart({
                                  promo_code_unique_id: coupon.promo_code_unique_id
                                }));
                              }}
                            >{t("enable")}
                            </Dropdown.Item>
                          }
                          <Dropdown.Item
                            onClick={() => history.push(`/edit-coupon/${coupon.promo_code_unique_id}`)}
                          >{t("edit")}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              dispatch(deleteCouponCodeStart({
                                promo_code_unique_id: coupon.promo_code_unique_id
                              }));
                            }}
                          >{t("delete")}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </InfiniteScroll>
          :
          <NoDataFound />
      }
    </>
  )
}

export default TableDetails;