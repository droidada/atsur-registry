import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Select,
  Divider,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import useAxiosAuth from "@/hooks/useAxiosAuth";

export default function EditPublication({
  open,
  handleClose,
  artPieceId,
  publication = {},
}) {
  const publicationSchema = object({
    appraiser: string().nonempty("Appraiser is required"),
    appraiserEmail: string().nonempty("Appraiser email is required"),
    value: string().nonempty("Value is required"),
    currency: string().nonempty("Currency is required"),
    appraiserWebsite: string(),
    attachmentCaption: string(),
    notes: string(),
  });

  type publicationInput = TypeOf<typeof publicationSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<publicationInput>({
    resolver: zodResolver(publicationSchema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [publicationImg, setPublicationImg] = useState(null);
  const axiosAuth = useAxiosAuth();

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isSubmitSuccessful]);

  useEffect(() => {
    setError(false);
    // setSuccess(false);
  }, []);

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
        setPublicationImg(reader.result);
    }.bind(this);
    console.log(url); // Would see a path?
  };

  const onSubmitHandler: SubmitHandler<publicationInput> = async (values) => {
    try {
      console.log("submitting here.....");
      console.log(values);

      const formData = new FormData();
      formData.append("attachment", publicationImg);
      formData.append("artPieceId", artPieceId);
      formData.append("appraiser", values.appraiser);
      formData.append("appraiserEmail", values.appraiserEmail);
      formData.append("appraiserWebsite", values.appraiserWebsite);
      formData.append("value", values.value);
      formData.append("currency", values.currency);
      // formData.append("attachment", values.attachment);
      formData.append("attachmentCaption", values.attachmentCaption);
      formData.append("notes", values.notes);

      const result = await axiosAuth.post(`/art-piece/add-publication`, formData);
      console.log("result here is ", result.data);
      handleClose();
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <form
          className="comment-form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <DialogTitle>
            <h2 className="items-center justify-center">publication</h2>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <fieldset className="appraiser">
              <label className="to-white">Name *</label>
              <TextField
                type="text"
                id="appraiser"
                placeholder="Dr. Charles Withford"
                name="appraiser"
                tabIndex={2}
                aria-required="true"
                fullWidth
                error={!!errors["appraiser"]}
                helperText={
                  errors["appraiser"] ? errors["appraiser"].message : ""
                }
                {...register("appraiser")}
              />
            </fieldset>
            <div className="flex gap30">
              <fieldset className="appraiserEmail">
                <label className="to-white">Email *</label>
                <TextField
                  type="text"
                  id="appraiserEmail"
                  placeholder="charles@gmail.com"
                  name="appraiserEmail"
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  error={!!errors["appraiserEmail"]}
                  helperText={
                    errors["appraiserEmail"]
                      ? errors["appraiserEmail"].message
                      : ""
                  }
                  {...register("appraiserEmail")}
                />
              </fieldset>
              <fieldset className="appraiserWebsite">
                <label className="to-white">Website</label>
                <TextField
                  type="text"
                  id="appraiserWebsite"
                  placeholder="https://www.drcharles.org"
                  name="appraiserWebsite"
                  tabIndex={2}
                  fullWidth
                  error={!!errors["appraiserWebsite"]}
                  helperText={
                    errors["appraiserWebsite"]
                      ? errors["appraiserWebsite"].message
                      : ""
                  }
                  {...register("appraiserWebsite")}
                />
              </fieldset>
            </div>
            <div className="flex gap30">
              <fieldset>
                <label className="uploadfile h-full flex items-center justify-center">
                  <div className="text-center flex flex-col items-center justify-center">
                    {publicationImg ? (
                      <img className="h-full" src={publicationImg} />
                    ) : (
                      <>
                        <img src="assets/images/box-icon/upload.png" alt="" />
                        {/* <h5 className="text-white">Image</h5> */}
                        <p className="text">
                          Drag or choose attachment to upload
                        </p>
                        <h6 className="text to-gray">PDF, JPEG.. Max 10Mb.</h6>
                      </>
                    )}
                    <input
                      type="file"
                      name="attachment"
                      accept="pdf,image/*"
                      multiple
                      onChange={handleUploadClick}
                    />
                  </div>
                </label>
              </fieldset>
              <fieldset className="value">
                <label className="to-white">Caption</label>
                <TextField
                  type="text"
                  id="attachmentCaption"
                  placeholder="publication document"
                  name="attachmentCaption"
                  tabIndex={2}
                  fullWidth
                  error={!!errors["attachmentCaption"]}
                  helperText={
                    errors["attachmentCaption"]
                      ? errors["attachmentCaption"].message
                      : ""
                  }
                  {...register("attachmentCaption")}
                />
              </fieldset>
            </div>
            <div className="flex gap30">
              <fieldset className="value">
                <label className="to-white">Value *</label>
                <TextField
                  type="number"
                  id="value"
                  placeholder="200"
                  name="value"
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  error={!!errors["value"]}
                  helperText={errors["value"] ? errors["value"].message : ""}
                  {...register("value")}
                />
              </fieldset>
              <fieldset className="currency">
                <label className="to-white">Currency *</label>
                <Select
                  className="select"
                  tabIndex={2}
                  name="currency"
                  id="currency"
                  fullWidth
                  error={!!errors["currency"]}
                  {...register("currency")}
                >
                  <MenuItem>Select</MenuItem>
                  <MenuItem value="usd">USD</MenuItem>
                  <MenuItem value="pounds">Pounds</MenuItem>
                </Select>
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
            <Button className="tf-button style-1" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
