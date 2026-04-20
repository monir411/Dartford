type FormFieldProps = {
  label: string;
  type?: string;
  placeholder?: string;
  as?: "input" | "select";
  options?: string[];
};

export function FormField({
  label,
  type = "text",
  placeholder,
  as = "input",
  options = [],
}: FormFieldProps) {
  const sharedClassName =
    "mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-950 outline-none transition focus:border-slate-950";

  return (
    <label className="block text-sm font-medium text-slate-800">
      {label}
      {as === "select" ? (
        <select defaultValue="" className={sharedClassName}>
          <option value="" disabled>
            {placeholder ?? `Select ${label.toLowerCase()}`}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} placeholder={placeholder} className={sharedClassName} />
      )}
    </label>
  );
}
