import React, { useEffect, useState } from "react";

import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useAuthContext } from "@/providers/auth.context";
import { LoadingButton } from "@mui/lab";
import { object, string, number, TypeOf } from "zod";
import { Dialog, MenuItem, Select, TextField } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SnackBarAlert from "../common/SnackBarAlert";
import axios from "axios";

interface Props {
  open: boolean;
  handleClose: any;
  collection: any;
}

const EditCollection: React.FC<Props> = ({ open, handleClose, collection }) => {
  const axiosAuth = useAxiosAuth();
  const collectionSchema = object({
    title: string().nonempty("Title is required"),
    type: string().nonempty("Type is required"),
    description: string(),
  });

  type collectionInput = TypeOf<typeof collectionSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    setValue,
    handleSubmit,
  } = useForm<collectionInput>({
    resolver: zodResolver(collectionSchema),
  });

  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setValue("title", collection.title || "");
    setValue("description", collection.description || "");
    setValue("type", collection.type || "");
  }, [collection, setValue]);

  const onSubmitHandler: SubmitHandler<collectionInput> = async (values) => {
    try {
      setLoading(true);
      console.log(values);
      const formData = new FormData();
      formData.append("image", previewImg);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("type", values.type);
      formData.append("collectionId", collection._id);

      const result = await axiosAuth.post("/collection/update", formData);

      setLoading(false);
      router.replace(router.asPath);
      handleClose();
      return;
    } catch (error) {
      setError(false);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong");
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
    console.log(url);
    setPreviewImg(event.target.files[0]);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="widget-edit mb-30 profile">
        <div className="title to-white">
          <h4>Information</h4>
          <i className="icon-keyboard_arrow_up" />
        </div>
        <div className="wrap-content w-full">
          <form
            id="create-org"
            className="create-org-form"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <fieldset className="name">
              <label className="to-white">Title *</label>
              <TextField
                type="text"
                id="title"
                placeholder="Hanson Morgan Gallery of Arts"
                name="title"
                tabIndex={2}
                aria-required="true"
                defaultValue={collection.title}
                fullWidth
                error={!!errors["title"]}
                helperText={errors["title"] ? errors["title"].message : ""}
                {...register("title")}
              />
            </fieldset>
            <div className="wrap-upload">
              <form action="#" className="h-full">
                <label className="uploadfile h-full flex items-center justify-center">
                  <div className="text-center flex flex-col items-center justify-center">
                    {previewImg ? (
                      <Image
                        alt=""
                        width={200}
                        height={200}
                        className="h-full"
                        src={previewImg}
                      />
                    ) : (
                      <Image
                        width={200}
                        height={200}
                        src={
                          (collection?.image == "null"
                            ? ""
                            : collection?.image) ||
                          "/assets/images/box-icon/upload.png"
                        }
                        alt=""
                      />
                    )}

                    <h5 className="text-white">Upload Image</h5>
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
            <fieldset className="message">
              <label className="to-white">Description</label>
              <TextField
                id="description"
                name="description"
                type="text"
                placeholder="11 Park Avenue Way, Kinchase *"
                defaultValue={collection?.description}
                tabIndex={2}
                multiline
                rows={3}
                fullWidth
                error={!!errors["description"]}
                helperText={
                  errors["description"] ? errors["description"].message : ""
                }
                {...register("description")}
              />
            </fieldset>
            <div className="flex gap30">
              <fieldset className="type">
                <label className="to-white">Type *</label>
                <Select
                  className="select"
                  tabIndex={2}
                  name="type"
                  id="type"
                  defaultValue={collection?.type}
                  fullWidth
                  error={!!errors["type"]}
                  {...register("type")}
                  // defaultValue={exhibition.showingType}
                >
                  <MenuItem>Select</MenuItem>
                  <MenuItem value="artwork">Art Work</MenuItem>
                  <MenuItem value="artifact">Artifact</MenuItem>
                  <MenuItem value="mixed">Mixed</MenuItem>
                  <MenuItem value="curated">Curated</MenuItem>
                  <MenuItem value="artist">Artist</MenuItem>
                </Select>
              </fieldset>
            </div>

            <div className="btn-submit flex gap30 justify-center">
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

export default EditCollection;
