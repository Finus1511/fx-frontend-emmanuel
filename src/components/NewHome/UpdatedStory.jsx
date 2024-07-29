import React, { useEffect, useRef, useState } from "react";
import Zuck from "zuck.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoriesStart } from "../../store/actions/StoriesAction";
import Skeleton from "react-loading-skeleton";
import StoryUploadModal from "../Home/StoryUploadModal";

const UpdatedStory = () => {
  const dispatch = useDispatch();
  const [storyModal, setStoryModal] = useState(false);
  const userStories = useSelector((state) => state.userStories.stories);
  const storiesContainerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchStoriesStart());
  }, []);

  useEffect(() => {
    if (
      storiesContainerRef.current &&
      !userStories.loading &&
      Object.keys(userStories.data).length > 0
    ) {
      const stories = new Zuck(storiesContainerRef.current.id, {
        backNative: true,
        previousTap: true,
        autoFullScreen: false,
        skin: "snapgram",
        avatars: true,
        list: false,
        cubeEffect: true,
        localStorage: true,

        stories: userStories.data.stories.map((story) => ({
          id: story.id,
          photo: story.storyFiles[0].preview_file,
          name: story.username,
          link: "",
          lastUpdated: story.updated,
          items: story.storyFiles.map((item) => ({
            id: "",
            type: item.file_type == "image" ? "photo" : "video",
            length: 8,
            src: item.file,
            link: "",
            linkText: "",
            time: item.updated_at,
          })),
        })),
      });

      // return () => {
      //   stories.destroy();
      // };
    }
  }, [userStories]);

  return (
    <>
      <div className="update-story-sec">
        {userStories.loading ? (
          <div className="story-sec-loader">
            {[...Array(6)].map(() => (
              <Skeleton height={185} width={140} borderRadius={13} />
            ))}
          </div>
        ) : (
          <div className="story-sec">
            <div
              className="create-story-card"
              data-toggle="modal"
              data-target="#addStoryModal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="25"
                fill="none"
                viewBox="0 0 29 29"
              >
                <rect width="29" height="29" fill="#9F4298" rx="14.5"></rect>
                <path
                  fill="#fff"
                  d="M19.917 13.417h-4.334V9.083a1.083 1.083 0 10-2.166 0v4.334H9.083a1.083 1.083 0 100 2.166h4.334v4.334a1.083 1.083 0 102.166 0v-4.334h4.334a1.083 1.083 0 100-2.166z"
                ></path>
              </svg>
              <h4>Create Story</h4>
            </div>
            <div id="stories" ref={storiesContainerRef}></div>
          </div>
        )}
      </div>
      <StoryUploadModal />
    </>
  );
};

export default UpdatedStory;
