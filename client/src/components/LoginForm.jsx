import { useState, useContext, useEffect } from "react";
import { TestFormFields } from "../lib/testFormField";
import { useNavigate } from "react-router-dom";
import UserContext from "../config/UserContext";
import styles from "../css/login.module.css";
import { sendDataToServer } from "../lib/sendAction";
import { getProfile } from "../lib/getProfile";
import RegisterModal from "./login/RegisterModal";
import toast, { Toaster } from "react-hot-toast";

function LoginForm() {
  const [formValue, setFormValue] = useState({
    accName: "",
    serverURL: "",
    pkey: "",
  });
  const [registerResponse, setRegisterResponse] = useState(null);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const navigateTo = useNavigate();
  const { saveUserData } = useContext(UserContext);
  const getFormValue = (e) => {
    const { id, value } = e.target;
    setFormValue((prev) => ({ ...prev, [id]: value }));
  };

  const validateFormInputs = () => {
    let validationResults = true;

    for (const inputField in formValue) {
      switch (inputField) {
        case "accName":
          validationResults =
            validationResults &&
            TestFormFields.testAccount(formValue[inputField]);
          break;
        case "serverURL":
          validationResults =
            validationResults && TestFormFields.testUrl(formValue[inputField]);
          break;
        case "pkey":
          validationResults =
            validationResults && TestFormFields.testPkey(formValue[inputField]);
          break;
        default:
          break;
      }
    }

    return validationResults;
  };

  const registerProfile = async (server, account, pkey) => {
    try {
      const RegisterData = {
        server: server,
        account: account,
        rsa_key: "",
        private_key: pkey,
      };
      const Registerurl = `/api/register`;
      const res = await sendDataToServer(Registerurl, RegisterData);
      return res;
    } catch (e) {
      console.log(e);
      return {};
    }
  };
  const loginProfile = async () => {
    const LoginData = {
      server: formValue.serverURL,
      account: formValue.accName,
      private_key: formValue.pkey,
    };
    const LoginUrl = `/api/login`;
    const res = await sendDataToServer(LoginUrl, LoginData);
    return res;
  };

  const canLogIn = validateFormInputs();

  const handleEnterChat = async (e) => {
    if (!canLogIn) return;
    e.preventDefault();
    const profile = await getProfile(formValue.serverURL, formValue.accName);
    if (profile.status) {
      const login_response = await loginProfile();
      if (login_response.status) {
        saveUserData({ ...formValue, loggedIn: true });
        navigateTo("/messenger");
      } else {
        toast.error(login_response.msg);
      }
    } else {
      let register_response = await registerProfile(
        formValue.serverURL,
        formValue.accName,
        formValue.pkey
      );
      if (register_response.status) {
        setRegisterResponse(register_response);
      } else {
        toast.error(register_response.msg);
      }
    }
  };

  useEffect(() => {
    if (!registerResponse || !registerResponse?.status) return;
    setOpenRegisterModal(true);
  }, [registerResponse]);

  return (
    <form onSubmit={handleEnterChat} className={styles.loginFormContainer}>
      <div className={styles.loginFormContent}>
        <input
          type="text"
          id="accName"
          placeholder="Account"
          value={formValue.accName}
          onChange={getFormValue}
        />
        <input
          type="text"
          id="serverURL"
          placeholder="Server URL"
          value={formValue.serverURL}
          onChange={getFormValue}
        />
        <input
          type="text"
          id="pkey"
          placeholder="Private Key"
          value={formValue.pkey}
          onChange={getFormValue}
        />
      </div>
      <input
        className={`${styles.formBTN} ${canLogIn ? styles.active : ""}`}
        type="submit"
        value={"Enter Chat"}
      />
      {registerResponse && (
        <RegisterModal
          registerResponse={registerResponse}
          isOpen={openRegisterModal}
          setIsOpen={setOpenRegisterModal}
          accountName={formValue.accName}
        />
      )}
      <Toaster position="bottom-left" />
    </form>
  );
}

export default LoginForm;
