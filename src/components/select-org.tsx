import { useEffect, useState } from "react";
import axios from "@/lib/axios";
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

interface Props {
  setSelectedOrg: React.Dispatch<React.SetStateAction<any>>;
  selectedOrg: any;
  defaultValues?: any;
}
export default function SelectOrg({ selectedOrg, setSelectedOrg }: Props) {
  const axiosFetch = useAxiosAuth();
  const [loading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [inviteOrg, setInviteOrg] = useState(false);

  const inviteOrgSchema = object({
    name: string().nonempty("Organiztion name is required"),
    email: string().email().nonempty("organization email is required"),
  });

  type InviteOrgInput = TypeOf<typeof inviteOrgSchema>;
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<InviteOrgInput>({
    resolver: zodResolver(inviteOrgSchema),
  });

  const onSubmitHandler: SubmitHandler<InviteOrgInput> = async (values) => {
    setSelectedOrg({
      name: values.name,
      email: values.email,
    });
    reset();
    setInviteOrg(false);
  };

  const fetchOrgs = async (query: string) => {
    try {
      setLoading(true);
      const { data: result } = await axiosFetch.get(`/org/list?q=${query}`);

      setOrganizations(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const debounceFetch = debounce(fetchOrgs, 1000);

  const handleOrgChange = (e) => {
    debounceFetch(e.target.value);
  };

  return (
    <div className="">
      <label className="mb-4">Add organization</label>
      {!inviteOrg ? (
        <div className="w-full ">
          <Autocomplete
            disablePortal
            className="w-full"
            id="combo-box-demo"
            fullWidth
            options={organizations}
            onChange={(event, value) => {
              setSelectedOrg(value?._id);
            }}
            sx={{ width: 300 }}
            getOptionLabel={(option) => `${option?.name || selectedOrg?.name}`}
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
                placeholder="Select organization"
                label="Organization"
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
          <form
            id="commentform"
            className="comment-form"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <div className=" max-w-[450px] mx-auto gap-2 p-2 borderd-2 rounded-xl">
              <fieldset className="name">
                <label>Organization Name *</label>
                <TextField
                  type="text"
                  id="name"
                  placeholder="Organization Name"
                  name="name"
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  error={!!errors["name"]}
                  helperText={errors["name"] ? errors["name"].message : ""}
                  {...register("name")}
                />
              </fieldset>

              <fieldset className="email">
                <label>Organization Email *</label>
                <TextField
                  type="text"
                  id="email"
                  placeholder="Organization Email"
                  name="email"
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  error={!!errors["email"]}
                  helperText={errors["email"] ? errors["email"].message : ""}
                  {...register("email")}
                />
              </fieldset>
              <div className="flex justify-between items-center">
                <button
                  className="tf-button style-1 h50 active"
                  style={{ marginTop: "2.5em" }}
                  type="submit"
                >
                  Add
                </button>
                <button
                  className="tf-button style-1 h50 "
                  style={{ marginTop: "2.5em" }}
                  onClick={() => setInviteOrg(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
