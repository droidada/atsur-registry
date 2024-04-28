import { Select } from "@mui/material";
import React from "react";

interface Props {
  label?: string;
  type?: string;
  id?: string;
  placeholder?: string;
  name?: string;
  tabIndex?: number;
  disabled?: boolean;
  ariaRequired?: boolean;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  isRequired?: boolean;
  labelClassName?: any;
  children: React.ReactNode;
  selectClassName?: string;
}

const SelectField: React.FC<Props> = ({
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
  children,
  selectClassName,
  ...props
}) => {
  return (
    <div className="flex flex-col text-base gap-2">
      {label && (
        <label htmlFor={label} className={` font-semibold ${labelClassName}`}>
          {label} {isRequired ? "*" : ""}
        </label>
      )}
      <div>
        <Select
          id={id}
          name={name}
          tabIndex={tabIndex}
          disabled={disabled}
          aria-required={ariaRequired}
          fullWidth={fullWidth}
          error={error}
          {...props}
          className={`h-[40px] bg-white focus:border-none ${selectClassName}`}
        >
          {children}
        </Select>
        <small className="text-red-500 font-normal">
          {error && helperText}
        </small>
      </div>
    </div>
  );
};

export default SelectField;
