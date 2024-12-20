import React from "react";
import SEO from "../../common/SEO";
import HeaderTwo from "../../common/header/HeaderTwo";
import BannerOne from "../../components/banner/BannerOne";
import HomeOneAbout from "../../components/home-one/HomeOneAbout";
import HomeOneCourses from "../../components/home-one/HomeOneCourses";
import VideoSectionTwo from "../../components/video-section/VideoSectionTwo";
import NewsLettterOne from "../../components/newsletter/NewsLettterOne";
import FooterOne from "../../common/footer/FooterOne";

const HomeOne = () => {
  return (
    <>
      <SEO title="Asosiy sahifa" />

      <HeaderTwo styles="header-transparent header-style-2" />

      <BannerOne />

      <HomeOneAbout />

      <HomeOneCourses />

      <VideoSectionTwo />
      <NewsLettterOne />

      <FooterOne />
    </>
  );
};

export default HomeOne;
