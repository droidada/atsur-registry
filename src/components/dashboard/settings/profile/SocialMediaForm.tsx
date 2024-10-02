import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf, object, string } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/providers/ToastProvider";
import InputField from "@/components/Form/InputField";
import { useSession } from "next-auth/react";
import LoadingButton from "@/components/Form/LoadingButton";
import { useMutation } from "@tanstack/react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useRouter } from "next/router";

interface Props {
  socialLinks: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedIn?: string;
  };
}
const SocialMediaForm: React.FC<Props> = ({ socialLinks }) => {
  const { data } = useSession();
  const axiosAuth = useAxiosAuth();
  const toast = useToast();
  const router = useRouter();

  const socialLinksSchema = object({
    twitter: string(),
    facebook: string(),
    instagram: string(),
    linkedIn: string(),
  });

  type SocialInput = TypeOf<typeof socialLinksSchema>;
  const {
    register,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    reset,
    control,
    handleSubmit,
    setValue,
  } = useForm<SocialInput>({
    resolver: zodResolver(socialLinksSchema),
  });

  useEffect(() => {
    setValue("twitter", socialLinks.twitter);
    setValue("facebook", socialLinks.facebook);
    setValue("instagram", socialLinks.instagram);
    setValue("linkedIn", socialLinks.linkedIn);
  }, [socialLinks]);

  const { mutate, isLoading } = useMutation({
    mutationFn: (socialLinks: any) =>
      axiosAuth.post(`/auth/profile-update`, {
        socialLinks,
      }),
    onSuccess: () => {
      // toast.success("Profile updated successfully");
      router.reload();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    },
  });

  const onSubmit: SubmitHandler<SocialInput> = (data) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 gap-4 grid grid-cols-2"
    >
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
        error={Boolean(errors.facebook)}
        helperText={errors.facebook?.message}
      />
      <InputField
        control={control}
        className={"text-xs"}
        label={"Instagram"}
        name="instagram"
        placeholder="https://www.instagram.com/username"
        error={Boolean(errors.instagram)}
        helperText={errors.instagram?.message}
      />
      <InputField
        control={control}
        className={"text-xs"}
        label={"LinkedIn"}
        name="linkedIn"
        placeholder="https://www.linkedin.com/in/username"
        error={Boolean(errors.linkedIn)}
        helperText={errors.linkedIn?.message}
      />

      <LoadingButton
        loading={isLoading}
        type="submit"
        className="col-span-2 font-[400] bg-primary text-white"
      >
        Submit
      </LoadingButton>
    </form>
  );
};

export default SocialMediaForm;
