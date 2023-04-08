import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Footer = () => {
  // Footer item variable
  const footers = [
    {
      header: "Customer Service",
      content: [
        "Help and contact us",
        "Returns and Refunds",
        "Online Store",
        "Terms and Conditions",
      ],
    },
    {
      header: "Company",
      content: ["What We Do", "Availble Service", "Lastest Posts", "FAQs"],
    },
    {
      header: "Social Media",
      content: ["Twitter", "Instagram", "Facebook", "Youtube"],
    },
  ];
  // Render
  return (
    <div className="bg-dark mt-5 pb-5" style={{ maxWidth: "100%" }}>
      <div
        className="d-flex justify-content-between my-0 mx-auto bg-dark"
        style={{ maxWidth: "1500px" }}
      >
        {footers.map((footer) => {
          return (
            <div key={footer.header} className="pt-5 pb-5">
              <h2 className="text-uppercase text-white">
                <em>{footer.header}</em>
              </h2>
              <ul className="p-0 " style={{ listStyle: "none" }}>
                {footer.content.map((cont) => {
                  return (
                    <li key={cont} className="pt-2">
                      <Link
                        className="text-secondary text-decoration-none"
                        to="/"
                      >
                        <em>{cont}</em>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
