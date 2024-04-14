import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import DashboardLayoutWithSidebar, {
  DashboardPages,
} from "@/components/open9/layout/DashboardLayoutWithSidebar";
import axios from "@/lib/axios";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const VerifyDocument = dynamic(
  () => import("@/components/smile-verification/verify-document"),
  { loading: () => <div>Loading...</div>, ssr: false },
);
const Index = () => {
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

      setCountries(formattedCountries);
    } catch (error) {
      console.log("Error fetching countries", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <DashboardLayoutWithSidebar activePage={DashboardPages.SECURITY}>
      <div className="row">
        <h2>KYC Verification</h2>

        <div className="flex flex-col items-center p-4 max-w-[550px] w-full mx-auto">
          <Autocomplete
            disablePortal
            fullWidth
            id="combo-box-demo"
            options={countries}
            onChange={(event, newValue) => {
              console.log(newValue);
              setSelectedCountry(newValue?.code);
            }}
            getOptionLabel={(option) => option.name}
            value={selectedCountry?.code}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                placeholder="Select a country"
              />
            )}
          />

          <FormControl className="mt-4 w-full">
            <InputLabel id="id_type">ID Type</InputLabel>
            <Select
              label="ID Type"
              id="id_type"
              fullWidth
              labelId="id_type"
              value={seletedIdType}
              onChange={(e) => setSelectedIdType(e.target.value)}
            >
              {[
                "PASSPORT",
                // "SOCIAL_ID",
                "VOTER_ID",
                // "RESIDENT_ID",
                "DRIVERS_LICENSE",
                "IDENTITY_CARD",
              ]
                .sort()
                .map((idType) => (
                  <MenuItem className="capitalize" key={idType} value={idType}>
                    {idType.replace("_", " ")}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {/* <p></p> */}
          {selectedCountry && seletedIdType && (
            <VerifyDocument country={selectedCountry} idType={seletedIdType} />
          )}
        </div>
      </div>
    </DashboardLayoutWithSidebar>
  );
};

export default Index;
