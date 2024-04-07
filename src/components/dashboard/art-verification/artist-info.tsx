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

export default function ArtistInfo({ nextPage = (x) => {} }) {
  const axiosAuth = useAxiosAuth();
  const metadataSchema = object({
    story: string().nonempty("Story is required"),
    videoCaption: string().optional(),
    attachment1Caption: string().optional(),
    attachment2Caption: string().optional(),
  });

  type MetadataInput = TypeOf<typeof metadataSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<MetadataInput>({
    resolver: zodResolver(metadataSchema),
  });

  const [loading, setLoading] = useState(false);
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
  const [wantToSell, setWantToSell] = useState(false);
  const [viaBroker, setViaBroker] = useState(false);
  const [sellerType, setSellerType] = useState("individual");
  const [organization, setOrganization] = useState<any>(null);
  const [attachments, setAttachments] = useState({
    video: null,
    attachment1: null,
    attachment2: null,
  });

  const onSubmitHandler: SubmitHandler<MetadataInput> = async (values) => {
    try {
      if (!attachments.video) {
        toast.error("Please upload a video");
        return;
      }

      setLoading(true);
      console.log(values);
      const formData = new FormData();
      formData.append("organization", organization);
      formData.append("sellerType", sellerType);
      formData.append("planToSell", wantToSell);
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
        `/art-piece/verify-artist/${artPieceId}`,
        formData,
      );
      //setPreviewImg(result.data.imageName)
      console.log("result here is ", result.data);

      setLoading(false);
      nextPage(12);
      //  router.replace("/dashboard");
      return;
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleUploadClick = (
    event,
    attachmentName: "video" | "attachment1" | "attachment2",
  ) => {
    const file = event.target.files[0];
    const reader = new FileReader();

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
          <fieldset className="collection">
            <h5 className="mb-4">Video</h5>
            <label className="uploadfile flex items-center justify-center">
              <div className="text-center flex flex-col items-center justify-center">
                {attachments.video ? (
                  <h5>{fileData.video.name}</h5>
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
          <div className="flex gap30">
            <fieldset className="collection">
              <label className="uploadfile h-full flex items-center justify-center">
                <div className="text-center flex flex-col items-center justify-center">
                  {attachments.attachment1 ? (
                    fileData.attachment1.type.includes("image") ? (
                      <Image
                        width={200}
                        height={200}
                        src={attachments.attachment1}
                        alt=""
                      />
                    ) : (
                      <h5>{fileData.attachment1.name}</h5>
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
                        PDF, JPEG.. Max 10Mb. Max 2 files.
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
              <label className="to-white">Caption:</label>
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
            <fieldset className="collection">
              <label className="uploadfile h-full flex items-center justify-center">
                <div className="text-center flex flex-col items-center justify-center">
                  {attachments.attachment2 ? (
                    fileData.attachment2.type.includes("image") ? (
                      <Image
                        width={200}
                        height={200}
                        src={attachments.attachment2}
                        alt=""
                      />
                    ) : (
                      <h5>{fileData.attachment2.name}</h5>
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
              <label className="to-white">Attachment 2 Caption:</label>
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
          <Divider />
          <div className="flex flex-wrap w-7/12 mx-auto gap-5 justify-between items-start pb-10">
            {/* Part of Series */}
            <div className="flex-1">
              <FormControlLabel
                control={
                  <Switch
                    checked={isSeries}
                    onChange={() => setIsSeries(!isSeries)}
                  />
                }
                label="is this part of a series?"
              />
            </div>
            <Divider orientation="vertical" />
            {/* Plan to sell */}
            <div className="flex-1 border-l-5 border-gray-300 ">
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
                    <MenuItem value={"organization"}>As Broker</MenuItem>
                  </Select>

                  {sellerType === "organization" && (
                    <SelectOrg
                      selectedOrg={organization}
                      setSelectedOrg={setOrganization}
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="btn-submit flex gap30 justify-center">
            <button className="tf-button style-1 h50 active" type="reset">
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
    </>
  );
}
