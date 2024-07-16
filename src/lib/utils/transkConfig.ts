import { TransakConfig, Transak } from "@transak/transak-sdk";
import dotenv from "dotenv";
dotenv.config();

export const defaultTransakConfig: TransakConfig = {
  apiKey: "ffe203a7-07b6-4ad0-8c09-508027cdc0a3", // process.env. (Required)
  environment: Transak.ENVIRONMENTS.STAGING, // /Transak.ENVIRONMENTS.PRODUCTION, // (Required)
  fiatCurrency: "cUSD",
  defaultFiatCurrency: "cUSD",
  defaultNetwork: "Celo",
  walletAddress: "0xF6F193B066039DE07df05bb31Afe36524C15fd5F",
  disableWalletAddressForm: true,
  exchangeScreenTitle: "Deposit",
  themeColor: "",
  // .....
  // For the full list of customisation options check the link below
};

const transak = new Transak({...defaultTransakConfig});

// transak.init();

// To get all the events
Transak.on("*", (data) => {
  console.log(data);
});

// This will trigger when the user closed the widget
Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
  console.log("Transak SDK closed!");
});

/*
 * This will trigger when the user has confirmed the order
 * This doesn't guarantee that payment has completed in all scenarios
 * If you want to close/navigate away, use the TRANSAK_ORDER_SUCCESSFUL event
 */
Transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, (orderData) => {
  console.log(orderData);
});

/*
 * This will trigger when the user marks payment is made
 * You can close/navigate away at this event
 */
Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
  console.log(orderData);
  transak.close();
});
