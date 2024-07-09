import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import axiosCheck from "axios";
import {
  Autocomplete,
  Box,
  CircularProgress,
  TextField,
  debounce,
} from "@mui/material";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { array, object, string, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { useToast } from "@/providers/ToastProvider";
import LoadingButton from "./Form/LoadingButton";

interface Props {
  setSelectedSeries: React.Dispatch<React.SetStateAction<any>>;
  selectedSeries: any;
}
export default function SelectSeries({
  selectedSeries,
  setSelectedSeries,
}: Props) {
  const axiosFetch = useAxiosAuth();
  const [loading, setLoading] = useState(false);
  const [series, setSeries] = useState<any[]>([]);
  const [inviteOrg, setInviteOrg] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [formInfo, setFormInfo] = useState({
    title: "",
    description: "",
  });
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUploadClick = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      for (const key in formInfo) {
        if (!formInfo[key]) {
          toast.error(`${key} is required`);
          return;
        }
      }
      if (!imageUrl) {
        toast.error("Please select a series image");
        return;
      }
      const formData = new FormData();
      formData.append("title", formInfo.title);
      formData.append("description", formInfo.description);

      formData.append("image", imageUrl);

      const { data } = await axiosFetch.post("/art-series/", formData);

      console.log(data);
      setImageUrl(null);
      setFormInfo({
        title: "",
        description: "",
      });
      setInviteOrg(false);
    } catch (error) {
      console.log(error);
      if (axiosCheck.isAxiosError(error)) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchSeries = async (query: string) => {
    try {
      setLoading(true);
      const { data: result } = await axiosFetch.get(`/art-series?q=${query}`);

      setSeries(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const debounceFetch = debounce(fetchSeries, 1000);

  const handleOrgChange = (e) => {
    debounceFetch(e.target.value);
  };

  return (
    <div className="">
      <label className="mb-4">Add Series</label>
      {!inviteOrg ? (
        <div className="w-full ">
          <Autocomplete
            disablePortal
            className="w-full"
            id="combo-box-demo"
            fullWidth
            options={series}
            onChange={(event, value) => {
              setSelectedSeries(value);
            }}
            sx={{ width: 300 }}
            getOptionLabel={(option) =>
              `${option?.title || selectedSeries?.title}`
            }
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            loading={loading}
            noOptionsText={
              <p
                onClick={() => {
                  setInviteOrg(true);
                }}
              >
                Do not see the organization you are looking for here? Invite
                them
              </p>
            }
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={handleOrgChange}
                placeholder="Select Series"
                label="Series"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </div>
      ) : (
        <>
          <div>
            <div className=" max-w-[450px] mx-auto gap-2 p-2 borderd-2 rounded-xl">
              <fieldset className="name">
                <label>title *</label>
                <TextField
                  type="text"
                  id="name"
                  placeholder="title"
                  name="name"
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  onChange={(e) =>
                    setFormInfo({ ...formInfo, title: e.target.value })
                  }
                />
              </fieldset>

              <fieldset className="email">
                <label>Description *</label>
                <TextField
                  type="text"
                  id="email"
                  placeholder="Description"
                  name="email"
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  onChange={(e) =>
                    setFormInfo({ ...formInfo, description: e.target.value })
                  }
                />
              </fieldset>
              <fieldset className="collection">
                <h5 className="mb-4">Image</h5>
                <label className="uploadfile flex items-center justify-center">
                  <div className="text-center flex flex-col items-center justify-center">
                    {imageUrl ? (
                      <Image alt="" width={200} height={200} src={imageUrl} />
                    ) : (
                      <>
                        <p>Drag or choose Image to upload</p>
                        <h6 className="text text-gray-600">
                          Image max size 50MB{" "}
                        </h6>
                      </>
                    )}
                    <input
                      type="file"
                      name="video"
                      accept="image/*"
                      onChange={handleUploadClick}
                    />
                  </div>
                </label>
              </fieldset>
              <div className="flex justify-between items-center">
                <LoadingButton
                  loading={isSubmitting}
                  className="tf-button style-1 h50 active"
                  // style={{ marginTop: "2.5em" }}
                  onClick={handleSubmit}
                >
                  Add
                </LoadingButton>
                <button
                  className="tf-button style-1 h50 "
                  style={{ marginTop: "2.5em" }}
                  onClick={() => setInviteOrg(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
