import { useState } from "react";

type TextAreaProps = {
  label?: string;
  placeholder?: string;
  className?: string;
};
const TextArea = ({
  label,
  placeholder,
  className,
  ...props
}: TextAreaProps) => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-[#252730] font-semibold" htmlFor={label}>
        {label}
      </label>

      <textarea
        name={label}
        rows={5}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border border-[#D5D6DE] rounded-lg p-2 w-[441px] px-[14px] py-[12px]  ${className}`}
        {...props}
      />
    </div>
  );
};

export default TextArea;
