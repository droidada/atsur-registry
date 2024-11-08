import { BundleDetailType, BundleType } from "@/types/models/bundle";
import React, { useState } from "react";
import numeral from "numeral";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import LoadingButton from "../Form/LoadingButton";
import { HiMiniCheckCircle } from "react-icons/hi2";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/providers/ToastProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {
  bundle: BundleType;
}

const BundleCard: React.FC<Props> = ({ bundle }) => {
  const axiosAuth = useAxiosAuth();
  const toast = useToast();
  const { status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const total = bundle.details?.reduce((total, item) => {
    return (total += item.item.unitPrice * item.quantity);
  }, 0);

  const { mutate, isLoading } = useMutation({
    //   @ts-ignore
    mutationFn: () => axiosAuth.post(`/bundles/buy/${bundle._id}`),

    onSuccess: (data) => {
      console.log(data);
      console.log(
        "some more info ",
        data?.data?.transaction?.authorization_url,
      );

      router.push(data?.data?.transaction?.authorization_url);
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something Went wrong";
      toast.error(errorMessage);
    },
  });
  return (
    <div
      className="max-w-[448.19px] w-full border-[1px] border-primary flex flex-col"
      data-aos="fade-up"
    >
      <div
        className="bg-white flex flex-col items-center gap-8 px-8 py-10"
        data-aos="zoom-in"
      >
        <p className="uppercase text-[15px] leading-[18px] tracking-[40%] text-center text-primary font-[600]">
          {bundle.name}
        </p>

        <div className="flex place-items-baseline">
          <h4 className="font-bold text-2xl lg:text-[40px] lg:leading-[45px]">
            $ {numeral(bundle.unitPrice).format("0,0")}
          </h4>
          <span className="text-[11px] capitalize leading-[14px] tracking-[5%]">
            / Bundle
          </span>
        </div>

        <LoadingButton
          loading={isLoading}
          onClick={() =>
            status === "authenticated" ? mutate() : setOpen(true)
          }
          className={`text-sm font-[400] h-[36px] w-[150.49px] px-3 bg-[#B54443] text-white`}
          data-aos="fade-left"
        >
          Get Started
        </LoadingButton>
      </div>
      <div className="bg-primary flex-1 flex flex-col items-start gap-4 px-8 py-10">
        {bundle.details?.map((detail, index) => (
          <div
            key={detail._id}
            className="flex gap-2 items-center"
            data-aos="fade-up"
            data-aos-delay={index * 100} // Adds delay to each detail's animation
          >
            <HiMiniCheckCircle
              size={13}
              color="#B54443"
              className="flex-shrink-0"
            />
            <span className="text-white text-[14px] leading-[27px] tracking-[5%]">
              {detail.quantity} {detail.item.name}
            </span>
          </div>
        ))}
      </div>
      <ModalBundle open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default BundleCard;

interface BundleModalProps {
  open: boolean;
  onClose: () => void;
}

const ModalBundle: React.FC<BundleModalProps> = ({ open, onClose }) => {
  const router = useRouter();
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle></DialogTitle>
      <DialogContent dividers>You need to login to continue</DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          {" "}
          Close
        </Button>
        <Button variant="contained" onClick={() => router.push("/login")}>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};
