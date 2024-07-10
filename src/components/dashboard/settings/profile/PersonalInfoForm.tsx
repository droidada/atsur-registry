import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf, object, string } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/providers/ToastProvider";
import InputField from "@/components/Form/InputField";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useMutation } from "@tanstack/react-query";
import LoadingButton from "@/components/Form/LoadingButton";

interface Props {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const PersonalInfoForm: React.FC<Props> = ({ setIsEdit }) => {
  const { data } = useSession();
  const signUpSchema = object({
    firstName: string().nonempty("First name is required"),
    lastName: string().nonempty("Last name is required"),
    bio: string(),
    phone: string(),
    // twitter: string(),
    // facebook: string(),
    // instagram: string(),
    // linkedIn: string(),
    email: string().nonempty("Email is required").email("Email is invalid"),
  });

  type SignUpInput = TypeOf<typeof signUpSchema>;
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
    handleSubmit,
    setValue,
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    setValue("firstName", data?.user?.firstName);
    setValue("lastName", data?.user?.lastName);
    setValue("email", data?.user?.email);
    setValue("bio", data?.user?.bio);
  }, [data]);

  const toast = useToast();
  const { data: session, update } = useSession();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => axiosAuth.patch("/user/update", data),
    onSuccess: async (data) => {
      console.log(data?.data?.data);
      await update({ ...session, ...data?.data?.data });
      setIsEdit(false);
      toast.success("Profile updated successfully");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    },
  });

  const onSubmit: SubmitHandler<SignUpInput> = (data) => {
    // @ts-ignore
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 gap-4 grid grid-cols-2"
    >
      <InputField
        control={control}
        label={"First Name"}
        className={"text-xs"}
        name="firstName"
      />
      <InputField
        control={control}
        className={"text-xs"}
        label={"Last Name"}
        name="lastName"
      />
      <InputField
        control={control}
        className={"text-xs"}
        type="email"
        label={"Email"}
        name="email"
      />
      <InputField
        control={control}
        className={"text-xs"}
        type="tel"
        label={"Phone"}
        name="phone"
      />
      <InputField
        control={control}
        className={"text-xs col-span-2"}
        type="text"
        multiline
        rows={4}
        inputClassName="bg-white"
        label={"Bio"}
        name="bio"
      />
      <LoadingButton
        loading={isLoading}
        variant="contained"
        type="submit"
        className="col-span-2 font-[400] bg-primary text-white"
      >
        Submit
      </LoadingButton>
    </form>
  );
};

export default PersonalInfoForm;
