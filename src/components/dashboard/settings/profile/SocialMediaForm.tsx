import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf, object, string } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/providers/ToastProvider";
import InputField from "@/components/Form/InputField";
import { useSession } from "next-auth/react";
import LoadingButton from "@/components/Form/LoadingButton";

const SocialMediaForm = () => {
  const { data } = useSession();
  const signUpSchema = object({
    twitter: string(),
    facebook: string(),
    instagram: string(),
    linkedIn: string(),
  });

  type SignUpInput = TypeOf<typeof signUpSchema>;
  const {
    register,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    reset,
    control,
    handleSubmit,
    setValue,
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => {
    setValue("twitter", data?.user?.twitter);
    setValue("facebook", data?.user?.facebook);
    setValue("instagram", data?.user?.instagram);
    setValue("linkedIn", data?.user?.linkedIn);
  }, [data]);

  return (
    <form className="flex-1 gap-4 grid grid-cols-2">
      <InputField
        control={control}
        label={"X"}
        placeholder="https://twitter.com/username"
        className={"text-xs"}
        name="twitter"
      />
      <InputField
        control={control}
        className={"text-xs"}
        label={"Facebook"}
        name="facebook"
        placeholder="https://www.facebook.com/username"
      />
      <InputField
        control={control}
        className={"text-xs"}
        label={"Instagram"}
        name="instagram"
        placeholder="https://www.instagram.com/username"
      />
      <InputField
        control={control}
        className={"text-xs"}
        label={"LinkedIn"}
        name="linkedin"
        placeholder="https://www.linkedin.com/in/username"
      />

      <LoadingButton
        loading={isSubmitting}
        type="submit"
        className="col-span-2 font-[400] bg-primary text-white"
      >
        Submit
      </LoadingButton>
    </form>
  );
};

export default SocialMediaForm;
