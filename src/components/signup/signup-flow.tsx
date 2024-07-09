import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { literal, object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
// import { LoadingButton } from "@mui/lab";
import {
  Typography,
  Grid,
  Box,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Autocomplete,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useAuthContext } from "@/providers/auth.context";
import CompanySetup from "./org-setup";
import InvitesStep from "./invites-step";
import LoadingButton from "../Form/LoadingButton";

const SignUpFlow = ({ activeStep, setActiveStep, setCompleted }) => {
  const profileSchema = object({
    first_name: string().nonempty("First name is required"),
    last_name: string().nonempty("Last name is required"),
    description: string(),
    gender: string().nonempty("Gender is required"),
  });
  type ProfileInput = TypeOf<typeof profileSchema>;
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(false);
  const { user } = useAuthContext();
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<ProfileInput> = async (values) => {
    setLoading(true);
    try {
      console.log(values);
      const res = await axiosAuth.patch("user/me", { ...values });
      console.log(res?.data);
      setActiveStep(1);
      setCompleted({ 0: true });
    } catch (error) {
      console.error(error);
      setError(true);
    }
    setLoading(false);
  };
  console.log("huston do we have a user?? ", user);

  return (
    <Box
      sx={{
        my: 5,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {activeStep == 0 && (
        <Box
          component="form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
          sx={{ mt: 1, width: 400 }}
        >
          {error && (
            <div className="bg-red-300 p-2 text-white rounded">
              Something went wrong. Please try again
            </div>
          )}

          <TextField
            sx={{ mb: 2 }}
            label="First Name"
            fullWidth
            required
            type="text"
            error={!!errors["first_name"]}
            helperText={
              errors["first_name"] ? errors["first_name"].message : ""
            }
            {...register("first_name")}
          />
          <TextField
            sx={{ mb: 2 }}
            label="Last Name"
            fullWidth
            required
            type="text"
            error={!!errors["last_name"]}
            helperText={errors["last_name"] ? errors["last_name"].message : ""}
            {...register("last_name")}
          />
          <TextField
            sx={{ mb: 2 }}
            label="Bio"
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
            <InputLabel id="role-label">What is your gender?</InputLabel>
            <Select
              labelId="gender"
              id="fender"
              label="What's your gender"
              error={!!errors["gender"]}
              {...register("gender")}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
            {errors["gender"] && (
              <FormHelperText error={!!errors["gender"]}>
                {errors["gender"].message}
              </FormHelperText>
            )}
          </FormControl>
          <LoadingButton
            variant="contained"
            // fullWidth
            type="submit"
            loading={loading}
            // sx={{ mt: 3, mb: 2 }}
          >
            Set Profile
          </LoadingButton>
        </Box>
      )}

      {activeStep == 1 && (
        <>
          <CompanySetup
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            setCompleted={setCompleted}
            handleOrgCreate={() => {}}
          />
        </>
      )}

      {activeStep == 2 && (
        <>
          <InvitesStep
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            setCompleted={setCompleted}
            handleOrgCreate={() => {}}
          />
        </>
      )}
      <Grid container></Grid>
    </Box>
  );
};

export default SignUpFlow;
