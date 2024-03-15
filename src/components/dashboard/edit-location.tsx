import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { object, string, TypeOf, boolean } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import DatePicker from "@/components/common/datepicker";
import React, { useEffect, useState } from "react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import SnackBarAlert from "../common/SnackBarAlert";

interface Props {
  open: boolean;
  handleClose: any;
  artPieceId: string;
  location: any;
}

const EditLocation: React.FC<Props> = ({
  open,
  handleClose,
  artPieceId,
  location,
}) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const axiosAuth = useAxiosAuth();

  const locationSchema = object({
    name: string().nonempty("Name is required"),
    address: string().nonempty("Address  is required"),
    isCurrentLocation: boolean(),
    startDate: string().nonempty("Start date is required"),
    endDate: string().nonempty("End Date is required"),
    notes: string(),
  });

  type LocationInput = TypeOf<typeof locationSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    reset,
    handleSubmit,
    control,
    setValue,
  } = useForm<LocationInput>({
    resolver: zodResolver(locationSchema),
  });

  useEffect(() => {
    setValue("name", location?.name || "");
    setValue("address", location?.address || "");
    setValue("isCurrentLocation", location?.isCurrentLocation || "");
    setValue("startDate", location?.startDate || "");
    setValue("endDate", location?.endDate || "");
    setValue("notes", location?.note || "");
  }, [location, setValue]);

  const onSubmitHandler: SubmitHandler<LocationInput> = async (values) => {
    try {
      const result = location
        ? await axiosAuth.post(`/location/update`, {
            ...values,
            locationId: location?._id,
            artPieceId,
          })
        : await axiosAuth.post(`/location/add`, {
            ...values,
            artPieceId,
          });

      reset();
      handleClose();
    } catch (error) {
      setError(true);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response.data?.message);
      } else {
        setErrorMessage("Something went wrong. Please try again");
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form
        className="comment-form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h2 className="items-center justify-center ml-1 p-4">Location</h2>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>

          <fieldset className="name">
            <label className="to-white">Name *</label>
            <TextField
              type="text"
              id="name"
              placeholder="The Grand location"
              name="name"
              tabIndex={2}
              aria-required="true"
              fullWidth
              defaultValue={location?.name}
              error={!!errors["name"]}
              helperText={errors["name"] ? errors["name"].message : ""}
              {...register("name")}
            />
          </fieldset>

          <fieldset className="address">
            <label className="to-white">Address *</label>
            <TextField
              type="text"
              id="address"
              placeholder="Annual showcase for young artist inspirations"
              name="address"
              tabIndex={2}
              aria-required="true"
              fullWidth
              multiline
              defaultValue={location?.address}
              rows={3}
              error={!!errors["address"]}
              helperText={errors["address"] ? errors["address"].message : ""}
              {...register("address")}
            />
          </fieldset>

          <div className="flex gap30">
            <fieldset className="collection">
              <label className="to-white">Start Date</label>
              <DatePicker
                // @ts-ignore
                {...register("startDate", { name: "startDate" })}
                // @ts-ignore
                name="startDate"
                defaultValue={location?.startDate ?? null}
                control={control}
                error={!!errors["startDate"]}
                helperText={
                  errors["startDate"] ? errors["startDate"].message : ""
                }
              />
            </fieldset>
            <fieldset className="collection">
              <label className="to-white">End Date</label>
              <DatePicker
                // @ts-ignore
                {...register("endDate", { name: "endDate" })}
                // @ts-ignore
                defaultValue={location?.endDate ?? null}
                name="endDate"
                control={control}
                error={!!errors["endDate"]}
                helperText={errors["endDate"] ? errors["endDate"].message : ""}
              />
            </fieldset>

            <fieldset className="name">
              <label className="to-white">Is Current Location</label>
              <br />
              <Controller
                name=" isCurrentLocation"
                control={control}
                defaultValue={location?.isCurrentLocation ?? false}
                {...register("isCurrentLocation")}
                render={({ field: { onChange, value } }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={value}
                        onChange={onChange}
                        color="secondary"
                      />
                    }
                    label="Is Current Location"
                  />
                )}
              />
            </fieldset>
          </div>

          <fieldset className="notes">
            <label className="to-white">Notes</label>
            <TextField
              type="text"
              id="notes"
              placeholder="A private publication consult"
              name="notes"
              tabIndex={2}
              multiline
              defaultValue={location?.notes}
              rows={3}
              fullWidth
              error={!!errors["notes"]}
              helperText={errors["notes"] ? errors["notes"].message : ""}
              {...register("notes")}
            />
          </fieldset>
        </DialogContent>
        <DialogActions>
          <Button className="tf-button style-2" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            loading={isSubmitting}
            className="tf-button style-1"
            type="submit"
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </form>

      <SnackBarAlert
        type="error"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={errorMessage}
        open={error}
        onClose={() => setError(false)}
      />
    </Dialog>
  );
};

export default EditLocation;
