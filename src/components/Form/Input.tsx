import { useState } from "react";

type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
};
const Input = ({
  label,
  type = "text",
  placeholder,
  className,
  ...props
}: InputProps) => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-[#252730] font-semibold" htmlFor={label}>
        {label}
      </label>

      <input
        type={type}
        name={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border border-[#D5D6DE] focus:border-0 focus:outline-0 rounded-lg p-2 w-[441px] px-[14px] py-[12px]  ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
