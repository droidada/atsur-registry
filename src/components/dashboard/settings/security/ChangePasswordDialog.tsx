import InputField from "@/components/Form/InputField";
import LoadingButton from "@/components/Form/LoadingButton";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { TypeOf, object, string } from "zod";

interface Props {
  open: boolean;
  handleClose: () => void;
}
const ChangePasswordDialog: React.FC<Props> = ({ open, handleClose }) => {
  const changePasswordSchema = object({
    oldPassword: string().nonempty("Old Password is required"),
    newPassword: string()
      .nonempty("New Password is required")
      .min(8, "New Password must be more than 8 characters")
      .max(32, "NewPassword must be less than 32 characters"),
    confirmPassword: string().nonempty("Confirm password is required"),
  }).refine(
    (values) => {
      return values.newPassword === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    },
  );

  const { mutate } = useMutation({});

  type ChangePasswordInput = TypeOf<typeof changePasswordSchema>;

  const {
    formState: { errors, isSubmitSuccessful, isLoading },
    reset,
    setValue,
    control,
    handleSubmit,
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  return (
    <Dialog
      maxWidth="md"
      PaperComponent={Paper}
      PaperProps={{
        component: "form",
      }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent dividers>
        <InputField
          hasBorder
          labelClassName="text-xs"
          label="Old Password"
          type="password"
          id="oldPassword"
          placeholder="Min. 8 character"
          name="oldPassword"
          tabIndex={2}
          aria-required="true"
          fullWidth
          error={!!errors["oldPassword"]}
          helperText={
            errors["oldPassword"] ? errors["oldPassword"].message : ""
          }
          control={control}
        />
        <InputField
          hasBorder
          labelClassName="text-xs"
          label="New Password"
          type="password"
          id="newPassword"
          placeholder="Min. 8 character"
          name="newPassword"
          tabIndex={2}
          aria-required="true"
          fullWidth
          error={!!errors["newPassword"]}
          helperText={
            errors["newPassword"] ? errors["newPassword"].message : ""
          }
          control={control}
        />
        <InputField
          hasBorder
          label="Confirm Password"
          labelClassName="text-xs"
          type="password"
          id="confirmPassword"
          placeholder="Min. 8 character"
          name="confirmPassword"
          tabIndex={2}
          aria-required="true"
          fullWidth
          error={!!errors["confirmPassword"]}
          helperText={
            errors["confirmPassword"] ? errors["confirmPassword"].message : ""
          }
          control={control}
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="contained"
          className="bg-primary"
          type="submit"
          loading={isLoading}
        >
          Submit
        </LoadingButton>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
