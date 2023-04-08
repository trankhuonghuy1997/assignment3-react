import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Product.module.css";
import { useNavigate } from "react-router-dom";
// Product function component to render product list in shop page with props
const Product = (props) => {
  const productsList = props.productList;
  const navigate = useNavigate();
  let content = (
    <h2 className="text text-center d-flex flex-wrap jusify-content-center flex-grow-1">
      No product available
    </h2>
  );
  if (productsList.length > 0) {
    content = productsList.map((prod, index) => {
      return (
        <div
          key={index}
          className={classes.product}
          data-name={prod.name}
          onClick={() => {
            navigate(`/detail/${prod._id.$oid}`);
          }}
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
    });
  }

  return (
    <div className="content">
      <form className={`${classes.form} d-flex form-group py-4`}>
        <input
          className="form-control fs-5"
          type="text"
          placeholder="Enter search here"
        ></input>
        <button className="mx-2 btn btn-dark fs-5" type="button">
          Search
        </button>
      </form>
      <div className="d-flex flex-wrap jusify-content-center">{content}</div>
    </div>
  );
};
export default Product;
