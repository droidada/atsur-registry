import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "@/components/common/image";
import { useRouter } from "next/router";
import { object, string, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAuthContext } from "@/providers/auth.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import DashboardLayoutWithSidebar, {
  DashboardPages,
} from "@/components/open9/layout/DashboardLayoutWithSidebar";
import AutoSlider1 from "@/open9/slider/AutoSlider1";
import AutoSlider2 from "@/open9/slider/AutoSlider2";

function CreateOrganization() {
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

  type OrgInput = TypeOf<typeof orgSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<OrgInput>({
    resolver: zodResolver(orgSchema),
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

  const onSubmitHandler: SubmitHandler<OrgInput> = async (values) => {
    try {
      //   if (!previewImg) {
      //     setError("Image attachment is required");
      //     return;
      //   }

      setLoading(true);
      console.log(values);
      const formData = new FormData();
      formData.append("image", previewImg);
      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("country", values.country);
      //   formData.append("type", values.type);
      formData.append("website", values.website);

      const result = await axiosAuth.post("/org/add", formData);
      //setPreviewImg(result.data.imageName)
      console.log("result here is ", result.data);

      setLoading(false);
      router.replace("/dashboard/organizations");
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
    console.log(url); // Would see a path?

    // this.setState({
    //   mainState: "uploaded",
    //   selectedFile: event.target.files[0],
    //   imageUploaded: 1
    // });
    // setPreviewImg(event.target.files[0]);
  };

  return (
    <DashboardLayoutWithSidebar activePage={DashboardPages.ORGANIZATIONS}>
      <div className="row">
        <div className="action__body w-full mb-40">
          <div className="tf-tsparticles">
            <div id="tsparticles7" data-color="#161616" data-line="#000" />
          </div>
          <h2>Add Organization</h2>
          <div className="flat-button flex">
            <Link href="/explore" className="tf-button style-2 h50 w190 mr-10">
              Explore
              <i className="icon-arrow-up-right2" />
            </Link>
            <Link
              href="/dashboard/organizations/create"
              className="tf-button style-2 h50 w230"
            >
              Create Organization
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
        <div className="wrap-upload">
          <form action="#" className="h-full">
            <label className="uploadfile h-full flex items-center justify-center">
              <div className="text-center flex flex-col items-center justify-center">
                {previewImg ? (
                  <Image className="h-full" src={previewImg} />
                ) : (
                  <Image src="/assets/images/box-icon/upload.png" alt="" />
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
                  tabIndex={2}
                  fullWidth
                  error={!!errors["website"]}
                  helperText={
                    errors["website"] ? errors["website"].message : ""
                  }
                  {...register("website")}
                />
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

CreateOrganization.requiredAuth = true;
export default CreateOrganization;
