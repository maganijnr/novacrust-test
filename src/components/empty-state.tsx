export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="w-full max-w-[520px] mx-auto">
      <h2>Coming Soon!</h2>
      {message}
    </div>
  );
}
