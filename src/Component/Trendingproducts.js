import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Popup from "./Popup";
import classes from "./Trendingproducts.module.css";
import { useDispatch, useSelector } from "react-redux";
import { showModalAction } from "../store/store-slice";

const Trendingproducts = () => {
  const [productsList, setProductList] = useState([]);
  const dispatch = useDispatch();
  const isShow = useSelector((state) => state.isShow);
  const [clickedProduct, setClickedProduct] = useState([]);
  // fetch product handler: get all product from link
  useEffect(() => {
    const fetchDataHandler = async () => {
      const response = await fetch(
        "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
      );
      if (!response.ok) {
        throw new Error("Could not fetch data");
      }

      const data = await response.json();
      // check if the returned data is more than 8 then get 8-first product and set to the state
      if (data.length > 8) {
        const product = data.filter((prod, index) => {
          return index < 8;
        });
        setProductList(product);
      } else {
        setProductList(data);
      }
    };
    fetchDataHandler();
  }, []);
  // shpw popup handler
  const showPopupHandler = (e) => {
    const name = e.target.closest("div").dataset.name;
    const productClicked = productsList.filter((prod) => prod.name === name);
    setClickedProduct(productClicked[0]);
    dispatch(showModalAction.show(isShow));
  };
  // render component
  return (
    <>
      {isShow.isShow && <Popup product={clickedProduct} />}
      <div className="my-0 mx-auto" style={{ maxWidth: "1500px" }}>
        <header className="text-left">
          <h2 className="text-secondary text-uppercase fs-3">
            <em>Made the hard way</em>
          </h2>
          <h1 className="text-dark text-uppercase fs-1">
            <em>Top trending products</em>
          </h1>
        </header>
        <div className="d-flex flex-wrap jusify-content-center gap-3">
          {productsList.map((prod, index) => {
            return (
              <div
                key={prod._id.$oid}
                onClick={showPopupHandler}
                className={classes.product}
                data-name={prod.name}
              >
                <img src={prod.img1} alt={prod.name} width="350px" />
                <p className="text-center fs-6 pt-3">
                  <strong>{prod.name}</strong>
                </p>
                <p className="text-center text-secondary">
                  <em>{new Intl.NumberFormat().format(prod.price)} VND</em>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Trendingproducts;
