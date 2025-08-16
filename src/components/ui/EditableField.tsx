import React from "react";

interface EditableFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  as?: "input" | "textarea";
  id?: string;
  inputClassName?: string;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  label,
  as = "input",
  id,
  className,
  inputClassName,
  ...props
}) => {
  const baseInputStyles =
    "w-full rounded-md px-3 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300";

  const textareaStyles = "min-h-[300px] resize-y"; // 👈 makes it extend vertically

  const Component = as;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-gray-300">
          {label}:
        </label>
      )}
      <Component
        id={id}
        className={`${baseInputStyles} ${
          as === "textarea" ? textareaStyles : ""
        } ${inputClassName}`}
        {...(props as any)}
      />
    </div>
  );
};
