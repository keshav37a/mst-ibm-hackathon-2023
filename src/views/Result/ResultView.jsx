import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Cookie from "js-cookie";
import { Button, Modal } from "@carbon/react";
import {
  BarChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Cell,
} from "recharts";
import Layout from "../../components/Layout";
import Banner from "../../components/Banner";

import greenSmileImg from "../../assets/images/smilie-green.png";
import yellowSmileImg from "../../assets/images/smilie-yellow.png";
import redSmileImg from "../../assets/images/smilie-red.png";

import SurveyImg from "../../assets/images/survey-result.png";
import Tick from "../../assets/images/green-tick.png";
import MindfulBreak from "../../components/MindfulBreak";
import {
  userInfoLoading as userInfoAction,
  sendEmailLoading as sendEmailAction,
} from "../../store/userSlice";
import { GREEN_SCORE, RED_SCORE, YELLOW_SCORE } from "../../constants/score";
import { getUserFromCookie } from "../../helpers/utils";
import styles from "./styles.module.scss";

let badgeRank = {
  0: greenSmileImg,
  1: yellowSmileImg,
  2: redSmileImg,
};

let scoreRank = [GREEN_SCORE, YELLOW_SCORE, RED_SCORE];

const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const ResultView = () => {
  const { state } = useLocation();
  const [currentRange, setCurrentRange] = useState(null);
  const [surveyScoreMod, setSurveyScoreMod] = useState([]);
  const [showResultsModal, setShowResultsModal] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userSlice);

  const score = state?.score;

  const renderRecordedResultJsx = () => {
    return (
      <Button
        onClick={() => setShowResultsModal(true)}
        className={styles.callbackBtnBlue}
      >
        Show Recorded Result
      </Button>
    );
  };

  const normalizeScore = (score) => {
    if (!isNaN(score)) {
      return score + 15;
    } else {
      return score.score + 15;
    }
  };

  const getFormattedDate = (date) => {
    const currDate = new Date(date);
    const cDate = currDate.getDate();
    const month = currDate.getMonth();
    const year = currDate.getYear();

    return `${cDate} ${months[month]} ${year}`;
  };

  useEffect(() => {
    const userFromLocal = Cookie.get("user");
    if (userFromLocal && JSON.parse(userFromLocal)) {
      const parsedUser = JSON.parse(userFromLocal);
      dispatch(userInfoAction({ email: parsedUser?.email }));
    }
  }, []);

  useEffect(() => {
    const surveyScoreMod = [];
    const userFromLocal = Cookie.get("user");
    if (userFromLocal && JSON.parse(userFromLocal)) {
      const parsedUser = JSON.parse(userFromLocal);
      parsedUser?.surveyScore?.forEach((obj) => {
        surveyScoreMod.push({
          ...obj,
          score: normalizeScore(obj.score),
          date: getFormattedDate(obj.date),
        });
      });
      setSurveyScoreMod(surveyScoreMod);
    }
  }, [user]);

  useEffect(() => {
    if (score) {
      let scoreNum = normalizeScore(score);

      let message = "";
      let badgeRank = 0;
      if (scoreNum >= scoreRank[0]) {
        message = (
          <>
            <h5>
              <img
                src={Tick}
                style={{ width: "3%", verticalAlign: "middle" }}
              />
              Thank you for answering !! Keep it up!!
            </h5>
            <h5>
              Great going! You are doing really well. You may try a quick
              activity for mindful refreshment.
            </h5>
            {renderRecordedResultJsx()}
          </>
        );
      } else if (scoreNum >= scoreRank[1] && scoreNum < scoreRank[0]) {
        message = (
          <>
            <h5>
              {" "}
              <img
                src={Tick}
                style={{ width: "3%", verticalAlign: "middle" }}
              />
              Thank you for answering
            </h5>

            <h5>Congratulations, You are good but you can make it better!!</h5>
            <h5>
              We got you! Maybe a chat with the counsellor and you can be your
              super self again...
            </h5>
            <ul className={styles.yellowList}>
              <li>
                <div className={styles.content}>
                  <h5>Please ask your personalised question here Or</h5>
                </div>
              </li>
              <li>
                <h5>Call our wellness Advisor at 1-800-1022-IBM(426) or</h5>
              </li>
              <li>
                <h5>
                  Go to https://ppconline.info – ID and password - ibmindia
                </h5>
              </li>
            </ul>
            {renderRecordedResultJsx()}
          </>
        );
        badgeRank = 1;
      } else {
        /* Send email if score is in red zone and user is logged in */
        const user = getUserFromCookie();
        if (user) {
          dispatch(sendEmailAction({ user: user.email }));
        }

        message = (
          <>
            <h5>
              {" "}
              <img
                src={Tick}
                style={{ width: "3%", verticalAlign: "middle" }}
              />
              Thank you for answering
            </h5>

            <h6 style={{ marginTop: "0.5rem" }}>
              We understand!Talk to an expert who can help you get back on track
            </h6>
            <h5 style={{ marginTop: "0.75rem", color: "brown" }}>
              Call our wellness Advisor at 1-800-1022-IBM(426)
            </h5>
            <Button className={styles.callbackBtn}>
              I wish to get a callback from an expert
            </Button>
            {renderRecordedResultJsx()}
          </>
        );
        badgeRank = 2;
      }
      setCurrentRange({ message, badgeRank });
    }
  }, [score]);

  const getBarChartColor = (barInfo) => {
    const currScore = barInfo?.score;
    if (currScore >= scoreRank[0]) {
      return "#008000";
    } else if (currScore >= scoreRank[1]) {
      return "#ECDAC2";
    } else {
      return "#A71930";
    }
  };

  return (
    <>
      <div className={styles.mrgTop}>
        <Layout fullScreenHeight={false}>
          {currentRange ? (
            <div className={styles.badgeContainer}>
              <div
                style={{
                  width: "40%",
                  marginTop: "-1rem",
                  marginLeft: "-5.5rem",
                }}
              >
                <img src={SurveyImg} />
              </div>
              {/* <div  style={{width:'50%'}}> */}
              <div className={styles.badge}>
                <img src={badgeRank[currentRange.badgeRank]} />
              </div>
              <h2>{currentRange.message}</h2>
              {/* </div> */}
            </div>
          ) : null}

          <Modal
            onRequestClose={() => setShowResultsModal(false)}
            open={showResultsModal}
            passiveModal={true}
          >
            <div style={{ height: "50vh" }}>
              <h5 style={{ marginBottom: "1rem", marginLeft: "3rem" }}>
                Your recored results so far
              </h5>
              <ResponsiveContainer height="90%">
                <BarChart
                  barSize={20}
                  /* data={user.sureveyScore} */ data={surveyScoreMod}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis dataKey="score" />
                  <Bar
                    dataKey="score"
                    stroke="#000000"
                    color={getBarChartColor()}
                  >
                    {surveyScoreMod?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getBarChartColor(entry)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Modal>
        </Layout>
      </div>
      <Layout fullScreenHeight={false}>
        <MindfulBreak />
      </Layout>
    </>
  );
};

export default ResultView;
