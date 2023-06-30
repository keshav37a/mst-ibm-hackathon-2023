import { Header as CarbonHeader } from "@carbon/react";
import HamburgerMenuIcon from "../Icons/HamburgerMenuIcon";
import styles from "./styles.module.scss";
import UserAuthModal from "../UserAuthModal";

const Header = ({ title = "Welcome To Mind Space Tracker" }) => {
  return (
    <CarbonHeader className={styles.headerWrapper}>
      {/* <HamburgerMenuIcon
        height="1.75rem"
        width="1.75rem"
        fill="#ffffff"
        className={styles.hamburgerIcon}
      /> */}
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <UserAuthModal titleClassName={styles.authTitle} />
    </CarbonHeader>
  );
};

export default Header;
