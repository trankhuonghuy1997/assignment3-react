import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./ProductItem.module.css";
import { useParams, useRouteLoaderData, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { cartSliceAction } from "../store/cart-slice";
import { Link } from "react-router-dom";
const ProductItemDetail = (props) => {
  // get id from useParam hook
  const id = useParams().productId.trim();
  // use useRef hook to get input value
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // get data from loader
  const getProductFromRoute = useRouteLoaderData("detail-page").filter(
    (prod) => prod._id.$oid === id
  )[0];
  // get product with product.category is the same with above product
  const relatedProducts = useRouteLoaderData("detail-page").filter(
    (prod) =>
      prod.category === getProductFromRoute.category &&
      prod._id.$oid !== getProductFromRoute._id.$oid
  );
  // Check logged in user and get product of logged user if exist
  const logginUserArr =
    JSON.parse(localStorage.getItem("loggedInUser")) || undefined;
  let allProduct;
  let logginUser;
  if (logginUserArr) {
    logginUser = logginUserArr[0].name;
    allProduct = JSON.parse(localStorage.getItem(logginUser));
  }
  // add to cart handler: use allProduct get above to dispatch add cart action
  const addtoCartHandler = () => {
    const enteredNuber = inputRef.current.value;
    if (enteredNuber < 1) return;
    getProductFromRoute.amount = enteredNuber;
    const data = dispatch(cartSliceAction.ADD_CART(getProductFromRoute));
    // if exist allproduct
    if (allProduct) {
      // check if add to cart product is exist
      const existingProductIndex = allProduct.findIndex(
        (product) => product._id.$oid === data.payload._id.$oid
      );
      // if exist: add amount to that product then save to localstorage
      if (allProduct[existingProductIndex]) {
        allProduct[existingProductIndex].amount =
          +allProduct[existingProductIndex].amount +
          Number(inputRef.current.value);
        localStorage.setItem(logginUser, JSON.stringify(allProduct));
        inputRef.current.value = "";
      } else {
        // if it does not exist then push product and save to localstorage
        allProduct.push(data.payload);
        localStorage.setItem(logginUser, JSON.stringify(allProduct));
        inputRef.current.value = "";
      }
    } else {
      // if it does not exist then create new array then push product and save to localstorage
      allProduct = [];
      allProduct.push(data.payload);
      localStorage.setItem(logginUser, JSON.stringify(allProduct));
      inputRef.current.value = "";
    }
  };
  // render component
  return (
    <div className={classes.main}>
      <div className="content d-flex gap-2">
        <div className="d-flex gap-1 mx-2">
          <div className="d-flex flex-column gap-1">
            {getProductFromRoute.img1 && (
              <img
                src={getProductFromRoute.img1}
                alt={getProductFromRoute.name}
                width="150px"
              />
            )}
            {getProductFromRoute.img2 && (
              <img
                src={getProductFromRoute.img2}
                alt={getProductFromRoute.name}
                width="150px"
              />
            )}
            {getProductFromRoute.img3 && (
              <img
                src={getProductFromRoute.img3}
                alt={getProductFromRoute.name}
                width="150px"
              />
            )}
            {getProductFromRoute.img4 && (
              <img
                src={getProductFromRoute.img4}
                alt={getProductFromRoute.name}
                width="150px"
              />
            )}
          </div>
          <div>
            <img
              src={getProductFromRoute.img4}
              alt={getProductFromRoute.name}
              width="500px"
            />
          </div>
        </div>
        <div className={classes["product-detail"]}>
          <h1>{getProductFromRoute.name}</h1>
          <h3>
            {new Intl.NumberFormat().format(getProductFromRoute.price)} VND
          </h3>
          <p>{getProductFromRoute.short_desc}</p>
          <p>
            <strong>
              <span className="text-uppercase">Category:</span>
            </strong>
            <span> {getProductFromRoute.category}</span>
          </p>

          {logginUser && (
            <form className={`${classes.form} d-flex form-group py-4`}>
              <input
                className="form-control fs-5"
                type="number"
                placeholder="QUANTITY"
                ref={inputRef}
              ></input>
              <button
                className="mx-2 btn btn-dark fs-5"
                type="button"
                onClick={addtoCartHandler}
              >
                Add to cart
              </button>
            </form>
          )}
          {!logginUser && (
            <p className="fs-4 text-center mt-4 text-secondary font-italic">
              Login to Cart?
              <Link className="text-decoration-none mx-2" to="/login">
                Click
              </Link>
            </p>
          )}
        </div>
      </div>
      <div className={`${classes.description} mt-5`}>
        <span className="py-3 px-5 bg-dark text-light text-center fs-3">
          Description
        </span>
        <h2 className="mt-5 text-uppercase text-secondary fs-3">
          Product Description:
        </h2>
        <pre className="text-justify text-secondary fs-6">
          {getProductFromRoute.long_desc}
        </pre>
      </div>
      <div className={`${classes.relative} mt-5`}>
        <h2 className="mt-5 text-uppercase text-secondary fs-3">
          Related product:
        </h2>
        {relatedProducts.length === 0 && (
          <h3 className="text-center py-3">No related Products</h3>
        )}
        <div className="d-flex">
          {relatedProducts &&
            relatedProducts.map((relatedProduct) => {
              return (
                <div
                  onClick={() => {
                    navigate(`/detail/${relatedProduct._id.$oid}`);
                  }}
                  key={relatedProduct._id.$oid}
                >
                  <img
                    src={relatedProduct.img1}
                    alt={relatedProduct.name}
                    width="350px"
                  />
                  <p className="text-center fs-6 pt-3">
                    <strong>{relatedProduct.name}</strong>
                  </p>
                  <p className="text-center text-secondary">
                    <em>
                      {new Intl.NumberFormat().format(relatedProduct.price)} VND
                    </em>
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default ProductItemDetail;
