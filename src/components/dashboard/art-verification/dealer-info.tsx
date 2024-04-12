import { useState, useEffect } from "react";
import Image from "@/components/common/image";
import { useRouter } from "next/router";
import { object, string, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Autocomplete, Divider, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAuthContext } from "@/providers/auth.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import InviteArtist from "@/components/invite-artist";
import { IArtist } from "@/types/models";
import SelectOrg from "@/components/select-org";
import CommisionSplit from "@/components/CommisionSplit";
import { useToast } from "@/providers/ToastProvider";
import axios from "axios";
import { RiSaveLine } from "react-icons/ri";
import { set } from "date-fns";
import ImagePreview from "@/components/common/previews/ImagePreview";
import PdfPreview from "@/components/common/previews/PdfPreview";

export default function DealerInfo({
  nextPage = (x) => {},
  setActiveIndex,
  defaultValues,
}) {
  const axiosAuth = useAxiosAuth();
  const metadataSchema = object({
    notes: string().nonempty("notes is required"),
  });

  type MetadataInput = TypeOf<typeof metadataSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
    setValue,
  } = useForm<MetadataInput>({
    resolver: zodResolver(metadataSchema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const artPieceId = router.query.id as string;

  const [error, setError] = useState("");
  const [organization, setOrganization] = useState<any>(null);
  const [listedArtists, setListedArtists] = useState<IArtist[]>([]);
  const [percentages, setPercentages] = useState({});
  const [errorTree, setErrorTree] = useState({});
  const [attachment, setAttachment] = useState(null);
  const [fileData, setFileData] = useState({
    name: "",
    type: "",
  });
  const [saveLoading, setSaveLoading] = useState(false);

  const toast = useToast();

  const onSubmitHandler: SubmitHandler<MetadataInput> = async (
    values,
    event,
  ) => {
    // @ts-ignore
    const buttonClicked = event.nativeEvent.submitter.name;
    const save = buttonClicked === "save" ? true : false;

    try {
      save ? setSaveLoading(true) : setLoading(true);

      if (!attachment && !defaultValues?.agreementAttachment) {
        throw new Error("Image attachment is required");
      }

      // if (listedArtists?.length === 0) {
      //   toast.error("Artist is required");
      //   return;
      // }

      if (Object.keys(errorTree).length > 0) {
        throw new Error(Object.values(errorTree).join(" "));
      }

      if (!organization && !defaultValues?.organization?._id) {
        throw new Error("Organization is required");
      }

      if (Object.keys(percentages).length === 0) {
        throw new Error("Commission split is required");
        return;
      }

      const formData = new FormData();
      formData.append("agreement", attachment);
      formData.append("notes", values.notes);
      formData.append("commission", JSON.stringify(percentages));
      formData.append("save", JSON.stringify(save));
      formData.append(
        "artists",
        JSON.stringify(listedArtists?.map((item) => item?._id)),
      );
      organization && formData.append("organization", organization);
      console.log(attachment);
      console.log(formData);

      const result = await axiosAuth.post(
        `/verify-artpiece/dealer/${artPieceId}`,
        formData,
      );
      //setPreviewImg(result.data.imageName)
      // console.log("result here is ", result.data);

      setActiveIndex((prev) => prev + 1);
      nextPage(12);

      //  router.replace("/dashboard");
      return;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error(error?.message || "Something went wrong");
      }
    } finally {
      save ? setSaveLoading(false) : setLoading(false);
    }
  };

  useEffect(() => {
    if (defaultValues) {
      setValue("notes", defaultValues?.notes);
    }
  }, [defaultValues]);

  const handleUploadClick = (event) => {
    let file = event.target.files[0];
    const reader = new FileReader();
    let url = reader.readAsDataURL(file);

    setFileData({
      name: file.name,
      type: file.type,
    });

    console.log(url);

    reader.onloadend = function (e) {
      setAttachment(reader.result);
    }.bind(this);
    console.log(url); // Would see a path?

    setAttachment(event.target.files[0]);
  };

  return (
    <>
      <div className="wrap-content w-full">
        {/* {error && <h5 style={{ color: "red" }}>{error}</h5>} */}
        <h3 className="mb-5">Dealer Information</h3>
        {/* <InviteArtist
          listedArtists={listedArtists}
          setListedArtists={setListedArtists}
        /> */}

        <SelectOrg
          defaultValues={defaultValues?.organization}
          selectedOrg={organization}
          setSelectedOrg={setOrganization}
        />
        <div>
          <Divider className="my-4">
            <h5>Commision Split</h5>
          </Divider>
          <CommisionSplit
            defaultValues={defaultValues?.collaborators}
            percentages={percentages}
            setPercentages={setPercentages}
            errorTree={errorTree}
            setErrorTree={setErrorTree}
          />
          <Divider />
        </div>
        <form
          id="commentform"
          className="comment-form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="my-4 grid gap-4">
            <h5>Contract Agreement Document</h5>
            <div className="flex gap30 ">
              <fieldset className="collection">
                <label className="uploadfile flex items-center justify-center">
                  <div className="text-center flex flex-col items-center justify-center">
                    {attachment || defaultValues?.agreementAttachment ? (
                      <>
                        {fileData.type.includes("image") ||
                        !defaultValues?.agreementAttachment.includes("pdf") ? (
                          <ImagePreview
                            src={
                              attachment || defaultValues?.agreementAttachment
                            }
                          />
                        ) : (
                          // <Image
                          //   width={200}
                          //   height={200}
                          //   className=" object-cover"
                          //   alt={""}
                          //   src={attachment}
                          // />
                          <PdfPreview
                            file={
                              attachment || defaultValues?.agreementAttachment
                            }
                          />
                        )}
                      </>
                    ) : (
                      <>
                        <Image
                          width={200}
                          height={200}
                          src="/assets/images/box-icon/upload.png"
                          alt=""
                        />
                        <p>Drag or choose attachment to upload</p>
                        <h6 className="text text-gray-600">
                          PDF, JPEG.. Max 10Mb.
                        </h6>
                      </>
                    )}
                    <TextField
                      type="file"
                      name="attachment"
                      // InputProps={{ accept: "pdf,image/*", }}
                      onChange={handleUploadClick}
                    />
                  </div>
                </label>
              </fieldset>
            </div>
          </div>

          <fieldset className="message  p-2">
            <label>Notes *</label>
            <TextField
              id="notes"
              name="notes"
              type="text"
              className="p-0"
              InputProps={{ className: "textarea w-full h-full", style: {} }}
              rows={4}
              multiline
              placeholder="Notes"
              aria-required="true"
              fullWidth
              error={!!errors["notes"]}
              helperText={errors["notes"] ? errors["notes"].message : ""}
              {...register("notes")}
            />
          </fieldset>
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

          {/* <div className="btn-submit flex gap30 justify-center">
            <button className="tf-button style-1 h50 active" type="reset">
              Clear
              <i className="icon-arrow-up-right2" />
            </button>
            <LoadingButton
              className="tf-button style-1 h50"
              loading={loading}
              type="submit"
            >
              Submit
              <i className="icon-arrow-up-right2" />
            </LoadingButton>
          </div> */}
        </form>
      </div>
    </>
  );
}
