import React from "react";
import Image from "next/image";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import Link from "next/link";

// const data = [
//   {
//     desc: "Empirical Construction",
//     image: image1,
//     title: "Julie Mehretu",
//     year: 2003,
//     moma: "MoMa",
//   },
//   {
//     desc: "Empirical Construction",
//     image: image2,
//     title: "Julie Mehretu",
//     year: 2003,
//     moma: "MoMa",
//   },
//   {
//     desc: "Empirical Construction",
//     image: image3,
//     title: "Julie Mehretu",
//     year: 2003,
//     moma: "MoMa",
//   },
//   {
//     desc: "Empirical Construction",
//     image: image1,
//     title: "Julie Mehretu",
//     year: 2003,
//     moma: "MoMa",
//   },
//   {
//     desc: "Empirical Construction",
//     image: image2,
//     title: "Julie Mehretu",
//     year: 2003,
//     moma: "MoMa",
//   },
//   {
//     desc: "Empirical Construction",
//     image: image3,
//     title: "Julie Mehretu",
//     year: 2003,
//     moma: "MoMa",
//   },
// ];
const CuratorsPick = ({ artist_id, title, length, data }) => {
  console.log("data is here ", data);
  const artist_data = data?.directus_users_id;
  return (
    <div>
      <h3 className="text-left text-[32px] font-[400] mb-[22px]">{title}</h3>
      <div className="flex justify-between gap-6">
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 justify-between gap-6`}
        >
          {/* .filter((item) => item.entry_id.id !== artist_id) */}
          {artist_data &&
            artist_data?.artworks.map((item, idx) => (
              <div key={idx}>
                <Link href={`/artwork/${item?.entry_id?.id}`}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT}assets/${item?.entry_id?.assets[0]?.directus_files_id}?width=200`}
                    alt={item?.entry_id?.artwork_title || "art"}
                    className="w-full h-[259px]"
                    width={200}
                    height={200}
                  />
                </Link>
                <div>
                  <h6 className="text-left text-[20px] font-[700]">
                    {item?.entry_id?.artwork_title}
                  </h6>
                  <p className="text-left text-[16px] font-[400]">
                    {item?.entry_id?.series_title}
                  </p>
                  <p className="text-left text-[16px] font-[400]">
                    {item?.entry_id?.year_created}
                  </p>
                  <p className="text-left text-[16px] font-[700]">
                    {item.moma}
                  </p>
                </div>
              </div>
            ))}
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default CuratorsPick;
