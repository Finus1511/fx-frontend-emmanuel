import React from "react";
import "./NewLandingPage.css";
import NewHomeBanner from "./NewHomeBanner";
import CreatorListCard from "./CreatorListCard";
import FAQIndex from "./FAQIndex";
import FeatureSection from "./FeatureSection";

const NewLandingPageIndex = (props) => {
  return (
    <>
      <div className="new-landing-page-sec">
        <NewHomeBanner />
        <CreatorListCard />
        <FeatureSection />
        <FAQIndex />
      </div>
    </>
  );
};

export default NewLandingPageIndex;
