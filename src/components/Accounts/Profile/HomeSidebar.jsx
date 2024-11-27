import React, { useState } from "react";
import { Button, Image, Media } from "react-bootstrap";
import configuration from "react-global-configuration";
import { translate, t } from "react-multi-lang";
import Typography from "@material-ui/core/Typography";
import { Link, useHistory } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Popover from "@material-ui/core/Popover";
import { getSuccessNotificationMessage } from "../../helper/NotificationMessage";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import {
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	EmailShareButton,
	RedditShareButton,
	TelegramShareButton,
	FacebookIcon,
	TwitterIcon,
	WhatsappIcon,
	EmailIcon,
	RedditIcon,
	TelegramIcon,
} from "react-share";
import BroadCastModal from "../../Chat/BroadCastModal";

const HomeSidebar = (props) => {

	const history = useHistory();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [broadCast, setBroadCast] = useState(false);

	const closeBroadCastModal = () => {
		setBroadCast(false);
	};

	const onCopy = (event) => {
		const notificationMessage = getSuccessNotificationMessage(
			t("profile_link_copied")
		);
		props.dispatch(createNotification(notificationMessage));
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleShareClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const open = Boolean(anchorEl);
	const popoverId = open ? "simple-popover" : undefined;

	return (
		<>
			<div className="new-home-sidebar">
				<div className="profile-logo-sec">
					<Image
						className="profile-logo-img"
						src={configuration.get("configData.site_logo")}
						width="136"
						height="28"
					/>
				</div>
				<div className="sibebar-header-sec">
					{props.profile.data.featured_story ? (
						<div className="sidebar-user-img-sec">
							<div
								data-fancybox="gallery"
								href={props.profile.data.featured_story}
							>
								<Image
									className="sidebar-user-img profile-image"
									src={props.profile.data.picture}
									alt={props.profile.data.name}
								/>
							</div>
							{props.profile.data.is_user_live === 1 && (
								<Link
									to={`/join/${props.profile.data.ongoing_live_video.live_video_unique_id}`}
									className="sidebar-live-btn"
								>
									{t("live")}
								</Link>
							)}
							{props.profile.data.is_online_status === 1 &&
								props.profile.data.is_user_online === 1 && (
									<div className="dot-circle"></div>
								)}
						</div>
					) : (
						<div className="sidebar-user-no-fea-img-sec">
							<Image
								className="sidebar-user-img profile-image"
								src={props.profile.data.picture}
								alt={props.profile.data.name}
							/>
							{props.profile.data.is_user_live === 1 && (
								<Link
									to={`/join/${props.profile.data.ongoing_live_video.live_video_unique_id}`}
									className="sidebar-live-btn"
								>
									{t("live")}
								</Link>
							)}
							{props.profile.data.is_online_status === 1 &&
								props.profile.data.is_user_online === 1 && (
									<div className="dot-circle"></div>
								)}
						</div>
					)}
					<h4>
						{props.profile.data.name}
						<span>
							{props.profile.data.is_verified_badge == 1 && (
								<Image
									className="sidebar-verified-icon"
									src={
										window.location.origin +
										"/assets/images/new-home/verified-icon.svg"
									}
								/>
							)}
						</span>
					</h4>
					{/* <Link to="#" className="sidebar-user-name">
                                    {props.profile.data.email}
                                </Link> */}
					<div
						className="sidebar-total-count-info-box"
						style={{
							gridTemplateColumns: props.profile.data.show_followings
								? "repeat(3, 1fr)"
								: "repeat(1, 1fr)",
						}}
					>
						<div className="sidebar-total-count-card">
							<h5>{props.profile.data.total_posts}</h5>
							<p>{t("posts")}</p>
						</div>
						{props.profile.data.show_followings ? (
							<React.Fragment>
								<div className="sidebar-total-count-card">
									<h5>
										{localStorage.getItem("total_followers")
											? localStorage.getItem("total_followers")
											: 0}
									</h5>
									<p>{t("fans")}</p>
								</div>
								<div className="sidebar-total-count-card">
									<h5>
										{localStorage.getItem("total_followings")
											? localStorage.getItem("total_followings")
											: 0}
									</h5>
									<p>{t("following")}</p>
								</div>
							</React.Fragment>
						) : null}
					</div>
				</div>

				{props.profile.data.is_content_creator == 2 ? (
					<>
						<Link
							to="/schedule-calendar"
							className="custome-today-call-card-wrapped profile-sidebar-broadcast-wrapped"
						>
							<div className="custome-today-call-card-start">
								<h3>Schedule Virtual Experience</h3>
								<Button className="custome-date-schedule">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										data-name="Layer 1"
										viewBox="0 0 24 24"
										fill="#000"
									>
										<path d="M17 10.039c-3.859 0-7 3.14-7 7C10 20.877 13.141 24 17 24s7-3.14 7-7c0-3.838-3.141-6.961-7-6.961zM17 22c-2.757 0-5-2.226-5-4.961 0-2.757 2.243-5 5-5s5 2.226 5 4.961c0 2.757-2.243 5-5 5zm1.707-4.707a.999.999 0 11-1.414 1.414l-1-1A1 1 0 0116 17v-2a1 1 0 112 0v1.586l.707.707zM24 7v2a1 1 0 11-2 0V7c0-1.654-1.346-3-3-3H5C3.346 4 2 5.346 2 7v1h9a1 1 0 010 2H2v9c0 1.654 1.346 3 3 3h4a1 1 0 010 2H5c-2.757 0-5-2.243-5-5V7c0-2.757 2.243-5 5-5h1V1a1 1 0 012 0v1h8V1a1 1 0 112 0v1h1c2.757 0 5 2.243 5 5z"></path>
									</svg>
								</Button>
							</div>
						</Link>
						<Link
							to="/schedule-calendar-one-on-one"
							className="custome-today-call-card-wrapped profile-sidebar-broadcast-wrapped"
						>
							<div className="custome-today-call-card-start">
								<h3>Schedule One On One Virtual Experience</h3>
								<Button className="custome-date-schedule">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										data-name="Layer 1"
										viewBox="0 0 24 24"
										fill="#000"
									>
										<path d="M17 10.039c-3.859 0-7 3.14-7 7C10 20.877 13.141 24 17 24s7-3.14 7-7c0-3.838-3.141-6.961-7-6.961zM17 22c-2.757 0-5-2.226-5-4.961 0-2.757 2.243-5 5-5s5 2.226 5 4.961c0 2.757-2.243 5-5 5zm1.707-4.707a.999.999 0 11-1.414 1.414l-1-1A1 1 0 0116 17v-2a1 1 0 112 0v1.586l.707.707zM24 7v2a1 1 0 11-2 0V7c0-1.654-1.346-3-3-3H5C3.346 4 2 5.346 2 7v1h9a1 1 0 010 2H2v9c0 1.654 1.346 3 3 3h4a1 1 0 010 2H5c-2.757 0-5-2.243-5-5V7c0-2.757 2.243-5 5-5h1V1a1 1 0 012 0v1h8V1a1 1 0 112 0v1h1c2.757 0 5 2.243 5 5z"></path>
									</svg>
								</Button>
							</div>
						</Link>
						{/* <Link
							to="/schedule-calendar-vip"
							className="custome-today-call-card-wrapped profile-sidebar-broadcast-wrapped"
						>
							<div className="custome-today-call-card-start">
								<h3>Schedule Vip Virtual Experience</h3>
								<Button className="custome-date-schedule">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										data-name="Layer 1"
										viewBox="0 0 24 24"
										fill="#000"
									>
										<path d="M17 10.039c-3.859 0-7 3.14-7 7C10 20.877 13.141 24 17 24s7-3.14 7-7c0-3.838-3.141-6.961-7-6.961zM17 22c-2.757 0-5-2.226-5-4.961 0-2.757 2.243-5 5-5s5 2.226 5 4.961c0 2.757-2.243 5-5 5zm1.707-4.707a.999.999 0 11-1.414 1.414l-1-1A1 1 0 0116 17v-2a1 1 0 112 0v1.586l.707.707zM24 7v2a1 1 0 11-2 0V7c0-1.654-1.346-3-3-3H5C3.346 4 2 5.346 2 7v1h9a1 1 0 010 2H2v9c0 1.654 1.346 3 3 3h4a1 1 0 010 2H5c-2.757 0-5-2.243-5-5V7c0-2.757 2.243-5 5-5h1V1a1 1 0 012 0v1h8V1a1 1 0 112 0v1h1c2.757 0 5 2.243 5 5z"></path>
									</svg>
								</Button>
							</div>
						</Link> */}
					</>
				) : null}

				<div className="sidebar-links profile-sidebar-broadcast-links">
					<Button
						className="default-btn profile-sidebar-broadcast-btn mb-3"
						type="submit"
						onClick={() => setBroadCast(true)}
					>
						Broadcast
						<Image
							className="broadcast-icon"
							src={
								window.location.origin +
								"/assets/images/new-chat/broadcast-icon.svg"
							}
						/>
					</Button>
					{/* <Button
						className="default-btn profile-sidebar-broadcast-btn"
						type="button"
						onClick={()=> history.push("/personalized-request")}
					>
						Personalized Request
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							fill="#fff"
							height="18"
							data-name="Layer 1"
							viewBox="0 0 24 24"
						>
							<path d="M7 14c2.21 0 4-1.79 4-4S9.21 6 7 6s-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm7 15c0 .55-.45 1-1 1s-1-.45-1-1c0-2.76-2.24-5-5-5s-5 2.24-5 5c0 .55-.45 1-1 1s-1-.45-1-1c0-3.86 3.14-7 7-7s7 3.14 7 7zM24 5v8c0 2.76-2.24 5-5 5h-4c-.55 0-1-.45-1-1s.45-1 1-1h4c1.65 0 3-1.35 3-3V5c0-1.65-1.35-3-3-3H9.46c-1.07 0-2.06.58-2.6 1.5-.28.48-.89.64-1.37.37a.998.998 0 01-.36-1.37C6.03.96 7.69 0 9.46 0H19c2.76 0 5 2.24 5 5zm-10.33 5.92L16.59 8H15c-.55 0-1-.45-1-1s.45-1 1-1h3c1.1 0 2 .9 2 2v3c0 .55-.45 1-1 1s-1-.45-1-1V9.41l-2.92 2.92a2.424 2.424 0 01-2.37.62.997.997 0 01-.69-1.23c.15-.53.7-.84 1.24-.69.12.03.28.02.41-.11z"></path>
						</svg>
					</Button> */}
				</div>

				<div className="sidebar-links">
					<ul className="list-unstyled">
						<Media as="li">
							<Link to={"/edit-profile"}>
								<span>
									<Image
										className="sidebar-links-icon"
										src={
											window.location.origin +
											"/assets/images/new-home/icon/edit-profile-theme-1.svg"
										}
									/>
								</span>
								{t("edit_profile")}
							</Link>
						</Media>
						<Media as="li">
							<Link to="#" onClick={handleShareClick}>
								<span>
									<Image
										className="sidebar-links-icon"
										src={
											window.location.origin +
											"/assets/images/new-home/icon/share-theme-1.svg"
										}
									/>
								</span>
								{t("share")}
							</Link>
						</Media>
						<Popover
							id={popoverId}
							open={open}
							anchorEl={anchorEl}
							onClose={handleClose}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "center",
							}}
							transformOrigin={{
								vertical: "top",
								horizontal: "center",
							}}
						>
							<Typography>
								<div className="social-share-sec m-3">
									<div className="text-center social-link">
										<div className="Demo__some-network">
											<EmailShareButton
												url={props.profile.data.share_link}
												subject={configuration.get(
													"configData.site_name"
												)}
												body={props.profile.data.share_message}
												className="Demo__some-network__share-button"
											>
												<EmailIcon size={32} round />
											</EmailShareButton>
										</div>
										{/* <h6 className="social-desc">{t("email")}</h6> */}
									</div>
									<div className="text-center social-link">
										<WhatsappShareButton
											url={props.profile.data.share_link}
											title={props.profile.data.share_message}
											separator=":: "
											className="Demo__some-network__share-button"
										>
											<WhatsappIcon size={32} round />
										</WhatsappShareButton>
										{/* <h6 className="social-desc">{t("whatsapp")}</h6> */}
									</div>
									<div className="text-center social-link">
										<FacebookShareButton
											url={props.profile.data.share_link}
											quote={props.profile.data.share_message}
											className="Demo__some-network__share-button"
										>
											<FacebookIcon size={32} round />
										</FacebookShareButton>
										{/* <h6 className="social-desc">{t("facebook")}</h6> */}
									</div>
									<div className="text-center social-link">
										<TwitterShareButton
											url={props.profile.data.share_link}
											title={props.profile.data.share_message}
											className="Demo__some-network__share-button"
										>
											<TwitterIcon size={32} round />
										</TwitterShareButton>
										{/* <h6 className="social-desc">{t("twitter")}</h6> */}
									</div>
									<div className="text-center social-link">
										<RedditShareButton
											url={props.profile.data.share_link}
											title={props.profile.data.share_message}
											windowWidth={660}
											windowHeight={460}
											className="Demo__some-network__share-button"
										>
											<RedditIcon size={32} round />
										</RedditShareButton>
										{/* <h6 className="social-desc">{t("reddit")}</h6> */}
									</div>
									<div className="text-center social-link">
										<TelegramShareButton
											url={props.profile.data.share_link}
											title={props.profile.data.share_message}
											windowWidth={660}
											windowHeight={460}
											className="Demo__some-network__share-button"
										>
											<TelegramIcon size={32} round />
										</TelegramShareButton>
										{/* <h6 className="social-desc">{t("telegram")}</h6> */}
									</div>
									<div className="text-center social-link">
										<CopyToClipboard
											onCopy={onCopy}
											text={props.profile.data.share_link}
											windowWidth={660}
											windowHeight={460}
											className="Demo__some-network__share-button"
										>
											<button className="react-share__ShareButton Demo__some-network__share-button">
												<i className="fas fa-copy"></i>
											</button>
										</CopyToClipboard>
									</div>
								</div>
							</Typography>
						</Popover>
						{props.profile.data.is_content_creator == 2 ? (
							<Media as="li">
								<Link to={"/dashboard"}>
									<span>
										<Image
											className="sidebar-links-icon"
											src={
												window.location.origin +
												"/assets/images/new-home/icon/dashboard-theme-1.svg"
											}
										/>
									</span>
									{t("dashboard")}
								</Link>
							</Media>
						) : (
							<Media as="li">
								<Link to={"/become-a-content-creator"}>
									<span>
										<Image
											className="sidebar-links-icon"
											src={
												window.location.origin +
												"/assets/images/new-home/icon/become-content-creator.svg"
											}
										/>
									</span>
									{t("become_a_content_creator")}
								</Link>
							</Media>
						)}
					</ul>
				</div>
				{props.profile.data.youtube_link ||
					props.profile.data.pinterest_link ||
					props.profile.data.linkedin_link ||
					props.profile.data.snapchat_link ||
					props.profile.data.twitter_link ||
					props.profile.data.instagram_link ||
					props.profile.data.amazon_wishlist ||
					props.profile.data.facebook_link ||
					props.profile.data.twitch_link ||
					props.profile.data.website ? (
					<div className="sidebar-social-links">
						<ul className="list-unstyled">
							{props.profile.data.youtube_link && (
								<Media as="li">
									<a
										href={props.profile.data.youtube_link}
										target="_blank"
									>
										<Image
											className="sidebar-social-links-icon"
											src={
												window.location.origin +
												"/assets/images/new-home/icon/you-tube.png"
											}
										/>
									</a>
								</Media>
							)}
							{props.profile.data.pinterest_link && (
								<Media as="li">
									<a
										href={props.profile.data.pinterest_link}
										target="_blank"
									>
										<Image
											className="sidebar-social-links-icon"
											src={
												window.location.origin +
												"/assets/images/new-home/icon/pintrest.png"
											}
										/>
									</a>
								</Media>
							)}
							{props.profile.data.linkedin_link && (
								<Media as="li">
									<a
										href={props.profile.data.linkedin_link}
										target="_blank"
									>
										<Image
											className="sidebar-social-links-icon"
											src={
												window.location.origin +
												"/assets/images/new-home/icon/linked-in.png"
											}
										/>
									</a>
								</Media>
							)}
							{props.profile.data.snapchat_link && (
								<Media as="li">
									<a
										href={props.profile.data.snapchat_link}
										target="_blank"
									>
										<Image
											className="sidebar-social-links-icon"
											src={
												window.location.origin +
												"/assets/images/new-home/icon/snap-chat.png"
											}
										/>
									</a>
								</Media>
							)}
							{props.profile.data.twitter_link && (
								<Media as="li">
									<a
										href={props.profile.data.twitter_link}
										target="_blank"
									>
										<Image
											className="sidebar-social-links-icon"
											src={
												window.location.origin +
												"/assets/images/new-home/icon/twitter.png"
											}
										/>
									</a>
								</Media>
							)}
							{props.profile.data.instagram_link && (
								<Media as="li">
									<a
										href={props.profile.data.instagram_link}
										target="_blank"
									>
										<Image
											className="sidebar-social-links-icon"
											src={
												window.location.origin +
												"/assets/images/new-home/icon/instagram.png"
											}
										/>
									</a>
								</Media>
							)}
							{props.profile.data.amazon_wishlist && (
								<Media as="li">
									<a
										href={props.profile.data.amazon_wishlist}
										target="_blank"
									>
										<Image
											className="sidebar-social-links-icon"
											src={
												window.location.origin +
												"/assets/images/new-home/icon/amazon.png"
											}
										/>
									</a>
								</Media>
							)}
							{props.profile.data.facebook_link && (
								<Media as="li">
									<a
										href={props.profile.data.facebook_link}
										target="_blank"
									>
										<Image
											className="sidebar-social-links-icon"
											src={
												window.location.origin +
												"/assets/images/new-home/icon/facebook.png"
											}
										/>
									</a>
								</Media>
							)}
							{props.profile.data.twitch_link && (
								<Media as="li">
									<a
										href={props.profile.data.twitch_link}
										target="_blank"
									>
										<Image
											className="sidebar-social-links-icon"
											src={
												window.location.origin +
												"/assets/images/new-home/icon/twitch.png"
											}
										/>
									</a>
								</Media>
							)}
							{props.profile.data.website && (
								<Media as="li">
									<a href={props.profile.data.website} target="_blank">
										<Image
											className="sidebar-social-links-icon"
											src={
												window.location.origin +
												"/assets/images/new-home/icon/website.png"
											}
										/>
									</a>
								</Media>
							)}
						</ul>
					</div>
				) : null}
			</div>
			{broadCast ? (
				<BroadCastModal
					broadCast={broadCast}
					closeBroadCastModal={closeBroadCastModal}
					setBroadCast={setBroadCast}
				/>
			) : null}
		</>
	);
};

export default translate(HomeSidebar);
