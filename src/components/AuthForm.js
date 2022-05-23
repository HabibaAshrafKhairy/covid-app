import { useMemo, useState } from "react";
import classes from "./AuthForm.module.css";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function AuthForm(props) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const [wasEmailTouched, setWasEmailTouched] = useState(false);
  const [wasPasswordTouched, setWasPasswordTouched] = useState(false);

  const isPasswordValid = useMemo(
    () => enteredPassword.length >= 8,
    [enteredPassword]
  );
  const isEmailValid = useMemo(
    () => validateEmail(enteredEmail),
    [enteredEmail]
  );

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const emailBlurHandler = () => {
    setWasEmailTouched(true);
  };

  const passwordBlurHandler = () => {
    setWasPasswordTouched(true);
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!isPasswordValid || !isEmailValid) {
      return;
    }
    setIsLoading(true);

    console.log(enteredEmail, enteredPassword);
    props.setIsAuthenticated(true);

    setIsLoading(false);
  };

  return (
    <div className={classes.container}>
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              required
            />
            {!isEmailValid && wasEmailTouched && (
              <p className={classes.error}>Email is not valid!</p>
            )}
          </div>

          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              required
            />
            {!isPasswordValid && wasPasswordTouched && (
              <p className={classes.error}>Password is not valid!</p>
            )}
          </div>
          <div className={classes.actions}>
            {!isLoading && (
              <button>{isLogin ? "Login" : "Create Account"}</button>
            )}
            {isLoading && <p>Sending request...</p>}
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AuthForm;
