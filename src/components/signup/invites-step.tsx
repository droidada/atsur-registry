import { useState, useEffect } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { literal, object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

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
import LoadingButton from "../Form/LoadingButton";

const InvitesStep = ({
  activeStep: number,
  setActiveStep,
  setCompleted,
  handleOrgCreate: Function,
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const axiosAuth = useAxiosAuth();

  const inviteSchema = object({
    first_name: string().nonempty("First name is required"),
    last_name: string().nonempty("Last name is required"),
    email: string().email().nonempty("Email is required"),
  });
  type InviteInput = TypeOf<typeof inviteSchema>;
  const {
    register: registerInviteOne,
    formState: {
      errors: inviteOneErrors,
      isSubmitSuccessful: isInviteOneSubmitSuccessful,
    },
    reset: resetInviteOne,
    handleSubmit: handleSubmitOne,
  } = useForm<InviteInput>({
    resolver: zodResolver(inviteSchema),
  });

  const {
    register: registerInviteTwo,
    formState: {
      errors: inviteTwoErrors,
      isSubmitSuccessful: isInviteTwoSubmitSuccessful,
    },
    reset: resetInviteTwo,
    handleSubmit: handleSubmitTwo,
  } = useForm<InviteInput>({
    resolver: zodResolver(inviteSchema),
  });

  const {
    register: registerInviteThree,
    formState: {
      errors: inviteThreeErrors,
      isSubmitSuccessful: isInviteThreeSubmitSuccessful,
    },
    reset: resetInviteThree,
    handleSubmit: handleSubmitThree,
  } = useForm<InviteInput>({
    resolver: zodResolver(inviteSchema),
  });

  console.log("user is ", user);

  useEffect(() => {
    if (isInviteOneSubmitSuccessful) {
      resetInviteOne();
    }
    if (isInviteTwoSubmitSuccessful) {
      resetInviteTwo();
    }
    if (isInviteThreeSubmitSuccessful) {
      resetInviteThree();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isInviteOneSubmitSuccessful,
    isInviteTwoSubmitSuccessful,
    isInviteThreeSubmitSuccessful,
  ]);

  const onSubmitHandler: SubmitHandler<InviteInput> = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      console.log(values);
      // const res = await axiosAuth.post("/items/organizations", {...values})
      // console.log("we have new org here ", res.data)

      // const res_ = await axiosAuth.post("/items/organization_directus_users", {organization_id: res.data?.id, directus_users_id: user.id})
      // console.log("we have new org binding here ", res_.data)

      // setActiveStep(2);
      // setCompleted({ 1: true });
    } catch (error) {
      console.error(error);
      setError(false);
    }
    setLoading(false);
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

      {/* {user && ROLE_IDS_TO_ROLES[user.role] === Roles.GALLERY && ( */}
      {true && (
        <>
          <Typography
            align="center"
            marginBottom={2}
            component="h1"
            variant="h5"
          >
            Invite Artists
          </Typography>
          <Box
            component="form"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmitOne(onSubmitHandler)}
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={1}
          >
            <Box gridColumn="span 6">
              <TextField
                label="First Name"
                fullWidth
                required
                type="text"
                error={!!inviteOneErrors["first_name"]}
                helperText={
                  inviteOneErrors["first_name"]
                    ? inviteOneErrors["first_name"].message
                    : ""
                }
                {...registerInviteOne("first_name")}
              />
            </Box>
            <Box gridColumn="span 6">
              <TextField
                label="Last Name"
                fullWidth
                required
                type="text"
                error={!!inviteOneErrors["last_name"]}
                helperText={
                  inviteOneErrors["last_name"]
                    ? inviteOneErrors["last_name"].message
                    : ""
                }
                {...registerInviteOne("last_name")}
              />
            </Box>
            <Box gridColumn="span 8">
              <TextField
                label="Email"
                fullWidth
                type="email"
                error={!!inviteOneErrors["email"]}
                helperText={
                  inviteOneErrors["email"]
                    ? inviteOneErrors["email"].message
                    : ""
                }
                {...registerInviteOne("email")}
              />
            </Box>
            <Box gridColumn="span 4">
              <LoadingButton
                variant="contained"
                fullWidth
                type="submit"
                loading={loading}
                sx={{ py: 2 }}
              >
                Invite
              </LoadingButton>
            </Box>
          </Box>

          <Box
            component="form"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmitTwo(onSubmitHandler)}
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={1}
            sx={{ mt: 5 }}
          >
            <Box gridColumn="span 6">
              <TextField
                label="First Name"
                fullWidth
                required
                type="text"
                error={!!inviteTwoErrors["first_name"]}
                helperText={
                  inviteTwoErrors["first_name"]
                    ? inviteTwoErrors["first_name"].message
                    : ""
                }
                {...registerInviteTwo("first_name")}
              />
            </Box>
            <Box gridColumn="span 6">
              <TextField
                label="Last Name"
                fullWidth
                required
                type="text"
                error={!!inviteTwoErrors["last_name"]}
                helperText={
                  inviteTwoErrors["last_name"]
                    ? inviteTwoErrors["last_name"].message
                    : ""
                }
                {...registerInviteTwo("last_name")}
              />
            </Box>
            <Box gridColumn="span 8">
              <TextField
                label="Email"
                fullWidth
                type="email"
                error={!!inviteTwoErrors["email"]}
                helperText={
                  inviteTwoErrors["email"]
                    ? inviteTwoErrors["email"].message
                    : ""
                }
                {...registerInviteTwo("email")}
              />
            </Box>
            <Box gridColumn="span 4">
              <LoadingButton
                variant="contained"
                fullWidth
                type="submit"
                loading={loading}
                sx={{ py: 2 }}
              >
                Invite
              </LoadingButton>
            </Box>
          </Box>

          <Box
            component="form"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmitThree(onSubmitHandler)}
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={1}
            sx={{ mt: 5 }}
          >
            <Box gridColumn="span 6">
              <TextField
                label="First Name"
                fullWidth
                required
                type="text"
                error={!!inviteThreeErrors["first_name"]}
                helperText={
                  inviteThreeErrors["first_name"]
                    ? inviteThreeErrors["first_name"].message
                    : ""
                }
                {...registerInviteThree("first_name")}
              />
            </Box>
            <Box gridColumn="span 6">
              <TextField
                label="Last Name"
                fullWidth
                required
                type="text"
                error={!!inviteThreeErrors["last_name"]}
                helperText={
                  inviteThreeErrors["last_name"]
                    ? inviteThreeErrors["last_name"].message
                    : ""
                }
                {...registerInviteThree("last_name")}
              />
            </Box>
            <Box gridColumn="span 8">
              <TextField
                label="Email"
                fullWidth
                type="email"
                error={!!inviteThreeErrors["email"]}
                helperText={
                  inviteThreeErrors["email"]
                    ? inviteThreeErrors["email"].message
                    : ""
                }
                {...registerInviteThree("email")}
              />
            </Box>
            <Box gridColumn="span 4">
              <LoadingButton
                variant="contained"
                // fullWidth
                type="submit"
                loading={loading}
                // sx={{ py: 2 }}
                className="w-full py-2"
              >
                Invite
              </LoadingButton>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default InvitesStep;
