import "./App.scss";
import Header from "./components/Header";
// import MindFulBreakComponent from "./components/MindfulBreak";

function App({ children }) {
  return (
    <>
      <Header />
      {children}
      {/* <MindFulBreakComponent /> */}
    </>
  );
}

export default App;
