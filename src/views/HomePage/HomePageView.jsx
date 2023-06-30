import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _get from "lodash/get";
import { motion, AnimatePresence } from "framer-motion";
import { Link, Loading } from "@carbon/react";
import Banner from "../../components/Banner";
import Layout from "../../components/Layout";
import MindfulBreak from "../../components/MindfulBreak";
import {
  scoreSaveLoading as postScoreSaveAction,
  resetUserUpdate as resetUserUpdateAction,
} from "../../store/userSlice";
import positiveVibesImg from "../../assets/images/positive-vibes.png";
import thinkCloudImg from "../../assets/images/cloud.png";
import takeSurveyImg from "../../assets/images/take-survey.jpeg";

import greenSImg from "../../assets/images/smilie-green.png";
import redSImg from "../../assets/images/smilie-red.png";
import yellowSImg from "../../assets/images/smilie-yellow.png";
import thinkingSImg from "../../assets/images/smilie_thinking.jpg";
import { getUserCookieValidity, getUserFromCookie } from "../../helpers/utils";
import {
  GREEN_SCORE,
  NORMALIZE_FACTOR,
  RED_SCORE,
  YELLOW_SCORE,
} from "../../constants/score";
import styles from "./styles.module.scss";

const smilieArr = [
  {
    src: greenSImg,
    score: GREEN_SCORE,
  },
  {
    src: yellowSImg,
    score: YELLOW_SCORE,
  },
  {
    src: redSImg,
    score: RED_SCORE - 10,
  },
];

const HomePageView = () => {
  const [thoughtSectionVisibility, setThoughtSectionVisibility] =
    useState(true);
  const [surveySectionVisibility, setSurveySectionVisibility] = useState(false);
  const [currentScore, setCurrentScore] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userSlice = useSelector((state) => state.userSlice);
  const { user, scoreSaveLoading } = userSlice;

  const handleAnimationComplete = () => {
    setThoughtSectionVisibility(false);
    setTimeout(() => {
      setSurveySectionVisibility(true);
    }, 250);
  };

  const handleSmilieClick = ({ score }) => {
    console.log("score: ", score);
    if (getUserCookieValidity()) {
      const userFromCookie = getUserFromCookie();
      dispatch(
        postScoreSaveAction({
          score: score - 1,
          date: new Date(),
          userId: userFromCookie?._id,
        })
      );
      setCurrentScore(score);
    }
  };

  useEffect(() => {
    if (currentScore) {
      dispatch(resetUserUpdateAction());
      navigate("/questionnaire/result", {
        state: { score: currentScore - NORMALIZE_FACTOR + 1 },
      });
    }
  }, [currentScore]);

  return (
    <>
      {scoreSaveLoading ? <Loading /> : null}
      {/* <Banner wrapperClassName={styles.bannerWrapper} mTop="4rem">
        <Layout className={styles.bannerWrapper} fullScreenHeight={false}>
          <h3 className={styles.title}>
            One stop shop where you can calibrate all your mental faculties
          </h3>
        </Layout>
      </Banner> */}
      <Layout>
        <AnimatePresence>
          {thoughtSectionVisibility ? (
            <motion.div exit={{ opacity: 0 }}>
              <section className={styles.thoughtSection}>
                <motion.div
                  animate={{ x: -100 }}
                  transition={{ ease: "easeOut", duration: 5 }}
                  onAnimationComplete={handleAnimationComplete}
                >
                  <div className={styles.pVibesImgContainer}>
                    <img src={positiveVibesImg} />
                  </div>
                </motion.div>
                <motion.div
                  animate={{ x: 100 }}
                  transition={{ ease: "easeOut", duration: 4 }}
                >
                  <div className={styles.thoughtImgContainer}>
                    <img src={thinkCloudImg} />
                    <h4 className={styles.thoughtTxt}>
                      “Every child is an artist; the problem is staying an
                      artist when you grow up” – Pablo Picasso
                    </h4>
                  </div>
                </motion.div>
              </section>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {surveySectionVisibility ? (
          <AnimatePresence>
            <motion.div
              transition={{ ease: "easeOut", duration: 2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <section className={styles.surveySection}>
                <div className={styles.surveyWrapper}>
                  <div className={styles.surveyImgContainer}>
                    <img src={thinkingSImg} style={{ width: "70%" }} />
                  </div>
                  <div className={styles.txtContainer}>
                    <h2>
                      Hi {user?.token ? " Keshav " : null}, how are you today?{" "}
                    </h2>
                    <div className={styles.smilieImgs}>
                      {smilieArr.map(({ src, score }) => (
                        <img
                          className={styles.smilie}
                          onClick={() => handleSmilieClick({ score })}
                          src={src}
                        />
                      ))}
                    </div>
                    <br></br>
                    <h3>
                      Hmm!! Not sure? need more self asked questions about that,
                      then click &nbsp;
                      <Link className={styles.linkSurvey} href="/questionnaire">
                        here
                      </Link>
                    </h3>
                  </div>
                </div>
              </section>
              <section>
                <MindfulBreak className={styles.mindfulSection} />
              </section>
            </motion.div>
          </AnimatePresence>
        ) : null}
      </Layout>
    </>
  );
};

export default HomePageView;
