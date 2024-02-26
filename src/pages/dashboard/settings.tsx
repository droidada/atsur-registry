import { useEffect, useRef, useState } from "react";
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
    bio: string(),
    twitter: string(),
    facebook: string(),
    instagram: string(),
    linkedIn: string(),
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
  const [previewImg, setPreviewImg] = useState(null);
  const [previewBg, setPreviewBg] = useState(null);
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
        socialLinks: {
          linkedIn: values.linkedIn,
          facebook: values.facebook,
          instagram: values.instagram,
          twitter: values.twitter,
        },
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
  const handleUploadClick = (event, setter) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setter(reader.result);
    }.bind(this);
    // console.log("url", url); // Would see a path?
    // setPreviewImg(event.target.files[0]);
  };
  const updateAvatar = async () => {
    try {
      setLoading(true);
      setError(false);
      setSuccess(false);

      // Conditional data construction based on preview values
      let data: any = {};
      if (previewBg && previewImg) {
        // Both previewBg and previewImg are not null, include both
        data = {
          avatar: previewImg,
          backgroundImage: previewBg,
          email: user.email,
        };
      } else {
        // One or both preview values are null, include only non-null values
        if (previewImg) {
          data.avatar = previewImg;
        }
        if (previewBg) {
          data.backgroundImage = previewBg;
        }
        data.email = user.email;
      }

      const resp = await axios.post(`${pubAPI}/auth/profile-update`, data);
      console.log(resp);

      // Success handling
      setLoading(false);
      setSuccess(true);
      router.reload();
    } catch (error) {
      console.error(error.message);
      setLoading(false);
      setError(true);
    }
  };

  const avatarRef = useRef();
  const bgRef = useRef();
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
        <div
          className={`widget-edit mb-30 avatar flex flex-col justify-center items-center`}
        >
          <div className="title to-white w-full flex justify-between">
            <h4>Edit your avatar and profile background</h4>
            <i className="icon-keyboard_arrow_up" />
          </div>
          <div
            style={{
              backgroundImage: `url(" ${
                previewBg ||
                user?.backgroundImage ||
                "/assets/default-image.jpg"
              } ")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            className="w-full h-[300px] relative"
          >
            <div
              onClick={() => bgRef?.current?.click()}
              className="bg-[#232323] p-3 absolute top-4 right-8 text-lg cursor-pointer text-white"
              style={{ border: "2px solid white" }}
            >
              Edit
            </div>
            <input
              ref={bgRef}
              type="file"
              name="file"
              onChange={(e) => handleUploadClick(e, setPreviewBg)}
              className="hidden"
            />
          </div>
          <div className="flex flex-col gap-4 mt-[-100px] z-10 relative">
            <img
              src={
                previewImg
                  ? previewImg
                  : user?.avatar
                  ? user?.avatar
                  : "/assets/default.jpeg"
              }
              width={200}
              height={200}
              className="rounded-[50%] object-contain"
            />
            <div
              onClick={() => avatarRef?.current?.click()}
              className="bg-[#232323] p-3 absolute bottom-4 right-8 text-lg cursor-pointer text-white"
              style={{ border: "2px solid white" }}
            >
              Edit
            </div>
            <input
              ref={avatarRef}
              type="file"
              name="file"
              onChange={(e) => handleUploadClick(e, setPreviewImg)}
              className="hidden"
            />
          </div>
          <div className="btn-submit w-full flex justify-center mt-8">
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
            <div className="grid grid-cols-2 gap-4">
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
              <fieldset className="name">
                <label className="to-white">Twitter</label>
                <TextField
                  type="text"
                  id="twitter"
                  placeholder={user?.socialLinks?.twitter}
                  name="twitter"
                  defaultValue={user?.socialLinks?.twitter}
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  error={!!errors["twitter"]}
                  helperText={
                    errors["twitter"] ? errors["twitter"].message : ""
                  }
                  {...register("twitter")}
                />
              </fieldset>

              <fieldset className="name">
                <label className="to-white">Facebook</label>
                <TextField
                  type="text"
                  id="facebook"
                  placeholder={user?.socialLinks?.facebook}
                  name="facebook"
                  defaultValue={user?.socialLinks?.facebook}
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  error={!!errors["facebook"]}
                  helperText={
                    errors["facebook"] ? errors["facebook"].message : ""
                  }
                  {...register("facebook")}
                />
              </fieldset>
              <fieldset className="name">
                <label className="to-white">Instagram</label>
                <TextField
                  type="text"
                  id="instagram"
                  placeholder={user?.socialLinks?.instagram}
                  name="instagram"
                  defaultValue={user?.socialLinks?.instagram}
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  error={!!errors["instagram"]}
                  helperText={
                    errors["instagram"] ? errors["instagram"].message : ""
                  }
                  {...register("instagram")}
                />
              </fieldset>
              <fieldset className="name">
                <label className="to-white">LinkedIn</label>
                <TextField
                  type="text"
                  id="linkedIn"
                  placeholder={user?.socialLinks?.linkedIn}
                  name="linkedIn"
                  defaultValue={user?.socialLinks?.linkedIn}
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  error={!!errors["linkedIn"]}
                  helperText={
                    errors["linkedIn"] ? errors["linkedIn"].message : ""
                  }
                  {...register("linkedIn")}
                />
              </fieldset>
              <fieldset className="name">
                <label className="to-white">Bio</label>
                <TextField
                  id="bio"
                  name="bio"
                  type="text"
                  InputProps={{ className: "textarea", style: {} }}
                  rows={8}
                  multiline
                  placeholder={user?.bio || "Write something about yourself."}
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  error={!!errors["bio"]}
                  helperText={errors["bio"] ? errors["bio"].message : ""}
                  {...register("bio")}
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
