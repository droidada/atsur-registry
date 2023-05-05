import dynamic from "next/dynamic";

type CloverProps = {
  id: string;
};

const CloverIIIF = dynamic<CloverProps>(() => import("@samvera/clover-iiif"), {
  ssr: false,
});

export default CloverIIIF;
