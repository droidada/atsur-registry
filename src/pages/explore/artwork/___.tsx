import Layout from "@/components/layout/layout";
import { Checkbox, Divider, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";
import image from "../../../../assets/image1.png";
import Image from "next/image";
import { notFound } from "next/navigation";

const data = {
  galleries: {
    titles: {
      location: "Location",
      specialty: "Speciality",
    },
    filters: {
      location: ["Accra", "Lagos", "Dakar", "Bamako", "London"],
      specialty: [
        "New Media & Video",
        "Ceramics",
        "Photography",
        "Private Collections",
        "Artifacts & Antiquities",
      ],
    },
  },
  artworks: {
    titles: {
      categories: "Categories",
      rarity: "Rarity",
      status: "Status",
      medium: "Medium",
    },
    filters: {
      categories: [],
      rarity: ["Unique", "Limited Edition", "Open Edition", "Unknown Edition"],
      status: [
        "Primary Sale",
        "Secondary Sale",
        "Live Auction",
        "Open Offer",
        "Custodianship",
      ],
      medium: ["NFT", "Painting", "Photography", "Sculpture", "Work on Paper"],
    },
  },
  items: [
    {
      image: image,
      title: "Rélé Gallery",
      location: "Lagos, Los Angeles",
    },
    {
      image: image,
      title: "Rélé Gallery",
      location: "Lagos, Los Angeles",
    },
    {
      image: image,
      title: "Rélé Gallery",
      location: "Lagos, Los Angeles",
    },
    {
      image: image,
      title: "Rélé Gallery",
      location: "Lagos, Los Angeles",
    },
    {
      image: image,
      title: "Rélé Gallery",
      location: "Lagos, Los Angeles",
    },
    {
      image: image,
      title: "Rélé Gallery",
      location: "Lagos, Los Angeles",
    },
    {
      image: image,
      title: "Rélé Gallery",
      location: "Lagos, Los Angeles",
    },
    {
      image: image,
      title: "Rélé Gallery",
      location: "Lagos, Los Angeles",
    },
    {
      image: image,
      title: "Rélé Gallery",
      location: "Lagos, Los Angeles",
    },
  ],
};

// async function getEntries() {
//   try {
//     const entries = await directus.request(
//       readItems("entry", {
//         fields: ["slug", "title", "publish_date", { author: ["name"] }],
//         sort: ["-created_at"],
//       }),
//     );

//     return entries;
//     console.log("we have entries here");
//   } catch (error) {
//     console.log(error);
//     notFound();
//   }
// }

// console.log("we have get entries here ", getEntries());

const Explore = () => {
  return (
    <Layout>
      <div className="p-10 flex flex-col gap-6">
        <div className="flex flex-wrap">
          <h1 className="text-[48px] font-[300]">Explore |</h1>
          <select className="text-[48px] font-[300] italic" name="" id="">
            <option value="Galleries">Galleries</option>
            <option value="Artworks">Artworks</option>
          </select>
        </div>
        <p>Discover Artwork and artifact history</p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-12">
          <div className="flex flex-col gap-4">
            <p>HIDE FILTER</p>
            <Divider />
            <div>
              <p>Location</p>
              <div>
                <FormGroup>
                  {data.galleries.filters.location.map((item, idx) => (
                    <FormControlLabel
                      key={idx}
                      control={<Checkbox />}
                      label={item}
                    />
                  ))}
                </FormGroup>
              </div>
              <p>Show more</p>
            </div>
            <Divider />
            <div>
              <p>Specialty</p>
              <div>
                <FormGroup>
                  {data.galleries.filters.specialty.map((item, idx) => (
                    <FormControlLabel
                      key={idx}
                      control={<Checkbox />}
                      label={item}
                    />
                  ))}
                </FormGroup>
              </div>
              <p>Show more</p>
            </div>
            <Divider />
          </div>
          <div className="col-span-3">
            <div className="flex justify-between">
              <p>132 Results</p>
              <select name="" id="">
                <option value="Recommended">Recommended</option>
              </select>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 mt-12 gap-x-4 gap-y-6">
              {data.items.map((item, idx) => (
                <div key={idx}>
                  <Image
                    src={item.image}
                    alt="art"
                    className="w-full h-[259px]"
                  />
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Explore;