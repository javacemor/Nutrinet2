import React from 'react';
import BackgroundVideo from '../BackgroundVideo';

import BannerSlider from '../BannerSlider'
import BlogLatest from '../BlogLatest';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Stats from '../Stats';
import WhatNutrinetIsAbout from '../WhatNutrinetIsAbout';

function HomeScreen() {
    return (
        <>
            <Navbar />
            <BannerSlider/>
            <WhatNutrinetIsAbout />
            <Stats />
            <BackgroundVideo />
            <BlogLatest />
            <Footer />
        </>
    )
}

export default HomeScreen;
