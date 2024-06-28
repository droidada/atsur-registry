import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { useController, Control } from "react-hook-form";
import { NumericFormat, NumericFormatProps } from "react-number-format";

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
  textFieldClassName?: string;
  numericFormat?: NumericFormatProps;
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
  textFieldClassName,
  numericFormat,
  ...props
}) => {
  const {
    field: { onChange: onControllerChange, ...field },

    fieldState: { error: fieldError },
  } = useController({
    name,
    control: control,
    defaultValue: defaultValue || "",
    rules: { required: isRequired },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const endAdornment = type === "password" && (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  console.log(type);
  return (
    <div className={`flex flex-col text-base gap-2  items-start  ${className}`}>
      <label htmlFor={label} className={` font-semibold ${labelClassName}`}>
        {label} {isRequired ? "*" : ""}
      </label>
      {type === "price" ? (
        <NumericFormat
          thousandSeparator
          onValueChange={(values) => {
            console.log(values.value);
            onControllerChange({ target: { value: values.value } });

            // @ts-ignore
            onChange && onChange({ target: { name, value: values.value } });
          }}
          // customInput={TextField}
          customInput={TextField}
          variant={variant}
          sx={{
            "& fieldset": { border: !hasBorder && "none" },
            ...sx,
          }}
          id={id}
          className={`h-fit w-full ${textFieldClassName} `}
          inputProps={{
            className: `focus:outline-none focus:ring-0 border-none w-full outline-0 remove-input-outline hover:outline-offset-2 border-none focus: focus:outline-offset-0 focus:border-none focus:shadow-outline ${inputClassName}`,
          }}
          // {...field}
          placeholder={placeholder}
          defaultValue={defaultValue}
          name={name}
          tabIndex={2}
          disabled={disabled}
          aria-required={isRequired ? "true" : "false"}
          fullWidth={fullWidth}
          error={error || Boolean(fieldError)}
          helperText={helperText || fieldError?.message || " "}
        />
      ) : (
        <TextField
          {...field}
          variant={variant}
          onChange={onControllerChange}
          onBlur={onBlur}
          sx={{
            "& fieldset": { border: !hasBorder && "none" },
            ...sx,
          }}
          rows={rows || 2}
          multiline={multiline}
          type={
            type == "password"
              ? showPassword
                ? "text"
                : "password"
              : type || "text"
          }
          id={id}
          className={`h-fit w-full ${textFieldClassName} `}
          inputProps={{
            className: `focus:outline-none focus:ring-0 border-none w-full outline-0 remove-input-outline hover:outline-offset-2 border-none focus: focus:outline-offset-0 focus:border-none focus:shadow-outline ${inputClassName}`,
          }}
          InputProps={{
            endAdornment: endAdornment,
            className: " w-full p-0",
          }}
          placeholder={placeholder}
          defaultValue={defaultValue}
          name={name}
          tabIndex={2}
          disabled={disabled}
          aria-required={isRequired ? "true" : "false"}
          fullWidth={fullWidth}
          error={error || Boolean(fieldError)}
          helperText={helperText || fieldError?.message || " "}
          {...props}
        />
      )}
    </div>
  );
};

export default InputField;
