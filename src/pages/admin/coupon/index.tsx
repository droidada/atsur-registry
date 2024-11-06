import React, { useState, useEffect } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
import { FaPlus } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/Form/InputField";
import SelectField from "@/components/Form/SelectField";
import DateInput from "@/components/Form/DateInput";
import LoadingButton from "@/components/Form/LoadingButton";
import { useToast } from "@/providers/ToastProvider";
import moment from "moment";

const CouponAdminDashboard = () => {
  const [coupons, setCoupons] = useState([]);

  const { control, handleSubmit, reset } = useForm();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const axiosAuth = useAxiosAuth();
  const toast = useToast();

  const {
    data: couponsdata,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => axiosAuth.get(`/coupon`),
    queryKey: ["getCoupon"],
    refetchOnWindowFocus: false,
  });

  console.log(couponsdata?.data?.data);

  const { mutate: deactivationMutation, isLoading: deactivateloading } =
    useMutation({
      mutationFn: (id: string) => axiosAuth.patch(`/coupon/${id}/deactivate`),
      onSuccess: () => {
        toast.success("Coupon deactivated successfully");
        refetch();
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });

  const onDeactivateCoupon = async (couponId: string) => {
    deactivationMutation(couponId);
  };

  const tableHeading = [
    "Code",
    "Discount",
    "Expiry Date",
    "Type",
    "No of usage",
    "Status",
    "Actions",
  ];

  return (
    <AdminDashboardLayout>
      <Stack spacing={4} className="p-8">
        <Stack
          justifyContent={"space-between"}
          direction="row"
          spacing={4}
          alignItems={"center"}
        >
          <h1 className="text-3xl font-bold">Coupons</h1>

          <Button
            aria-haspopup="true"
            onClick={() => setOpenCreateModal(true)}
            startIcon={<FaPlus />}
            variant="text"
            className="text-[14px] leading-[16px] text-primary"
          >
            New
          </Button>
        </Stack>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {tableHeading.map((item) => (
                  <TableCell
                    key={`coupon-${item}`}
                    className="bg-primary text-white text-md font-[600]"
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : couponsdata?.data?.data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No coupons found.
                  </TableCell>
                </TableRow>
              ) : (
                couponsdata?.data?.data?.map((coupon) => (
                  <TableRow key={coupon._id}>
                    <TableCell>{coupon.code}</TableCell>
                    <TableCell>
                      {coupon.type === "checkout"
                        ? `${coupon.discountPercentage}%`
                        : `${coupon.numberOfItems} ${coupon?.item?.name} `}
                    </TableCell>
                    <TableCell>
                      {moment(coupon.expiryDate).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>{coupon.type}</TableCell>
                    <TableCell>{coupon?.usedCount}</TableCell>
                    <TableCell>
                      <Chip
                        label={coupon.isActive ? "Active" : "Inactive"}
                        color={coupon.isActive ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Deactivate">
                        <IconButton
                          color="error"
                          onClick={() => onDeactivateCoupon(coupon._id)}
                          disabled={!coupon.isActive}
                        >
                          {deactivateloading ? (
                            <LoadingButton loading />
                          ) : (
                            <Delete />
                          )}
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

      <NewCouponModal
        refetch={refetch}
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
    </AdminDashboardLayout>
  );
};

export default CouponAdminDashboard;

interface NewCouponModalProps {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}

const NewCouponModal: React.FC<NewCouponModalProps> = ({
  open,
  onClose,
  refetch,
}) => {
  const axiosAuth = useAxiosAuth();

  const createCouponSchema = z
    .object({
      type: z.enum(["item", "checkout"], {
        required_error: "Please select a coupon type",
      }),
      expiryDate: z.string().nonempty("Expiry date is required"),
      item: z.string().optional(),
      numberOfItems: z.string().optional(),
      discountPercentage: z.string().optional(),
    })
    .refine(
      (data) =>
        (data.type === "item" && data.numberOfItems) ||
        (data.type === "checkout" && data.discountPercentage),
      {
        message:
          "Discount amount is required for item type; discount percentage is required for checkout type.",
        path: ["discountAmount", "discountPercentage"], // Apply the message to both fields
      },
    );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(createCouponSchema),
  });

  const type = watch("type");
  const toast = useToast();

  const { data } = useQuery({
    queryFn: () => axiosAuth.get(`/bundles/sales-items`),
    queryKey: [""],
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: any) => axiosAuth.post(`/coupon`, data),
    onSuccess(data) {
      toast.success("Coupon created successfully");
      reset();
      onClose();
      refetch();
    },
    onError(error: any) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  const handleCreateCoupon = (data: z.infer<typeof createCouponSchema>) => {
    data = {
      ...data,
      expiryDate: moment(data?.expiryDate).format("YYYY-MM-DD"),
    };
    mutate(data);
  };

  console.log(errors);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="bg-primary text-white">
        Create New Coupon
      </DialogTitle>
      <form onSubmit={handleSubmit(handleCreateCoupon)}>
        <DialogContent className="grid grid-cols-2 gap-2">
          {/* <DialogContentText className="text-primary">
            Fill in the details to create a new coupon.
          </DialogContentText> */}

          <SelectField
            label="Type"
            name="type"
            // @ts-ignore
            sx={{
              "& fieldset": {
                background: "#DCDCDC",
                border: "none",
                color: "black",
              },
            }}
            control={control}
            fullWidth
            helperText={
              errors["type"] ? (errors["type"].message as string) : ""
            }
            error={!!errors["type"]}
          >
            {[
              { title: "Item", id: "item" },
              { title: "Checkout", id: "checkout" },
            ].map((item) => (
              <MenuItem
                key={item.title}
                value={item.id}
                className="text-xm capitalize"
              >
                {item.title}
              </MenuItem>
            ))}
          </SelectField>

          <DateInput
            id="expiryDate"
            label="Expiry Date"
            name="expiryDate"
            control={control}
            helperText={
              errors["expiryDate"]
                ? (errors["expiryDate"].message as string)
                : ""
            }
            error={!!errors["expiryDate"]}
          />

          {type === "item" ? (
            <>
              <SelectField
                label="Item"
                name="item"
                // @ts-ignore
                sx={{
                  "& fieldset": {
                    background: "#DCDCDC",
                    border: "none",
                    color: "black",
                  },
                }}
                control={control}
                fullWidth
                helperText={
                  errors["item"] ? (errors["item"].message as string) : ""
                }
                error={!!errors["item"]}
              >
                {data?.data?.data?.map((item) => (
                  <MenuItem
                    key={item?.name}
                    value={item?._id}
                    className="text-xm capitalize"
                  >
                    {item?.name}
                  </MenuItem>
                ))}
              </SelectField>

              <InputField
                label="Number of Items"
                id="numberOfItems"
                name="numberOfItems"
                placeholder=""
                aria-required="true"
                type={"number"}
                fullWidth
                error={!!errors["numberOfItems"]}
                helperText={
                  errors["numberOfItems"]
                    ? (errors["numberOfItems"].message as string)
                    : ""
                }
                control={control}
                inputClassName="bg-secondary"
              />
            </>
          ) : (
            type == "checkout" && (
              <div className="col-span-2">
                <InputField
                  label="Discount Percentage"
                  id="discountPercentage"
                  name="discountPercentage"
                  placeholder=""
                  aria-required="true"
                  type={"number"}
                  fullWidth
                  error={!!errors["discountPercentage"]}
                  helperText={
                    errors["discountPercentage"]
                      ? (errors["discountPercentage"].message as string)
                      : ""
                  }
                  control={control}
                  inputClassName="bg-secondary"
                />
              </div>
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button className="bg-secondary" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            loading={isLoading}
            // sx={{ borderRadius: "12px" }}
            className="bg-primary text-white"
          >
            Create
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
