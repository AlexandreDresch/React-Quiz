import { Action } from "../App";

interface NextButtonProps {
  dispatch: (value: Action) => void;
  answer: null | number;
  index: number;
  questionsNumber: number;
}

export default function NextButton({
  dispatch,
  answer,
  index,
  questionsNumber,
}: NextButtonProps) {
  if (answer === null) return null;

  if (index < questionsNumber - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }

  if (index === questionsNumber - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
  }
}
