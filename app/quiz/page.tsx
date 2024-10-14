import React from "react";
import Questionnaire from "../components/Questionnaire";
import Header from "../components/Header";

const QuizPage = () => {
  return (
    <div className="w-screen h-screen overflow-auto md:overflow-hidden text-black dark:text-white/80">
      <Header logoOnly noPad noSeperator />
      <Questionnaire />
    </div>
  );
};

export default QuizPage;
