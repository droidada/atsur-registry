import UnprotectedPage from "@/HOC/Unprotected";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
function Custom404() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center pt-8 md:pt-12  h-full ">
      <div className="flex items-center gap-3">
        <div className="text-4xl font-bold md:text-7xl">
          4<span className="text-secondary">0</span>4
        </div>
        <Image
          src="/images/no-data.png"
          width={100}
          height={100}
          className="object-contain"
          alt="page not found"
        />
      </div>
      <div className="flex items-center gap-2">
        <div>
          <h2 className="font-semibold text-lg">Oh no... We lost this page</h2>
        </div>
      </div>
      <p className="text-center">
        We searched everywhere but couldn&apos;t find what you&apos;re looking
        for. <br />
        Let&apos;s find a better place for you to go.
      </p>
      <Button
        component={Link}
        href="/"
        className="h-50 bg-primary text-white px-3"
      >
        Back to home
        <i className="icon-arrow-up-right2" />
      </Button>
    </div>
  );
}

export default UnprotectedPage(Custom404);
