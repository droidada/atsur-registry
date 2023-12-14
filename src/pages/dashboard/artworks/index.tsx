import { useEffect, useState } from "react";
import { Grid, Button, Select } from "@mui/material";
import DashboardLayout from "@/components/layout/dashboard-layout";
import Link from "next/link";
import Image from "next/image";

function Artworks() {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await fetch(
          "https://admin.atsur.art/items/entry?fields=*,assets.*, asset_files.*",
        );
        const data = await res.json();
        setEntries(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArtworks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardLayout>
      <div className="flex justify-between my-8">
        <p>{entries && entries.length} Results</p>
        <Select name="" id="">
          <option value="Recommended">Retro Africa</option>
          <option value="Recommended">Thought Pyramid</option>
        </Select>
        <Button href="/dashboard/artworks/add">Add Artwork</Button>
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
        {entries &&
          entries?.map((item, idx) => (
            <div key={idx}>
              <Link href={"/dashboard/artworks/" + item.id}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT}assets/${item.assets[0]?.directus_files_id}?height=259`}
                  alt={item.artwork_title || `art`}
                  className="w-full h-[259px]"
                  width={300}
                  height={259}
                />
              </Link>
              <div>
                <h6 className="text-left text-[24px] font-[400]">
                  {item.title}
                </h6>
                <p className="text-left text-[16px] font-[400]">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
      </Grid>
    </DashboardLayout>
  );
}

Artworks.requiredAuth = true;
export default Artworks;
