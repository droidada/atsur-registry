import React, { useEffect, useState } from "react";
import ArtDetailsAccordionContainer from "../ArtDetailsAccordionContainer";
import { object, string, TypeOf, boolean } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  SubmitHandler,
  Controller,
  Control,
  FieldErrors,
} from "react-hook-form";
import DatePicker from "@/components/common/datepicker";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import { useMutation } from "@tanstack/react-query";
import FormDialogContainer from "../FormDialogContainer";
import InputField from "@/components/Form/InputField";
import DateInput from "@/components/Form/DateInput";
import SwitchInput from "@/components/Form/SwitchInput";
import { useRouter } from "next/router";
import LocationTable from "./LocationTable";

interface Props {
  locations: any[];
  artpieceId: string;
}
const ArtPieceLocation: React.FC<Props> = ({ locations, artpieceId }) => {
  const [open, setOpen] = useState(false);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const toast = useToast();
  const [currentLocation, setCurrentLocation] = useState<any>(null);

  const locationSchema = object({
    name: string().nonempty("Name is required"),
    address: string().nonempty("Address  is required"),
    isCurrentLocation: boolean().optional(),
    startDate: string().nonempty("Start date is required"),
    endDate: string().nonempty("End Date is required"),
    notes: string(),
  });

  type LocationInput = TypeOf<typeof locationSchema>;

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    control,
    setValue,
  } = useForm<LocationInput>({
    resolver: zodResolver(locationSchema),
  });

  const {
    isLoading,
    error,
    isError,
    isSuccess,
    mutate: submit,
  } = useMutation({
    mutationFn: (data: any) =>
      currentLocation
        ? axiosAuth.post(`/location/update`, data)
        : axiosAuth.post(`/location/add`, data),
    onSuccess: () => {
      setOpen(false);
      // toast.success(
      //   `Location ${currentLocation ? "updated" : "added"} successfully.`,
      // );
      reset();
      router.replace(router.asPath);
    },
    onError: (error) => {
      const errorMessage =
        // @ts-ignore
        error.response?.data?.message ||
        `An error occurred while  ${
          currentLocation ? "updating" : "adding"
        }  the location.`;
      toast.error(errorMessage);
    },
  });

  const onSubmitHandler: SubmitHandler<LocationInput> = async (values) => {
    //@ts-ignore
    submit({
      ...values,
      artPieceId: artpieceId,
      locationId: currentLocation?._id,
    });
  };

  console.log(currentLocation);
  useEffect(() => {
    setValue("name", currentLocation?.name || "");
    setValue("address", currentLocation?.address || "");
    setValue("isCurrentLocation", currentLocation?.isCurrentLocation || false);
    setValue("startDate", currentLocation?.startDate || "");
    setValue("endDate", currentLocation?.endDate || "");
    setValue("notes", currentLocation?.note || "");
  }, [currentLocation]);

  return (
    <ArtDetailsAccordionContainer
      onClick={() => setOpen(true)}
      title={"Locations"}
    >
      <>
        {locations?.length > 0 && (
          <LocationTable
            setOpenDialog={setOpen}
            setCurrentLocation={setCurrentLocation}
            locations={locations}
            artpieceId={artpieceId}
          />
        )}
      </>
      <FormDialogContainer
        onSubmit={handleSubmit(onSubmitHandler)}
        title="Location"
        open={open}
        isLoading={isLoading}
        handleClose={() => {
          setCurrentLocation(null);
          setOpen(false);
        }}
      >
        <FormDataComponent control={control} errors={errors} />
      </FormDialogContainer>
    </ArtDetailsAccordionContainer>
  );
};

export default ArtPieceLocation;

interface FormDataProps {
  errors: FieldErrors<{
    name?: string;
    address?: string;
    isCurrentLocation?: boolean;
    startDate?: string;
    endDate?: string;
    notes?: string;
  }>;
  control: Control<
    {
      name?: string;
      address?: string;
      isCurrentLocation?: boolean;
      startDate?: string;
      endDate?: string;
      notes?: string;
    },
    any
  >;
}

const FormDataComponent: React.FC<FormDataProps> = ({ control, errors }) => {
  return (
    <div className="py-6 flex-col flex gap-4">
      <InputField
        label="Name"
        id="name"
        placeholder=""
        name="name"
        inputClassName="bg-secondary-white"
        tabIndex={2}
        aria-required="true"
        fullWidth
        error={!!errors["name"]}
        helperText={errors["name"] ? errors["name"].message : ""}
        control={control}
      />
      <InputField
        label="Address"
        id="address"
        placeholder=""
        name="address"
        inputClassName="bg-secondary-white"
        tabIndex={2}
        aria-required="true"
        fullWidth
        error={!!errors["address"]}
        helperText={errors["address"] ? errors["address"].message : ""}
        control={control}
      />
      <div className="flex items-start gap-4">
        <DateInput
          id="startDate"
          label="Start Date"
          name="startDate"
          control={control}
          helperText={errors["startDate"] ? errors["startDate"].message : ""}
          error={!!errors["startDate"]}
        />
        <DateInput
          id="endDate"
          label="End Date"
          name="endDate"
          control={control}
          helperText={errors["endDate"] ? errors["endDate"].message : ""}
          error={!!errors["endDate"]}
        />
        <SwitchInput
          label="Current Location?"
          name="isCurrentLocation"
          control={control}
          error={!!errors["isCurrentLocation"]}
          helperText={
            errors["isCurrentLocation"]
              ? errors["isCurrentLocation"].message
              : ""
          }
        />
      </div>

      <InputField
        label="Notes"
        multiline
        id="notes"
        placeholder=""
        name="notes"
        inputClassName="bg-secondary-white"
        tabIndex={2}
        rows={4}
        aria-required="true"
        fullWidth
        error={!!errors["notes"]}
        helperText={errors["notes"] ? errors["notes"].message : ""}
        control={control}
      />
    </div>
  );
};
