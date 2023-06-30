import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _isEmpty from "lodash/isEmpty";
import Cookie from "js-cookie";
import { Modal, Loading } from "@carbon/react";
import Banner from "../../components/Banner/Banner";
import Layout from "../../components/Layout";
import Questionnaire from "../../components/Questionnaire";
import { questionnaireLoading as getQuestionnaireListAction } from "../../store/questionnaireSlice";
import { scoreSaveLoading as postScoreSaveAction } from "../../store/userSlice";
import { getUserCookieValidity } from "../../helpers/utils";
import styles from "./styles.module.scss";

const QuestionnaireView = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentScore, setCurrentScore] = useState(null);

  const dispatch = useDispatch();

  const { questionnaireLoading, questionnaire } = useSelector(
    (state) => state.questionnaireSlice
  );
  const { scoreSaveLoading } = useSelector((state) => state.userSlice);

  const handleSubmission = (value) => {
    setShowModal(true);
    setCurrentScore(value);
  };

  const handleNavigateToResult = (value) => {
    navigate("/questionnaire/result", { state: { score: value } });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleYesClick = () => {
    const isCookieValid = getUserCookieValidity();
    if (isCookieValid) {
      /* Save this score in db */
      const userObj = JSON.parse(Cookie.get("user"));

      dispatch(
        postScoreSaveAction({
          score: currentScore.score,
          date: new Date(),
          userId: userObj?._id,
        })
      );
    }
    handleNavigateToResult(currentScore);
  };

  const handleNoClick = () => {
    /* Ignore this score */
    handleNavigateToResult(currentScore);
  };

  useEffect(() => {
    if (_isEmpty(questionnaire)) {
      dispatch(getQuestionnaireListAction());
    }
  }, [questionnaire]);

  return (
    <>
      {/* <Banner wrapperClassName={styles.bannerWrapper}>
        <Layout className={styles.bannerLayout}>
          <h2 className={styles.bannerContent}>
            The first step towards free mind space…
            <br></br>
          </h2>
        </Layout>
      </Banner> */}
      {questionnaireLoading || scoreSaveLoading ? <Loading /> : null}
      <Layout className={styles.lgap}>
        <h6 className={styles.subtitle}>
          You can help yourself by answering a few questions. Just provide
          candid answers and you will thank us later! Select your answers and
          click Submit.
        </h6>
        <Questionnaire onSubmit={handleSubmission} questions={questionnaire} />
        <Modal
          onRequestClose={handleCloseModal}
          onRequestSubmit={handleYesClick}
          onSecondarySubmit={handleNoClick}
          open={showModal}
          modalHeading="Thank you for your input"
          primaryButtonText="Yes"
          secondaryButtonText="No"
        >
          <h4>Do you wish to record your input for future reference?</h4>
        </Modal>
      </Layout>
    </>
  );
};

export default QuestionnaireView;
