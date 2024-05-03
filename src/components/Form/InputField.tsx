import { TextField } from "@mui/material";
import React from "react";
import { useController, Control } from "react-hook-form";

interface Props {
  control: Control<any>;
  label: string;
  type?: string;
  id?: string;
  placeholder?: string;
  name?: string;
  tabIndex?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  disabled?: boolean;
  ariaRequired?: boolean;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  isRequired?: boolean;
  labelClassName?: string;
  inputClassName?: string;
  defaultValue?: string;
  className?: string;
  multiline?: boolean;
  rows?: number;
}

const InputField: React.FC<Props> = ({
  label,
  type,
  id,
  placeholder,
  name,
  tabIndex,
  disabled,
  ariaRequired,
  fullWidth,
  error,
  helperText,
  isRequired,
  labelClassName,
  control,
  defaultValue,
  className,
  inputClassName,
  multiline,
  rows,
  onBlur,
  onChange,
  ...props
}) => {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    name,
    control: control,
    defaultValue: defaultValue || "",
    rules: { required: isRequired },
  });
  return (
    <div className={`flex flex-col text-base gap-2  ${className}`}>
      <label htmlFor={label} className={` font-semibold ${labelClassName}`}>
        {label} {isRequired ? "*" : ""}
      </label>
      <TextField
        {...field}
        rows={rows || 2}
        multiline={multiline}
        className={`focus:outline-0 border-none focus:border-0
        focus:border-none  focus:outline-none focus:ring-0 hover:outline-none ${inputClassName}`}
        type={type || "text"}
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        name={name}
        tabIndex={2}
        disabled={disabled}
        aria-required={isRequired ? "true" : "false"}
        fullWidth={fullWidth}
        error={error || Boolean(fieldError)}
        helperText={helperText || fieldError?.message}
        {...props}
      />
    </div>
  );
};

export default InputField;
