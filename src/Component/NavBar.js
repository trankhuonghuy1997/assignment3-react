import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./NavBar.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { loginAction } from "../store/login-slice";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
// NavBar function component
const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Get login state
  const isLogin = useSelector((state) => state.login);
  // Logout handler function: dispatch logout function and remove logined user from localstorage
  const logoutHandler = () => {
    dispatch(loginAction.logout(isLogin));
    localStorage.removeItem("loggedInUser");
  };

  // at the beginning: get logged in user from localstorage, if exist dispatch login action
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      dispatch(loginAction.login(isLogin));
    }
  }, [dispatch, isLogin]);
  // Use useNavigation hook to navigate page
  const moveToHomePage = () => {
    navigate("/");
  };
  const moveToShopPage = () => {
    navigate("/shop");
  };
  const moveToCartPage = () => {
    navigate("/cart");
  };
  const moveToLoginPage = () => {
    navigate("/login");
  };
  // render NavBar function componnent
  return (
    <div className={classes.navbar}>
      <div className={classes.left}>
        <p className={classes.active} onClick={moveToHomePage}>
          Home
        </p>
        <p onClick={moveToShopPage}>Shop</p>
      </div>
      <div className={classes.mid}>
        <h2>BOUTIQUE</h2>
      </div>
      <div className={classes.right}>
        <p onClick={moveToCartPage} className="position-relative">
          <i className="fa-solid fa-cart-shopping"></i> Cart
        </p>
        {!isLogin.isLogin && (
          <p onClick={moveToLoginPage}>
            <i className="fa-solid fa-user" />
            Login
          </p>
        )}
        {isLogin.isLogin && (
          <p>
            <i className="fa-solid fa-user"></i>{" "}
            {JSON.parse(localStorage.getItem("loggedInUser"))[0].name}
          </p>
        )}
        {isLogin.isLogin && <p onClick={logoutHandler}>(Logout)</p>}
      </div>
    </div>
  );
};
export default NavBar;
