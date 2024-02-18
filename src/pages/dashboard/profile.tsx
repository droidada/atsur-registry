import DashboardLayoutWithSidebar, {
  DashboardPages,
} from "@/components/open9/layout/DashboardLayoutWithSidebar";
import { TextField } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";

const pubAPI = process.env.NEXT_PUBLIC_API_ENDPOINT;
const Profile = () => {
  const signUpSchema = object({
    firstName: string().nonempty("First name is required"),
    lastName: string().nonempty("Last name is required"),
    email: string().nonempty("Email is required").email("Email is invalid"),
    password: string()
      .nonempty("Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: string().nonempty("Confirm password is required"),
  }).refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    },
  );

  type SignUpInput = TypeOf<typeof signUpSchema>;
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  useEffect(() => {
    setError(false);
    setSuccess(false);
  }, []);

  const onSubmitHandler: SubmitHandler<SignUpInput> = async (values) => {
    try {
      console.log(values);
      setLoading(true);
      setError(false);
      setSuccess(false);
      const resp = await axios.post(`${pubAPI}/auth/register`, {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      console.log(resp.data);
      //success message
      setLoading(false);
      setSuccess(true);
      router.push("/login");
    } catch (error) {
      console.error(error.message);
      setLoading(false);
      setError(true);
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
    setPreviewImg(event.target.files[0]);
  };
  return (
    <DashboardLayoutWithSidebar
      activePage={DashboardPages.MY_PROFILE}
      hideSidebar={true}
    >
      <div className="tf-section-2 w-full pt-60 widget-box-icon">
        <div className="themesflat-container w-full flex gap-8 lg:flex">
          <div className="wrap-upload widget-login">
            <form action="#" className="h-full">
              <label className="uploadfile h-full flex items-center justify-center">
                <div className="text-center">
                  {previewImg ? (
                    <img className="h-full" src={previewImg} />
                  ) : (
                    <img src="assets/images/box-icon/upload.png" alt="" />
                  )}

                  <h5 className="text-white">Upload file</h5>
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
          <div className="row flex-1">
            <div className="col-12">
              <div className="widget-login">
                <form
                  className="comment-form"
                  autoComplete="off"
                  noValidate
                  onSubmit={handleSubmit(onSubmitHandler)}
                >
                  <fieldset className="name">
                    <label className="to-white">First Name *</label>
                    <TextField
                      type="text"
                      id="firstName"
                      placeholder="Your first name*"
                      name="firstName"
                      tabIndex={2}
                      aria-required="true"
                      fullWidth
                      error={!!errors["firstName"]}
                      helperText={
                        errors["firstName"] ? errors["firstName"].message : ""
                      }
                      {...register("firstName")}
                    />
                  </fieldset>
                  <fieldset className="name">
                    <label className="to-white">Last Name *</label>
                    <TextField
                      type="text"
                      id="lastName"
                      placeholder="Your last name*"
                      name="lastName"
                      tabIndex={2}
                      aria-required="true"
                      fullWidth
                      error={!!errors["lastName"]}
                      helperText={
                        errors["lastName"] ? errors["lastName"].message : ""
                      }
                      {...register("lastName")}
                    />
                  </fieldset>
                  <fieldset className="email">
                    <label className="to-white">Email *</label>
                    <TextField
                      type="text"
                      id="email"
                      placeholder="mail@website.com"
                      name="email"
                      tabIndex={2}
                      aria-required="true"
                      fullWidth
                      error={!!errors["email"]}
                      helperText={
                        errors["email"] ? errors["email"].message : ""
                      }
                      {...register("email")}
                    />
                  </fieldset>

                  <div className="btn-submit mb-30">
                    <button
                      className="tf-button style-1 h50 w-100"
                      type="submit"
                    >
                      Update profile
                      <i className="icon-arrow-up-right2" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayoutWithSidebar>
  );
};

export default Profile;
