import Options from "../Options";
import styles from "./styles.module.css";

const Question = ({
  sNo,
  questionText,
  options,
  id: questionId,
  multiSelect,
}) => {
  return (
    <div className={styles.questionWrapper}>
      <div className={styles.qTextWrapper}>
        <span>{sNo}.&nbsp;</span>
        <p className={styles.qText}>{questionText}</p>
      </div>
      <Options
        options={options}
        questionId={questionId}
        multiSelect={multiSelect}
      />
    </div>
  );
};

export default Question;
