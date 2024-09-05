import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "@/components/common/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { TypeOf, object, string } from "zod";

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
import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";

const pubAPI = process.env.NEXT_PUBLIC_API_ENDPOINT;

function Settings() {
  const { user } = useAuthContext();
  console.log("user", user);

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
            src={user?.avatar}
            //  @ts-ignore
            alt={user?.firstName}
            className="w-[96px] h-[96px]"
          />
          <h3 className="font-[600] text-[19px] leading-[16px]">
            {/* @ts-ignore */}
            {user?.firstName} {user?.lastName}
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
                <span className="font-[500]">{user?.firstName}</span>
              </div>
              <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
                <span className="">Last Name</span>
                <span className="font-[500]">{user?.lastName}</span>
              </div>
              <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
                <span className="">Email</span>
                <span className="font-[500]">{user?.email}</span>
              </div>
              <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
                <span className="">Phone</span>
                <span className="font-[500]">{user?.phone}</span>
              </div>
              <div className="flex flex-col col-span-2 font-[400] text-[12px] leading-[16px]">
                <span className="">Bio</span>
                <span className="font-[500]">{user?.bio}</span>
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
            <SocialMediaForm socialLinks={user?.socialLinks} />
          ) : (
            <div className="flex-1 gap-4 grid grid-cols-2">
              <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
                <span className="">Facebook</span>
                <span className="font-[500]">
                  {user?.socialLinks?.facebook || "Nill"}
                </span>
              </div>
              <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
                <span className="">X</span>
                <span className="font-[500]">
                  {user?.socialLinks?.twitter || "Nill"}
                </span>
              </div>
              <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
                <span className="">Instagram</span>
                <span className="font-[500]">
                  {user?.socialLinks?.instagram || "Nill"}
                </span>
              </div>
              <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
                <span className="">Linkedin</span>
                <span className="font-[500]">
                  {user?.socialLinks?.linkedIn || "Nill"}
                </span>
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
              <span className="font-[500]">{user?.country?.name}</span>
            </div>
            {/* <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
              <span className="">City/State</span>
              <span className="font-[500]">{user?.city}</span>
            </div> */}
            {/* <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
              <span className="">Home Address</span>
              <span className="font-[500]">{user?.address}</span>
            </div>
            <div className="flex flex-col font-[400] text-[12px] leading-[16px]">
              <span className="">Postal Code</span>
              <span className="font-[500]">{user?.postalCode}</span>
            </div> */}
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
