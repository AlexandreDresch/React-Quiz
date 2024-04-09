import { useEffect, useReducer } from "react";
import Header from "./components/header";
import Main from "./components/main";
import Loader from "./components/loader";
import Error from "./components/error";
import StartScreen from "./components/start-screen";
import Question from "./components/question";
import NextButton from "./components/next-button";
import Progress from "./components/progress";
import FinishScreen from "./components/finish-screen";
import Timer from "./components/timer";

interface State {
  questions: QuestionProps[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  index: number;
  answer: null | number;
  score: number;
  highScore: number;
  secondsRemaining: null | number;
}

export type Action =
  | { type: "dataReceived"; payload: QuestionProps[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "newAnswer"; payload: number }
  | { type: "nextQuestion" }
  | { type: "finished" }
  | { type: "restart" }
  | { type: "tick" };

export interface QuestionProps {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

const SECONDS_PER_QUESTION = 30;

const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  score: 0,
  highScore: 0,
  secondsRemaining: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "newAnswer":
      // eslint-disable-next-line no-case-declarations
      const currentQuestion = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === currentQuestion?.correctOption
            ? state.score + currentQuestion.points
            : state.score,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.score > state.highScore ? state.score : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
      };

    case "tick":
      return {
        ...state,
        secondsRemaining:
          (state.secondsRemaining ? state.secondsRemaining : 0) - 1,
        status:
          state.secondsRemaining === null || state.secondsRemaining <= 0
            ? "finished"
            : state.status,
      };
    default:
      return state;
  }
}

function App() {
  const [
    { questions, status, index, answer, score, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const questionsNumber = questions.length;
  const maxPossibleScore = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:3000/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader text="Loading questions..." />}

        {status === "error" && (
          <Error text="There was an error while loading questions." />
        )}

        {status === "ready" && (
          <StartScreen questionsNumber={questionsNumber} dispatch={dispatch} />
        )}

        {status === "active" && (
          <>
            <Progress
              currentQuestion={index}
              questionsNumber={questionsNumber}
              score={score}
              maxScore={maxPossibleScore}
              answer={answer}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />

              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                questionsNumber={questionsNumber}
              />
            </footer>
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            score={score}
            maxPossibleScore={maxPossibleScore}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
