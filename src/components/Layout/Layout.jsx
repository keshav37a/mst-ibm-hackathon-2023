import cx from "classnames";
import styles from "./styles.module.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Layout = ({
  children,
  wrapperClassName,
  className,
  fullScreenHeight = true,
}) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className={cx(wrapperClassName, styles.layoutWrapper)}>
      <div
        className={cx(className, styles.layout, {
          [styles.fullScreenHeight]: fullScreenHeight,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
