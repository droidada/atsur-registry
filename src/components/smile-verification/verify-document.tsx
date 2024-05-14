import useAxiosAuth from "@/hooks/useAxiosAuth";
import axios from "@/lib/axios";
import "@smile_identity/smart-camera-web";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  country: string;
  idType: string;
}
const VerifyDocument: React.FC<Props> = ({ country, idType }) => {
  const asyncfetch = useAxiosAuth();
  const router = useRouter();

  const sendComputed = () => {
    const app = document.querySelector("smart-camera-web");

    app.addEventListener("imagesComputed", async (e) => {
      try {
        const response = await asyncfetch.post(
          "/smile-verification/document",
          JSON.stringify({
            // @ts-ignore
            ...e.detail,
            id_info: { country, id_type: idType },
          }),
        );

        if (response.status === 200) {
          router.push("/dashboard/security/verify-document/status");
        }
      } catch (error) {
        router.push("/dashboard/security/verify-document/status");

        console.log(error?.response?.data);
      }
    });
  };

  useEffect(() => {
    sendComputed();
  }, []);
  return (
    <div className="w-full p-3">
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
