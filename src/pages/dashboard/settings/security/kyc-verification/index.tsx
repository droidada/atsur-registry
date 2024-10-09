import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "@/lib/axios";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getToken } from "next-auth/jwt";
import ProtectedPage from "@/HOC/Protected";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) return;

    const res = await axios.get(`/smile-verification/status?type=kyc`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    console.log(res.data?.data);

    console.log("This is the data", res?.data?.data);

    if (res.data && res.data?.data?.verificationStatus !== "not-verified") {
      return {
        redirect: {
          destination: "/dashboard/settings/security/kyc-verification/status",
          permanent: false,
        },
      };
    }

    return { props: { status: res.data?.data } };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const VerifyDocument = dynamic(
  () => import("@/components/smile-verification/verify-document"),
  { loading: () => <div>Loading...</div>, ssr: false },
);
const KycVerification = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [seletedIdType, setSelectedIdType] = useState(null);

  console.log(selectedCountry, seletedIdType);

  const fetchCountries = async () => {
    try {
      const { data: countries } = await axios.get(
        `https://restcountries.com/v3.1/all?fields=name,cca2`,
      );

      const formattedCountries = countries
        .map((country) => ({
          name: country.name.common,
          code: country.cca2,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      const wantedCountries = ["nigeria", "kenya", "ghana", "south africa"];

      setCountries(
        formattedCountries.filter((country) =>
          wantedCountries.includes(country.name.toLowerCase()),
        ),
      );
    } catch (error) {
      console.log("Error fetching countries", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  console.log(selectedCountry, seletedIdType);

  return (
    <>
      <h1 className="text-3xl  mb-4 font-[600]">Personal KYC Verification</h1>

      <div className="flex flex-col gap-4 mt-7">
        <div className="flex flex-col gap-3">
          <label
            htmlFor="country"
            className="text-[18px] leading-[16px] font-[400]"
          >
            Country
          </label>
          <select
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full focus:border-none focus:outline-none focus:ring-0 bg-secondary-white "
            name="country"
            id=""
          >
            <option value="" selected disabled>
              Select country
            </option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="id-type"
            className="text-[18px] leading-[16px] font-[400]"
          >
            ID Type
          </label>
          <select
            onChange={(e) => setSelectedIdType(e.target.value)}
            className="w-full focus:border-none focus:outline-none focus:ring-0 bg-secondary-white "
            name="id-type"
            id=""
          >
            <option value="" selected disabled>
              Select ID Type
            </option>
            {[
              "PASSPORT",
              // "SOCIAL_ID",
              "VOTER_ID",
              // "RESIDENT_ID",
              "DRIVERS_LICENSE",
              "IDENTITY_CARD",
            ].map((type) => (
              <option className="capitalize" key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-3 items-center bg-secondary-white">
          {selectedCountry && seletedIdType && (
            <VerifyDocument country={selectedCountry} idType={seletedIdType} />
          )}
        </div>
      </div>
    </>
    // <DashboardLayoutWithSidebar activePage={DashboardPages.SECURITY}>
    // <div className="row">
    //   <h2>KYC Verification</h2>

    //   <div className="flex flex-col items-center p-4 max-w-[550px] w-full mx-auto">
    //     <Autocomplete
    //       disablePortal
    //       fullWidth
    //       id="combo-box-demo"
    //       options={countries}
    //       onChange={(event, newValue) => {
    //         console.log(newValue);
    //         setSelectedCountry(newValue?.code);
    //       }}
    //       getOptionLabel={(option) => option.name}
    //       value={selectedCountry?.code}
    //       renderInput={(params) => (
    //         <TextField
    //           {...params}
    //           label="Country"
    //           placeholder="Select a country"
    //         />
    //       )}
    //     />

    //     <FormControl className="mt-4 w-full">
    //       <InputLabel id="id_type">ID Type</InputLabel>
    //       <Select
    //         label="ID Type"
    //         id="id_type"
    //         fullWidth
    //         labelId="id_type"
    //         value={seletedIdType}
    //         onChange={(e) => setSelectedIdType(e.target.value)}
    //       >
    //         {[
    //           "PASSPORT",
    //           // "SOCIAL_ID",
    //           "VOTER_ID",
    //           // "RESIDENT_ID",
    //           "DRIVERS_LICENSE",
    //           "IDENTITY_CARD",
    //         ]
    //           .sort()
    //           .map((idType) => (
    //             <MenuItem className="capitalize" key={idType} value={idType}>
    //               {idType.replace("_", " ")}
    //             </MenuItem>
    //           ))}
    //       </Select>
    //     </FormControl>
    //     {/* <p></p> */}
    //     {selectedCountry && seletedIdType && (
    //       <VerifyDocument country={selectedCountry} idType={seletedIdType} />
    //     )}
    //   </div>
    // </div>
    // </DashboardLayoutWithSidebar>
  );
};

export default ProtectedPage(KycVerification);
