import { useState } from "react";
import { useController } from "react-hook-form";

type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  name?: string;
  control?: any;
  rules?: any;
  defaultValue?: any;
};

const Input = ({
  label,
  type = "text",
  placeholder,
  name,
  control,
  rules,
  defaultValue,
  className,
  ...props
}: InputProps) => {
  // Destructure field and fieldState from useController
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
  });

  // Conditionally set initial value based on defaultValue
  const initialValue = defaultValue ? defaultValue : "";

  return (
    <div className="w-full flex flex-col gap-2 mb-4">
      <label className="text-white font-semibold" htmlFor={label}>
        {label}
      </label>

      <input
        type={type}
        placeholder={defaultValue ? defaultValue : placeholder}
        onChange={onChange}
        onBlur={onBlur}
        // Use initialValue if value is empty (on first render)
        value={value === "" ? initialValue : value}
        ref={ref}
        className={`border border-[#D5D6DE] focus:border-0 focus:outline-0 w-[441px] h-[50px] px-[14px] py-[12px]  ${className}`}
        {...props}
      />
      {invalid && (
        <span className="text-xs text-red-500 font-extralight">
          {error?.message}
        </span>
      )}
    </div>
  );
};

export default Input;
