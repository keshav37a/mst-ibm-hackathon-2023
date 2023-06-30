import { httpRequest } from "../helpers/httpRequest";

export const postUserSignIn = ({
  method = "POST",
  apiBaseUrl = "",
  apiVersion = "api/v1",
  endPoint = "user/signin",
  data,
}) => {
  const url = `${apiBaseUrl}/${apiVersion}/${endPoint}`;
  return httpRequest({
    method,
    url,
    payload: data,
  });
};

export const postUserSignUp = ({
  method = "POST",
  apiBaseUrl = "",
  apiVersion = "api/v1",
  endPoint = "user/signup",
  data,
}) => {
  const url = `${apiBaseUrl}/${apiVersion}/${endPoint}`;
  return httpRequest({
    method,
    url,
    payload: data,
  });
};

export const getQuestionnaireList = ({
  method = "GET",
  apiBaseUrl = "",
  apiVersion = "api/v1",
  endPoint = "questionnaire/all",
}) => {
  const url = `${apiBaseUrl}/${apiVersion}/${endPoint}`;
  return httpRequest({
    method,
    url,
  });
};

export const postSaveUserSurveyScore = ({
  method = "POST",
  apiBaseUrl = "",
  apiVersion = "api/v1",
  endPoint = "/user/add-survey-score",
  data,
}) => {
  const url = `${apiBaseUrl}/${apiVersion}/${endPoint}/${data?.userId}`;
  return httpRequest({
    method,
    url,
    payload: {
      score: data?.score,
      date: data?.date,
    },
  });
};

export const getUserInfo = ({
  method = "POST",
  apiBaseUrl = "",
  apiVersion = "api/v1",
  endPoint = "user/get-user-info",
  data,
}) => {
  const url = `${apiBaseUrl}/${apiVersion}/${endPoint}`;
  return httpRequest({
    method,
    url,
    payload: data,
  });
};

export const postSendEmail = ({
  method = "POST",
  apiBaseUrl = "",
  apiVersion = "api/v1",
  endPoint = "mailer/send-mail",
  data,
}) => {
  const url = `${apiBaseUrl}/${apiVersion}/${endPoint}`;
  return httpRequest({
    method,
    url,
    payload: data,
  });
};

export const getGames = ({
  method = "GET",
  apiBaseUrl = "",
  apiVersion = "api/v1",
  endPoint = "games/get-game",
  data,
}) => {
  console.log("data: ", data);
  const url = `${apiBaseUrl}/${apiVersion}/${endPoint}/${data?.type}`;
  return httpRequest({
    method,
    url,
    payload: data,
  });
};
