import { useState, useEffect } from "react";

import { useRouter } from "next/router";
import { object, string, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAuthContext } from "@/providers/auth.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import SelectOrg from "@/components/select-org";
import Image from "next/image";
import { is } from "date-fns/locale";
import DatePicker from "@/components/common/datepicker";
import axios from "axios";
import { RiSaveLine } from "react-icons/ri";
import ImagePreview from "@/components/common/previews/ImagePreview";
import PdfPreview from "@/components/common/previews/PdfPreview";

export default function CollectorInfo({
  nextPage = (x) => {},
  setActiveIndex,
  defaultValues,
}) {
  console.log(defaultValues);
  const axiosAuth = useAxiosAuth();
  const metadataSchema = object({
    date: string().nonempty("Date is required"),
    acquisitionType: string().nonempty("Channel is required"),
    acquisitionPurpose: string().nonempty(),
    // methodOfPurchase: string().nonempty("Subject matter is required"),
    acquisitionDocumentCaption: string().optional(),
  });

  type MetadataInput = TypeOf<typeof metadataSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
    setValue,
    getValues,
    handleSubmit,
  } = useForm<MetadataInput>({
    resolver: zodResolver(metadataSchema),
  });

  console.log(errors);

  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const artPieceId = router.query.id;
  const [error, setError] = useState("");
  const { logIn, user, error: loginError } = useAuthContext();
  const [acquisitionDocument, setAcquisitionDocument] = useState(null);
  const [methodOfPurchase, setMethodOfPurchase] = useState<
    "individual" | "organization"
  >("individual");
  const [fileData, setFileData] = useState({
    name: "",
    type: "",
  });
  const toast = useToast();
  const [organization, setOrganization] = useState<any>(null);
  const [isCirca, setIsCirca] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const onSubmitHandler: SubmitHandler<MetadataInput> = async (
    values,
    event,
  ) => {
    // @ts-ignore
    const buttonClicked = event.nativeEvent.submitter.name;
    const save = buttonClicked === "save" ? true : false;
    try {
      console.log(defaultValues.attachment);
      if (!acquisitionDocument && !defaultValues?.attachment) {
        throw new Error("Please attached the acquisition document");
      }

      if (!methodOfPurchase) {
        throw new Error("Please select the method of purchase");
      }
      if (
        methodOfPurchase === "organization" &&
        !organization &&
        defaultValues.organization
      ) {
        throw new Error("Please select the organization");
      }

      save ? setSaveLoading(true) : setLoading(true);

      const formData = new FormData();
      formData.append("save", JSON.stringify(save));
      formData.append("date", values.date);
      acquisitionDocument &&
        formData.append("acquisitionDocument", acquisitionDocument);
      formData.append("acquisitioPurpose", values.acquisitionPurpose);
      formData.append("methodOfPurchase", methodOfPurchase);
      formData.append(
        "acquisitionDocumentCaption",
        values.acquisitionDocumentCaption || "",
      );
      formData.append("aquisitionType", values.acquisitionType);
      formData.append("organization", organization || "");
      formData.append("isCirca", JSON.stringify(isCirca));

      const result = await axiosAuth.post(
        `/verify-artpiece/collector/${artPieceId}`,
        formData,
      );

      setActiveIndex((prev) => prev + 1);

      return;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "Something went wrong");
      }
      setError(error.message);
    } finally {
      save ? setSaveLoading(false) : setLoading(false);
    }
  };

  useEffect(() => {
    if (defaultValues) {
      setValue("date", defaultValues.date);
      setValue("acquisitionType", defaultValues.type);
      setValue("acquisitionPurpose", defaultValues.purpose);
      setMethodOfPurchase(defaultValues.methodOfPurchase);
      setIsCirca(defaultValues.isCirca);
    }
  }, [defaultValues]);

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setAcquisitionDocument(reader.result);
    }.bind(this);

    setFileData({
      name: file.name,
      type: file.type,
    });
    console.log(url); // Would see a path?

    setPreviewImg(event.target.files[0]);
  };

  return (
    <>
      <div className="wrap-content w-full">
        {/* {error && <h5 style={{ color: "red" }}>{error}</h5>} */}
        <h3 className="mb-6">Collector Information</h3>
        <form
          id="commentform"
          className="comment-form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="flex gap30">
            <fieldset className="name">
              <label>Date Of Purchase *</label>
              <DatePicker
                // @ts-ignore
                {...register("date", { name: "date" })}
                // @ts-ignore

                name="date"
                control={control}
                error={!!errors["date"]}
                helperText={errors["date"] ? errors["date"].message : ""}
              />
            </fieldset>
            <FormControlLabel
              control={
                <Switch
                  checked={isCirca}
                  onChange={() => setIsCirca(!isCirca)}
                />
              }
              label="isCirca"
            />
            <fieldset className="collection">
              <label>Acquisition Type *</label>
              <select
                className="select"
                tabIndex={2}
                name="acquisitionType"
                id="acquisitionType"
                {...register("acquisitionType")}
              >
                <option disabled selected value="">
                  Select
                </option>
                <option value="direct">Direct from artist</option>
                <option value="broker">Broker</option>
                <option value="auction">Auction</option>
                <option value="donation">Donation</option>
                <option value="inheritance">Inheritance</option>
                <option value="gift">Gift</option>
                <option value="salvage">Salvage</option>
                <option value="other">Other</option>
              </select>
            </fieldset>
          </div>
          <fieldset className="">
            <label>Acquisition Purpose *</label>
            <select
              className="select"
              tabIndex={2}
              name="acquisitionPurpose"
              id="acquisitionPurpose"
              {...register("acquisitionPurpose")}
            >
              <option disabled selected value="">
                Select
              </option>
              <option value="sale">Sale</option>
              <option value="resale">Resale</option>
              <option value="investment">Investment</option>
              <option value="donation">Donation</option>
              <option value="showcase">Showcase</option>
              <option value="gift">Gift</option>
              <option value="other">Other</option>
            </select>
          </fieldset>

          <div className="flex gap30">
            <fieldset className="">
              <label>How did you acquire this artwork *</label>
              <select
                value={methodOfPurchase}
                className="select"
                tabIndex={2}
                name="methodOfPurchase"
                id="methodOfPurchase"
                onChange={(e) =>
                  setMethodOfPurchase(
                    e.target.value as unknown as "individual" | "organization",
                  )
                }
              >
                <option disabled selected value="">
                  Select
                </option>
                <option value="individual">From an individual</option>
                <option value="organization">From an organization</option>
              </select>
            </fieldset>

            {methodOfPurchase === "organization" && (
              <fieldset>
                <SelectOrg
                  defaultValues={defaultValues?.organization}
                  selectedOrg={organization}
                  setSelectedOrg={setOrganization}
                />
              </fieldset>
            )}
          </div>

          <fieldset className="collection">
            <h5 className="mb-4">Acquisition Document *</h5>
            <label className="uploadfile h-full flex items-center justify-center">
              <div className="text-center flex flex-col gap-4 items-center justify-center">
                {acquisitionDocument || defaultValues?.attachment ? (
                  fileData.type.includes("image") ||
                  !defaultValues.attachment.includes("pdf") ? (
                    <ImagePreview
                      src={acquisitionDocument || defaultValues?.attachment}
                    />
                  ) : (
                    <PdfPreview
                      file={acquisitionDocument || defaultValues?.attachment}
                    />
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
                    <p className="text">Drag or choose attachment to upload</p>
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
                  onChange={handleUploadClick}
                />
              </div>
            </label>
            <label className="to-white mt-4">Caption:</label>
            <TextField
              type="text"
              id="acquisitionDocumentCaption"
              placeholder="publication document"
              name="acquisitionDocumentCaption"
              tabIndex={2}
              fullWidth
              // defaultValue={publication?.acquisitionDocumentCaption}
              error={!!errors["acquisitionDocumentCaption"]}
              helperText={
                errors["acquisitionDocumentCaption"]
                  ? errors["acquisitionDocumentCaption"].message
                  : ""
              }
              {...register("acquisitionDocumentCaption")}
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
                loading={loading}
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
                Published
                <i className="icon-arrow-up-right2" />
              </LoadingButton>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
