import React, { useEffect, useState } from "react";
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
  isUserOrg?: boolean;
}
export default function SelectOrg({
  selectedOrg,
  setSelectedOrg,
  defaultValues,
  isUserOrg,
}: Props) {
  const axiosFetch = useAxiosAuth();
  const [loading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [inviteOrg, setInviteOrg] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
  });
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: "name" | "email",
  ) => {
    setFormErrors({
      ...formErrors,
      [type]: "",
    });
    setFormValues({
      ...formValues,
      [type]: e.target.value,
    });
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: "name" | "email",
  ) => {
    if (!formValues[type]) {
      setFormErrors({
        ...formErrors,
        [type]: "Required",
      });
    } else if (type === "email" && !isValidEmail(formValues[type])) {
      setFormErrors({
        ...formErrors,
        [type]: "Invalid email format",
      });
    } else {
      setFormErrors({
        ...formErrors,
      });
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const onSubmitHandler = async () => {
    try {
      if (Object.values(formErrors).every((err) => !err)) {
        setSelectedOrg({
          name: formValues.name,
          email: formValues.email,
        });

        setFormValues({
          name: "",
          email: "",
        });
        setFormErrors({
          name: "",
          email: "",
        });

        setInviteOrg(false);
      } else {
        console.log(Object.values(formErrors));
      }
    } catch (error) {}
  };

  const fetchOrgs = async (query: string) => {
    try {
      setLoading(true);
      const { data: result } = isUserOrg
        ? await axiosFetch.get(`/org/user-orgs?q=${query}`)
        : await axiosFetch.get(`/org/list?q=${query}`);
      console.log(result.data);

      setOrganizations(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const debounceFetch = debounce(fetchOrgs, 1000);

  const handleOrgChange = (e) => {
    console.log(e.target.value);
    debounceFetch(e.target.value);
  };

  console.log(defaultValues);

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
              console.log(value);
              setSelectedOrg({
                _id: value?._id,
                name: value?.name,
                email: value?.email,
                address: value?.address,
              });
            }}
            sx={{ width: 300 }}
            defaultValue={selectedOrg || defaultValues}
            getOptionLabel={(option) => `${selectedOrg?.name || option?.name}`}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            loading={loading}
            noOptionsText={
              <p onClick={() => (!isUserOrg ? setInviteOrg(true) : {})}>
                {isUserOrg
                  ? "No organization found"
                  : ` Do not see the organization you are looking for here? Invite
                them`}
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
          <div id="commentform" className="comment-form">
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
                  onBlur={(e) => handleBlur(e, "name")}
                  error={Boolean(formErrors["name"])}
                  helperText={formErrors["name"] ? formErrors["name"] : ""}
                  onChange={(e) => handleChange(e, "name")}
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
                  onBlur={(e) => handleBlur(e, "email")}
                  error={Boolean(formErrors["email"])}
                  helperText={formErrors["email"] ? formErrors["email"] : ""}
                  onChange={(e) => handleChange(e, "email")}
                />
              </fieldset>

              <div className="flex justify-between items-center">
                <button
                  className="tf-button style-1 h50 active"
                  style={{ marginTop: "2.5em" }}
                  type="button"
                  onClick={onSubmitHandler}
                  disabled={!Object.values(formErrors).every((err) => !err)}
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
          </div>
        </>
      )}
    </div>
  );
}
