import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import img1 from "../Resource Assignment 03/product_1.png";
import img2 from "../Resource Assignment 03/product_2.png";
import img3 from "../Resource Assignment 03/product_3.png";
import img4 from "../Resource Assignment 03/product_4.png";
import img5 from "../Resource Assignment 03/product_5.png";

const Category = () => {
  // Cartegory function component where render all category
  return (
    <div className="my-1 mx-auto" style={{ maxWidth: "1500px" }}>
      <header className="text-center">
        <h2 className="text-secondary text-uppercase fs-3">
          <em>Carefully created colections</em>
        </h2>
        <h1 className="text-dark text-uppercase fs-1">
          <em>Browser Our Categories</em>
        </h1>
      </header>
      <main className="my-0 mx-auto" style={{ width: "100%" }}>
        <div className="row mb-4">
          <Link to="/shop" className="col d-flex justify-content-center">
            <img className="img-fluid" src={img1} alt="img" />
          </Link>
          <Link to="/shop" className="col d-flex justify-content-center">
            <img src={img2} alt="img" />
          </Link>
        </div>
        <div className="row mb-4">
          <Link to="/shop" className="col d-flex justify-content-center">
            <img className="img-fluid" src={img3} alt="img" />
          </Link>
          <Link to="/shop" className="col d-flex justify-content-center">
            <img src={img4} alt="img" />
          </Link>
          <Link to="/shop" className="col d-flex justify-content-center">
            <img src={img5} alt="img" />
          </Link>
        </div>
      </main>
    </div>
  );
};
export default Category;
