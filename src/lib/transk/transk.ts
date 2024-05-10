import { TransakConfig, Transak } from '@transak/transak-sdk';
import { config } from 'dotenv';

config();

export const transakConfig: TransakConfig = {
  apiKey: process.env.NEXT_PUBLIC_TRANSK_API_KEY, // (Required)
  environment: Transak.ENVIRONMENTS.STAGING, //Transak.ENVIRONMENTS.PRODUCTION, // (Required)
  network: 'sepolia',
  isFeeCalculationHidden: true,
  defaultCryptoCurrency: 'DAI',
  paymentMethod: 'credit_debit_card',
  defaultFiatCurrency: 'USD',
  fiatCurrency: 'USD',
  walletAddressesData: {
    // networks: {
    //   ethereum: { address: '0x6353D15E8A61df4eD412746654D44B8188a737C1' },
    //   polygon: { address: '0x6353D15E8A61df4eD412746654D44B8188a737C1', addressAdditionalData: '123456' },
    // },
    coins: {
    //   BTC: { address: '0x6353D15E8A61df4eD412746654D44B8188a737C1' },
      DAI: { address: '0x6353D15E8A61df4eD412746654D44B8188a737C1' },
    //   BNB: { address: '0x6353D15E8A61df4eD412746654D44B8188a737C1', addressAdditionalData: '123456' },
    },
  }
//   cryptoCurrencyCode: '',
//   redirectURL: '',

  //email
  //walletAddress
  // .....
  // For the full list of customisation options check the link below
};

//export const transak = new Transak(transakConfig);

// transak.init();

// To get all the events
Transak.on('*', (data) => {
  console.log(data);
});

// This will trigger when the user closed the widget
Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
  console.log('Transak SDK closed!');
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
 // transak.close();
});