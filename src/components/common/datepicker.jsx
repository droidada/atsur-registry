import * as React from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import { Controller } from "react-hook-form";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";

const DatePicker = React.forwardRef(function DatePicker({
  name,
  label = "date",
  error,
  helperText,
  control,
  defaultValue,
  ...rest
}) {
  // const { name, label = "date", error, helperText, control, ...rest } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ?? null}
        {...rest}
        render={({ field: { onChange, value } }) => {
          return (
            <MuiDatePicker
              label={label}
              onChange={(newValue) => {
                //  manually set the on change value here
                //  noticed react-hook-form was setting the
                //  value as an object that is the cause of the
                //  error
                onChange(newValue?.format("YYYY-MM-DD").toString());
              }}
              defaultValue={defaultValue ?? null}
              value={dayjs(value)}
              sx={{ width: "100%" }}
              views={["year", "month", "day"]}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          );
        }}
      />
      {/* <MuiDatePicker
        ref={ref}
        control={control}
        inputFormat="MM/DD/YYYY"
        value={value}
        onChange={(newVal) => setValue(new Date(newVal))}
        views={['year', 'month', 'day']}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            helperText={helperText}
            {...rest}
          />
        )}
      /> */}
      {/* <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DesktopDatePicker
            label={label}
            value={value}
            // minDate={addDays(today, 21)}
            // maxDate={addMonths(addDays(today, 21), 6)}
            onChange={(newValue) => {
            //   if (isValid(newValue)) {
                field.onChange(format(newValue, "MM/dd/yyyy"));
                setValue(newValue);
            //   } else {
            //     console.log(newValue);
            //     setValue(newValue);
            //   }
            }}
            renderInput={(params) => (
              <TextField
                margin="normal"
                helperText={helperText}
                {...params}
                {...rest}
                error={error}
              />
            )}
          />
        )}
      /> */}
    </LocalizationProvider>
  );
});

export default DatePicker;
