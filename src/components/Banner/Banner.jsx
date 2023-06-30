import cx from "classnames";
import styles from "./styles.module.css";

const Banner = ({ wrapperClassName, children, mTop }) => {
  return (
    <div
      style={{ marginTop: mTop }}
      className={cx(styles.bannerWrapper, wrapperClassName)}
    >
      {children}
    </div>
  );
};

export default Banner;
