import { useState, useEffect } from "react";
import Image from "@/components/common/image";
import { useRouter } from "next/router";
import { object, string, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";
import { useAuthContext } from "@/providers/auth.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import LoadingButton from "../Form/LoadingButton";

export default function CreateMetadata({ nextPage = (x) => {} }) {
  const axiosAuth = useAxiosAuth();
  const metadataSchema = object({
    title: string().nonempty("Title is required"),
    description: string().nonempty("Description is required"),
    height: number().gte(0),
    width: number().gte(0),
    depth: number().gte(0),
    medium: string().nonempty("Medium is required"),
    subjectMatter: string().nonempty("Subject matter is required"),
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

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<MetadataInput> = async (values) => {
    try {
      if (!previewImg) {
        setError("Image attachment is required");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("file", previewImg);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("rarity", values.rarity);
      formData.append("medium", values.medium);
      formData.append("subjectMatter", values.subjectMatter);
      formData.append("type", values.type);
      formData.append("depth", values.depth.toString());
      formData.append("width", values.width.toString());
      formData.append("height", values.height.toString());

      const result = await axiosAuth.post("/art-piece/add", formData);
      //setPreviewImg(result.data.imageName)

      setLoading(false);
      nextPage(12);
      //  router.replace("/dashboard");
      return;
    } catch (error) {
      setError(error.message);
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
    setPreviewImg(event.target.files[0]);
  };

  return (
    <>
      <div className="wrap-upload">
        <form action="#" className="h-full">
          <label className="uploadfile h-full flex items-center justify-center">
            <div className="text-center flex flex-col items-center justify-center">
              {previewImg ? (
                <Image className="h-full" alt={""} src={previewImg} />
              ) : (
                <Image src="/assets/images/box-icon/upload.png" alt="" />
              )}

              <h5>Upload file</h5>
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
              <label>Medium *</label>
              <TextField
                type="text"
                id="medium"
                placeholder="Paint, Oil"
                name="medium"
                tabIndex={2}
                aria-required="true"
                fullWidth
                error={!!errors["medium"]}
                helperText={errors["medium"] ? errors["medium"].message : ""}
                {...register("medium")}
              />
            </fieldset>
            <fieldset className="properties">
              <label>Subject Matter *</label>
              <TextField
                type="text"
                id="subjectMatter"
                placeholder="Landscape, etc"
                name="subjectMatter"
                tabIndex={2}
                aria-required="true"
                fullWidth
                error={!!errors["subjectMatter"]}
                helperText={
                  errors["subjectMatter"] ? errors["subjectMatter"].message : ""
                }
                {...register("subjectMatter")}
              />
            </fieldset>
          </div>
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
                <option value="art-piece">Art Piece</option>
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
