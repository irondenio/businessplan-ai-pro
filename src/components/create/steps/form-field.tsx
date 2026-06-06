interface Props {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export function FormField({ label, error, hint, children }: Props) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
