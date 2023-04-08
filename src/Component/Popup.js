import { createPortal } from "react-dom";
import classes from "./Popup.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { showModalAction } from "../store/store-slice";
import { useDispatch, useSelector } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
// Popup function component
const Popup = (props) => {
  const dispatch = useDispatch();
  // Get isShow state from redux
  const isShow = useSelector((state) => state.isShow);
  const navigate = useNavigate();
  // hide modal handler function: dispatch hide action
  const hideModalHandler = () => {
    dispatch(showModalAction.hide(isShow));
  };
  const toDetailHandler = () => {
    navigate(`detail/${props.product._id.$oid}`);
    dispatch(showModalAction.hide(isShow));
  };
  // render Popup function
  const element = (
    <div className={classes.popup}>
      <div className={classes.product}>
        <span onClick={hideModalHandler}>
          <i className="fa-solid fa-x icon"></i>
        </span>
        <div className={classes["product-details"]}>
          <div className={classes["product-img"]}>
            <img src={props.product.img1} alt={props.product.name} />
          </div>
          <div className={classes["product-detail"]}>
            <h1>{props.product.name}</h1>
            <h3>{new Intl.NumberFormat().format(props.product.price)} VND</h3>
            <p>{props.product.short_desc}</p>
            <button onClick={toDetailHandler}>
              <i className="fa-sharp fa-solid fa-cart-shopping"></i>
              View Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  // use createPortal to create a element to another element in index.html
  return createPortal(element, document.getElementById("modal"));
};

export default Popup;
