import React from "react";
import FormContainer from "./formContainer";

interface Props {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  defaultValues: any;
}
const DealerInformation = ({ setActiveIndex, defaultValues }) => {
  return (
    <FormContainer
      setActiveIndex={setActiveIndex}
      title="Dealer Information"
      onSubmit={() => {}}
    >
      DealerInformation
    </FormContainer>
  );
};

export default DealerInformation;
