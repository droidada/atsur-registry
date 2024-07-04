import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "@/components/common/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { TypeOf, object, string } from "zod";
import axios from "axios";
import { useAuthContext } from "@/providers/auth.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";

import { Avatar, Button, Stack, TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Form/Input";
import SettingsPages from "@/HOC/SettingPages";
import { useSession } from "next-auth/react";
import InputField from "@/components/Form/InputField";
import PersonalInfoForm from "@/components/dashboard/settings/profile/PersonalInfoForm";
import SocialMediaForm from "@/components/dashboard/settings/profile/SocialMediaForm";

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
  const [isEditPersonalInfo, setIsEditPersonalInfo] = useState(false);
  const [isEditSocialHandles, setIsEditSocialHandles] = useState(false);
  const axiosAuth = useAxiosAuth();

  const { data } = useSession();

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
        // firstName: values.firstName,
        // lastName: values.lastName,
        // bio: values.bio,
        ...values,
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
      toast.success("Profile updated successfully");
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

  const avatarRef = useRef<any>();
  const bgRef = useRef<any>();
  const toast = useToast();

  // console.log(previewImg);
  return (
    <Stack spacing={2} className="divide-y-[1px] divide-secondary ">
      <h2 className="pb-3 text-[17px] leading-[16px] font-[600] b">
        My Profile
      </h2>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems="center"
        className="p-4"
      >
        <div className="flex items-center gap-4">
          <Avatar
            //  @ts-ignore
            src={data?.user?.avatar}
            //  @ts-ignore
            alt={data?.user?.firstName}
            className="w-[96px] h-[96px]"
          />
          <h3 className="font-[600] text-[19px] leading-[16px]">
            {/* @ts-ignore */}
            {data?.user?.firstName} {data?.user?.lastName}
          </h3>
        </div>
        <Button className="rounded-[22px] bg-secondary text-primary font-[400] text-xs">
          Edit
        </Button>
      </Stack>

      <Stack spacing={2} className="p-4">
        <h3 className="text-[15px] leading-[16px] font-[600]">
          Personal Information
        </h3>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems="center"
          spacing={4}
        >
          {isEditPersonalInfo ? (
            <PersonalInfoForm setIsEdit={setIsEditPersonalInfo} />
          ) : (
            <div className="flex-1 gap-4 grid grid-cols-2">
              <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
                <span className="">First Name</span>
                <span className="font-[500]">{data?.user?.firstName}</span>
              </div>
              <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
                <span className="">Last Name</span>
                <span className="font-[500]">{data?.user?.lastName}</span>
              </div>
              <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
                <span className="">Email</span>
                <span className="font-[500]">{data?.user?.email}</span>
              </div>
              <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
                <span className="">Phone</span>
                <span className="font-[500]">{data?.user?.phone}</span>
              </div>
              <div className="flex flex-col col-span-2 font-[400] text-[12px] leading-[16px]">
                <span className="">Bio</span>
                <span className="font-[500]">{data?.user?.bio}</span>
              </div>
            </div>
          )}
          <Button
            onClick={() => setIsEditPersonalInfo((prev) => !prev)}
            className="rounded-[22px] bg-secondary text-primary font-[400] text-xs"
          >
            {isEditPersonalInfo ? "Cancel" : "Edit"}
          </Button>
        </Stack>
      </Stack>

      <Stack spacing={2} className="p-4">
        <h3 className="text-[15px] leading-[16px] font-[600]">
          Social Media Handles
        </h3>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems="center"
          spacing={4}
        >
          {isEditSocialHandles ? (
            <SocialMediaForm />
          ) : (
            <div className="flex-1 gap-4 grid grid-cols-2">
              <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
                <span className="">Facebook</span>
                <span className="font-[500]">{data?.user?.facebook}</span>
              </div>
              <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
                <span className="">X</span>
                <span className="font-[500]">{data?.user?.twitter}</span>
              </div>
              <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
                <span className="">Instagram</span>
                <span className="font-[500]">{data?.user?.instagram}</span>
              </div>
              <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
                <span className="">Linkedin</span>
                <span className="font-[500]">{data?.user?.linkedIn}</span>
              </div>
            </div>
          )}
          <Button
            onClick={() => setIsEditSocialHandles((prev) => !prev)}
            className="rounded-[22px] bg-secondary text-primary font-[400] text-xs"
          >
            {isEditSocialHandles ? "Cancel" : "Edit"}
          </Button>
        </Stack>
      </Stack>

      <Stack spacing={2} className="p-4">
        <h3 className="text-[15px] leading-[16px] font-[600]">
          Personal Information
        </h3>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <div className="flex-1 gap-4 grid grid-cols-2">
            <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
              <span className="">Country</span>
              <span className="font-[500]">{data?.user?.country}</span>
            </div>
            <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
              <span className="">City/State</span>
              <span className="font-[500]">{data?.user?.city}</span>
            </div>
            <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
              <span className="">Home Address</span>
              <span className="font-[500]">{data?.user?.address}</span>
            </div>
            <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
              <span className="">Postal Code</span>
              <span className="font-[500]">{data?.user?.postalCode}</span>
            </div>
          </div>
          <Button className="rounded-[22px] bg-secondary text-primary font-[400] text-xs">
            Edit
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

Settings.requireAuth = true;
export default SettingsPages(Settings);
