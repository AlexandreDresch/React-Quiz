import { Action } from "../App";

export default function FinishScreen({
  score,
  maxPossibleScore,
  highScore,
  dispatch,
}: {
  score: number;
  maxPossibleScore: number;
  highScore: number;
  dispatch: (value: Action) => void;
}) {
  const percentage = (score / maxPossibleScore) * 100;

  let emoji = "🎉";

  if (percentage < 20) {
    emoji = "😢";
  } else if (percentage < 40) {
    emoji = "😔";
  } else if (percentage < 60) {
    emoji = "😐";
  } else if (percentage < 80) {
    emoji = "😊";
  } else if (percentage < 100) {
    emoji = "🤩";
  }

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{score}</strong> points of{" "}
        {maxPossibleScore} ({Math.ceil(percentage)}%)
      </p>

      <p className="highscore">(High Score: {highScore} points)</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Play Again
      </button>
    </>
  );
}
