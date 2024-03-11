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
}: {
    open: boolean;
    handleClose: any;
    artPieceId: string;
    publication: any;
  }) {
  const publicationSchema = object({
    authorName: string().nonempty("Author name is required"),
    articleName: string().nonempty("Article name is required"),
    publicationName: string().nonempty("Publication name is required"),
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
      formData.append("authorName", values.authorName);
      formData.append("articleName", values.articleName);
      formData.append("publicationName", values.publicationName);
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
            <h2 className="items-center justify-center">Publication</h2>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <fieldset className="authorName">
              <label className="to-white">Name *</label>
              <TextField
                type="text"
                id="authorName"
                placeholder="Dr. Charles Withford"
                name="authorName"
                tabIndex={2}
                defaultValue={publication?.authorName}
                aria-required="true"
                fullWidth
                error={!!errors["authorName"]}
                helperText={
                  errors["authorName"] ? errors["authorName"].message : ""
                }
                {...register("authorName")}
              />
            </fieldset>
            <div className="flex gap30">
              <fieldset className="articleName">
                <label className="to-white">Article Title *</label>
                <TextField
                  type="text"
                  id="articleName"
                  placeholder="charles@gmail.com"
                  name="articleName"
                  tabIndex={2}
                  aria-required="true"
                  defaultValue={publication?.articleName}
                  fullWidth
                  error={!!errors["articleName"]}
                  helperText={
                    errors["articleName"]
                      ? errors["articleName"].message
                      : ""
                  }
                  {...register("articleName")}
                />
              </fieldset>
              <fieldset className="publicationName">
                <label className="to-white">Publication Title</label>
                <TextField
                  type="text"
                  id="publicationName"
                  placeholder="The Royal Art Journal"
                  name="publicationName"
                  defaultValue={publication?.publicationName}
                  tabIndex={2}
                  fullWidth
                  error={!!errors["publicationName"]}
                  helperText={
                    errors["publicationName"]
                      ? errors["publicationName"].message
                      : ""
                  }
                  {...register("publicationName")}
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
                  defaultValue={publication?.attachmentCaption}
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

            <fieldset className="notes">
              <label className="to-white">Notes</label>
              <TextField
                type="text"
                id="notes"
                placeholder="A private publication consult"
                name="notes"
                tabIndex={2}
                multiline
                defaultValue={publication?.notes}
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
