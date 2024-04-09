import { Action, QuestionProps } from "../App";

interface QuestionComponentProps {
  question: QuestionProps
  dispatch: (value: Action) => void;
  answer: null | number;
}
export default function Question({
  question,
  dispatch,
  answer,
}: QuestionComponentProps) {
  const hasAnswered = answer !== null;

  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={index}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
