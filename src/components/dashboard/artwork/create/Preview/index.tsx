import ICreateArtworkFormData from "@/types/models/createArtwork";
import React from "react";
import CreateArtWorkFormContainer from "../FormContainer";
import { Stack } from "@mui/material";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/providers/ToastProvider";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { FourGMobiledataOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";

interface Props {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setFormData: React.Dispatch<React.SetStateAction<ICreateArtworkFormData>>;
  formData: ICreateArtworkFormData;
}
const CreateArtworkPreview: React.FC<Props> = ({
  setActiveIndex,
  setFormData,
  formData,
}) => {
  const toast = useToast();
  const axiosFetch = useAxiosAuth();
  const router = useRouter();
  const { mutate, isLoading } = useMutation(
    async (artworkData: ICreateArtworkFormData) => {
      try {
        const firstFormData = new FormData();
        for (let data in artworkData.illustration) {
          firstFormData.append(`${data}`, artworkData?.illustration[data]);
        }
        firstFormData.append("file", artworkData.assets?.primaryView);

        const { data: response1 } = await axiosFetch.post(
          `/art-piece/add`,
          firstFormData,
        );
        console.log(response1);

        if (
          artworkData?.assets?.secondaryView?.leftAngleView ||
          artworkData?.assets?.secondaryView?.rightAngleView ||
          artworkData?.assets?.secondaryView?.mountedView
        ) {
          const formData = new FormData();
          formData.append("artPieceId", response1?.artPiece?._id);

          formData.append(
            "fileLeft",
            artworkData?.assets?.secondaryView?.leftAngleView,
          );
          formData.append(
            "fileRight",
            artworkData?.assets?.secondaryView?.rightAngleView,
          );
          formData.append(
            "fileMounted",
            artworkData?.assets?.secondaryView?.mountedView,
          );
          const { data: response2 } = await axiosFetch.post(
            `/art-piece/add-assets`,
            formData,
          );
        }

        return response1?.artPiece?._id;
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (artworkId) => {
        router.push(`/dashboard/artworks/${artworkId}`);
      },
      onError: (error: any) => {
        console.log(error);
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again";
        toast.error(errorMessage);
      },
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <CreateArtWorkFormContainer
      handleGoBack={() => {
        console.log("hello");

        setActiveIndex((prev) => prev - 1);
      }}
      isLast
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      <Stack spacing={4}>
        <h1 className="font-bold text-[19px] leading-[16px]">Art Details</h1>
        <div className="grid md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-[15px] leading-[16px]">Title</h4>
            <p className="text-[17px] leading-[16px] font-[300]">
              {formData?.illustration?.title}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-[15px] leading-[16px]">Medium</h4>
            <p className="text-[17px] leading-[16px] font-[300]">
              {formData?.illustration?.medium}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-[15px] leading-[16px]">
              Subject Matter
            </h4>
            <p className="text-[17px] leading-[16px] font-[300]">
              {formData?.illustration?.subjectMatter}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-[15px] leading-[16px]">Type</h4>
            <p className="text-[17px] leading-[16px] font-[300]">
              {formData?.illustration?.type}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-[15px] leading-[16px]">
            Description
          </h4>
          <p className="text-[17px] leading-[16px] font-[300]">
            {formData?.illustration?.description}
          </p>
        </div>

        <div className="grid md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-[15px] leading-[16px]">Height</h4>
            <p className="text-[17px] leading-[16px] font-[300]">
              {formData?.illustration?.height} inches
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-[15px] leading-[16px]">width</h4>
            <p className="text-[17px] leading-[16px] font-[300]">
              {formData?.illustration?.width} inches
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-[15px] leading-[16px]">Depth</h4>
            <p className="text-[17px] leading-[16px] font-[300]">
              {formData?.illustration?.depth} inches
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Image
              src={formData?.assets?.primaryView}
              alt="primary View"
              width={192}
              height={224}
              className="max-w-[192px] h-[224px] w-full object-cover "
            />
            <p className="italic text-[15px] leading-[20px] font-[300]">
              Primary View
            </p>
          </div>
          {formData?.assets?.secondaryView?.leftAngleView && (
            <div className="flex flex-col gap-2">
              <Image
                src={formData?.assets?.secondaryView?.leftAngleView}
                alt="Left Angle View"
                width={192}
                height={224}
                className="max-w-[192px] h-[224px] w-full object-cover "
              />
              <p className="italic text-[15px] leading-[20px] font-[300]">
                Left Angle View
              </p>
            </div>
          )}

          {formData?.assets?.secondaryView?.rightAngleView && (
            <div className="flex flex-col gap-2">
              <Image
                src={formData?.assets?.secondaryView?.rightAngleView}
                alt="Right Angle View"
                width={192}
                height={224}
                className="max-w-[192px] h-[224px] w-full object-cover "
              />
              <p className="italic text-[15px] leading-[20px] font-[300]">
                Right Angle View
              </p>
            </div>
          )}

          {formData?.assets?.secondaryView?.mountedView && (
            <div className="flex flex-col gap-2">
              <Image
                src={formData?.assets?.secondaryView?.mountedView}
                alt="Mounted View"
                width={192}
                height={224}
                className="max-w-[192px] h-[224px] w-full object-cover "
              />
              <p className="italic text-[15px] leading-[20px] font-[300]">
                Mounted View
              </p>
            </div>
          )}
        </div>
      </Stack>
    </CreateArtWorkFormContainer>
  );
};

export default CreateArtworkPreview;
