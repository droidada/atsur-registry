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

const SignUpFlow = ({ activeStep }) => {
  const signUpSchema = object({
    first_name: string().nonempty("First name is required"),
    last_name: string().nonempty("Last name is required"),
    description: string(),
    gender: string().nonempty("Gender is required"),
  });

  type SignUpInput = TypeOf<typeof signUpSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [options, setOptions] = useState([]);
  const { user } = useAuthContext();

  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    async () => {
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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<SignUpInput> = async (values) => {
    try {
      console.log(values);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };
  console.log("huston do we have a user?? ", user);

  const handleChange = async (event) => {
    try {
      console.log("search value is ", event.target.value);
      const res = await axiosAuth.get(
        `items/organization?fields=name,address,type,specialties,images,description&search=${event.target.value}`,
      );
      const data = res.data.data;
      console.log("we have options here ", data);
      setOptions(data && data?.length > 0 ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

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
      <Box
        component="form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmitHandler)}
        sx={{ mt: 1 }}
      >
        {error && (
          <div className="bg-red-300 p-2 text-white rounded">
            Something went wrong. Please try again
          </div>
        )}

        {activeStep == 0 && (
          <>
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
              helperText={
                errors["last_name"] ? errors["last_name"].message : ""
              }
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
          </>
        )}

        {activeStep == 1 && (
          <>
            <Autocomplete
              multiple
              style={{ width: 400 }}
              id="size-small-outlined-multi"
              size="medium"
              fullWidth
              getOptionLabel={(option) => option.name}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              options={options}
              // defaultValue={[top100Films[3], top100Films[5]]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Company name"
                  placeholder="Company name"
                  onChange={handleChange}
                />
              )}
            />
          </>
        )}

        {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Sign In
        </Button> */}
        <Grid container>
          {/* <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid> */}
          {/* <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUpFlow;
