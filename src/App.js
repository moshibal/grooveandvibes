import React from "react";
import Navigation from "./components/navigation/Navigation.js";
import "./App.css";
import Main from "./components/main/Main.js";
import Gallery from "./components/photo/Gallery.js";
import Footer from "./components/footer/Footer.js";
import Booking from "./components/booking/Booking.js";
import Price from "./components/pricing/Price.js";

const App = () => {
  return (
    <div>
      <Navigation />
      <Main />
      <Gallery />
      <Price />
      <Booking />
      <Footer />
    </div>
  );
};

export default App;
