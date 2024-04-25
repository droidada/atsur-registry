/* eslint-disable import/no-anonymous-default-export */
export default {
  title: "Atsur Registry | Explore investment ready African artworks",
  description: "Explore investment ready African artworks",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: process.env.NEXT_PUBLIC_SITE_ADDRESS,
    site_name: "Atsur Registry",
  },
  twitter: {
    // TODO ADD atsur twitter handle
    handle: "@atsurregistry",
    site: "@atsurregistry",
    cardType: "summary_large_image",
  },
  canonical: process.env.NEXT_PUBLIC_SITE_ADDRESS,
  images: [
    { url: "./public/atsur-logo.png", alt: "Atsur Logo", type: "image/png" },
    {
      url: "./public/atsur-logo-white.png",
      alt: "Atsur Logo",
      type: "image/png",
    },
    {
      url: "./public/atsur-logo-black.png",
      alt: "Atsur Logo",
      type: "image/png",
    },
  ],
  authorName: "Atsur",
};
