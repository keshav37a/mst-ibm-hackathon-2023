import styles from "./styles.module.css";
import { RadioButton, RadioButtonGroup } from "@carbon/react";

const Options = ({ options, questionId, multiSelect = false }) => {
  if (!multiSelect) {
    return (
      <RadioButtonGroup className={styles.group} name={questionId}>
        {options.map(({ option_text, score, _id: optionId }) => {
          return (
            <RadioButton
              key={optionId}
              name={questionId}
              id={optionId}
              value={score}
              labelText={option_text}
            />
          );
        })}
      </RadioButtonGroup>
    );
  }

  return null;
};

export default Options;
