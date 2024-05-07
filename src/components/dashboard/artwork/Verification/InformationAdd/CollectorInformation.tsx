import React from "react";
import FormContainer from "./formContainer";

interface Props {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  defaultValues: any;
}
const CollectorInformation: React.FC<Props> = ({
  setActiveIndex,
  defaultValues,
}) => {
  return (
    <FormContainer
      setActiveIndex={setActiveIndex}
      title="Collector Information"
      onSubmit={() => {}}
    >
      CollectorInformation
    </FormContainer>
  );
};

export default CollectorInformation;
