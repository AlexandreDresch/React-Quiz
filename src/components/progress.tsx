interface ProgressProps {
  currentQuestion: number;
  questionsNumber: number;
  score: number;
  maxScore: number;
  answer: number | null;
}

export default function Progress({
  currentQuestion,
  questionsNumber,
  score,
  maxScore,
  answer
}: ProgressProps) {
  return (
    <header className="progress">
        <progress max={questionsNumber} value={currentQuestion + Number(answer !== null)} />
      <p>
        Question <strong>{currentQuestion + 1}</strong> / {questionsNumber}
      </p>

      <p>
        <strong>{score}</strong> / {maxScore}
      </p>
    </header>
  );
}
