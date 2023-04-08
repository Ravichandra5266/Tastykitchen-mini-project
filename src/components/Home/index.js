import Navbar from "../Navbar";

import Sliders from "../Sliders";

import PopularRestaurants from "../PopularRestaurants";

import Footer from "../Footer";

import "./index.css";

const Home = () => (
  <div className="home-container">
    <Navbar />
    <Sliders />
    <PopularRestaurants />
    <Footer />
  </div>
);

export default Home;
