import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import NoDataFound from "../NoDataFound/NoDataFound";
import { userVirtualVhListStart } from "../../store/actions/UserVipVEAction";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import InfiniteScroll from "react-infinite-scroll-component";
import UserVirtualExperiencsProduct from "../Accounts/Profile/UserVirtualExperienceProduct";

const VeVipUserList = () => {

	let { username } = useParams();

	const dispatch = useDispatch();

	const userVirtualVhList = useSelector(
		(state) => state.userVipVirtual.userVirtualVhList
	);

	const [skip, setSkip] = useState(0);
	const [take, setTake] = useState(12);

	useEffect(() => {
		dispatch(
			userVirtualVhListStart({
				skip: 0,
				take: 12,
				user_unique_id: username,
			})
		)
	}, []);

	const fetchMoreVE = () => {
		dispatch(
			userVirtualVhListStart({
				user_unique_id: username,
				skip: skip,
				take: take,
				append: true,
			})
		);
		setSkip(take);
	};

	return (
		<>
			{userVirtualVhList.loading ? (
				<div className="profile-all-post-box">
					{[...Array(8)].map(() => (
						<Skeleton className="profile-post-card-loader" />
					))}
				</div>
			) :
				userVirtualVhList.data?.virtual_experiences
					?.length > 0 ? (
					<InfiniteScroll
						dataLength={
							userVirtualVhList.data.virtual_experiences
								.length
						}
						next={fetchMoreVE}
						hasMore={
							userVirtualVhList.data.virtual_experiences
								.length < userVirtualVhList.data.total
						}
						loader={
							<div className="profile-all-post-box">
								{[...Array(8)].map(() => (
									<Skeleton className="profile-post-card-loader" />
								))}
							</div>
						}
						style={{ height: "auto", overflow: "hidden" }}
					>
						<div className="virtual-card-wrapped">
							{userVirtualVhList.data.virtual_experiences.map(
								(post) => (
									<UserVirtualExperiencsProduct
										post={post}
										type="vip"
									/>
								)
							)}
						</div>
					</InfiniteScroll>
				) : (
					<NoDataFound />
				)}
		</>
	);
};
export default withRouter(VeVipUserList);