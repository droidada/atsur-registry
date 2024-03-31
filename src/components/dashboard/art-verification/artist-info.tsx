import { useState, useEffect } from "react";
import Image from "@/components/common/image";
import { useRouter } from "next/router";
import { object, string, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAuthContext } from "@/providers/auth.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { IArtist } from "@/types/models";

export default function ArtistInfo({ nextPage = (x) => {} }) {
  const axiosAuth = useAxiosAuth();
  const metadataSchema = object({
    story: string().nonempty("Description is required"),
    rarity: string().nonempty("Rarity is required"),
    type: string().nonempty("Type is required"),
    attachmentOne: string().nonempty("Attachment one is required"),
  });

  type MetadataInput = TypeOf<typeof metadataSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<MetadataInput>({
    resolver: zodResolver(metadataSchema),
  });

  const [attachmentOne, setAttachmentOne] = useState(null);
  const [attachmentTwo, setAttachmentTwo] = useState(null);
  const [attachmentThree, setAttachmentThree] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const { logIn, user, error: loginError } = useAuthContext();
  const [listedArtists, setListedArtists] = useState<IArtist[]>([]);

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<MetadataInput> = async (values) => {
    try {
      setLoading(true);
      console.log(values);
      const formData = new FormData();
      formData.append("attachmentOne", attachmentOne);
      formData.append("attachmentTwo", attachmentTwo);
      formData.append("attachmentThree", attachmentThree);
      formData.append("story", values.story);
      formData.append("rarity", values.rarity);
      formData.append("type", values.type);

      const result = await axiosAuth.post("/art-piece/add", formData);
      //setPreviewImg(result.data.imageName)
      console.log("result here is ", result.data);

      setLoading(false);
      nextPage(12);
      //  router.replace("/dashboard");
      return;
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setAttachmentOne(reader.result);
    }.bind(this);
    console.log(url); // Would see a path?

    setAttachmentOne(event.target.files[0]);
  };

  return (
    <>
      <div className="wrap-content w-full">
        {error && <h5 style={{ color: "red" }}>{error}</h5>}
        {/* <h3>Artist Information</h3> */}
        <form
          id="commentform"
          className="comment-form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <fieldset className="message">
            <label>Storytelling *</label>
            <TextField
              id="story"
              name="story"
              type="text"
              InputProps={{ className: "textarea story", style: {} }}
              rows={15}
              multiline
              placeholder="Tell the story behind the creation of your piece."
              tabIndex={2}
              aria-required="true"
              fullWidth
              error={!!errors["story"]}
              helperText={errors["story"] ? errors["story"].message : ""}
              {...register("story")}
            />
          </fieldset>
          <label>Attachments:</label>
          <div className="flex gap30">
            <fieldset className="collection">
              <label className="uploadfile flex items-center justify-center">
                <div className="text-center flex flex-col items-center justify-center">
                  {attachmentOne ? (
                    <Image className="h-full" alt={""} src={attachmentOne} />
                  ) : (
                    <>
                      <Image src="/assets/images/box-icon/upload.png" alt="" />
                      <p>Drag or choose attachment to upload</p>
                      <h6 className="text to-gray">PDF, JPEG.. Max 10Mb.</h6>
                    </>
                  )}
                  <TextField
                    type="file"
                    name="attachmentOne"
                    // InputProps={{ accept: "pdf,image/*" }}
                    onChange={handleUploadClick}
                    error={!!errors["attachmentOne"]}
                    helperText={
                      errors["attachmentOne"]
                        ? errors["attachmentOne"].message
                        : ""
                    }
                    {...register("attachmentOne")}
                  />
                </div>
              </label>
              <label className="to-white">Caption:</label>
              <TextField
                type="text"
                id="attachmentCaption"
                placeholder="publication document"
                name="attachmentCaption"
                tabIndex={2}
                fullWidth
                // defaultValue={publication?.attachmentCaption}
                error={!!errors["attachmentCaption"]}
                helperText={
                  errors["attachmentCaption"]
                    ? errors["attachmentCaption"].message
                    : ""
                }
                // {...register("attachmentOneCaption")}
              />
            </fieldset>
            <fieldset className="collection">
              <label className="uploadfile h-full flex items-center justify-center">
                <div className="text-center flex flex-col items-center justify-center">
                  {attachmentOne ? (
                    <Image className="h-full" alt={""} src={attachmentOne} />
                  ) : (
                    <>
                      <Image src="/assets/images/box-icon/upload.png" alt="" />
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
              <label className="to-white">Caption:</label>
              <TextField
                type="text"
                id="attachmentCaption"
                placeholder="publication document"
                name="attachmentCaption"
                tabIndex={2}
                fullWidth
                // defaultValue={publication?.attachmentCaption}
                error={!!errors["attachmentCaption"]}
                helperText={
                  errors["attachmentCaption"]
                    ? errors["attachmentCaption"].message
                    : ""
                }
                // {...register("attachmentOneCaption")}
              />
            </fieldset>
            <fieldset className="collection">
              <label className="uploadfile h-full flex items-center justify-center">
                <div className="text-center flex flex-col items-center justify-center">
                  {attachmentOne ? (
                    <Image className="h-full" alt={""} src={attachmentOne} />
                  ) : (
                    <>
                      <Image src="/assets/images/box-icon/upload.png" alt="" />
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
              <label className="to-white">Caption:</label>
              <TextField
                type="text"
                id="attachmentCaption"
                placeholder="publication document"
                name="attachmentCaption"
                tabIndex={2}
                fullWidth
                // defaultValue={publication?.attachmentCaption}
                error={!!errors["attachmentCaption"]}
                helperText={
                  errors["attachmentCaption"]
                    ? errors["attachmentCaption"].message
                    : ""
                }
                // {...register("attachmentOneCaption")}
              />
            </fieldset>
          </div>
          <div className="btn-submit flex gap30 justify-center">
            <button className="tf-button style-1 h50 active" type="reset">
              Clear
              <i className="icon-arrow-up-right2" />
            </button>
            <LoadingButton
              className="tf-button style-1 h50"
              loading={loading}
              type="submit"
            >
              Create
              <i className="icon-arrow-up-right2" />
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  );
}
