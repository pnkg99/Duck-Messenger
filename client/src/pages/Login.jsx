import LoginForm from "../components/LoginForm";
import styles from "../css/login.module.css";
import { useContext, useEffect } from "react";
import UserContext from "../config/UserContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const {
    userData: { loggedIn },
  } = useContext(UserContext);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      navigateTo("/messenger");
    }
  }, [loggedIn]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.logoContainer}>
        <h1>Duck Messenger</h1>
      </div>
      <LoginForm />
    </div>
  );
}
