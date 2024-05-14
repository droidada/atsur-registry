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
  variant?: "outlined" | "standard";
  hasBorder?: boolean;
  sx?: any;
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
  variant,
  hasBorder,
  sx,
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
        variant={variant}
        sx={{
          "& fieldset": { border: !hasBorder && "none" },
          ...sx,
        }}
        rows={rows || 2}
        multiline={multiline}
        type={type || "text"}
        id={id}
        className={`h-fit w-full ${inputClassName} `}
        inputProps={{
          className: `focus:outline-none focus:ring-0 border-none outline-0 remove-input-outline hover:outline-offset-2 border-none focus: focus:outline-offset-0 focus:border-none focus:shadow-outline ${inputClassName}`,
        }}
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
