import { v4 as uuidv4 } from "uuid";

export const questions = [
  {
    question_text: "Do you feel overwhelmed by your work?",
    id: uuidv4(),
    options: [
      {
        option_text: "Yes",
        score: -1,
        id: uuidv4(),
      },
      {
        option_text: "No",
        score: 1,
        id: uuidv4(),
      },
      {
        option_text: "Sometimes",
        score: 0,
        id: uuidv4(),
      },
    ],
  },
  {
    question_text: "Do you feel stressed about your work?",
    id: uuidv4(),
    options: [
      {
        option_text: "Yes",
        score: -1,
        id: uuidv4(),
      },
      {
        option_text: "No",
        score: 1,
        id: uuidv4(),
      },
      {
        option_text: "Sometimes",
        score: 0,
        id: uuidv4(),
      },
    ],
  },
  {
    question_text: "Do you feel depressed or sad about your work?",
    id: uuidv4(),
    options: [
      {
        option_text: "Yes",
        score: -1,
        id: uuidv4(),
      },
      {
        option_text: "No",
        score: 1,
        id: uuidv4(),
      },
      {
        option_text: "Sometimes",
        score: 0,
        id: uuidv4(),
      },
    ],
  },
  {
    question_text: "Do you feel that your work is not meaningful?",
    id: uuidv4(),
    options: [
      {
        option_text: "Yes",
        score: -1,
        id: uuidv4(),
      },
      {
        option_text: "No",
        score: 1,
        id: uuidv4(),
      },
    ],
  },
  {
    question_text:
      "Do you feel that your team or Manager does not support your work?",
    id: uuidv4(),
    options: [
      {
        option_text: "Yes",
        score: -1,
        id: uuidv4(),
      },
      {
        option_text: "No",
        score: 1,
        id: uuidv4(),
      },
    ],
  },
  {
    question_text:
      "Do you feel that your work is not recognized or underappreciated?",
    id: uuidv4(),
    options: [
      {
        option_text: "Yes",
        score: -1,
        id: uuidv4(),
      },
      {
        option_text: "No",
        score: 1,
        id: uuidv4(),
      },
      {
        option_text: "Sometimes",
        score: 0,
        id: uuidv4(),
      },
    ],
  },
  {
    question_text: "Do you feel that your work is not challenging enough?",
    id: uuidv4(),
    options: [
      {
        option_text: "Yes",
        score: -1,
        id: uuidv4(),
      },
      {
        option_text: "No",
        score: 1,
        id: uuidv4(),
      },
    ],
  },
  {
    question_text:
      "Do you feel that your work is not aligned with your personal goals and ambitions?",
    id: uuidv4(),
    options: [
      {
        option_text: "Yes",
        score: -1,
        id: uuidv4(),
      },
      {
        option_text: "No",
        score: 1,
        id: uuidv4(),
      },
    ],
  },
  {
    question_text:
      "Do you feel you cannot balance your work and personal life?",
    id: uuidv4(),
    options: [
      {
        option_text: "Yes",
        score: -1,
        id: uuidv4(),
      },
      {
        option_text: "No",
        score: 1,
        id: uuidv4(),
      },
    ],
  },
  {
    question_text:
      "Do you feel you have enough resources at work, such as mental health support, upskilling resources, and flexible work arrangements that support your well-being?",
    id: uuidv4(),
    options: [
      {
        option_text: "Yes",
        score: -1,
        id: uuidv4(),
      },
      {
        option_text: "No",
        score: 1,
        id: uuidv4(),
      },
    ],
  },
];
