import React from "react";
import FormContainer from "./formContainer";

interface Props {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  defaultValues: any;
}
const InstitutionInformation = ({ setActiveIndex, defaultValues }) => {
  return (
    <FormContainer
      setActiveIndex={setActiveIndex}
      title="Institution Information"
      onSubmit={() => {}}
    >
      InstitutionInformation
    </FormContainer>
  );
};

export default InstitutionInformation;
