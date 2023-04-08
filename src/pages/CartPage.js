import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./CartPage.module.css";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [allProduct, setAllProduct] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // remove function handler
  const removeProductHandler = (product) => {
    if (window.confirm("Are you sure to delete this product from cart?")) {
      const filterProductList = allProduct.filter(
        (prod) => prod._id.$oid !== product._id.$oid
      );
      localStorage.setItem(
        loggedInUser[0].name,
        JSON.stringify(filterProductList)
      );
      setAllProduct(filterProductList);
    }
  };
  // get product from local storage and set to state
  useEffect(() => {
    if (loggedInUser) {
      const allProductList = JSON.parse(
        localStorage.getItem(loggedInUser[0].name)
      );
      if (allProductList) {
        setAllProduct(allProductList);
      } else {
        setAllProduct([]);
      }
    }
  }, [allProduct, loggedInUser]);

  // render CartPage
  return (
    <div className={classes.main}>
      <div className="bg-light p-5">
        <h1>Cart</h1>
      </div>
      <div className="text-uppercase">
        <h1>Shoping cart</h1>
      </div>
      {allProduct && allProduct.length === 0 && (
        <p className="text-center fs-2 py-3">
          No product, continue shopping? <Link to="/shop">Click</Link>
        </p>
      )}
      {allProduct && allProduct.length !== 0 && (
        <CartItem
          allProduct={allProduct}
          onRemoveProduct={removeProductHandler}
        />
      )}
    </div>
  );
};
export default CartPage;
