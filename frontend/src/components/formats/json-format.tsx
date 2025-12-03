export function JSONFormat({ value }: { value: unknown }) {
  return (
    <code className="text-sm bg-stone-100 font-mono text-emerald-600 p-3 rounded-md whitespace-pre-wrap">
      {JSON.stringify(value, null, 2)}
    </code>
  );
}
