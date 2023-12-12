import { useEffect, useState } from "react";
import { Grid, Button, Select } from "@mui/material";
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import Image from "next/image";
import DefaultOrg from "../../../../assets/image.jpeg";
import useAxiosAuth from "@/hooks/useAxiosAuth";

function Organizations() {
  const [entries, setEntries] = useState([]);
  const axiosAuth = useAxiosAuth();
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await axiosAuth(
          "users/me?fields=organizations,organizations.organization_id.*,organizations.organization_id.assets.*, organizations.organization_id.asset_files.*",
        );
        const data = res.data;
        setEntries(data.data.organizations);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrganizations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardLayout>
      <div className="flex justify-between my-8">
        <p>{entries && entries.length} Results</p>
        <Button href="/dashboard/organizations/add">Add Organization</Button>
      </div>
      <Grid
        container
        spacing={2}
        columnSpacing={3}
        rowSpacing={3}
        xs={12}
        sm={8}
        md={12}
        px={10}
      >
        {entries && entries.length > 0 ? (
          entries?.map((item, idx) => (
            <div key={idx}>
              <Link href={"/organization/" + item.organization_id.id}>
                <Image
                  src={
                    item.assets
                      ? `${process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT}assets/${item.assets[0]?.directus_files_id}?height=259`
                      : DefaultOrg
                  }
                  alt={item.artwork_title || `art`}
                  className="w-full h-[259px]"
                  width={300}
                  height={259}
                />
              </Link>
              <div>
                <h6 className="text-left text-[24px] font-[400]">
                  {item.organization_id.name}
                </h6>
                <p className="text-left text-[16px] font-[400]">
                  {item.organization_id.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>You do not have any organizations for now</p>
        )}
      </Grid>
    </DashboardLayout>
  );
}

Organizations.requiredAuth = true;
export default Organizations;
