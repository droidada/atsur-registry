import { useState, useEffect } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { array, coerce, object, string, TypeOf } from "zod";
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
import Button from "../Form/Button";

interface Org {
  name: string;
  address: string;
  specialties: string[];
  type?: string;
  description?: string;
  images?: string[];
}

const CompanySetup = ({
  activeStep: number,
  setActiveStep,
  setCompleted,
  handleOrgCreate: Function,
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [addOrg, setAddOrg] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState<Org[]>();
  const { user } = useAuthContext();
  const axiosAuth = useAxiosAuth();
  const autocompleteLoading =
    autocompleteOpen && options.length === 0 && loading;

  const orgSchema = object({
    name: string().nonempty("Organization name is required"),
    description: string().nonempty("Organization description is required"),
    specialties: array(coerce.string()).nonempty(
      "Organization specialties is required",
    ),
    address: string().nonempty("Organization address is required"),
  });
  type OrgInput = TypeOf<typeof orgSchema>;
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit: handleOrgSubmit,
  } = useForm<OrgInput>({
    resolver: zodResolver(orgSchema),
  });

  const inviteOrgSchema = object({
    name: string().nonempty("Gallery name is required"),
    first_name: string().nonempty("Organization description is required"),
    email: string().email().nonempty("Organization address is required"),
  });
  type InviteOrgInput = TypeOf<typeof inviteOrgSchema>;
  const {
    register: registerInviteOrg,
    formState: {
      errors: inviteOrgErrors,
      isSubmitSuccessful: inviteOrgIsSubmitSuccessful,
    },
    reset: resetInviteOrg,
    handleSubmit: handleInviteOrgSubmit,
  } = useForm<InviteOrgInput>({
    resolver: zodResolver(inviteOrgSchema),
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

  const onOrgSubmitHandler: SubmitHandler<OrgInput> = async (values, e) => {
    try {
      e.preventDefault();
      setLoading(true);
      console.log(values);
      const res = await axiosAuth.post("items/organization", {
        ...values,
        type: "gallery",
      });
      console.log("we have new org here ", res?.data?.data);

      const res_ = await axiosAuth.post("/items/organization_directus_users", {
        organization_id: res.data?.data?.id,
        directus_users_id: user.id,
      });
      console.log("we have new org binding here ", res_.data);

      setActiveStep(2);
      setCompleted({ 1: true });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(false);
      setLoading(false);
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

      {user && (
        <>
          {addOrg ? (
            <>
              {ROLE_IDS_TO_ROLES[user.role] === Roles.ARTIST ? (
                <Box
                  component="form"
                  autoComplete="off"
                  noValidate
                  onSubmit={handleInviteOrgSubmit(() => {})}
                  display="grid"
                  gridTemplateColumns="repeat(12, 1fr)"
                  gap={1}
                  sx={{ mt: 5 }}
                >
                  <Box gridColumn="span 6">
                    <TextField
                      label="Gallery Name"
                      fullWidth
                      required
                      type="text"
                      error={!!inviteOrgErrors["name"]}
                      helperText={
                        inviteOrgErrors["name"]
                          ? inviteOrgErrors["name"].message
                          : ""
                      }
                      {...registerInviteOrg("name")}
                    />
                  </Box>
                  <Box gridColumn="span 6">
                    <TextField
                      label="Full Name"
                      fullWidth
                      required
                      type="text"
                      error={!!inviteOrgErrors["first_name"]}
                      helperText={
                        inviteOrgErrors["first_name"]
                          ? inviteOrgErrors["first_name"].message
                          : ""
                      }
                      {...registerInviteOrg("first_name")}
                    />
                  </Box>
                  <Box gridColumn="span 8">
                    <TextField
                      label="Email"
                      fullWidth
                      type="email"
                      error={!!inviteOrgErrors["email"]}
                      helperText={
                        inviteOrgErrors["email"]
                          ? inviteOrgErrors["email"].message
                          : ""
                      }
                      {...registerInviteOrg("email")}
                    />
                  </Box>
                  <Box gridColumn="span 4">
                    <LoadingButton
                      variant="contained"
                      fullWidth
                      type="submit"
                      loading={loading}
                      // sx={{ mt: 3, mb: 2 }}
                    >
                      Invite
                    </LoadingButton>
                  </Box>
                </Box>
              ) : (
                <Box
                  component="form"
                  autoComplete="off"
                  noValidate
                  onSubmit={handleOrgSubmit(onOrgSubmitHandler)}
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
                    {ROLE_IDS_TO_ROLES[user.role] === Roles.GALLERY
                      ? "Add Gallery"
                      : "Add Organization"}
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
                    helperText={
                      errors["address"] ? errors["address"].message : ""
                    }
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
                      multiple
                      defaultValue={[]}
                      label="What's your organization specialties"
                      error={!!errors["specialties"]}
                      {...register("specialties")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"paintings"}>Paintings</MenuItem>
                      <MenuItem value={"photography"}>Photography</MenuItem>
                      <MenuItem value={"ceramics"}>Ceramics</MenuItem>
                      <MenuItem value={"antiques"}>Antiques</MenuItem>
                      <MenuItem value={"artifacts"}>Artifacts</MenuItem>
                      <MenuItem value={"nfts"}>NFTs</MenuItem>
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
                    {ROLE_IDS_TO_ROLES[user.role] === Roles.GALLERY
                      ? "Add Gallery"
                      : "Add Organization"}
                  </LoadingButton>
                </Box>
              )}
            </>
          ) : (
            <>
              <Typography component="h1" variant="h6">
                We see you are an {ROLE_IDS_TO_ROLES[user.role]}.
              </Typography>
              <Typography component="h1" variant="h6">
                Please search for your gallery to join.
              </Typography>
              <Autocomplete
                // multiple
                // value={selectedOrg}
                onChange={(event: any, newValue: any) => {
                  setSelectedOrg([newValue.name]);
                }}
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

          {selectedOrg && selectedOrg.length > 0 && (
            <>
              {selectedOrg.length > 0 &&
                selectedOrg.map((o) => (
                  <>
                    <Typography component="h1" variant="h6">
                      {o.name}
                    </Typography>
                    <Typography component="h1" variant="h6">
                      {o.address}
                    </Typography>
                    <Button onClick={() => {}}>Request to join</Button>
                  </>
                ))}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default CompanySetup;
