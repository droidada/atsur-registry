import React from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, Control } from "react-hook-form";
import dayjs from "dayjs";

interface DateInputProps {
  control: Control<any>;
  name: string;
  label: string;
  defaultValue?: string | null;
  disabled?: boolean;
  tabIndex?: number;
  fullWidth?: boolean;
  id: string;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  maxDate?: string;
  minDate?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  control,
  name,
  label,
  defaultValue,
  disabled,
  id,
  tabIndex,
  fullWidth = true,
  required,
  helperText,
  error,
  className,
  inputClassName,
  labelClassName,
  maxDate,
  minDate,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ? dayjs(defaultValue) : null}
        render={({
          field: { onChange, value },
          fieldState: { error: fieldError },
        }) => (
          <div className={`flex flex-col text-base gap-2 ${className}`}>
            <label htmlFor={id} className={`font-semibold ${labelClassName}`}>
              {label} {required ? "*" : ""}
            </label>
            <MuiDatePicker
              value={dayjs(value)}
              onChange={(newValue) =>
                onChange(newValue?.format("YYYY-MM-DD").toString())
              }
              maxDate={maxDate ? dayjs(maxDate) : null}
              minDate={minDate ? dayjs(minDate) : null}
              // @ts-ignore
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputProps={{
                    className: `focus:outline-0 border-none focus:border-0
                  focus:border-none focus:outline-none focus:ring-0 hover:outline-none bg-red-500 ${inputClassName}`,
                  }}
                  className={`focus:outline-0 border-none focus:border-0
                  focus:border-none focus:outline-none focus:ring-0 hover:outline-none `}
                  fullWidth={fullWidth}
                  id={id}
                  error={error || Boolean(fieldError)}
                  helperText={helperText || fieldError?.message}
                  disabled={disabled}
                  tabIndex={tabIndex}
                  aria-required={required ? "true" : "false"}
                />
              )}
              inputFormat="MM/DD/YYYY"
            />
          </div>
        )}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
