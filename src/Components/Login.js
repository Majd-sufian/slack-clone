import React from "react";
import "../style/Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { useStateValue } from "../reducer/StateProvider";

function Login() {
  const [{ user }, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.user);
        dispatch({
          type: "SET_USER",
          user: {
            username: result.user.displayName,
            userImage: result.user.photoURL,
          },
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div class="login">
      <div class="login__container">
        <img
          src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
          alt=""
        />
        <h1>Sign in to Clever Programmer HQ</h1>
        <p>cleverprogrammer.slack.com</p>
        <Button
          class="MuiButtonBase-root MuiButton-root MuiButton-text"
          tabindex="0"
          type="button"
          onClick={signIn}
        >
          <span class="MuiButton-label">Sign In with Google</span>
          <span class="MuiTouchRipple-root"></span>
        </Button>
      </div>
    </div>
  );
}

export default Login;

// user image
// user name
