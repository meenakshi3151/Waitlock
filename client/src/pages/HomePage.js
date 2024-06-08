import React from "react";
import Contact from "../components/Contact";
import About from "../components/About";
import Footer from "../components/Footer";
import MainPage from "../components/MainPage";
function HomePage(){
    return(
    <>
    <MainPage/>
    <About/>
    <Contact/>
    <Footer/>
    </>
    )
}
export default HomePage;