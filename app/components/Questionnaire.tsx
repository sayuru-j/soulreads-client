"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { questionnaire_1 as questionnaire } from "../data/questionnaires";
import { Answer, MentalState, Quiz } from "../@types";
import { calculateMentalStateAndProvideTagLine } from "../services/mentalState";
import { useRouter } from "next/navigation";
import {
  deleteDiagnosis,
  loadDiagnosis,
  saveDiagnosis,
} from "../services/diagnose";
import { createUser, loadUser } from "../services/user";

const Questionnaire = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: number | null }>({});
  const [score, setScore] = useState<number | null>(null);
  const [diagnosis, setDiagnosis] = useState<MentalState>();
  const router = useRouter();
  const [warn, setWarn] = useState("");

  const currentQuestion = questionnaire[currentQuestionIndex];

  useEffect(() => {
    if (answers[currentQuestion.id] !== undefined) {
      setSelectedAnswer(answers[currentQuestion.id]);
    } else {
      setSelectedAnswer(null);
      setWarn("");
    }
  }, [currentQuestionIndex, answers, currentQuestion.id]);

  useEffect(() => {
    if (score) {
      const _diagnosis = calculateMentalStateAndProvideTagLine(score);
      setDiagnosis(_diagnosis);
      saveDiagnosis({
        user: loadUser(),
        diagnosis: _diagnosis,
      });
    }
  }, [score]);

  useEffect(() => {
    const savedDiagnosis = loadDiagnosis();
    if (savedDiagnosis) {
      setDiagnosis(savedDiagnosis);
    }
  }, []);

  useEffect(() => {
    const userExists = loadUser();
    if (!userExists) {
      createUser();
    }
  }, []);

  const handleAnswerSelect = (answerId: number) => {
    setSelectedAnswer(answerId);
  };

  const calculateScore = (
    questionnaire: Quiz[],
    answers: { [key: number]: number | null }
  ) => {
    let totalScore = 0;
    let maxScore = 0;

    // Calculate the total and max scores with weighting
    questionnaire.forEach((question: Quiz) => {
      const selected = answers[question.id];
      const maxPoints = Math.max(...question.answers.map((a) => a.points));
      const questionWeight = question.weight || 1;

      // Add the weighted max score for each question
      maxScore += maxPoints * questionWeight;

      if (selected !== null && selected !== undefined) {
        const selectedAnswer = question.answers.find(
          (a: Answer) => a.id === selected
        );
        if (selectedAnswer) {
          // Add the selected answer's weighted points to the total score
          totalScore += selectedAnswer.points * questionWeight;
        }
      }
    });

    // Normalize the score between 0 and 100
    const normalizedScore = (totalScore / maxScore) * 100;

    // Return the rounded normalized score
    return Math.round(normalizedScore);
  };

  const handleContinue = () => {
    if (selectedAnswer === null) {
      setWarn("Please select an answer before continuing.");
      return;
    }

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion.id]: selectedAnswer,
    }));

    if (currentQuestionIndex < questionnaire.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalScore = calculateScore(questionnaire, answers); // Pass the questionnaire and answers
      setScore(finalScore);
    }

    setWarn("");
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const fadeInOut = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex mb-20 flex-col max-w-7xl mx-auto w-full justify-center p-10 mt-14 gap-10">
      {diagnosis ? (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeInOut}
          className="md:text-5xl text-center flex flex-col gap-2 items-center dark:text-white"
        >
          <h2 className="font-bold text-4xl dark:text-white">
            {diagnosis?.state}
          </h2>
          <h2 className="md:text-2xl text-xl dark:text-white/80">
            {diagnosis?.tagline}
          </h2>

          <div
            onClick={() => router.push("/books")}
            className="bg-[#da4363] cursor-pointer items-center justify-center hover:shadow-md text-white p-3 text-lg rounded-md transition-all duration-100 w-48 inline-flex font-semibold mt-6"
          >
            Books for you
          </div>
          <div
            onClick={() => {
              deleteDiagnosis();
              window.location.reload();
            }}
            className="bg-slate-600 cursor-pointer items-center justify-center hover:shadow-md text-white p-3 text-lg rounded-md transition-all duration-100 w-48 inline-flex font-semibold"
          >
            Retry test
          </div>

          <div className="text-sm mt-6 dark:text-white/80">
            Disclaimer: This questionnaire is designed to provide general
            insights based on your responses, but it does not provide a
            guaranteed diagnosis. The results are based on common patterns and
            may only serve as a guide. This tool should not be used as a
            substitute for professional medical advice, diagnosis, or treatment.
            If you&apos;re experiencing significant mental health challenges, we
            strongly encourage you to seek help from a qualified healthcare
            provider.
          </div>
        </motion.div>
      ) : (
        <>
          <motion.div
            key={currentQuestion.id}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeInOut}
            className="font-bold text-3xl md:text-5xl md:mb-10 inline-flex flex-col dark:text-white"
          >
            {currentQuestion.question}
            <span className="text-sm mt-4 text-[#da4363] animate-bounce">
              {warn}
            </span>
          </motion.div>

          <div className="flex flex-wrap gap-4 md:mb-10">
            {currentQuestion.answers.map((answer) => (
              <motion.div
                key={answer.id}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeInOut}
                className={`transition-all duration-100 cursor-pointer ease-in-out flex flex-col items-start gap-2 p-6 w-full md:w-[300px] min-h-24 md:min-h-40 rounded-lg ${
                  selectedAnswer === answer.id
                    ? "bg-gradient-to-r from-rose-100 to-teal-100 text-[#da4363] shadow-md"
                    : "bg-slate-100 dark:bg-gray-800"
                }`}
                onClick={() => handleAnswerSelect(answer.id)}
              >
                <div className="flex gap-2 items-center">
                  <h2
                    className={`font-semibold ${
                      selectedAnswer === answer.id
                        ? "text-[#da4363]"
                        : "text-black/50 dark:text-white/80"
                    }`}
                  >
                    {answer.id}
                  </h2>

                  <input
                    className="hidden"
                    aria-label={`answer-${answer.id}`}
                    type="radio"
                    checked={selectedAnswer === answer.id}
                    onChange={() => handleAnswerSelect(answer.id)}
                  />

                  <div
                    className={`w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-black/50 flex items-center justify-center ${
                      selectedAnswer === answer.id
                        ? "bg-[#da4363] border-none"
                        : "dark:border-white/50"
                    }`}
                  >
                    {selectedAnswer === answer.id && (
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
                <h2 className="font-semibold dark:text-[#da4363]">
                  {answer.answer}
                </h2>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4 items-center font-semibold">
            <motion.button
              onClick={handleBack}
              className={`${
                currentQuestionIndex === 0 ? "bg-gray-400" : "bg-slate-600"
              } text-white p-3 cursor-pointer rounded-lg hover:bg-slate-600 transition-all duration-300 w-1/2 md:w-auto md:min-w-32  ${
                currentQuestionIndex === 0 && "hidden"
              }`}
              whileHover={{ scale: currentQuestionIndex === 0 ? 1 : 1.05 }}
              disabled={currentQuestionIndex === 0}
            >
              Back
            </motion.button>

            <motion.button
              onClick={handleContinue}
              className="bg-[#da4363] hover:shadow-md text-white p-3 rounded-lg hover:bg-gradient-to-r from-rose-100 to-teal-100 hover:text-[#da4363] transition-all duration-100 w-1/2 md:w-auto md:min-w-48"
            >
              Continue
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
};

export default Questionnaire;
