import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "@/components/common/image";
import { useRouter } from "next/router";
import { object, string, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { MenuItem, Select, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAuthContext } from "@/providers/auth.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import DashboardLayoutWithSidebar, {
  DashboardPages,
} from "@/components/open9/layout/DashboardLayoutWithSidebar";
import AutoSlider1 from "@/open9/slider/AutoSlider1";
import AutoSlider2 from "@/open9/slider/AutoSlider2";

function CreateCollection() {
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
    handleSubmit,
  } = useForm<collectionInput>({
    resolver: zodResolver(collectionSchema),
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

  const onSubmitHandler: SubmitHandler<collectionInput> = async (values) => {
    try {
      setLoading(true);
      console.log(values);
      const formData = new FormData();
      formData.append("image", previewImg);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("type", values.type);

      const result = await axiosAuth.post("/collection/add", formData);
      //setPreviewImg(result.data.imageName)
      console.log("result here is ", result.data);

      setLoading(false);
      router.replace("/dashboard/collections");
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
      //   this.setState({
      //     previewImg: [reader.result]
      //   });
      setPreviewImg(reader.result);
    }.bind(this);
    console.log(url);
    setPreviewImg(event.target.files[0]);
  };

  return (
    <DashboardLayoutWithSidebar activePage={DashboardPages.COLLECTIONS}>
      <div className="row">
        <div className="action__body w-full mb-40">
          <div className="tf-tsparticles">
            <div id="tsparticles7" data-color="#161616" data-line="#000" />
          </div>
          <h2>Add Collection</h2>
          <div className="flat-button flex">
            <Link href="/explore" className="tf-button style-2 h50 w190 mr-10">
              Explore
              <i className="icon-arrow-up-right2" />
            </Link>
            <Link
              href="/dashboard/collections/create"
              className="tf-button style-2 h50 w230"
            >
              Create
              <i className="icon-arrow-up-right2" />
            </Link>
          </div>
          <div className="bg-home7">
            <AutoSlider1 />
            <AutoSlider2 />
            <AutoSlider1 />
          </div>
        </div>
      </div>
      <div className="widget-edit mb-30 profile">
        <div className="title to-white">
          <h4>Information</h4>
          <i className="icon-keyboard_arrow_up" />
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
              <label className="to-white">Title *</label>
              <TextField
                type="text"
                id="title"
                placeholder="Hanson Morgan Gallery of Arts"
                name="title"
                tabIndex={2}
                aria-required="true"
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
                        width={200}
                        height={200}
                        alt={""}
                        className="h-full"
                        src={previewImg}
                      />
                    ) : (
                      <Image
                        width={200}
                        height={200}
                        src="/assets/images/box-icon/upload.png"
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
              <button className="tf-button style-1 h50" type="reset">
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
      </div>
    </DashboardLayoutWithSidebar>
  );
}

CreateCollection.requireAuth = true;
export default CreateCollection;
