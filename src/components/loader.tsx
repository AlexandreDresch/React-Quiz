export default function Loader({ text }: { text: string }) {
  return (
    <div className="loader-container">
      <div className="loader" />

      <p>{text}</p>
    </div>
  );
}
