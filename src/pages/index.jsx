import axios from "@/lib/axios";
import Layout from "@/open9/layout/Layout";
import Action5 from "@/open9/sections/Action5";
import DiscoverItem5 from "@/open9/sections/DiscoverItem5";
import FeaturedItem5 from "@/open9/sections/FeaturedItem5";
import FeaturedItem6 from "@/open9/sections/FeaturedItem6";
import FlatTitle5 from "@/open9/sections/FlatTitle5";
import Seller7 from "@/open9/sections/Seller7";
import Seller8 from "@/open9/sections/Seller8";
import TopCollections5 from "@/open9/sections/TopCollections5";
import { useEffect, useState } from "react";

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



function Home() {

  const [data, setData] = useState();
  const [artPieces, setArtPieces] = useState();

  useEffect(()=>{
    async function fetchData() {
      try {
        const res = await axios.get(`/public/home`);
        console.log(res.data);
        setData(res.data);
        console.log("setting data here ", res.data)
        if(res.data){
          const pieces =res?.data?.data?.allPieces[0]?.type?.filter(
            (item) => item._id === "art-piece",
          )
          console.log("setting art pieces ", pieces)
          setArtPieces(pieces);
        }
      } catch (error) {
        console.error(error);
        // throw new Error(error);
      }
    }
    fetchData();

  },[])
  //console.log(data?.data?.allPieces[0]?.type);



  return (
    <Layout headerStyle={2} footerStyle={1} currentMenuItem={"home"}>
      { artPieces && <FlatTitle5 pieces={artPieces[0]?.artPieces} /> }
      {data &&
        <>
          <FeaturedItem5 categories={data?.data?.allPieces[0]?.categories} />
          <Seller7 artists={data?.data?.artists} />
          <FeaturedItem6 featured_artworks={data?.data?.featured_artworks} />
          {/* <Seller8 />
                <DiscoverItem5 /> */}
          <TopCollections5 collections={data?.data?.curations} />
        </>
      }
      <Action5 />
    </Layout>
  );
}

export default Home;
