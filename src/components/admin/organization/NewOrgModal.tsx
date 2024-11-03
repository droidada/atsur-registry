import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/Form/InputField";
import SelectField from "@/components/Form/SelectField";
import { useMutation } from "@tanstack/react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import LoadingButton from "@/components/Form/LoadingButton";

const createOrganizationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must not exceed 200 characters"),
  email: z.string().email("Invalid email format"),
  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .max(100, "Country must not exceed 100 characters"),
  type: z.enum(["gallery", "museum", "other"], {
    required_error: "Please select an organization type",
  }),
});

interface Props {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}
const CreateOrganizationModal: React.FC<Props> = ({
  open,
  onClose,
  refetch,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: "",
      address: "",
      email: "",
      country: "",
      type: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const axiosAuth = useAxiosAuth();
  const toast = useToast();

  const { isLoading, mutate } = useMutation({
    mutationFn: (data) => axiosAuth.post(`/org/admin`, data),
    onSuccess: () => {
      toast.success("Organization created successfully!");
      refetch();
      handleClose();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    },
  });

  const onSubmitForm = async (data) => {
    mutate(data);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      className="rounded-lg"
    >
      <DialogTitle className="flex justify-between items-center bg-gray-50 border-b">
        <span className="text-xl font-semibold">Create New Organization</span>
        <IconButton
          onClick={handleClose}
          size="small"
          className="text-gray-500 hover:text-gray-700"
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmitForm)}>
        <DialogContent className=" py-6">
          <InputField
            label="Name"
            id="name"
            placeholder=""
            name="name"
            aria-required="true"
            fullWidth
            error={!!errors["name"]}
            helperText={errors["name"] ? errors["name"].message : ""}
            control={control}
            inputClassName="bg-secondary"
          />

          <InputField
            label="Email"
            id="email"
            type="email"
            placeholder=""
            name="email"
            aria-required="true"
            fullWidth
            error={!!errors["email"]}
            helperText={errors["email"] ? errors["email"].message : ""}
            control={control}
            inputClassName="bg-secondary"
          />

          <InputField
            label="Address"
            id="address"
            placeholder=""
            name="address"
            multiline
            rows={3}
            aria-required="true"
            fullWidth
            error={!!errors["address"]}
            helperText={errors["address"] ? errors["address"].message : ""}
            control={control}
            inputClassName="bg-secondary"
          />
          <InputField
            label="Country"
            id="country"
            placeholder=""
            name="country"
            aria-required="true"
            fullWidth
            error={!!errors["country"]}
            helperText={errors["country"] ? errors["country"].message : ""}
            control={control}
            inputClassName="bg-secondary"
          />

          <SelectField
            label="Type"
            name="type"
            // @ts-ignore
            sx={{
              "& fieldset": {
                background: "#DCDCDC",
                border: "none",
                color: "black",
              },
            }}
            control={control}
            fullWidth
            helperText={errors["type"] ? errors["type"].message : ""}
            error={!!errors["type"]}
          >
            {["gallery", "museum", "other"].map((item) => (
              <MenuItem key={item} value={item} className="text-xm capitalize">
                {item}
              </MenuItem>
            ))}
          </SelectField>
        </DialogContent>

        <DialogActions className="bg-gray-50 border-t p-4">
          <Button
            onClick={handleClose}
            variant="outlined"
            className="text-gray-600 border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            disabled={isLoading}
            loading={isLoading}
            className="bg-primary text-white"
          >
            Create Organization
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateOrganizationModal;
