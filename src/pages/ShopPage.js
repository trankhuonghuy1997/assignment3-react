import classes from "./ShopPage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useState } from "react";

import React from "react";
import Product from "../Component/Product";
const ShopPage = () => {
  const [productList, setProductList] = useState([]);
  const [productListByCategory, setProductListByCategory] = useState([]);
  const [isSort, setIsSort] = useState(false);

  // nav item data
  const nav = [
    {
      header: "Phone & Mac",
      list: ["iphone", "ipad", "macbook"],
    },
    {
      header: "Wireless",
      list: ["airpod", "watch"],
    },
    {
      header: "Other",
      list: ["mouse", "keyboard", "other"],
    },
  ];

  // fetch data from link
  const fetchProductHandler = useCallback(async () => {
    const response = await fetch(
      "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
    );
    if (!response.ok) {
      throw new Error("Could not fetch data");
    }

    const data = await response.json();
    setProductList(data);
  }, []);

  useEffect(() => {
    fetchProductHandler();
  }, [fetchProductHandler]);

  // show product handler accoding to category clicked
  const showProductHandler = (e) => {
    const category = e.target.textContent;
    if (category === "All") {
      setProductListByCategory(productList);
    } else {
      const product = productList.filter((prod) => prod.category === category);
      setProductListByCategory(product);
      setIsSort(true);
    }
  };

  // render
  return (
    <div className={classes.main}>
      <div className="bg-light p-5">
        <h1>Shop</h1>
      </div>
      <div className="d-flex gap-5">
        <div>
          <h1 className="text-uppercase py-4">
            <em>Categories</em>
          </h1>
          <h2 className="bg-dark text-white p-2">
            <em>Apple</em>
          </h2>
          <p className="p-2" onClick={showProductHandler}>
            <em
              className={`py-1 text-secondary text-uppercase ${classes.item}`}
            >
              All
            </em>
          </p>
          {nav.map((item) => {
            return (
              <div key={item.header}>
                <h3 className="text-uppercase p-2 fs-4">
                  <strong>
                    <em>{item.header}</em>
                  </strong>
                </h3>
                <ul className="list-unstyled p-2">
                  {item.list.map((el) => {
                    return (
                      <li
                        key={el}
                        className={`py-1 text-secondary text-uppercase ${classes.item}`}
                        onClick={showProductHandler}
                      >
                        <em>{el}</em>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="flex-grow-1">
          {!isSort && <Product productList={productList} />}
          {isSort && <Product productList={productListByCategory} />}
        </div>
      </div>
    </div>
  );
};
export default ShopPage;
