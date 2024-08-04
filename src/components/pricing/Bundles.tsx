import { BundleType } from "@/types/models/bundle";
import React from "react";
import BundleCard from "./BundleCard";

interface Props {
  bundles: BundleType[];
}
const Bundles: React.FC<Props> = ({ bundles }) => {
  console.log(bundles);
  return (
    <section className="mt-10 md:mt-5 py-10 sm:py-16 md:py-12   flex gap-4 flex-col items-center">
      <div className="flex flex-col gap-4 md:flex-row flex-wrap items-center justify-center">
        {bundles?.map((bundle) => (
          <BundleCard key={bundle._id} bundle={bundle} />
        ))}
      </div>
    </section>
  );
};

export default Bundles;
