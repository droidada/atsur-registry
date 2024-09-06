import LoadingButton from "@/components/Form/LoadingButton";
import VerificationFileDroper from "@/components/dashboard/artwork/Verification/VerificationFileDroper";
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import axios from "@/lib/axios";
import { useToast } from "@/providers/ToastProvider";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "next-auth/jwt";
import React, { useState } from "react";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/public/hero-images`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    console.log(res?.data);

    return { props: { heroImages: res.data.heroImages } };
  } catch (error) {
    console.error("error here looks like ", error);
    if (error?.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error(error);
  }
};
const PublicHeroImage = ({ heroImages }) => {
  const [files, setFiles] = useState({
    image_1: "",
    image_2: "",
  });
  const toast = useToast();
  const axiosAuth = useAxiosAuth();

  const { mutate, isLoading } = useMutation({
    mutationFn: (formData) => axiosAuth.post("/public/hero-images", formData),
    mutationKey: ["/public/hero-images"],
    onSuccess: () => {
      // toast.success("Hero images updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    },
  });

  const handleUploadClick = (files, type: "image_1" | "image_2") => {
    let file = files[0];
    const reader = new FileReader();
    let url = reader.readAsDataURL(file.file);

    reader.onloadend = function (e) {
      setFiles((prev) => ({ ...prev, [type]: reader.result }));
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(files).includes("")) {
      return toast.error("All fields are required");
    }

    const formData = new FormData();
    Object.keys(files).forEach((key, index) => {
      const file = files[key];
      if (file) {
        formData.append(`image_${index + 1}`, file);
      }
    });

    //   @ts-ignore
    mutate(formData);
  };

  return (
    <AdminDashboardLayout>
      <h1>Hero Images</h1>
      <form onSubmit={handleSubmit}>
        <VerificationFileDroper
          maxSize={10 * 1024 * 1024}
          maxFiles={1}
          desc="Drag or choose your file to upload PNG, JPEG, or WEBP, (Max 10MB)"
          handleUpload={(e) => handleUploadClick(e, "image_1")}
          className="w-full"
          buttonClassName="bg-[#CECDCD]"
          dropzoneClassName="w-full relative h-[162px] bg-secondary"
          accept="image/png, image/jpeg, image/webp"
          previewImage={files.image_1 || heroImages[0]}
          isImage={true}
        />
        <VerificationFileDroper
          maxSize={10 * 1024 * 1024}
          maxFiles={1}
          desc="Drag or choose your file to upload PNG, JPEG, or WEBP, (Max 10MB)"
          handleUpload={(e) => handleUploadClick(e, "image_2")}
          className="w-full"
          buttonClassName="bg-[#CECDCD]"
          dropzoneClassName="w-full relative h-[162px] bg-secondary"
          accept="image/png, image/jpeg, image/webp"
          previewImage={files.image_2 || heroImages[1]}
          isImage={true}
        />

        <LoadingButton
          loading={isLoading}
          className="mt-4 w-full bg-primary text-white"
          type="submit"
        >
          Update
        </LoadingButton>
      </form>
      {/* <VerificationFileDroper maxFiles={1} maxSize={10000000}  handleUpload={} /> */}
    </AdminDashboardLayout>
  );
};

export default PublicHeroImage;
