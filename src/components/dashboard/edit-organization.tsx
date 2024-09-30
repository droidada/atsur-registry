import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useAuthContext } from "@/providers/auth.context";
import { object, string, number, TypeOf } from "zod";
import { Dialog, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { useToast } from "@/providers/ToastProvider";
import LoadingButton from "../Form/LoadingButton";

interface Props {
  open: boolean;
  handleClose: any;
  organization: any;
}

const EditOrganization: React.FC<Props> = ({
  open,
  handleClose,
  organization,
}) => {
  const axiosAuth = useAxiosAuth();
  const orgSchema = object({
    name: string().nonempty("Name is required"),
    address: string().nonempty("Address is required"),
    email: string().nonempty("Email is required"),
    country: string().nonempty("Country is required"),
    phone: string(),
    website: string(),
    // type: string(),
  });
  const toast = useToast();

  type OrgInput = TypeOf<typeof orgSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    setValue,
    handleSubmit,
  } = useForm<OrgInput>({
    resolver: zodResolver(orgSchema),
  });

  useEffect(() => {
    setValue("name", organization?.name || "");
    setValue("address", organization?.address || "");
    setValue("email", organization?.email || "");
    setValue("phone", organization?.phone || "");
    setValue("country", organization?.country || "");
    setValue("website", organization?.website || "");
  }, [organization, setValue]);

  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitHandler: SubmitHandler<OrgInput> = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", previewImg);
      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("country", values.country);
      formData.append("website", values.website);
      formData.append("organizationId", organization?._id);

      const result = await axiosAuth.post("/org/update", formData);
      router.replace(router.asPath);
      handleClose();
      return;
    } catch (error) {
      setError(true);
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      //   this.setState({
      //     previewImg: [reader.result]
      //   });
      setPreviewImg(reader.result);
    }.bind(this);

    // this.setState({
    //   mainState: "uploaded",
    //   selectedFile: event.target.files[0],
    //   imageUploaded: 1
    // });
    // setPreviewImg(event.target.files[0]);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="widget-edit mb-30 profile">
        <div className="title to-white">
          <h4>Edit Organization</h4>
          <i className="icon-keyboard_arrow_up" />
        </div>
        <div className="wrap-upload">
          <form action="#" className="h-full">
            <label className="uploadfile h-full flex items-center justify-center">
              <div className="text-center flex flex-col items-center justify-center">
                {previewImg ? (
                  <Image
                    width={200}
                    height={200}
                    alt=""
                    className="h-full"
                    src={previewImg}
                  />
                ) : (
                  <Image
                    width={200}
                    height={200}
                    src={
                      organization?.image ||
                      "/assets/images/box-icon/upload.png"
                    }
                    alt=""
                  />
                )}

                <h5 className="text-white">Upload file</h5>
                <p className="text">Drag or choose your file to upload</p>
                <div className="text filename to-white">
                  PNG, GIF, WEBP, MP4 or MP3.Max 1Gb.
                </div>
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  multiple
                  onChange={handleUploadClick}
                />
              </div>
            </label>
          </form>
        </div>
        <div className="wrap-content w-full">
          {error && <h5 style={{ color: "red" }}>{error}</h5>}
          <form
            id="create-org"
            className="create-org-form"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <fieldset className="name">
              <label className="to-white">Name *</label>
              <TextField
                type="text"
                id="name"
                placeholder="Hanson Morgan Gallery of Arts"
                name="name"
                tabIndex={2}
                defaultValue={organization?.name || ""}
                aria-required="true"
                fullWidth
                error={!!errors["name"]}
                helperText={errors["name"] ? errors["name"].message : ""}
                {...register("name")}
              />
            </fieldset>
            <fieldset className="message">
              <label className="to-white">Address *</label>
              <TextField
                id="address"
                name="address"
                type="text"
                placeholder="11 Park Avenue Way, Kinchase *"
                tabIndex={2}
                aria-required="true"
                defaultValue={organization?.address || ""}
                fullWidth
                error={!!errors["address"]}
                helperText={errors["address"] ? errors["address"].message : ""}
                {...register("address")}
              />
            </fieldset>
            <div className="flex gap30">
              <fieldset className="price">
                <label className="to-white">Country *</label>
                <TextField
                  type="text"
                  id="country"
                  placeholder="Canada"
                  name="country"
                  defaultValue={organization?.country || ""}
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  error={!!errors["country"]}
                  helperText={
                    errors["country"] ? errors["country"].message : ""
                  }
                  {...register("country")}
                />
              </fieldset>
              <fieldset className="properties">
                <label className="to-white">Email *</label>
                <TextField
                  type="text"
                  id="email"
                  defaultValue={organization?.email || ""}
                  placeholder="hello@gmail.com"
                  name="email"
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  error={!!errors["email"]}
                  helperText={errors["email"] ? errors["email"].message : ""}
                  {...register("email")}
                />
              </fieldset>
            </div>

            <div className="flex gap30">
              <fieldset className="price">
                <label className="to-white">Phone</label>
                <TextField
                  type="text"
                  id="phone"
                  placeholder="+22482983892"
                  name="phone"
                  tabIndex={2}
                  defaultValue={organization?.phone || ""}
                  fullWidth
                  error={!!errors["phone"]}
                  helperText={errors["phone"] ? errors["phone"].message : ""}
                  {...register("phone")}
                />
              </fieldset>
              <fieldset className="properties">
                <label className="to-white">Website</label>
                <TextField
                  type="text"
                  id="website"
                  placeholder="https://www.gallery.com"
                  name="website"
                  fullWidth
                  tabIndex={2}
                  defaultValue={organization?.website || ""}
                  error={!!errors["website"]}
                  helperText={
                    errors["website"] ? errors["website"].message : ""
                  }
                  {...register("website")}
                />
              </fieldset>
            </div>

            <div className="btn-submit flex gap30 justify-center px-2">
              <Button
                onClick={handleClose}
                className="tf-button style-1 h50"
                type="reset"
              >
                Close
                <i className="icon-arrow-up-right2" />
              </Button>
              <LoadingButton
                className="tf-button style-1 h50"
                loading={loading}
                type="submit"
              >
                Update
                <i className="icon-arrow-up-right2" />
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default EditOrganization;
