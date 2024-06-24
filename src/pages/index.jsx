import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useLoadingContext } from "@/providers/loading.context";
import UnprotectedPage from "@/HOC/Unprotected";
import HomePage from "@/components/HomePage";

// export const getServerSideProps = async ({ req, query }) => {
//   try {
//     const res = await axios.get(`/public/home`);
//     console.log(res.data);
//     return { props: { data: res.data } };
//   } catch (error) {
//     console.log(error?.response?.data);
//     throw new Error(error);
//   }
// };

// function Home({ data }) {
//   console.log(data?.data?.allPieces[0]?.type);

//   const artPieces = data?.data?.allPieces[0]?.type?.filter(
//     (item) => item._id === "art-piece",
//   );

//   console.log(artPieces[0]?.artPieces?.length);

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
