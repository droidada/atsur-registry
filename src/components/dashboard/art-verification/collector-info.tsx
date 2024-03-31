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

export default function CollectorInfo({ nextPage = (x) => {} }) {
  const axiosAuth = useAxiosAuth();
  const metadataSchema = object({
    date: string().nonempty("Date is required"),
    channel: string().nonempty("Channel is required"),
    notes: string(),
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
      console.log(values);
      const formData = new FormData();
      formData.append("file", previewImg);
      formData.append("rarity", values.rarity);
      formData.append("subjectMatter", values.subjectMatter);
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
      setPreviewImg(reader.result);
    }.bind(this);
    console.log(url); // Would see a path?

    setPreviewImg(event.target.files[0]);
  };

  return (
    <>
      <div className="wrap-content w-full">
        {error && <h5 style={{ color: "red" }}>{error}</h5>}
        {/* <h3>Collector Information</h3> */}
        <form
          id="commentform"
          className="comment-form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="flex gap30">
            <fieldset className="name">
              <label>Date Of Purchase *</label>
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
                {...register("date")}
              />
            </fieldset>
            <fieldset className="collection">
              <label>Channel Of Purchase *</label>
              <select
                className="select"
                tabIndex={2}
                name="rarity"
                id="rarity"
                {...register("rarity")}
              >
                <option>Select</option>
                <option value="direct">Direct from artist</option>
                <option value="exhibition">Exhibition</option>
                <option value="auction">Auction</option>
                <option value="dealer">
                  Dealer (i.e. via Gallery or Curator)
                </option>
                <option value="unknown">Other</option>
              </select>
            </fieldset>
          </div>
          <fieldset className="price">
            <label>Notes *</label>
            <TextField
              type="text"
              id="notes"
              multiline
              rows={7}
              InputProps={{ className: "textarea", style: {} }}
              placeholder="Collector's notes"
              name="notes"
              tabIndex={2}
              aria-required="true"
              fullWidth
              error={!!errors["notes"]}
              helperText={errors["notes"] ? errors["notes"].message : ""}
              {...register("notes")}
            />
          </fieldset>
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
