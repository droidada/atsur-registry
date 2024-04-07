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

export default function CollectorInfo({ nextPage = (x) => {} }) {
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

  console.log(artPieceId);

  const onSubmitHandler: SubmitHandler<MetadataInput> = async (values) => {
    try {
      if (!acquisitionDocument) {
        toast.error("Please attached the acquisition document");
        return;
      }

      if (!methodOfPurchase) {
        toast.error("Please select the method of purchase");
        return;
      }
      if (methodOfPurchase === "organization" && !organization) {
        toast.error("Please select the organization");
        return;
      }

      setLoading(true);
      console.log(values);
      const formData = new FormData();
      formData.append("date", values.date);
      formData.append("acquisitionDocument", acquisitionDocument);
      formData.append("acquisitioPurpose", values.acquisitionPurpose);
      formData.append("methodOfPurchase", methodOfPurchase);
      formData.append(
        "acquisitionDocumentCaption",
        values.acquisitionDocumentCaption || "",
      );
      formData.append("aquisitionType", values.acquisitionType);
      formData.append("organization", organization || "");
      formData.append("isCirca", isCirca);

      const result = await axiosAuth.post(
        `/art-piece/verify-collector/${artPieceId}`,
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
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
      setError(error.message);
      setLoading(false);
    }
  };

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
                  selectedOrg={organization}
                  setSelectedOrg={setOrganization}
                />
              </fieldset>
            )}
          </div>

          <fieldset className="collection">
            <h5 className="mb-4">Acquisition Document *</h5>
            <label className="uploadfile h-full flex items-center justify-center">
              <div className="text-center flex flex-col items-center justify-center">
                {acquisitionDocument ? (
                  fileData.type.includes("image") ? (
                    <Image
                      className="w-[200px] h-[200px] object-cover rounded-lg"
                      width={200}
                      height={400}
                      alt={""}
                      src={acquisitionDocument}
                    />
                  ) : (
                    <h5>{fileData.name}</h5>
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
