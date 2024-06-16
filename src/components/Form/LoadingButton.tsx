import { Button } from "@mui/material";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
  variant?: "contained" | "outlined" | "text" | undefined;
  loading: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loadingText?: string;
  children?: React.ReactNode;
  title?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

const LoadingButton: React.FC<Props> = ({
  variant,
  loading,
  className,
  onClick,
  disabled,
  startIcon,
  endIcon,
  loadingText,
  children,
  title,
  type,
}) => {
  return (
    <Button
      type={type}
      startIcon={loading ? null : startIcon}
      endIcon={loading ? null : endIcon}
      variant={variant}
      className={` ${className} ${
        loading && "flex items-center justify-center"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin" />
      ) : title ? (
        title
      ) : children ? (
        children
      ) : (
        ""
      )}
    </Button>
  );
};

export default LoadingButton;
