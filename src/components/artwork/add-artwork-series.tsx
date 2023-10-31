import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { array, object, string, number, TypeOf } from "zod";
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
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useAuthContext } from "@/providers/auth.context";
import { ROLE_IDS_TO_ROLES } from "@/types/constants";
import InviteArtist from "../add-artist";

interface Author {
  first_name: string;
  last_name: string;
  email: string;
}

const AddArtworkSeries = ({ activeStep, setActiveStep, setCompleted }) => {
  const artworkSeriesSchema = object({
    title: string().nonempty("Title is required"),
    type: string().nonempty("Type is required"),
    description: string().nonempty("Description is required"),
    subject_matter: string(),
    author: string().nonempty("Author is required"),
  });
  type ArtworkSeriesInput = TypeOf<typeof artworkSeriesSchema>;
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<ArtworkSeriesInput>({
    resolver: zodResolver(artworkSeriesSchema),
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

  const onSubmitHandler: SubmitHandler<ArtworkSeriesInput> = async (values) => {
    setLoading(true);
    try {
      console.log(values);
      //   const res = await axiosAuth.patch("users/me", { ...values });
      //   console.log(res?.data);
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
      component="form"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmitHandler)}
      sx={{ mt: 1, width: 600 }}
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gap={1}
    >
      {error && (
        <div className="bg-red-300 p-2 text-white rounded">
          Something went wrong. Please try again
        </div>
      )}
      <Box gridColumn="span 12">
        <TextField
          sx={{ mb: 2 }}
          label="Title"
          fullWidth
          required
          type="text"
          error={!!errors["title"]}
          helperText={errors["title"] ? errors["title"].message : ""}
          {...register("title")}
        />
      </Box>

      <InviteArtist prompt="Please add the author of this series." />

      <Box gridColumn="span 12">
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
      </Box>
      <Box gridColumn="span 12">
        <TextField
          sx={{ mb: 2 }}
          label="Subject matter"
          fullWidth
          multiline
          rows={4}
          type="text"
          error={!!errors["subject_matter"]}
          helperText={
            errors["subject_matter"] ? errors["subject_matter"].message : ""
          }
          {...register("subject_matter")}
        />
      </Box>
      <Box gridColumn="span 12">
        <FormControl fullWidth variant="outlined">
          <InputLabel id="role-label">What type of series?</InputLabel>
          <Select
            labelId="type"
            id="type"
            label="What type of series?"
            error={!!errors["type"]}
            {...register("type")}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"unique"}>Unique</MenuItem>
            <MenuItem value={"limited_edition"}>Limited Edition</MenuItem>
            <MenuItem value={"open_edition"}>Open Edition</MenuItem>
            <MenuItem value={"unknown"}>Unknown</MenuItem>
          </Select>
          {errors["type"] && (
            <FormHelperText error={!!errors["type"]}>
              {errors["type"].message}
            </FormHelperText>
          )}
        </FormControl>
      </Box>

      <Box gridColumn="span 12">
        <LoadingButton
          variant="contained"
          fullWidth
          type="submit"
          loading={loading}
          sx={{ mt: 3, mb: 2, p: 2 }}
        >
          Add Series
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default AddArtworkSeries;
