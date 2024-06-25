import { LoadingButton } from "@mui/lab";
import { Button, Stack } from "@mui/material";
import React from "react";

interface Props {
  saveIsLoading?: boolean;
  publishIsLoading?: boolean;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  title: string;
  children?: React.ReactNode;
  buttonTitle?: string;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}
const FormContainer: React.FC<Props> = ({
  saveIsLoading,
  onSubmit,
  title,
  children,
  buttonTitle,
  setActiveIndex,
  publishIsLoading,
}) => {
  return (
    <Stack spacing={4}>
      <h2 className="text-[17px] leading-[17px] font-semibold">{title}</h2>
      <form className="w-full flex flex-col " onSubmit={onSubmit}>
        {children}
        <div className="flex justify-between mt-12 items-center">
          <Button
            onClick={() => setActiveIndex(0)}
            variant="outlined"
            className="text-sm h-[46px] md:w-[250px]  leading-[16px]"
          >
            Back
          </Button>
          <div className="flex items-center gap-4 ">
            <LoadingButton
              variant="contained"
              type="submit"
              name="save"
              className="px-2 bg-primary md:w-[250px] w-full text-white text-sm h-[46px] leading-[16px]"
              loading={saveIsLoading}
            >
              Save
            </LoadingButton>
            <LoadingButton
              variant="contained"
              type="submit"
              name="publish"
              className="px-2 bg-primary text-white text-sm h-[46px] md:w-[250px]  w-full leading-[16px]"
              loading={publishIsLoading}
            >
              Next
            </LoadingButton>
          </div>
        </div>
      </form>
    </Stack>
  );
};

export default FormContainer;
