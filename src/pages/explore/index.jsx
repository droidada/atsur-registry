import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useLoadingContext } from "@/providers/loading.context";
import UnprotectedPage from "@/HOC/Unprotected";
import HomePage from "@/components/HomePage";
import { getToken } from "next-auth/jwt";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/public/hero-images`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    console.log(res?.data);

    return { props: { heroImages: res.data.heroImages } };
  } catch (error) {
    console.error("error here looks like ", error);
    if (error?.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error(error);
  }
};
function Home({ heroImages }) {
  const [data, setData] = useState();
  const [artPieces, setArtPieces] = useState();
  const { load, loading } = useLoadingContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await load(axios.get(`/public/home`));

        setData(res?.data);
        if (res?.data) {
          const pieces = res?.data?.data?.allPieces[0]?.type?.filter(
            (item) => item._id === "art-piece",
          );
          setArtPieces(pieces);
        }
      } catch (error) {
        console.error(error);
        // throw new Error(error);
      }
    }
    fetchData();
  }, []);

  return (
    data &&
    artPieces && (
      <HomePage
        heroImages={heroImages}
        pageData={{ ...data?.data, artPieces: artPieces[0]?.artPieces }}
      />
    )
  );
}

export default UnprotectedPage(Home);
