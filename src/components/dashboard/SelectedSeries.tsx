import useAxiosAuth from "@/hooks/useAxiosAuth";
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
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TypeOf, object, string } from "zod";
import InputField from "../Form/InputField";
import VerificationFileDroper from "./artwork/Verification/VerificationFileDroper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosAuth } from "@/lib/axios";
import useDebounce from "@/hooks/useDebounce";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
  setSelectedSeries: React.Dispatch<React.SetStateAction<any>>;
  selectedSeries: any;
  className?: string;
  label?: string;
  labelClassName?: string;
}
const SelectedSeries: React.FC<Props> = ({
  setSelectedSeries,
  selectedSeries,
  className,
  label,
  labelClassName,
}) => {
  const axiosFetch = useAxiosAuth();
  const toast = useToast();

  const [query, setQuery] = useState("");
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  const {
    data: series,
    isLoading,
    isError,
  } = useQuery(
    ["organization", debouncedQuery],
    () => axiosFetch.get(`/art-series?q=${debouncedQuery}`),

    {
      refetchOnWindowFocus: false,
      // enabled: debouncedQuery.length > 0,
      // staleTime: 1000 * 60 * 60 * 24,
    },
  );

  console.log(series);

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
        loadingText={<CircularProgress color="inherit" size={20} />}
        value={selectedSeries}
        onChange={(event, value) => {
          console.log("selected seried here ", value);
          setSelectedSeries(value?._id);
        }}
        options={series?.data?.data || []}
        getOptionLabel={(option) => {
          console.log(option);
          return option?.title || "";
        }}
        loading={isLoading}
        onInputChange={(event, value) => setQuery(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              className: "bg-white focus:border-none focus:outline-none",
              placeholder: "Search for the series",
            }}
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
        noOptionsText={
          <div>
            <p className="text-xs text-gray-400">
              You have no artwork series yet
            </p>
            <Button
              onClick={() => setOpenCreateDialog(true)}
              className="bg-primary text-xs font-[400] text-white"
            >
              Create a new one
            </Button>
          </div>
        }
      />

      <CreateNewSeries
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        setSelectedSeries={setSelectedSeries}
      />
    </div>
  );
};

export default SelectedSeries;

interface CreateNewSeriesProps {
  open: boolean;
  onClose: () => void;
  setSelectedSeries: React.Dispatch<React.SetStateAction<any>>;
}

const CreateNewSeries: React.FC<CreateNewSeriesProps> = ({
  open,
  onClose,
  setSelectedSeries,
}) => {
  const organizationSchema = object({
    title: string(),
    description: string(),
  });

  const [file, setFile] = useState<{
    url: string | ArrayBuffer;
    filename: string;
  }>(null);

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

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => axiosAuth.post("/art-series/", data),
    onSuccess: (data) => {
      console.log("This is the data", data);
      setSelectedSeries({
        ...data?.data,
      });
      toast.success("Series created successfully");
      onClose();
      setFile(null);
      reset();
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message || error.message || "Something went wrong",
      );
    },
  });

  const onSubmit: SubmitHandler<Metadata> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    //  @ts-ignore
    file?.url && formData.append("image", file?.url);
    // @ts-ignore
    mutate(formData);
  };

  const handleUploadClick = async (files) => {
    const fileDoc = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(fileDoc.file);
    reader.onload = () => {
      setFile({
        url: reader.result,
        filename: fileDoc.name,
      });
    };
  };

  console.log(file);
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
      <DialogTitle>Create New Series </DialogTitle>
      <DialogContent className="flex flex-col gap-2" dividers>
        <InputField
          label="Title"
          id=""
          type="text"
          placeholder=""
          name="title"
          labelClassName="font-thin"
          inputClassName="bg-secondary w-full  "
          aria-required={true}
          fullWidth
          error={!!errors["title"]}
          helperText={errors["title"] ? errors["title"].message : ""}
          control={control}
        />
        <InputField
          label="Description"
          id="description"
          type="text"
          placeholder=""
          name="description"
          labelClassName="font-thin"
          inputClassName="bg-secondary w-full  "
          aria-required={true}
          multiline
          rows={4}
          fullWidth
          error={!!errors["description"]}
          helperText={
            errors["description"] ? errors["description"].message : ""
          }
          control={control}
        />

        <VerificationFileDroper
          className="w-full"
          accept="image/*"
          maxSize={10 * 1024 * 1024}
          desc="Drag or choose your image to upload (Max 10MB)"
          label="Image"
          fileName={file?.filename}
          handleUpload={handleUploadClick}
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
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            "Create"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
