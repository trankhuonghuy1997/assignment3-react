import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import ProductItemDetail from "../Component/ProductItemDetail";
const DetailPage = () => {
  // render
  const product = useRouteLoaderData("detail-page");
  return <ProductItemDetail product={product} />;
};
export default DetailPage;

// loader function get data and return from fetch link
export const loader = async ({ requets, params }) => {
  const response = await fetch(
    "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
  );
  if (!response.ok) {
    throw new Error("Could not fetch data");
  }
  const data = await response.json();
  return data;
};
