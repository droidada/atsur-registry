import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import React from "react";

interface Props {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
  isLoading?: boolean;
  handleGoBack?: () => void;
  isLast?: boolean;
  isFirst?: boolean;
}
const CreateArtWorkFormContainer: React.FC<Props> = ({
  onSubmit,
  children,
  isLoading,
  handleGoBack,
  isLast,
  isFirst,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full p-4 md:py-[31px] md:lg:px-[40px] bg-secondary-white"
    >
      {children}
      <div className=" mt-6 md:mt-[30px] flex items-center justify-end gap-4">
        {!isFirst && (
          <Button
            className="max-w-[204px] font-[400] text-[19px] md:leading-[16px] w-full h-[44px]"
            variant="outlined"
            onClick={handleGoBack}
          >
            Back
          </Button>
        )}
        <LoadingButton
          type="submit"
          className="max-w-[204px] font-[400] text-[19px] md:leading-[16px] w-full h-[44px] bg-primary text-white"
          loading={isLoading}
        >
          {isLast ? "Submit" : "Save & Continue"}
        </LoadingButton>
      </div>
    </form>
  );
};

export default CreateArtWorkFormContainer;
