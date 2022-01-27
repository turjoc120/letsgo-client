import React from 'react';
import AllBlog from '../allBlog/AllBlog';
import Navbar from '../navbar/Navbar';
import Slider from '../slider/Slider';
import Footer from '../footer/Footer';

const Home = () => {
    return (
        <>
            <Navbar/>
            <Slider/>
            <AllBlog/>
            <Footer/>
        </>
    );
};

export default Home;