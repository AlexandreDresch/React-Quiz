export default function Error({ text }: { text: string }) {
  return (
    <p className="error">
      <span>🔥</span> {text}
    </p>
  );
}
