import React, { useState } from "react";
import CreateArtWorkFormContainer from "../FormContainer";
import ICreateArtworkFormData from "@/types/models/createArtwork";
import { Stack } from "@mui/material";
import InviteUsers from "@/components/dashboard/InviteUsers";

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

  const handleSubmit = () => {
    console.log("This is the user", user);
    setFormData({
      ...formData,
      illustration: {
        ...formData.illustration,
        artistInvite: Array.isArray(user) ? user[0] : user,
      },
    });

    setActiveIndex((prev) => prev + 1);
  };

  return (
    <CreateArtWorkFormContainer
      handleGoBack={() => {
        console.log("hello");

        setActiveIndex((prev) => prev - 1);
      }}
      onSubmit={handleSubmit}
    >
      <Stack spacing={4}>
        <InviteUsers
          selectedUsers={Array.isArray(user) ? user[0] : user}
          label="Invite Artist"
          setSelectedUsers={setUser}
        />
      </Stack>
    </CreateArtWorkFormContainer>
  );
};

export default InviteAdminArtist;
