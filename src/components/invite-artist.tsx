import { useState, useEffect } from "react";
import { array, object, string, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { axiosAuth } from "@/lib/axios";
import {
  Autocomplete,
  Typography,
  Box,
  TextField,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
} from "@mui/material";
import { Person4, Delete } from "@mui/icons-material";
import { IArtist } from "@/types/models";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import { LoadingButton } from "@mui/lab";

interface Props {
  prompt?: string;
  listedArtists?: IArtist[];
  setListedArtists?: React.Dispatch<React.SetStateAction<IArtist[]>>;
  placeholder?: string;
  label?: string;
  justOne?: boolean;
  showList?: boolean;
  onClose?: () => void;
  type?: "user" | "art-piece-artist" | "art-piece-collaborator";
}

const InviteArtist = ({
  prompt = "Add Artist",
  listedArtists = [],
  setListedArtists,
  placeholder = "Artist name",
  label = "Artist name",
  justOne = false,
  showList = true,
  onClose = () => {},
  type = "user",
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [inviteArtist, setInviteArtist] = useState(false);
  const [options, setOptions] = useState<IArtist[]>([]);
  const autocompleteLoading =
    autocompleteOpen && options.length === 0 && loading;

  const inviteArtistSchema = object({
    firstName: string().nonempty("Artist first name is required"),
    lastName: string().nonempty("Artist last name is required"),
    email: string().email().nonempty("Artist email is required"),
  });
  const axiosFetch = useAxiosAuth();
  const [inviteNewUserLoading, setInviteNewUserLoading] = useState(false);
  const toast = useToast();
  const [selectingUserLoading, setSelectingUserLoading] = useState(false);


  type InviteArtistInput = TypeOf<typeof inviteArtistSchema>;
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<InviteArtistInput>({
    resolver: zodResolver(inviteArtistSchema),
  });

  const onSubmitHandler: SubmitHandler<InviteArtistInput> = async (values) => {
    // const { data } = await axiosAuth.post("/invite/send", {
    //   firstName: values.firstName,
    //   lastName: values.lastName,
    //   inviteeEmail: values.email,
    //   type,
    // });

    setListedArtists([
      ...listedArtists,
      {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      },
    ]);
    reset();
    setInviteArtist(false);
  };

  const handleArtistChange = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);

      const res = await axiosAuth.post(`user/search`, {
        search: event.target.value,
      });
      const data = res.data.users;

      justOne
        ? setOptions(data && data?.length > 0 ? [data[data.length - 1]] : [])
        : setOptions(data && data?.length > 0 ? data : []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSelectUser = async (users) => {
    setListedArtists([...new Set([...listedArtists, ...users])]);
  };

  return (
    <div style={{ margin: "50px 0" }}>
      <h5 className={`${!showList && "mb-4"}`}>{prompt}</h5>
      {showList && (
        <List dense>
          {listedArtists?.length > 0 &&
            listedArtists.map((artist, idx) => (
              <ListItem
                key={idx}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() =>
                      setListedArtists(
                        listedArtists.filter(
                          (e) => e.email !== listedArtists[idx].email,
                        ),
                      )
                    }
                  >
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <Person4 />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${artist.firstName} ${artist.lastName}`}
                  secondary={artist.email}
                />
              </ListItem>
            ))}
        </List>
      )}

      {!inviteArtist ? (
        <Box gridColumn="span 12">
          <Autocomplete
            multiple
            onChange={(event: any, newValue: any) => {
             
              handleSelectUser(newValue);
              // setListedArtists([...new Set([...listedArtists, ...newValue])]);
            }}
            style={{ width: "100%", marginTop: 5 }}
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
            options={options.sort((a, b) =>
              a.firstName.localeCompare(b.firstName),
            )}
            noOptionsText={
              <p
                onClick={() => {
                  setInviteArtist(true);
                }}
              >
                Do not see the artist? Invite them
              </p>
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
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
            <div className="flex gap4">
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
              <LoadingButton
                loading={inviteNewUserLoading}
                className="tf-button style-1 h50 active"
                style={{ marginTop: "2.5em" }}
                type="submit"
              >
                send invite
              </LoadingButton>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default InviteArtist;
