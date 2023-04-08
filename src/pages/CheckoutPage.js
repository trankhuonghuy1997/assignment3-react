import React from "react";
import classes from "./CheckoutPage.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import useInput from "../hook/use-input";

const CheckoutPage = () => {
  // get user logged in
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  // get all product if undefined then []
  const allProduct =
    JSON.parse(localStorage.getItem(loggedInUser[0].name)) || [];

  // cal total money in all product
  const total = allProduct
    .map((prod) => prod.price * prod.amount)
    .reduce((curr, acc) => curr + acc);

  // use useInput hook to control input
  const {
    value: enteredname,
    valueIsValid: enterednameIsValid,
    isHasError: enterednamehasError,
    valueChangeHandler: enterednameChangehandler,
    inputBlurHandler: enterednameBlurHandler,
    reset: enterednameReset,
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
    value: enteredAddress,
    valueIsValid: enteredAddressIsValid,
    isHasError: enteredAddresshasError,
    valueChangeHandler: enteredAddressChangehandler,
    inputBlurHandler: enteredAddressBlurHandler,
    reset: enteredAddressReset,
  } = useInput((value) => value.trim().length > 0);

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
    enterednameIsValid &&
    enteredEmailIsValid &&
    enteredAddressIsValid &&
    enteredPhoneIsValid
  ) {
    formIsValid = true;
  }
  const submitFormHandler = (e) => {
    e.preventDefault();

    enterednameReset();
    enteredEmailReset();
    enteredPhoneReset();
    enteredAddressReset();
  };

  const enterednameClass = enterednamehasError ? classes.invalid : undefined;
  const enterednamePlaceHolder = enterednamehasError
    ? "Please input a valid name"
    : "Full name";
  const enteredEmailClass = enteredEmailhasError ? classes.invalid : undefined;
  const enteredEmailPlaceHolder = enteredEmailhasError
    ? "Please input a valid email"
    : "Email";
  const enteredAddressClass = enteredAddresshasError
    ? classes.invalid
    : undefined;
  const enteredAddressPlaceHolder = enteredAddresshasError
    ? "Password must be more than 8 character"
    : "Password";
  const enteredPhoneClass = enteredPhonehasError ? classes.invalid : undefined;
  const enteredPhonePlaceHolder = enteredPhonehasError
    ? "Phone must be 10 character"
    : "Phone";

  // render check out page
  return (
    <div className={classes.main}>
      <div className="bg-light p-5">
        <h1 className="text-uppercase">Check out</h1>
      </div>
      <div className="text-uppercase">
        <h1>Billing detail</h1>
      </div>
      <div className="d-flex gap-3">
        <form
          onSubmit={submitFormHandler}
          className={`d-flex flex-column ${classes["form-group"]}`}
        >
          <div className="d-flex flex-column">
            <label className="text-uppercase fs-3">Full Name</label>
            <input
              className={`${enterednameClass} py-3 px-3 text-secondary fs-5`}
              type="text"
              placeholder={enterednamePlaceHolder}
              value={enteredname}
              onBlur={enterednameBlurHandler}
              onChange={enterednameChangehandler}
            ></input>
          </div>
          <div className="d-flex flex-column">
            <label className="text-uppercase fs-3">Email</label>
            <input
              className={`${enteredEmailClass} py-3 px-3 text-secondary fs-5`}
              type="email"
              placeholder={enteredEmailPlaceHolder}
              onBlur={enteredEmailBlurHandler}
              onChange={enteredEmailChangehandler}
              value={enteredEmail}
            ></input>
          </div>
          <div className="d-flex flex-column">
            <label className="text-uppercase fs-3">Phone</label>
            <input
              className={`${enteredPhoneClass} py-3 px-3 text-secondary fs-5`}
              type="tel"
              placeholder={enteredPhonePlaceHolder}
              value={enteredPhone}
              onChange={enteredPhoneChangehandler}
              onBlur={enteredPhoneBlurHandler}
            ></input>
          </div>
          <div className="d-flex flex-column">
            <label className="text-uppercase fs-3">Address</label>
            <input
              className={`${enteredAddressClass} py-3 px-3 text-secondary fs-5`}
              type="text"
              placeholder={enteredAddressPlaceHolder}
              onBlur={enteredAddressBlurHandler}
              onChange={enteredAddressChangehandler}
              value={enteredAddress}
            ></input>
          </div>

          <button
            disabled={!formIsValid}
            className="bg-dark text-light text-uppercase mt-5 px-3 py-4 fs-3"
          >
            Place order
          </button>
        </form>
        <div
          className={`bg-light p-5 d-flex flex-column ${classes["checkout-amout"]}`}
        >
          <h2 className="text-uppercase text-center">Your order</h2>
          <div className="d-flex flex-column py-3 align-items-baseline">
            {allProduct.map((prod) => {
              return (
                <div
                  key={prod._id.$oid}
                  className={`border-bottom ${classes.product}`}
                >
                  <div className="fs-5 ">
                    <strong>{prod.name}</strong>
                  </div>
                  <div className={`fs-5 ${classes["product-price"]}`}>
                    {`${new Intl.NumberFormat().format(prod.price)}x${
                      prod.amount
                    }`}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="d-flex fs-5 justify-content-between pt-2">
            <strong>
              <p>Total</p>
            </strong>
            <em>
              <p className="fs-5">
                {new Intl.NumberFormat().format(total)} VND
              </p>
            </em>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
