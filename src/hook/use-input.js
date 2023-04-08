import { useState } from "react";
// useInput custom hook
const useInput = (validate) => {
  // create new states
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouch, setIsTouch] = useState(false);
  const valueIsValid = validate(enteredValue);
  const isHasError = isTouch && !valueIsValid;
  // onchange handler function
  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };
  // blur handler function
  const inputBlurHandler = () => {
    setIsTouch(true);
  };
  // reset function
  const reset = () => {
    setEnteredValue("");
    setIsTouch(false);
  };
  return {
    value: enteredValue,
    valueIsValid,
    isHasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
