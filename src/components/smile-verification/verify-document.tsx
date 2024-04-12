import useAxiosAuth from "@/hooks/useAxiosAuth";
import "@smile_identity/smart-camera-web";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const VerifyDocument = () => {
  const asyncfetch = useAxiosAuth();

  const sendComputed = () => {
    const app = document.querySelector("smart-camera-web");

    app.addEventListener("imagesComputed", async (e) => {
      try {
        // @ts-ignore
        console.log("This is the details", e.details);

        const response = await asyncfetch(
          "/smile-verification/document",
          // @ts-ignore
          e.details,
        );

        console.log("This is the response", response);
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    sendComputed();
  }, []);
  return (
    <div>
      {/* @ts-ignore */}
      <smart-camera-web
        capture-id="back"
        document-capture-modes="camera,upload"
      >
        {/* @ts-ignore */}
      </smart-camera-web>
    </div>
  );
};

export default VerifyDocument;
