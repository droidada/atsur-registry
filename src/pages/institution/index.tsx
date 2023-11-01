import React from "react";
import Layout from "@/components/layout";
import Image from "next/image";
import image1 from "../../../assets/image1.png";

const Institution = () => {
  return (
    <Layout>
      <div className="p-10">
        <h1 className="text-[48px] font-[600]">Osengwa</h1>
        <p className="mb-[76px] text-[24px] font-[400]">Lagos, Accra</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4 order-2 sm:order-1">
            <p>
              OSENGWA is an occasion to see, hear and experience the new
              generation of artists birthed from the African continent and
              influenced by global culture as it continuously evolves. OSENGWA
              is contemporary African art, music, clothing and design at its
              most lovingly and expertly curated, providing a one-of-a-kind
              platform for immersion in the Neo-African cultural movement. We
              are the future of African contemporary art, curating and
              consulting for discerning art lovers of today.
            </p>
            <p>
              The artists and brands featured on OSENGWA are innovative,
              intriguing and inspired. In showcasing work of such high caliber,
              OSENGWA serves as a cross-cultural space where artists can share
              the fruits of their creative processes. OSENGWA recognizes
              established artists with a following and also provides a platform
              for emerging artists to flourish.
            </p>
          </div>
          <Image alt="" src={image1} className="h-[308px] order-1 sm:order-2" />
        </div>
        <p className="text-[32px] mt-16">Artist Roster</p>
      </div>
    </Layout>
  );
};

export default Institution;
