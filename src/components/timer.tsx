import { useEffect } from "react";
import { Action } from "../App";

export default function Timer({
  secondsRemaining,
  dispatch,
}: {
  secondsRemaining: number | null;
  dispatch: (value: Action) => void;
}) {
  const minutes = secondsRemaining ? Math.floor(secondsRemaining / 60) : 0;
  const seconds = secondsRemaining ? secondsRemaining % 60 : 0;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return function () {
        clearInterval(id);
      };
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {minutes < 10 && "0"}
      {minutes}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
