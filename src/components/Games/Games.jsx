import { Link } from "@carbon/react";
import styles from "./Games.module.scss";
import Layout from "../Layout";
import ballonBurst from "../../assets/images/ballon_burst.jpg";
import puzzle from "../../assets/images/puzzle.png";
import targetHit from "../../assets/images/target_hit.jpg";
import hurrey from "../../assets/images/hurrey.jpg";
import {
  BALLOON_GAME,
  HIT_TARGET_GAME,
  PUZZLE_GAME,
} from "../../constants/games";

const links = [
  {
    link: `/games/${BALLOON_GAME}`,
    title: "Baloon burst",
    src: ballonBurst,
  },
  {
    link: `/games/${PUZZLE_GAME}`,
    title: "Puzzle",
    src: puzzle,
  },
  {
    link: `/games/${HIT_TARGET_GAME}`,
    title: "Target hit",
    src: targetHit,
  },
];
const Games = ({ className }) => {
  return (
    <div>
      <Layout className={styles.lgap}>
        <h6 className={styles.subtitle}>
          Select mindful game you would like to play
        </h6>
        <div style={{ float: "left", width: "45%" }}>
          <img style={{ width: "55%" }} src={hurrey} />
        </div>
        <div style={{ marginTop: "2rem" }}>
          {links.map(({ link, title, src }, index) => {
            return (
              <div
                key={index}
                style={{ float: "left", width: "24%", marginRight: "1rem" }}
              >
                <Link
                  key={index}
                  href={link}
                  target="_blank"
                  className={styles.singleLinkUnit}
                >
                  <div className={styles.link} title={title}>
                    <img src={src} />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </Layout>
    </div>
  );
};

export default Games;
