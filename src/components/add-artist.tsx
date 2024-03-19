import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { array, object, string, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { axiosAuth } from "@/lib/axios";
import {
  Autocomplete,
  Typography,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";

interface Artist {
  firstName: string;
  lastName: string;
  email: string;
}
const InviteArtist = ({ width = 600, prompt = "" }) => {
  const [loading, setLoading] = useState(false);
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [inviteArtist, setInviteArtist] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist[]>([]);
  const autocompleteLoading =
    autocompleteOpen && options.length === 0 && loading;

  const inviteArtistSchema = object({
    firstName: string().nonempty("Artist first name is required"),
    lastName: string().nonempty("Artist last name is required"),
    email: string().email().nonempty("Artist email is required"),
  });
  type InviteArtistInput = TypeOf<typeof inviteArtistSchema>;
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<InviteArtistInput>({
    resolver: zodResolver(inviteArtistSchema),
  });

  const onSubmitHandler = async (event) => {};

  const handleArtistChange = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      console.log("search value is ", event.target.value);
      const res = await axiosAuth.post(`user/search`, {
        search: event.target.value,
      });
      const data = res.data.users;
      console.log("we have options here ", data);
      setOptions(data && data?.length > 0 ? data : []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      {!inviteArtist ? (
        <Box gridColumn="span 12">
          <p> {prompt} </p>
          <Autocomplete
            multiple
            onChange={(event: any, newValue: any) => {
              setSelectedArtist([...selectedArtist, newValue]);
            }}
            style={{ width: width, marginTop: 5 }}
            id="size-small-outlined-multi"
            size="medium"
            fullWidth
            open={autocompleteOpen}
            onOpen={() => {
              setAutocompleteOpen(true);
            }}
            onClose={() => {
              setAutocompleteOpen(false);
            }}
            getOptionLabel={(option) =>
              `${option.firstName} ${option.lastName}`
            }
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            loading={autocompleteLoading}
            options={options}
            noOptionsText={
              <p onClick={() => setInviteArtist(true)}>
                Do not see the artist? Invite them
              </p>
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Artist name"
                placeholder="Artist name"
                onChange={handleArtistChange}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {autocompleteLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Box>
      ) : (
        <>
          <form
            id="commentform"
            className="comment-form"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <div className="flex gap30">
              <fieldset className="firstName">
                <label>First Name *</label>
                <TextField
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  name="firstName"
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  error={!!errors["firstName"]}
                  helperText={
                    errors["firstName"] ? errors["firstName"].message : ""
                  }
                  {...register("firstName")}
                />
              </fieldset>
              <fieldset className="lastName">
                <label>Last Name *</label>
                <TextField
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  name="lastName"
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  error={!!errors["lastName"]}
                  helperText={
                    errors["lastName"] ? errors["lastName"].message : ""
                  }
                  {...register("lastName")}
                />
              </fieldset>
              <fieldset className="email">
                <label>Email *</label>
                <TextField
                  type="text"
                  id="email"
                  placeholder="Email"
                  name="email"
                  tabIndex={2}
                  aria-required="true"
                  fullWidth
                  error={!!errors["email"]}
                  helperText={errors["email"] ? errors["email"].message : ""}
                  {...register("email")}
                />
              </fieldset>
            </div>
            <div className="btn-submit flex gap30 justify-center">
              <button className="tf-button style-1 h50 active" type="submit">
                Add
                <i className="icon-arrow-up-right2" />
              </button>
            </div>
          </form>

          <LoadingButton
            className="tf-button style-1 h50"
            loading={loading}
            type="submit"
          >
            Invite
            <i className="icon-arrow-up-right2" />
          </LoadingButton>
        </>
      )}
    </>
  );
};

export default InviteArtist;
