import axios from "axios";

export const httpRequest = ({ method = "GET", url, payload }) => {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      data: payload,
      validateStatus: false,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((e) => {
        reject(`error in fetching data ${e}`);
      });
  });
};
