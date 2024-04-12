import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { object, string, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Divider,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAuthContext } from "@/providers/auth.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { IArtist } from "@/types/models";
import SelectOrg from "@/components/select-org";
import { useToast } from "@/providers/ToastProvider";
import { set } from "date-fns";
import SelectSeries from "@/components/select-series";
import { RiSaveLine } from "react-icons/ri";
import axios from "axios";
import VideoPreview from "@/components/common/previews/VideoPreview";
import PdfPreview from "@/components/common/previews/PdfPreview";
import ImagePreview from "@/components/common/previews/ImagePreview";

export default function ArtistInfo({
  nextPage = (x) => {},
  removeDealerFromSteps,
  addDealerToSteps,
  setActiveIndex,
  defaultValues,
}) {
  const axiosAuth = useAxiosAuth();
  const metadataSchema = object({
    story: string().nonempty("Story is required"),
    videoCaption: string().optional(),
    attachment1Caption: string().optional(),
    attachment2Caption: string().optional(),
  });

  console.log(defaultValues);

  type MetadataInput = TypeOf<typeof metadataSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    setValue,
    handleSubmit,
  } = useForm<MetadataInput>({
    resolver: zodResolver(metadataSchema),
  });

  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const router = useRouter();
  const artPieceId = router.query.id;
  const [fileData, setFileData] = useState({
    video: {
      name: "",
      type: "",
    },
    attachment1: {
      name: "",
      type: "",
    },
    attachment2: {
      name: "",
      type: "",
    },
  });
  const toast = useToast();

  const [error, setError] = useState("");
  const { logIn, user, error: loginError } = useAuthContext();
  const [listedArtists, setListedArtists] = useState<IArtist[]>([]);
  const [isSeries, setIsSeries] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState<any>(null);

  const [wantToSell, setWantToSell] = useState(false);
  const [viaBroker, setViaBroker] = useState(false);
  const [sellerType, setSellerType] = useState("individual");
  const [organization, setOrganization] = useState<any>(null);
  const [attachments, setAttachments] = useState({
    video: null,
    attachment1: null,
    attachment2: null,
  });

  const onSubmitHandler: SubmitHandler<MetadataInput> = async (
    values,
    event,
  ) => {
    // @ts-ignore
    const buttonClicked = event.nativeEvent.submitter.name;
    const save = buttonClicked === "save" ? true : false;

    save ? setSaveLoading(true) : setLoading(true);
    try {
      console.log(attachments.video, defaultValues?.creationVideo);
      if (!defaultValues?.creationVideo?.url && !attachments.video) {
        throw new Error("Please upload a video");
      }

      console.log(isSeries, selectedSeries, defaultValues?.series);
      if (isSeries && !selectedSeries && !defaultValues?.series) {
        throw new Error("Please select a series");
      }

      const formData = new FormData();

      formData.append("sellerType", sellerType);
      formData.append("planToSell", JSON.stringify(wantToSell));
      selectedSeries && formData.append("series", selectedSeries?._id);
      formData.append("isSeries", JSON.stringify(isSeries));
      formData.append("save", JSON.stringify(save));
      attachments.video &&
        formData.append(
          "video",
          JSON.stringify({
            attachment: attachments.video,
            caption: values.videoCaption,
          }),
        );
      formData.append(
        "attachments",
        JSON.stringify([
          {
            attachment: attachments.attachment1,
            caption: values.attachment1Caption,
          },
          {
            attachment: attachments.attachment2,
            caption: values.attachment2Caption,
          },
        ]),
      );
      formData.append("story", values.story);

      const result = await axiosAuth.post(
        `/verify-artpiece/artist/${artPieceId}`,
        formData,
      );
      //setPreviewImg(result.data.imageName)
      // console.log("result here is ", result.data);

      setLoading(false);
      setActiveIndex((prev) => prev + 1);
      //  router.replace("/dashboard");
      return;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message);
      } else {
        console.log(error);
        toast.error(error?.message || "Something went wrong");
      }
      setError(error.message);
    } finally {
      save ? setSaveLoading(false) : setLoading(false);
    }
  };

  const handleUploadClick = (
    event,
    attachmentName: "video" | "attachment1" | "attachment2",
  ) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    console.log(file);

    let sizeLimit: number;
    if (attachmentName === "video") {
      sizeLimit = 100 * 1024 * 1024; // 100MB in bytes
    } else {
      sizeLimit = 10 * 1024 * 1024; // 10MB in bytes
    }

    if (file?.size > sizeLimit) {
      toast.error(`File size exceeds the limit for ${attachmentName}`);
      return;
    }

    // if(attachmentName.includes("attachment") && file.)

    setFileData((prev) => ({
      ...prev,
      [attachmentName]: { name: file.name, type: file.type },
    }));

    reader.onload = (e) => {
      setAttachments((prev) => ({
        ...prev,
        [attachmentName]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  console.log(defaultValues);

  useEffect(() => {
    if (defaultValues) {
      setValue("story", defaultValues.storyTelling);
      setWantToSell(defaultValues.planToSell);
      setIsSeries(defaultValues.partOfSeries);
      setSellerType(defaultValues.sellerType);
      setSelectedSeries(defaultValues.series);
    }
  }, [defaultValues]);

  console.log(attachments.video, defaultValues?.creationVideo?.url);

  return (
    <>
      <div className="wrap-content w-full">
        <h3 className="mb-5">Artist Information</h3>
        <form
          id="commentform"
          className="comment-form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <fieldset className="message">
            <label>Story *</label>
            <TextField
              id="story"
              name="story"
              type="text"
              InputProps={{ className: "textarea story", style: {} }}
              rows={15}
              multiline
              placeholder="Tell the story behind the creation of your piece."
              tabIndex={2}
              aria-required="true"
              fullWidth
              error={!!errors["story"]}
              helperText={errors["story"] ? errors["story"].message : ""}
              {...register("story")}
            />
          </fieldset>
          <Divider>Attachements</Divider>
          <div>
            <fieldset className="collection">
              <h5 className="mb-4">Video</h5>
              <label className="uploadfile flex items-center justify-center">
                <div className="text-center flex gap-4 flex-col items-center justify-center">
                  {attachments.video || defaultValues?.creationVideo?.url ? (
                    <VideoPreview
                      file={
                        attachments.video || defaultValues?.creationVideo?.url
                      }
                    />
                  ) : (
                    <>
                      <p>Drag or choose Video to upload</p>
                      <h6 className="text text-gray-600">
                        Video max size 100MB{" "}
                      </h6>
                    </>
                  )}
                  <input
                    type="file"
                    name="video"
                    accept="video/*"
                    onChange={(e) => handleUploadClick(e, "video")}
                  />
                </div>
              </label>
            </fieldset>

            <label>Other Attachments:</label>
            <div className="flex my-4 items-stretch flex-wrap lg:flex-nowrap gap30">
              <fieldset className="collection ">
                <label className="uploadfile  flex items-center justify-center">
                  <div className="text-center flex flex-col items-center justify-center">
                    {attachments.attachment1 ||
                    defaultValues?.attachments[0] ? (
                      fileData.attachment1.type.includes("image") ||
                      !defaultValues?.attachments[0]?.url.includes("pdf") ? (
                        <ImagePreview
                          src={
                            attachments.attachment1 ||
                            defaultValues?.attachments[0]?.url
                          }
                        />
                      ) : (
                        <PdfPreview
                          file={
                            attachments.attachment1 ||
                            defaultValues?.attachments[0]?.url
                          }
                        />
                        // <h5>{fileData.attachment1.name}</h5>
                      )
                    ) : (
                      <>
                        <Image
                          width={200}
                          height={200}
                          src="/assets/images/box-icon/upload.png"
                          alt=""
                        />
                        {/* <h5 className="text-white">Image</h5> */}
                        <p className="text">
                          Drag or choose attachment to upload
                        </p>
                        <h6 className="text text-gray-600">
                          PDF, JPEG.. Max 10Mb.
                        </h6>
                      </>
                    )}
                    <input
                      type="file"
                      name="attachment"
                      accept="application/pdf,image/*"
                      multiple
                      onChange={(e) => handleUploadClick(e, "attachment1")}
                    />
                  </div>
                </label>
                <label className="to-white mt-2">Attachment 1 Caption:</label>
                <TextField
                  type="text"
                  id="attachment1Caption"
                  placeholder="publication document"
                  name="attachment1Caption"
                  tabIndex={2}
                  fullWidth
                  // defaultValue={publication?.attachment1Caption}
                  error={!!errors["attachment1Caption"]}
                  helperText={
                    errors["attachment1Caption"]
                      ? errors["attachment1Caption"].message
                      : ""
                  }
                  {...register("attachment1Caption")}
                />
              </fieldset>
              <fieldset className="collection ">
                <label className="uploadfile flex  items-center justify-center">
                  <div className="text-center flex flex-col  items-center justify-center">
                    {attachments.attachment2 ||
                    defaultValues?.attachments[1] ? (
                      fileData.attachment2.type.includes("image") ||
                      !defaultValues?.attachments[1]?.url.includes("pdf") ? (
                        <ImagePreview
                          src={
                            attachments.attachment2 ||
                            defaultValues?.attachments[1]?.url
                          }
                        />
                      ) : (
                        <PdfPreview
                          file={
                            attachments.attachment2 ||
                            defaultValues?.attachments[1]?.url
                          }
                        />
                        // <h5>{fileData.attachment1.name}</h5>
                      )
                    ) : (
                      <>
                        <Image
                          width={200}
                          height={200}
                          src="/assets/images/box-icon/upload.png"
                          alt=""
                        />
                        {/* <h5 className="text-white">Image</h5> */}
                        <p className="text">
                          Drag or choose attachment to upload
                        </p>
                        <h6 className="text text-gray-600">
                          PDF, JPEG.. Max 10Mb.
                        </h6>
                      </>
                    )}
                    <input
                      type="file"
                      name="attachment"
                      accept="application/pdf,image/*"
                      multiple
                      onChange={(e) => handleUploadClick(e, "attachment2")}
                    />
                  </div>
                </label>
                <label className="to-white mt-2">Attachment 2 Caption:</label>
                <TextField
                  type="text"
                  id="attachment2Caption"
                  placeholder="publication document"
                  name="attachment2Caption"
                  tabIndex={2}
                  fullWidth
                  // defaultValue={publication?.attachment2Caption}
                  error={!!errors["attachment2Caption"]}
                  helperText={
                    errors["attachment2Caption"]
                      ? errors["attachment2Caption"].message
                      : ""
                  }
                  // {...register("attachment2Caption")}
                />
              </fieldset>
            </div>
          </div>
          <Divider />
          <div className="flex flex-wrap w-full  p-4  gap-5 justify-between items-start pb-10">
            {/* Part of Series */}
            <div className="">
              <FormControlLabel
                control={
                  <Switch
                    checked={isSeries}
                    onChange={() => setIsSeries(!isSeries)}
                  />
                }
                label="is this part of a series?"
              />
              {isSeries && (
                <SelectSeries
                  selectedSeries={selectedSeries}
                  setSelectedSeries={setSelectedSeries}
                />
              )}
            </div>
            <Divider orientation="vertical" />
            {/* Plan to sell */}
            <div className=" border-l-5 border-gray-300 ">
              <FormControlLabel
                control={
                  <Switch
                    checked={wantToSell}
                    onChange={() => {
                      setWantToSell(!wantToSell);
                      if (!wantToSell) {
                        setSellerType("individual");
                        setOrganization("");
                      }
                    }}
                  />
                }
                label="Do you plan to sell?"
              />
              {wantToSell && (
                <div>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sellerType}
                    onChange={(e) => setSellerType(e.target.value)}
                    fullWidth
                    label="Seller Type"

                    // onChange={handleChange}
                  >
                    <MenuItem value={"individual"}>As Individual</MenuItem>
                    <MenuItem
                      onClick={() => {
                        addDealerToSteps();
                      }}
                      value={"organization"}
                    >
                      As Broker
                    </MenuItem>
                  </Select>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap w-full    gap-5 justify-between items-center p-4">
            <button
              onClick={() => setActiveIndex((prev) => prev - 1)}
              className="tf-button style-1 h50 w-full active"
            >
              Prev
            </button>
            <div className="btn-submit flex gap30 justify-center">
              <LoadingButton
                loading={saveLoading}
                variant="contained"
                name="save"
                className="tf-button style-1 h50 active"
                type="submit"
              >
                Save
                <RiSaveLine />
              </LoadingButton>
              <LoadingButton
                className="tf-button style-1 h50"
                loading={loading}
                type="submit"
                name="published"
              >
                Publish
                <i className="icon-arrow-up-right2" />
              </LoadingButton>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
