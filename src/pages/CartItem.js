import classes from "./CartItem.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import { cartSliceAction } from "../store/cart-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// cart item page
const CartItem = (props) => {
  // get login state
  const isLogin = useSelector((state) => state.login.isLogin);
  // cal total money of all product in the data list
  let total = props.allProduct
    .map((prod) => Number(prod.amount) * Number(prod.price))
    .reduce((acc, curr) => acc + curr, 0);
  if (!isLogin) total = 0;
  const dispatch = useDispatch();
  // remove product handler
  const removeHandler = (product) => {
    props.onRemoveProduct(product);
  };
  // get user
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // increment handler
  const increasementHandler = (product) => {
    if (loggedInUser[0].name) {
      dispatch(cartSliceAction.increment(product));
      localStorage.setItem(
        loggedInUser[0].name,
        JSON.stringify(props.allProduct)
      );
    }
  };

  // increment handler
  const decreasementHandler = (product) => {
    if (loggedInUser[0].name && product.amount > 1) {
      dispatch(cartSliceAction.decrement(product));
      localStorage.setItem(
        loggedInUser[0].name,
        JSON.stringify(props.allProduct)
      );
    } else {
      removeHandler(product);
    }
  };
  // render cart item
  return (
    <div className={classes.main}>
      {isLogin && (
        <div className="d-flex gap-4">
          <div className="d-flex flex-column flex-grow-1">
            <table className="table">
              <thead>
                <tr className="text-uppercase fs-4 font-italic text-secondary text-center">
                  <th scope="col">Image</th>
                  <th scope="col">Product</th>
                  <th scope="col">price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody className="fs-4 text-secondary text-center">
                {props.allProduct.map((product) => {
                  return (
                    <tr key={product._id.$oid}>
                      <th scope="row">
                        <p className="text-center ">
                          <img
                            src={product.img1}
                            alt={product.name}
                            width="100px"
                          />
                        </p>
                      </th>
                      <td className="fs-5 font-weight-bold text-dark">
                        <strong>{product.name}</strong>
                      </td>
                      <td>{new Intl.NumberFormat().format(product.price)}</td>

                      <td className="text-dark">
                        <i
                          onClick={() => {
                            decreasementHandler(product);
                          }}
                          className={`${classes.icon} fa-solid fa-caret-left px-2`}
                        ></i>
                        {product.amount}
                        <i
                          className={`${classes.icon} fa-solid fa-caret-right px-2`}
                          onClick={() => {
                            increasementHandler(product);
                          }}
                        ></i>
                      </td>
                      <td>
                        {new Intl.NumberFormat().format(
                          product.amount * product.price
                        )}
                      </td>
                      <td>
                        <i
                          onClick={() => {
                            removeHandler(product);
                          }}
                          className={`fa-solid fa-trash fs-3 ${classes.icon}`}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="d-flex justify-content-between bg-light py-5 px-5">
              <Link className="text-dark text-decoration-none" to="/shop">
                <p className="fs-4">
                  <i className="fa-solid fa-left-long p-1"></i>
                  <em>Continue shopping</em>
                </p>
              </Link>
              <Link className="text-dark text-decoration-none" to="/checkout">
                <p className="fs-4 border p-1">
                  <em>Proceed to checkout</em>{" "}
                  <i className="fa-solid fa-right-long px-3 "></i>
                </p>
              </Link>
            </div>
          </div>

          <div className="bg-light p-4 d-flex flex-column">
            <h2 className="text-uppercase">Cart total</h2>
            <div className="d-flex justify-content-between py-3 border-bottom align-items-baseline">
              <h4>Subtotal</h4>
              <em>
                <p className="fs-5">
                  {new Intl.NumberFormat().format(total)} VND
                </p>
              </em>
            </div>
            <div className="d-flex justify-content-between py-3 border-bottom align-items-baseline">
              <h4>Total</h4>
              <em>
                <p className="fs-4">
                  {new Intl.NumberFormat().format(total)} VND
                </p>
              </em>
            </div>
            <form>
              <input
                style={{ width: "100%" }}
                placeholder="Enter your coupon"
                className="py-2 px-1 fs-5 mb-1"
              ></input>
              <Link to="/checkout">
                <button
                  style={{ width: "100%" }}
                  className="py-2 px-1 bg-dark text-light fs-5"
                >
                  <i className="fa-solid fa-gift px-2"></i> Apply coupon
                </button>
              </Link>
            </form>
          </div>
        </div>
      )}
      {!isLogin && (
        <p className="fs-4 text-center mt-4 text-secondary font-italic">
          Login to Cart?
          <Link className="text-decoration-none mx-2" to="/login">
            Click
          </Link>
        </p>
      )}
    </div>
  );
};

export default CartItem;
