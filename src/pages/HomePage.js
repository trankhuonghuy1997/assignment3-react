import React from "react";
import classes from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import Category from "../Component/Category";
import Trendingproducts from "../Component/Trendingproducts";
import OrtherInfor from "../Component/OrtherInfor";
// homepage function handler
const HomePage = () => {
  const navigate = useNavigate();

  const moveToShopPage = () => {
    navigate("/shop");
  };

  return (
    <div>
      <div className={classes.home}>
        <div className={classes.content}>
          <h2>New Inspiration 2023</h2>
          <h1>20% Off on new Season</h1>
          <button onClick={moveToShopPage}>Browser Colection</button>
        </div>
      </div>
      <Category />
      <Trendingproducts />
      <OrtherInfor />
    </div>
  );
};
export default HomePage;
