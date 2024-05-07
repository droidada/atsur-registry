import React from "react";
import { useForm, Controller, Control } from "react-hook-form";
import { FormControlLabel, Switch } from "@mui/material";

interface Props {
  control: Control<any>;
  name: string;
  defaultValue?: boolean;
  label?: string;
  labelPlacement?: "start" | "end" | "top" | "bottom";
  labelClassName?: string;
  helperText?: string;
  error?: boolean;
}

const SwitchInput: React.FC<Props> = ({
  control,
  name,
  defaultValue,
  label,
  labelPlacement,
  labelClassName,

  helperText,
  error,
}) => {
  return (
    <div className="flex flex-col text-sm gap-1">
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <FormControlLabel
            control={
              <Switch
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
              />
            }
            label={label}
            labelPlacement={labelPlacement || "top"}
            classes={{
              label: `text-sm font-semibold ${labelClassName}`,
            }}
            // componentsProps={ {
            //     typography: {
            //         className: "text-sm",
            //     },
            // }}
          />
        )}
      />
      {helperText && error && (
        <p className="text-xs text-red-500">{helperText}</p>
      )}
    </div>
  );
};

export default SwitchInput;
