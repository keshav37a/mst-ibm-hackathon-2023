import { useState } from "react";
import { Form, Button } from "@carbon/react";
import Question from "../Question";

const Questionnaire = ({ questions, onSubmit }) => {
  const [questionaireData, setQuestionaireData] = useState({});

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const score = handleCalculateScore();
    onSubmit && onSubmit({ score });
  };

  const handleCalculateScore = (e) => {
    let score = 0;
    Object.entries(questionaireData).forEach(([_, value]) => {
      score += Number(value);
    });
    return score;
  };

  const handleFormChange = (e) => {
    setQuestionaireData((prevValue) => {
      return { ...prevValue, [e.target.name]: e.target.value };
    });
  };

  /*   useEffect(() => {
    console.log(questionaireData);
  }, [questionaireData]); */

  return (
    <Form onChange={handleFormChange} onSubmit={handleSubmitForm}>
      <div>
        {questions.map((question, index) => {
          const { question_text, options, _id } = question;
          return (
            <Question
              key={_id}
              sNo={index + 1}
              questionText={question_text}
              options={options}
              id={_id}
            />
          );
        })}
      </div>
      {questions.length > 0 ? (
        <>
          <Button onSubmit={handleSubmitForm} type="submit">
            Done
          </Button>
          <Button kind="danger" type="button" style={{ marginLeft: "1rem" }}>
            Cancel
          </Button>
        </>
      ) : null}
    </Form>
  );
};

export default Questionnaire;
