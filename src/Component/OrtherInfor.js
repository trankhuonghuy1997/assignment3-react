import "bootstrap/dist/css/bootstrap.min.css";
// OrtherInfor function component
const OrtherInfor = () => {
  return (
    <div className="mx-auto my-0" style={{ maxWidth: "1500px" }}>
      <div className="d-flex justify-content-around py-5  bg-light">
        <div>
          <h1 className="text-dark text-uppercase fs-2">
            <em>Free shipping</em>
          </h1>
          <h2 className="text-secondary fs-3">
            <em>Free shipping worldwide</em>
          </h2>
        </div>
        <div>
          <h1 className="text-dark text-uppercase fs-2">
            <em>24x7 service</em>
          </h1>
          <h2 className="text-secondary fs-3">
            <em>Free shipping worldwide</em>
          </h2>
        </div>
        <div>
          <h1 className="text-dark text-uppercase fs-2">
            <em>Festival Offer</em>
          </h1>
          <h2 className="text-secondary fs-3">
            <em>Free shipping worldwide</em>
          </h2>
        </div>
      </div>
      <div className="d-flex justify-content-between gap-3 align-items-center pt-5">
        <div className="flex-grow-1">
          <h1 className="text-dark text-uppercase fs-4">
            <em>Let's be friends!</em>
          </h1>
          <h2 className="text-secondary fs-5">
            <em> Bạn sẽ bổ sung thêm Animation</em>
          </h2>
        </div>
        <div className="flex-grow-1">
          <form className="d-flex form-group">
            <input
              className="form-control fs-4"
              type="email"
              placeholder="Enter your enail address"
            ></input>
            <button className="btn btn-dark py-4 px-5 fs-4" type="button">
              Subcribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrtherInfor;
