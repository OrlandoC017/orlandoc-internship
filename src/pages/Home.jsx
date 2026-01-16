import React, { useEffect } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <div data-aos="zoom-out"><Landing /></div>
        <div data-aos="fade-left"><LandingIntro /></div>
        <div data-aos="zoom-in-up"><HotCollections /></div>
        <div data-aos="zoom-in-up"><NewItems /></div>
        <div data-aos="flip-left"><TopSellers /></div>
        <div data-aos="flip-left"><BrowseByCategory /></div>
      </div>
    </div>
  );
};

export default Home;
