import React from "react";
import { useForm, Controller, Control } from "react-hook-form";
import { FormControlLabel, IconButton, Switch, Tooltip } from "@mui/material";
import { GoInfo } from "react-icons/go";

interface Props {
  control: Control<any>;
  name: string;
  defaultValue?: boolean;
  label?: string;
  labelPlacement?: "start" | "end" | "top" | "bottom";
  labelClassName?: string;
  helperText?: string;
  error?: boolean;
  className?: string;
  hasInfo?: boolean;
  info?: string;
}

const SwitchInput: React.FC<Props> = ({
  control,
  name,
  defaultValue,
  label,
  labelPlacement,
  labelClassName,
  className,
  helperText,
  error,
  hasInfo,
  info,
}) => {
  return (
    <div className={`flex flex-col text-sm gap-1 ${className}`}>
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
            label={
              <>
                {label}{" "}
                {hasInfo && (
                  <Tooltip title={info}>
                    <IconButton className="w-fit h-fit">
                      <GoInfo />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            }
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
