import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import img from "../Resource Assignment 03/banner1.jpg";
import classes from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hook/use-input";
import { useRef } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  // use useInput hook to control input
  const inputEmailRef = useRef();
  const {
    value: enteredName,
    valueIsValid: enteredNameIsValid,
    isHasError: enteredNamehasError,
    valueChangeHandler: enteredNameChangehandler,
    inputBlurHandler: enteredNameBlurHandler,
    reset: enteredNameReset,
  } = useInput((value) => value.trim().length !== 0);

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

  const {
    value: enteredPhone,
    valueIsValid: enteredPhoneIsValid,
    isHasError: enteredPhonehasError,
    valueChangeHandler: enteredPhoneChangehandler,
    inputBlurHandler: enteredPhoneBlurHandler,
    reset: enteredPhoneReset,
  } = useInput((value) => value.trim().length === 10);

  let formIsValid = false;
  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredPhoneIsValid
  ) {
    formIsValid = true;
  }
  const submitFormHandler = (e) => {
    e.preventDefault();
    const user = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      phone: enteredPhone,
    };
    const allUser = JSON.parse(localStorage.getItem("user")) || [];
    const checkUser = allUser.filter(
      (userItem) => userItem.email === user.email
    );
    if (checkUser.length !== 0) {
      alert("Your email is already exist");
      inputEmailRef.current.focus();
    } else {
      allUser.push(user);
      localStorage.setItem("user", JSON.stringify(allUser));
      enteredNameReset();
      enteredEmailReset();
      enteredPhoneReset();
      enteredPasswordReset();
      navigate("/login");
    }
  };

  const enteredNameClass = enteredNamehasError ? classes.invalid : undefined;
  const enteredNameErrorContent = enteredNamehasError
    ? "Please input a valid name"
    : "";
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
  const enteredPhoneClass = enteredPhonehasError ? classes.invalid : undefined;
  const enteredPhoneErrorContent = enteredPhonehasError
    ? "Phone must be 10 character"
    : "";

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
            Sign Up
          </h3>
          <form
            onSubmit={submitFormHandler}
            className="form-group d-flex flex-column"
          >
            <input
              className={`${enteredNameClass} py-3 px-5 fs-2 text-secondary fs-5 pb-4`}
              type="text"
              placeholder="Enter Name"
              value={enteredName}
              onBlur={enteredNameBlurHandler}
              onChange={enteredNameChangehandler}
            ></input>
            {enteredNamehasError && (
              <p className="text-danger">{enteredNameErrorContent}</p>
            )}
            <input
              className={`${enteredEmailClass} py-3 px-5 fs-2 text-secondary fs-5 pb-4`}
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
            <input
              className={`${enteredPasswordClass} py-3 px-5 fs-2 text-secondary fs-5 pb-4`}
              type="password"
              placeholder="Enter Password"
              onBlur={enteredPasswordBlurHandler}
              onChange={enteredPasswordChangehandler}
              value={enteredPassword}
            ></input>
            {enteredPasswordhasError && (
              <p className="text-danger">{enteredPasswordErrorContent}</p>
            )}
            <input
              className={`${enteredPhoneClass} py-3 px-5 fs-2 text-secondary fs-5 pb-4`}
              type="tel"
              placeholder="Enter Your Phone Number"
              value={enteredPhone}
              onChange={enteredPhoneChangehandler}
              onBlur={enteredPhoneBlurHandler}
            ></input>
            {enteredPhonehasError && (
              <p className="text-danger">{enteredPhoneErrorContent}</p>
            )}

            <button
              disabled={!formIsValid}
              className="bg-dark text-light text-uppercase mt-5 px-3 py-4 fs-3"
            >
              Sign up
            </button>
            <p className="fs-4 text-center mt-4 text-secondary font-italic">
              Login?{" "}
              <Link className="text-decoration-none" to="/login">
                Click
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
