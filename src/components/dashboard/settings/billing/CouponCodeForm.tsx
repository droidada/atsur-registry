import InputField from "@/components/Form/InputField";
import LoadingButton from "@/components/Form/LoadingButton";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { dashboardContext } from "@/providers/DashboardContext.context";
import { useToast } from "@/providers/ToastProvider";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CouponCodeForm = () => {
  const couponSchema = z.object({
    couponCode: z.string().regex(/^[A-Z]{4}-\d{4}-[A-Z]{4}$/, {
      message: "Invalid coupon code format",
    }),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(couponSchema),
  });

  const axiosAuth = useAxiosAuth();
  const toast = useToast();
  const { refetchCredits } = useContext(dashboardContext);

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: any) =>
      axiosAuth.post(`/coupon/apply-item-coupon`, data),
    onSuccess: () => {
      toast.success("Coupon applied successfully");
      refetchCredits();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (data: z.infer<typeof couponSchema>) => {
    mutate(data);
  };

  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" gap-2 items-stretch  ">
      <InputField
        label=""
        id="couponCode"
        name="couponCode"
        placeholder="coupon code"
        aria-required="true"
        fullWidth
        error={!!errors["couponCode"]}
        helperText={
          errors["couponCode"] ? (errors["couponCode"].message as string) : ""
        }
        control={control}
        inputClassName="bg-secondary"
      />
      <LoadingButton loading={isLoading} type="submit" variant="contained">
        Apply Code
      </LoadingButton>
    </form>
  );
};

export default CouponCodeForm;
