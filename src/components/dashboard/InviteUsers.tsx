import useAxiosAuth from "@/hooks/useAxiosAuth";
import useDebounce from "@/hooks/useDebounce";
import { useToast } from "@/providers/ToastProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TypeOf, object, string } from "zod";
import InputField from "../Form/InputField";

interface Props {
  selectedUsers: any;
  setSelectedUsers: React.Dispatch<React.SetStateAction<any>>;
  className?: string;
  label?: string;
  labelClassName?: string;
  isMultiple?: boolean;
  isBrokerInvite?: boolean;
  removeUser?: (email: string) => void;
  placeholder?: string;
}

const InviteUsers: React.FC<Props> = ({
  selectedUsers,
  setSelectedUsers,
  className,
  labelClassName,
  label,
  isMultiple,
  isBrokerInvite,
  removeUser,
  placeholder = "Type to search",
}) => {
  const axiosFetch = useAxiosAuth();
  const toast = useToast();
  const [query, setQuery] = useState("");
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  const { data: users, isLoading } = useQuery(
    ["users", debouncedQuery],
    () => axiosFetch.get(`/user/search?q=${debouncedQuery}`),
    {
      refetchOnWindowFocus: false,
    },
  );

  console.log(selectedUsers);

  return (
    <div className={`flex w-full flex-col text-base gap-2 ${className}`}>
      {label && (
        <label htmlFor={label} className={`font-semibold ${labelClassName}`}>
          {label}
        </label>
      )}

      <Autocomplete
        sx={{ border: "none" }}
        multiple={isMultiple}
        className="bg-white focus:border-none focus:outline-none"
        size="small"
        value={selectedUsers}
        onChange={(event, value) => {
          if (selectedUsers?.length > value?.length) {
            const removedUser = selectedUsers.find(
              (user: any) => !value?.includes(user),
            );
            if (removedUser && removeUser) {
              removeUser(removedUser.email);
            }
          }
          setSelectedUsers(value);
        }}
        options={users?.data?.users || []}
        getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
        loading={isLoading}
        loadingText={<CircularProgress color="inherit" size={20} />}
        onInputChange={(event, value) => setQuery(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              className: "bg-white focus:border-none focus:outline-none",
              placeholder: placeholder,
            }}
          />
        )}
        noOptionsText={
          <div>
            <p className="text-xs text-gray-400">No User Found</p>
            <Button
              onClick={() => setOpenCreateDialog(true)}
              className="bg-primary text-xs font-[400] text-white"
            >
              Invite user
            </Button>
          </div>
        }
      />
      <CreateNewUser
        isBrokerInvite={isBrokerInvite}
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        setSelectedUsers={setSelectedUsers}
      />
    </div>
  );
};

export default InviteUsers;

interface CreateNewUserProps {
  open: boolean;
  onClose: () => void;
  setSelectedUsers: React.Dispatch<React.SetStateAction<any>>;
  isBrokerInvite?: boolean;
}

const CreateNewUser: React.FC<CreateNewUserProps> = ({
  open,
  onClose,
  setSelectedUsers,
  isBrokerInvite,
}) => {
  const organizationSchema = object({
    firstName: string().nonempty("First name is required"),
    lastName: string().nonempty("Last name is required"),
    email: string().email().nonempty("Email is required"),
  });

  const toast = useToast();

  type Metadata = TypeOf<typeof organizationSchema>;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<Metadata>({
    resolver: zodResolver(organizationSchema),
  });

  const onSubmit: SubmitHandler<Metadata> = async (data) => {
    setSelectedUsers((prev) => {
      return Array.isArray(prev) ? [...prev, data] : [data];
    });
    reset();
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>Invite User</DialogTitle>
      <DialogContent className="flex flex-col gap-2" dividers>
        <InputField
          label="First Name"
          id=""
          type="text"
          name="firstName"
          labelClassName="font-[400]"
          inputClassName="bg-secondary w-full"
          fullWidth
          error={!!errors["firstName"]}
          helperText={errors["firstName"] ? errors["firstName"].message : ""}
          control={control}
        />
        <InputField
          label="Last Name"
          id=""
          type="text"
          name="lastName"
          labelClassName="font-[400]"
          inputClassName="bg-secondary w-full"
          fullWidth
          error={!!errors["lastName"]}
          helperText={errors["lastName"] ? errors["lastName"].message : ""}
          control={control}
        />
        <InputField
          label="Email"
          id="email"
          type="email"
          name="email"
          labelClassName="font-[400]"
          inputClassName="bg-secondary w-full"
          fullWidth
          error={!!errors["email"]}
          helperText={errors["email"] ? errors["email"].message : ""}
          control={control}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          className="bg-primary"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          Send Invite
        </Button>
      </DialogActions>
    </Dialog>
  );
};
