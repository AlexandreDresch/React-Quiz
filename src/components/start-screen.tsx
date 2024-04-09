import { Action } from "../App";

export default function StartScreen({
  questionsNumber,
  dispatch,
}: {
  questionsNumber: number;
  dispatch: (value: Action) => void;
}) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questionsNumber} questions to test your React mastery.</h3>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}
