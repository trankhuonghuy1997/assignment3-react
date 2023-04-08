import classes from "./LiveChat.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

// LiveChat function component
const LiveChat = () => {
  // initialize isShow variable, with initialize value is false
  const [isShow, setIsShow] = useState(false);

  // Show ChatLive handler function
  const showChatWindowHandler = () => {
    // Set isShow state to opposite of prev state
    setIsShow((prevState) => (prevState = !prevState));
  };
  // Render Live Chat component
  return (
    <div className={classes.main}>
      {isShow && (
        <div className={classes.chat}>
          <div
            className={`${classes["chat-header"]} d-flex justify-content-between align-items-center border-bottom py-3 fs-4`}
          >
            <strong className="fs-3">Customer Suport</strong>
            <div className="bg-secondary p-2 text-light">Let's Chat App</div>
          </div>
          <div className={`body py-3 d-flex flex-column`}>
            <div className="align-self-end fs-5 py-2 my-1 px-3 rounded bg-primary text-light">
              Xin chào
            </div>
            <div className="align-self-end fs-5 py-2 my-1 px-3 rounded bg-primary text-light">
              Làm thế nào để xem các sản phẩm
            </div>
            <div className="align-self-start fs-5 d-flex align-items-center">
              <i className="fa-solid fa-user"></i>
              <p className="py-2 my-1 px-3 rounded bg-secondary text-light mx-2">
                Xin chào
              </p>
            </div>
            <div className="align-self-start fs-5 d-flex align-items-center">
              <i className="fa-solid fa-user"></i>
              <p className="py-2 my-1 px-3 rounded bg-secondary text-light mx-2">
                Bạn có thể vào mục Shop để xem sản phẩm
              </p>
            </div>
          </div>
          <div
            className={`footer d-flex justify-content-between gap-3 align-items-center border-top py-3 mt-5 fs-4 text-primary`}
          >
            <label>
              <i className="fa-solid fa-user"></i>
            </label>
            <input
              type="text"
              placeholder="Enter Message"
              className="flex-grow-1 border-0"
            ></input>
            <div>
              <i className="fa-solid fa-paperclip"></i>
            </div>
            <div>
              <i className="fa-solid fa-face-smile"></i>
            </div>
            <div>
              <i className="fa-solid fa-paper-plane"></i>
            </div>
          </div>
        </div>
      )}
      <div
        onClick={showChatWindowHandler}
        className={`d-flex flex-end ${classes.icon}`}
      >
        <i className="fa-brands fa-facebook-messenger text-primary"></i>
      </div>
    </div>
  );
};
export default LiveChat;
