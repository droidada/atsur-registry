import UnprotectedPage from "@/HOC/Unprotected";
import { Button } from "@mui/material";
import Link from "next/link";

function Custom500() {
  return (
    <div className="flex min-h-screen  flex-col items-center justify-center py-8 md:py-12 h-full space-y-6">
      <div className="flex items-center text-6xl md:text-9xl font-extrabold text-gray-800">
        5<span className="text-primary">0</span>0
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
        Oops! Something went wrong.
      </h2>
      <p className="text-center text-gray-600 max-w-lg">
        We encountered an internal error and couldn&apos;t complete your
        request. Please try again later or contact support if the problem
        persists.
      </p>
      <Button
        component={Link}
        href="/"
        className="bg-primary text-white px-6 py-2 text-lg hover:bg-primary-dark transition-all duration-300"
      >
        Return to Home
        <i className="icon-arrow-up-right2 ml-2" />
      </Button>
    </div>
  );
}

export default UnprotectedPage(Custom500);
