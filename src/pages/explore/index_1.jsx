import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useLoadingContext } from "@/providers/loading.context";
import UnprotectedPage from "@/HOC/Unprotected";
import HomePage from "@/components/HomePage";

function Home() {
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
        pageData={{ ...data?.data, artPieces: artPieces[0]?.artPieces }}
      />
    )
  );
}

export default UnprotectedPage(Home);
