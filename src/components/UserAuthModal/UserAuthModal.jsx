import { useEffect, useRef, useState } from "react";
import cx from "classnames";
import Cookie from "js-cookie";
import _isEmpty from "lodash/isEmpty";
import { Modal, TextInput, Loading } from "@carbon/react";
import { useSelector, useDispatch } from "react-redux";
import {
  signinLoading as userSigninAction,
  signupLoading as userSignupAction,
  signout as userSignoutAction,
  userInfoLoading as userInfoAction,
} from "../../store/userSlice";
import { getUserCookieValidity } from "../../helpers/utils";
import styles from "./styles.module.scss";

const UserAuthModal = ({ onSubmit, onClose, titleClassName }) => {
  const [showModal, setShowModal] = useState(false);
  const [toggleText, setToggleText] = useState(false);
  const [title, setTitle] = useState("");

  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const { signinLoading, signupLoading, user } = useSelector(
    (state) => state.userSlice
  );

  const textMap = {
    title: {
      [false]: "Sign up",
      [true]: "Sign in",
    },
    toggleOption: {
      [false]: "Already a user? Sign in instead",
      [true]: "A new user? Sign up",
    },
  };

  const handleSubmit = async () => {
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    if (toggleText) {
      dispatch(userSigninAction({ email, password }));
    } else {
      const userName = userNameRef?.current?.value;
      dispatch(userSignupAction({ email, userName, password }));
    }

    onSubmit && onSubmit();
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    onClose && onClose();
  };

  const handleToggleTextChange = () => {
    setToggleText((prev) => {
      return !prev;
    });
  };

  const handleLoginLogoutClick = () => {
    const isUserCookieValid = getUserCookieValidity();
    if (isUserCookieValid) {
      Cookie.remove("user");
      dispatch(userSignoutAction());
      setTitle("Sign in");
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    const isUserCookieValid = getUserCookieValidity();
    if (isUserCookieValid) {
      const user = JSON.parse(Cookie.get("user"));
      const email = user?.email;
      dispatch(userInfoAction({ email }));
      setTitle("Logout");
    } else {
      setTitle("Sign in");
    }
  }, []);

  useEffect(() => {
    if (!_isEmpty(user)) {
      Cookie.set("user", JSON.stringify(user));
      setTitle("Logout");
    }
  }, [user]);

  return (
    <>
      <div
        className={cx(styles.title, titleClassName)}
        onClick={handleLoginLogoutClick}
      >
        {title}
      </div>

      {signinLoading || signupLoading ? <Loading /> : null}

      {showModal ? (
        <Modal
          modalHeading={textMap.title[toggleText]}
          primaryButtonText={textMap.title[toggleText]}
          secondaryButtonText="Cancel"
          open
          onRequestSubmit={handleSubmit}
          onRequestClose={handleCloseModal}
        >
          {!toggleText ? (
            <TextInput
              id="form-input-username"
              required
              name="username"
              labelText="User Name"
              ref={userNameRef}
            />
          ) : null}
          <TextInput
            id="form-input-email"
            required
            name="email"
            labelText="Email"
            ref={emailRef}
          />
          <TextInput.PasswordInput
            id="form-input-password"
            name="password"
            required
            labelText="Password"
            ref={passwordRef}
          />
          <div onClick={handleToggleTextChange} className={styles.toggleTxt}>
            {textMap.toggleOption[toggleText]}
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default UserAuthModal;
