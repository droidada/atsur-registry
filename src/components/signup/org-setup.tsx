import { useState, useEffect } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { literal, object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import {
  Typography,
  Grid,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Autocomplete,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useAuthContext } from "@/providers/auth.context";
import { ROLE_IDS_TO_ROLES, Roles } from "../../types/constants";

const CompanySetup = ({ activeStep: number, handleOrgCreate: Function }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [addOrg, setAddOrg] = useState(false);
  const [options, setOptions] = useState([]);
  const { user } = useAuthContext();
  const axiosAuth = useAxiosAuth();
  const autocompleteLoading =
    autocompleteOpen && options.length === 0 && loading;

  const orgSchema = object({
    name: string().nonempty("Organization name is required"),
    type: string().nonempty("Organization type is required"),
    description: string().nonempty("Organization description is required"),
    specialties: string().nonempty("Organization specialties is required"),
    address: string().nonempty("Organization address is required"),
  });
  type OrgInput = TypeOf<typeof orgSchema>;
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<OrgInput>({
    resolver: zodResolver(orgSchema),
  });

  console.log("user is ", user);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const res = await axiosAuth.get(
          "items/organization?fields=name,address,type,specialties,images,description",
        );
        const data = res.data.data;
        console.log("we have options here ", data);
        setOptions(data && data?.length > 0 ? data : []);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const handleOrgChange = async (event) => {
    event.preventDefault();
    try {
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

  const onSubmitHandler: SubmitHandler<OrgInput> = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      console.log(values);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(false);
    }
  };

  console.log("huston do we have a user?? ", user);

  return (
    <Box
      sx={{
        mt: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {error && (
        <div className="bg-red-300 p-2 text-white rounded">
          Something went wrong. Please try again
        </div>
      )}

      {user && ROLE_IDS_TO_ROLES[user.role] === Roles.GALLERY && (
        <>
          {!addOrg && (
            <>
              <Typography component="h1" variant="h6">
                We see you represent a gallery.
              </Typography>
              <Typography component="h1" variant="h6">
                Please search for your gallery to join.
              </Typography>
              <Autocomplete
                multiple
                style={{ width: 400, marginTop: 5 }}
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
                  <p onClick={() => setAddOrg(true)}>
                    Do not see your company? Add it
                  </p>
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Company name"
                    placeholder="Company name"
                    onChange={handleOrgChange}
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
            </>
          )}

          {addOrg && (
            <Box
              component="form"
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit(onSubmitHandler)}
              sx={{
                mt: 1,
                width: 400,
                alignItems: "center",
              }}
            >
              <Typography
                align="center"
                marginBottom={4}
                component="h1"
                variant="h5"
              >
                Add Gallery
              </Typography>
              <TextField
                sx={{ mb: 2 }}
                label="Name"
                fullWidth
                required
                type="text"
                error={!!errors["name"]}
                helperText={errors["name"] ? errors["name"].message : ""}
                {...register("name")}
              />
              <TextField
                sx={{ mb: 2 }}
                label="Address"
                fullWidth
                required
                type="text"
                error={!!errors["address"]}
                helperText={errors["address"] ? errors["address"].message : ""}
                {...register("address")}
              />
              <TextField
                sx={{ mb: 2 }}
                label="Description"
                fullWidth
                multiline
                rows={4}
                type="text"
                error={!!errors["description"]}
                helperText={
                  errors["description"] ? errors["description"].message : ""
                }
                {...register("description")}
              />
              <FormControl fullWidth variant="outlined">
                <InputLabel id="role-label">Specialties</InputLabel>
                <Select
                  labelId="specialties"
                  id="specialties"
                  label="What's your organization specialties"
                  error={!!errors["specialties"]}
                  {...register("specialties")}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
                {errors["specialties"] && (
                  <FormHelperText error={!!errors["specialties"]}>
                    {errors["specialties"].message}
                  </FormHelperText>
                )}
              </FormControl>
              <LoadingButton
                variant="contained"
                fullWidth
                type="submit"
                loading={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                Add Gallery
              </LoadingButton>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default CompanySetup;
