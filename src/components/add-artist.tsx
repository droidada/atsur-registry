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

interface Author {
  first_name: string;
  last_name: string;
  email: string;
}
const InviteArtist = ({ multiple = false, width = 600, prompt }) => {
  const [loading, setLoading] = useState(false);
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [inviteAuthor, setInviteAuthor] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState<Author[]>();
  const autocompleteLoading =
    autocompleteOpen && options.length === 0 && loading;

  const inviteAuthorSchema = object({
    name: string().nonempty("Gallery name is required"),
    first_name: string().nonempty("Organization description is required"),
    email: string().email().nonempty("Organization address is required"),
  });
  type InviteAuthorInput = TypeOf<typeof inviteAuthorSchema>;
  const {
    register: registerInviteAuthor,
    formState: {
      errors: inviteAuthorErrors,
      isSubmitSuccessful: inviteAuthorIsSubmitSuccessful,
    },
    reset: resetInviteAuthor,
    handleSubmit: handleInviteOrgSubmit,
  } = useForm<InviteAuthorInput>({
    resolver: zodResolver(inviteAuthorSchema),
  });

  const handleAuthorChange = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      console.log("search value is ", event.target.value);
      const res = await axiosAuth.get(
        `items/organization?fields=name,address,type,specialties,images,description&search=${event.target.value}`,
      );
      const data = res.data.data;
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
      {!inviteAuthor && (
        <Box gridColumn="span 12">
          <p> {prompt} </p>
          <Autocomplete
            multiple={multiple}
            // value={selectedOrg}
            onChange={(event: any, newValue: any) => {
              setSelectedAuthor([newValue.name]);
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
            getOptionLabel={(option) => option.name}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            loading={autocompleteLoading}
            options={options}
            noOptionsText={
              <p onClick={() => setInviteAuthor(true)}>
                Do not see the artist? Invite them
              </p>
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Author name"
                placeholder="Author name"
                onChange={handleAuthorChange}
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
      )}
    </>
  );
};

export default InviteArtist;
