import React, { useState } from "react";
import CreateArtWorkFormContainer from "../FormContainer";
import ICreateArtworkFormData from "@/types/models/createArtwork";
import {
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import InviteUsers from "@/components/dashboard/InviteUsers";
import SelectOrganization from "@/components/dashboard/SeleteOrganization";

interface Props {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setFormData: React.Dispatch<React.SetStateAction<ICreateArtworkFormData>>;
  formData: ICreateArtworkFormData;
}

const InviteAdminArtist: React.FC<Props> = ({
  setActiveIndex,
  setFormData,
  formData,
}) => {
  const [user, setUser] = useState<any>(null);
  const [inviteType, setInviteType] = useState<"artist" | "org" | undefined>(
    formData.illustration.inviteType,
  );

  const handleInviteTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newInviteType = event.target.value as "artist" | "org";
    setInviteType(newInviteType);

    // Reset previous selections when changing invite type
    setUser(null);
    setFormData({
      ...formData,
      illustration: {
        ...formData.illustration,
        inviteType: newInviteType,
        artistInvite: undefined,
        orgInvite: undefined,
      },
    });
  };

  const handleSubmit = () => {
    if (inviteType === "artist") {
      setFormData({
        ...formData,
        illustration: {
          ...formData.illustration,
          artistInvite: Array.isArray(user) ? user[0] : user,
          orgInvite: undefined,
        },
      });
    } else if (inviteType === "org") {
      setFormData({
        ...formData,
        illustration: {
          ...formData.illustration,
          orgInvite: Array.isArray(user) ? user[0] : user,
          artistInvite: undefined,
        },
      });
    }

    setActiveIndex((prev) => prev + 1);
  };

  const isSubmitDisabled = !inviteType || !user;

  return (
    <CreateArtWorkFormContainer
      handleGoBack={() => {
        setActiveIndex((prev) => prev - 1);
      }}
      onSubmit={handleSubmit}
    >
      <Stack spacing={4}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select Invite Type</FormLabel>
          <RadioGroup
            value={inviteType || ""}
            onChange={handleInviteTypeChange}
            row
          >
            <FormControlLabel
              value="artist"
              control={<Radio />}
              label="Invite Artist"
            />
            <FormControlLabel
              value="org"
              control={<Radio />}
              label="Invite Organization"
            />
          </RadioGroup>
        </FormControl>

        {inviteType === "artist" && (
          <InviteUsers
            selectedUsers={Array.isArray(user) ? user[0] : user}
            label="Invite Artist"
            setSelectedUsers={setUser}
          />
        )}

        {inviteType === "org" && (
          <SelectOrganization
            label="Invite Organization"
            selectedOrg={Array.isArray(user) ? user[0] : user}
            setSelectedOrg={setUser}
          />
        )}
      </Stack>
    </CreateArtWorkFormContainer>
  );
};

export default InviteAdminArtist;
