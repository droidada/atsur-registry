import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayoutWithSidebar, {
  DashboardPages,
} from "@/open9/layout/DashboardLayoutWithSidebar";
import AutoSlider1 from "@/open9/slider/AutoSlider1";
import AutoSlider2 from "@/open9/slider/AutoSlider2";
import { TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { TypeOf, object, string } from "zod";
import axios from "axios";
import { useAuthContext } from "@/providers/auth.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";

const pubAPI = process.env.NEXT_PUBLIC_API_ENDPOINT;
function Settings() {
  const { user, logIn, logOut, updateUserProfile } = useAuthContext();
  const signUpSchema = object({
    firstName: string().nonempty("First name is required"),
    lastName: string().nonempty("Last name is required"),
    // email: string().nonempty("Email is required").email("Email is invalid"),
  });

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
  const [previewImg, setPreviewImg] = useState<any>(user?.avatar);
  const axiosAuth = useAxiosAuth();

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
      const resp = await axios.post(`${pubAPI}/auth/profile-update`, {
        firstName: values.firstName,
        lastName: values.lastName,
        email: user.email,
      });
      console.log(resp);
      //success message
      setLoading(false);
      setSuccess(true);
      router.reload();
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
      setPreviewImg(reader.result);
    }.bind(this);
    // console.log("url", url); // Would see a path?
    // setPreviewImg(event.target.files[0]);
  };
  const updateAvatar = async () => {
    try {
      setLoading(true);
      setError(false);
      setSuccess(false);
      const resp = await axios.post(`${pubAPI}/auth/profile-update`, {
        avatar: previewImg,
        email: user.email,
      });
      console.log(resp);
      //success message
      setLoading(false);
      setSuccess(true);
      router.reload();
    } catch (error) {
      console.error(error.message);
      setLoading(false);
      setError(true);
    }
  };
  // console.log(previewImg);
  return (
    <DashboardLayoutWithSidebar
      activePage={DashboardPages.SETTINGS}
      hideSidebar={true}
    >
      <>
        <div className="action__body w-full mb-40">
          <div className="tf-tsparticles">
            <div id="tsparticles8" data-color="#161616" data-line="#000" />
          </div>
          <h2>Discover, create and sell your own NFT</h2>
          <div className="flat-button flex">
            <Link href="#" className="tf-button style-2 h50 w190 mr-10">
              Explore now
              <i className="icon-arrow-up-right2" />
            </Link>
            <Link href="#" className="tf-button style-2 h50 w230">
              Create your first NFT
              <i className="icon-arrow-up-right2" />
            </Link>
          </div>
          <div className="bg-home7">
            <AutoSlider1 />
            <AutoSlider2 />
            <AutoSlider1 />
          </div>
        </div>
        <div className="heading-section">
          <h2 className="tf-title pb-30">Setting</h2>
        </div>
        <div className="widget-edit mb-30 avatar">
          <div className="title to-white">
            <h4>Edit your avatar</h4>
            <i className="icon-keyboard_arrow_up" />
          </div>
          <div className="flex flex-col gap-4">
            <img
              src={previewImg ? previewImg : "/assets/default.jpeg"}
              width={200}
              height={200}
              className="rounded-[50%] object-contain"
            />
          </div>
          <form action="#" className="flex flex-col gap-4">
            <div className="uploadfile flex flex-col gap-4">
              <img src="assets/images/avatar/avatar-07.png" alt="" />
              <div>
                <h6 className="to-white">Upload a new avatar”</h6>
                <label>
                  <input type="file" name="file" onChange={handleUploadClick} />
                  <span className="text filename to-white">
                    No files selected
                  </span>
                </label>
                <p className="text">JPEG 100x100</p>
              </div>
            </div>
            <div className="btn-submit">
              {/* <button className="w242 active mr-30">Cancel</button> */}
              <button
                className="w242"
                style={{ background: "#A4442B" }}
                type="button"
                onClick={updateAvatar}
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="widget-edit mb-30 profile">
          <div className="title to-white">
            <h4>Edit your profile</h4>
            <i className="icon-keyboard_arrow_up" />
          </div>
          <form
            id="commentform"
            onSubmit={handleSubmit(onSubmitHandler)}
            className="comment-form"
          >
            <div className="flex gap30">
              <fieldset className="name">
                <label className="to-white">First Name *</label>
                <TextField
                  type="text"
                  id="firstName"
                  placeholder={user?.firstName}
                  name="firstName"
                  defaultValue={user?.firstName}
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
                  placeholder={user?.lastName}
                  name="lastName"
                  defaultValue={user?.lastName}
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
              {/* <fieldset className="email">
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
                  helperText={errors["email"] ? errors["email"].message : ""}
                  {...register("email")}
                />
              </fieldset> */}
            </div>
            <div className="btn-submit">
              {/* <button className="w242 active mr-30">Cancel</button> */}
              <button
                className="w242"
                style={{ background: "#A4442B" }}
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="widget-edit mb-30 password">
          <div className="title">
            <h4 className="to-white">Change password</h4>
            <i className="icon-keyboard_arrow_up" />
          </div>
          <form id="commentform" className="comment-form">
            <fieldset className="password">
              <label className="to-white">Old password</label>
              <input
                type="text"
                id="password"
                placeholder="Enter your Old password"
                name="password"
                tabIndex={2}
                aria-required="true"
                required
              />
            </fieldset>
            <fieldset className="password">
              <label className="to-white">New password</label>
              <input
                type="text"
                id="password"
                placeholder="Enter your New password"
                name="password"
                tabIndex={2}
                aria-required="true"
                required
              />
            </fieldset>
            <fieldset className="password">
              <label className="to-white">Confirm password</label>
              <input
                type="text"
                id="password"
                placeholder="Confirm password"
                name="password"
                tabIndex={2}
                aria-required="true"
                required
              />
            </fieldset>
            <div className="btn-submit">
              {/* <button className="w242 active mr-30">Cancel</button> */}
              <button
                className="w242"
                style={{ background: "#A4442B" }}
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        {/* <div className="widget-edit mb-30 setting">
          <div className="title">
            <h4 className="to-white">Notification setting</h4>
            <i className="icon-keyboard_arrow_up" />
          </div>
          <form id="commentform" className="comment-form">
            <div className="notification-setting-item">
              <div className="content">
                <h6 className="tf-color">Order confirmation</h6>
                <p>will be notified when customer order any product</p>
              </div>
              <input
                className="check"
                type="checkbox"
                defaultValue="checkbox"
                name="check"
                defaultChecked
              />
            </div>
            <div className="notification-setting-item">
              <div className="content">
                <h6 className="tf-color">New Items Notification</h6>
                <p>Mauris a velit commodo erat lobortis eleifend</p>
              </div>
              <input
                className="check"
                type="checkbox"
                defaultValue="checkbox"
                name="check"
              />
            </div>
            <div className="notification-setting-item">
              <div className="content">
                <h6 className="tf-color">Payment Card Notification</h6>
                <p>Proin rutrum nulla non</p>
              </div>
              <input
                className="check"
                type="checkbox"
                defaultValue="checkbox"
                name="check"
                defaultChecked
              />
            </div>
            <div className="notification-setting-item">
              <div className="content">
                <h6 className="tf-color">Notification for approving product</h6>
                <p>Nam in mi ac felis venenatis ultrices</p>
              </div>
              <input
                className="check"
                type="checkbox"
                defaultValue="checkbox"
                name="check"
              />
            </div>
            <div className="notification-setting-item">
              <div className="content">
                <h6 className="tf-color">Email notification</h6>
                <p>Turn on email notification to get updates through email</p>
              </div>
              <input
                className="check"
                type="checkbox"
                defaultValue="checkbox"
                name="check"
              />
            </div>
            <div className="btn-submit">
              <button className="w242 active mr-30">Cancel</button>
              <button
                className="w242"
                style={{ background: "#A4442B" }}
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div> */}
      </>
    </DashboardLayoutWithSidebar>
  );
}

Settings.requiredAuth = true;
export default Settings;
