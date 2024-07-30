import { IconButton, Select, Tooltip } from "@mui/material";
import React from "react";
import { useController, Control } from "react-hook-form";

import { GoInfo } from "react-icons/go";
import CustomTooltip from "../CustomTooltip";

interface Props {
  control: Control<any>;
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
  defaultValue?: any;
  className?: string;
  hasInfo?: boolean;
  info?: string;
  tooltipProps?: {
    children?: React.ReactNode;
    place?: "top" | "bottom";
  };
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
  control,
  defaultValue,
  className,
  hasInfo,
  info,
  tooltipProps,
  ...props
}) => {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
    defaultValue: "",
    rules: { required: isRequired },
  });

  return (
    <div className={`flex w-full flex-col text-base gap-2 ${className}`}>
      {label && (
        <label
          htmlFor={label}
          className={` font-semibold flex gap-4 items-center ${labelClassName}`}
        >
          {label} {isRequired ? "*" : ""}{" "}
          {hasInfo && (
            <>
              <a data-tooltip-id={id}>
                <GoInfo />
              </a>
              <CustomTooltip id={id} content={info}>
                {tooltipProps?.children}
              </CustomTooltip>
            </>
          )}
        </label>
      )}
      <div>
        <Select
          {...field}
          id={id}
          name={name}
          tabIndex={tabIndex}
          disabled={disabled}
          aria-required={ariaRequired}
          fullWidth={fullWidth}
          defaultValue={defaultValue}
          error={error}
          inputProps={{
            className: ` z-10`,
          }}
          {...props}
          className={`h-[40px] bg-white focus:border-none ${selectClassName}`}
        >
          {children}
        </Select>
        <small className="text-red-500  font-normal">
          {(error && helperText) || " "}
        </small>
      </div>
    </div>
  );
};

export default SelectField;
