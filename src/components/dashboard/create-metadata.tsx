import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { object, string, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAuthContext } from "@/providers/auth.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";

export default function CreateMetadata({ nextPage = (x) => {} }) {
  const axiosAuth = useAxiosAuth();
  const metadataSchema = object({
    title: string().nonempty("Title is required"),
    description: string().nonempty("Description is required"),
    height: number().gte(0),
    width: number().gte(0),
    depth: number().gte(0),
    rarity: string().nonempty("Rarity is required"),
    type: string().nonempty("Type is required"),
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

  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const { logIn, user, error: loginError } = useAuthContext();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<MetadataInput> = async (values) => {
    try {
      if (!previewImg) {
        setError("Image attachment is required");
        return;
      }

      setLoading(true);
      console.log(values);
      const formData = new FormData();
      formData.append("file", previewImg);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("rarity", values.rarity);
      formData.append("type", values.type);
      formData.append("depth", values.depth.toString());
      formData.append("width", values.width.toString());
      formData.append("height", values.height.toString());

      const result = await axiosAuth.post("/artwork/add", formData);
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
    console.log();
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      //   this.setState({
      //     previewImg: [reader.result]
      //   });
      setPreviewImg(reader.result);
    }.bind(this);
    console.log(url); // Would see a path?

    // this.setState({
    //   mainState: "uploaded",
    //   selectedFile: event.target.files[0],
    //   imageUploaded: 1
    // });
    setPreviewImg(event.target.files[0]);
  };

  return (
    <>
      <div className="wrap-upload">
        <form action="#" className="h-full">
          <label className="uploadfile h-full flex items-center justify-center">
            <div className="text-center">
              {previewImg && <img className="h-full" src={previewImg} />}
              <img src="assets/images/box-icon/upload.png" alt="" />
              <h5 className="to-white">Upload file</h5>
              <p className="text">Drag or choose your file to upload</p>
              <div className="text filename">
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
          id="commentform"
          className="comment-form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <fieldset className="name">
            <label>Title *</label>
            <TextField
              type="text"
              id="title"
              placeholder="Title"
              name="title"
              tabIndex={2}
              aria-required="true"
              fullWidth
              error={!!errors["title"]}
              helperText={errors["title"] ? errors["title"].message : ""}
              {...register("title")}
            />
          </fieldset>
          <fieldset className="message">
            <label>Description *</label>
            <TextField
              id="description"
              name="description"
              type="text"
              InputProps={{ className: "textarea", style: {} }}
              rows={8}
              multiline
              placeholder="Describe your artwork *"
              tabIndex={2}
              aria-required="true"
              fullWidth
              error={!!errors["description"]}
              helperText={
                errors["description"] ? errors["description"].message : ""
              }
              {...register("description")}
            />
          </fieldset>
          <div className="flex gap30">
            <fieldset className="price">
              <label>Height (in inches) *</label>
              <TextField
                type="number"
                min={0}
                id="height"
                placeholder="12.0"
                name="height"
                tabIndex={2}
                aria-required="true"
                required
                fullWidth
                error={!!errors["height"]}
                helperText={errors["height"] ? errors["height"].message : ""}
                {...register("height", {
                  setValueAs: (value) => Number(value),
                })}
              />
            </fieldset>
            <fieldset className="properties">
              <label>Width (in inches) *</label>
              <TextField
                type="number"
                min={0}
                id="width"
                placeholder="7.0"
                name="width"
                tabIndex={2}
                aria-required="true"
                required
                fullWidth
                error={!!errors["width"]}
                helperText={errors["width"] ? errors["width"].message : ""}
                {...register("width", {
                  setValueAs: (value) => Number(value),
                })}
              />
            </fieldset>
            <fieldset className="size">
              <label>Depth (in inches) *</label>
              <TextField
                type="number"
                min={0}
                id="depth"
                placeholder="4"
                name="depth"
                tabIndex={2}
                aria-required="true"
                required
                fullWidth
                error={!!errors["depth"]}
                helperText={errors["depth"] ? errors["depth"].message : ""}
                {...register("depth", {
                  setValueAs: (value) => Number(value),
                })}
              />
            </fieldset>
          </div>
          <div className="flex gap30">
            <fieldset className="collection">
              <label>Rarity</label>
              <select
                className="select"
                tabIndex={2}
                name="rarity"
                id="rarity"
                {...register("rarity")}
              >
                <option>Select</option>
                <option value="unique">Unique</option>
                <option value="limited-edition">Limited Edition</option>
                <option value="open-edition">Open Edition</option>
                <option value="unknown">Unknown</option>
              </select>
            </fieldset>
            <fieldset className="collection">
              <label>Type</label>
              <select
                className="select"
                tabIndex={2}
                name="type"
                id="type"
                {...register("type")}
              >
                <option>Select</option>
                <option value="artwork">Artwork</option>
                <option value="artifact">Artifact</option>
              </select>
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
