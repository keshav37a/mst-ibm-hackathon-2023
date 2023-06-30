import { Link } from "@carbon/react";
import { links } from "../../constants/mindfulLinks";
import styles from "./MindfulBreak.module.scss";
import BreakImg from "../../assets/images/mental-health-day.jpg";

const MindfulBreak = ({ className }) => {
  return (
    <div className={className}>
      <hr />
      <h5 className={styles["mindful-component-heading"]}>
        Do you need a mindful break?
      </h5>
      <div className={styles.linkContainer}>
        {links.map(({ link, title, src }, index) => {
          return (
            <Link
              key={link}
              className={styles.link}
              href={link}
              target="_blank"
            >
              <div className={styles.singleLinkUnit}>
                <div className={styles.imgContainer}>
                  <img src={src} style={{ width: "130%" }} />
                </div>

                {title}
              </div>
            </Link>
          );
        })}
      </div>
      <div
        style={{
          width: "20%",
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
        }}
      >
        <img src={BreakImg}></img>
      </div>
    </div>
  );
};

export default MindfulBreak;
