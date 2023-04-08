import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import img from "../Resource Assignment 03/banner1.jpg";
import useInput from "../hook/use-input";
import classes from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../store/login-slice";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login);
  const inputEmailRef = useRef();

  // use useInput hook to control input
  const {
    value: enteredEmail,
    valueIsValid: enteredEmailIsValid,
    isHasError: enteredEmailhasError,
    valueChangeHandler: enteredEmailChangehandler,
    inputBlurHandler: enteredEmailBlurHandler,
    reset: enteredEmailReset,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    valueIsValid: enteredPasswordIsValid,
    isHasError: enteredPasswordhasError,
    valueChangeHandler: enteredPasswordChangehandler,
    inputBlurHandler: enteredPasswordBlurHandler,
    reset: enteredPasswordReset,
  } = useInput((value) => value.trim().length > 7);

  let formIsValid = false;
  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }
  const enteredEmailClass = enteredEmailhasError ? classes.invalid : undefined;
  const enteredEmailErrorContent = enteredEmailhasError
    ? "Please input a valid email"
    : "";
  const enteredPasswordClass = enteredPasswordhasError
    ? classes.invalid
    : undefined;
  const enteredPasswordErrorContent = enteredPasswordhasError
    ? "Password must be more than 8 character"
    : "";
  const submitFormHandler = (e) => {
    e.preventDefault();
    const enteredUser = {
      email: enteredEmail,
      password: enteredPassword,
    };
    const USER = JSON.parse(localStorage.getItem("user")) || [];
    const loggedInUser = USER.filter(
      (user) =>
        user.email === enteredUser.email &&
        user.password === enteredUser.password
    );

    if (loggedInUser.length !== 0) {
      dispatch(loginAction.login(isLogin));
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      navigate("/");
      enteredEmailReset();
      enteredPasswordReset();
    } else {
      alert("your account doesn't exist!");
      enteredPasswordReset();
      inputEmailRef.current.focus();
    }
  };
  // render component
  return (
    <div
      className="main"
      style={{ height: "100vh", backgroundImage: `url(${img})` }}
    >
      <div
        className=" d-flex justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <div
          className={`${classes["form-content"]} bg-white px-5 py-5 rounded`}
        >
          <h3 className="text-secondary font-italic fs-1 text-center pb-5">
            Sign In
          </h3>
          <form
            onSubmit={submitFormHandler}
            className="form-group d-flex flex-column"
          >
            <div className="">
              <input
                style={{ width: "100%" }}
                className={`${enteredEmailClass} py-3 px-5 fs-2 text-secondary mb-3`}
                type="email"
                placeholder="Enter Email"
                onBlur={enteredEmailBlurHandler}
                onChange={enteredEmailChangehandler}
                value={enteredEmail}
                ref={inputEmailRef}
              ></input>
              {enteredEmailhasError && (
                <p className="text-danger">{enteredEmailErrorContent}</p>
              )}
            </div>
            <div className="">
              <input
                style={{ width: "100%" }}
                className={`${enteredPasswordClass} py-3 px-5 fs-2 text-secondary fs-5`}
                type="password"
                placeholder="Enter Passwoed"
                onBlur={enteredPasswordBlurHandler}
                onChange={enteredPasswordChangehandler}
                value={enteredPassword}
              ></input>
              {enteredPasswordhasError && (
                <p className="text-danger">{enteredPasswordErrorContent}</p>
              )}
            </div>
            <button
              disabled={!formIsValid}
              className="bg-dark text-light text-uppercase mt-5 px-3 py-4 fs-3"
            >
              Sign in
            </button>
            <p className="fs-4 text-center mt-4 text-secondary font-italic">
              Create an accout?
              <Link className="text-decoration-none" to="/register">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
