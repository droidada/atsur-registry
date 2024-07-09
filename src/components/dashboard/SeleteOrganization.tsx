import useAxiosAuth from "@/hooks/useAxiosAuth";
import useDebounce from "@/hooks/useDebounce";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { object, string, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "../Form/InputField";
import { useToast } from "@/providers/ToastProvider";

interface Props {
  setSelectedOrg: React.Dispatch<React.SetStateAction<any>>;
  selectedOrg: any;
  defaultValues?: any;
  isUserOrg?: boolean;
  className?: string;
  sx?: React.CSSProperties;
  label?: string;
  labelClassName?: string;
}

const SeletectOrganization: React.FC<Props> = ({
  selectedOrg,
  setSelectedOrg,
  isUserOrg,
  className,
  sx,
  label,
  labelClassName,
}) => {
  const axiosFetch = useAxiosAuth();
  const [inviteOrg, setInviteOrg] = useState(false);
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading, isError } = useQuery(
    ["organization", debouncedQuery],
    () =>
      isUserOrg
        ? axiosFetch
            .get(`/org/my-organizations?q=${debouncedQuery}`)
            .then((res) => res.data)
        : axiosFetch.get(`/org/list?q=${debouncedQuery}`),
    {
      // enabled: debouncedQuery.length > 0,
      // staleTime: 1000 * 60 * 60 * 24,
    },
  );

  console.log(data?.data);

  return (
    <div className={`flex w-full flex-col text-base gap-2 ${className}`}>
      {label && (
        <label htmlFor={label} className={` font-semibold ${labelClassName}`}>
          {label}
        </label>
      )}

      <Autocomplete
        className="h-[40px] bg-white focus:border-none focus:outline-none"
        ListboxProps={{
          className: " bg-white focus:border-none focus:outline-none",
        }}
        value={selectedOrg}
        onChange={(event, value) => setSelectedOrg(value)}
        options={data?.data?.data || data?.data || []}
        getOptionLabel={(option) => option?.name || ""}
        loading={isLoading}
        loadingText={<CircularProgress color="inherit" size={20} />}
        onInputChange={(event, value) => setQuery(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              className: "bg-white focus:border-none focus:outline-none",
            }}
            InputProps={{
              ...params.InputProps,
              // endAdornment: (
              //   <>
              //     {isLoading ? (
              //       <CircularProgress
              //         color="inherit"
              //         size={20}
              //         style={{ marginLeft: 10 }}
              //       />
              //     ) : null}
              //     {params.InputProps.endAdornment}
              //   </>
              // ),
            }}
          />
        )}
        noOptionsText={
          <div>
            <p className="text-xs text-gray-400">No Organization Found</p>
            <Button
              onClick={() => setInviteOrg(true)}
              className="bg-primary text-xs font-[400] text-white"
            >
              Invite Organization
            </Button>
          </div>
        }
      />

      <AddOrganization
        setSelectedOrg={setSelectedOrg}
        open={inviteOrg}
        onClose={() => setInviteOrg(false)}
      />
    </div>
  );
};

export default SeletectOrganization;

interface AddOrganizationProps {
  open: boolean;
  onClose: () => void;
  setSelectedOrg: React.Dispatch<React.SetStateAction<any>>;
}

const AddOrganization: React.FC<AddOrganizationProps> = ({
  open,
  onClose,
  setSelectedOrg,
}) => {
  const organizationSchema = object({
    email: string().email(),
    name: string(),
    address: string(),
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
    setSelectedOrg({
      name: data.name,
      email: data.email,
    });
    onClose();
    reset();
    toast.success("Organization Added Successfully");
  };

  return (
    <Dialog
      PaperComponent={Paper}
      PaperProps={{
        component: "div",

        noValidate: true,
      }}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Invite Organization</DialogTitle>
      <DialogContent className="flex flex-col gap-2" dividers>
        <InputField
          label="Email"
          id="email"
          type="email"
          placeholder=""
          name="email"
          labelClassName="font-thin"
          inputClassName="bg-secondary w-full  "
          aria-required={true}
          fullWidth
          error={!!errors["email"]}
          helperText={errors["email"] ? errors["email"].message : ""}
          control={control}
        />
        <InputField
          label="Organization Name"
          id="name"
          type="text"
          placeholder=""
          name="name"
          labelClassName="font-thin"
          inputClassName="bg-secondary w-full  "
          aria-required={true}
          fullWidth
          error={!!errors["name"]}
          helperText={errors["name"] ? errors["name"].message : ""}
          control={control}
        />
        <InputField
          label="Organization Address"
          id="address"
          type="text"
          placeholder=""
          name="address"
          labelClassName="font-thin"
          inputClassName="bg-secondary w-full  "
          aria-required={true}
          fullWidth
          error={!!errors["address"]}
          helperText={errors["address"] ? errors["address"].message : ""}
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
        >
          Send Invitation
        </Button>
      </DialogActions>
    </Dialog>
  );
};
