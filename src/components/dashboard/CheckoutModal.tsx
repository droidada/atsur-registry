import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import axios from "axios";
import { useSession } from "next-auth/react";
// import PaystackPop from "@paystack/inline-js";

import dynamic from "next/dynamic";

const CheckoutModal = ({ open, onClose }) => {
  const [quantities, setQuantities] = useState({});
  const axiosAuth = useAxiosAuth();
  const { data: session } = useSession();

  console.log(session?.user?.email);

  const { data, isLoading, error } = useQuery({
    queryFn: () => axiosAuth.get("/bundles/sales-items"),
    queryKey: ["sales-items"],
  });

  useEffect(() => {
    if (data?.data?.data) {
      setQuantities(
        data.data.data.reduce((acc, item) => ({ ...acc, [item.sku]: 0 }), {}),
      );
    }
  }, [data]);

  const handleQuantityChange = (sku, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [sku]: Math.max(0, prev[sku] + delta),
    }));
  };

  const totalPrice = data?.data?.data?.reduce(
    (sum, item) => sum + item.unitPrice * quantities[item.sku],
    0,
  );

  const handleCheckout = async () => {
    // Filter out items with quantity 0
    const itemsToCheckout = Object.entries(quantities)
      // @ts-ignore
      .filter(([_, quantity]) => quantity > 0)
      .map(([sku, quantity]) => ({
        sku,
        quantity,
        item: data.data.data.find((item) => item.sku === sku)?._id,
      }));

    const { data: rateData } = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/USD`,
    );
    const exchangeRate = rateData.rates.NGN;
    const nairaPrice = totalPrice * parseInt(exchangeRate);

    console.log(nairaPrice);

    console.log("Checkout:", itemsToCheckout);
    // Here you would typically integrate with your payment processor
    // For example, initialize Paystack:
    const paystack = await import("@paystack/inline-js").then(
      (module) => module.default,
    );
    console.log(paystack);
    const paystackInstance = new paystack();
    console.log("live key", process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY);
    paystackInstance.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: session?.user?.email,
      amount: nairaPrice * 100,
      metadata: {
        type: "credit",
        items: itemsToCheckout,
      },
    });

    onClose();
  };

  if (error) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle className="bg-black text-white text-2xl font-bold p-4">
          Error
        </DialogTitle>
        <DialogContent className="p-6">
          <Typography color="error">
            An error occurred while fetching sales items. Please try again
            later.
          </Typography>
        </DialogContent>
        <DialogActions className="p-4 bg-gray-100">
          <Button onClick={onClose} className="text-black">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="bg-black text-white text-2xl font-bold p-4">
        You don&apos;t have enough credits to perform this task. Buy more
        credits
      </DialogTitle>
      <DialogContent className="p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
          </div>
        ) : (
          <>
            {data?.data?.data?.map((item) => (
              <div
                key={item.sku}
                className="flex items-center justify-between mb-4 p-2 border-b border-gray-200"
              >
                <div>
                  <Typography variant="h6" className="font-semibold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {item.description}
                  </Typography>
                  <Typography variant="body1" className="font-medium mt-1">
                    ${item.unitPrice.toFixed(2)}
                  </Typography>
                </div>
                <div className="flex items-center">
                  <IconButton
                    onClick={() => handleQuantityChange(item.sku, -1)}
                    size="small"
                    className="text-black"
                    disabled={quantities[item.sku] === 0}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1" className="mx-2 w-8 text-center">
                    {quantities[item.sku]}
                  </Typography>
                  <IconButton
                    onClick={() => handleQuantityChange(item.sku, 1)}
                    size="small"
                    className="text-black"
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </div>
            ))}
            <div className="mt-6">
              <Typography variant="h5" className="font-bold">
                Total: ${totalPrice?.toFixed(2) || "0.00"}
              </Typography>
            </div>
          </>
        )}
      </DialogContent>
      <DialogActions className="p-4 bg-gray-100">
        <Button onClick={onClose} className="text-black">
          Cancel
        </Button>
        <Button
          variant="contained"
          className="bg-black text-white hover:bg-gray-800"
          onClick={handleCheckout}
          disabled={isLoading || !totalPrice || totalPrice === 0}
        >
          Checkout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutModal;
