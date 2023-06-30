import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store";
import App from "./App.jsx";
import HomePageView from "./views/HomePage/index.js";
import QuestionnaireView from "./views/Questionnaire";
import ResultView from "./views/Result";
import Games from "./components/Games";
import SingleGame from "./components/Games/SingleGame";
import Slider from "./components/Slider/Slider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageView />,
  },
  {
    path: "/questionnaire",
    element: <QuestionnaireView />,
  },
  {
    path: "/questionnaire/result",
    element: <ResultView />,
  },
  {
    path: "/games",
    element: <Games />,
  },
  {
    path: "/games/:type",
    element: <SingleGame />,
  },
  {
    path: "/water-break",
    element: <Slider />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App>
        <RouterProvider router={router} />
      </App>
    </Provider>
  </React.StrictMode>
);
