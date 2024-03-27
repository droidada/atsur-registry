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

export const getServerSideProps = async ({ req, query }) => {
  try {
    const res = await axios.get(`/public/home`);
    console.log(res.data);
    return { props: { data: res.data } };
  } catch (error) {
    console.log(error?.response?.data);
    throw new Error(error);
  }
};

function Home({ data }) {
  console.log(data);

  console.log(data?.data?.categories);
  return (
    <Layout headerStyle={2} footerStyle={1} currentMenuItem={"home"}>
      <FlatTitle5 />
      <FeaturedItem5 categories={data?.data?.categories} />
      <Seller7 artists={data?.data?.artists} />
      <FeaturedItem6 featured_artworks={data?.data?.featured_artworks} />
      {/* <Seller8 />
            <DiscoverItem5 /> */}
      <TopCollections5 collections={data?.data?.curations} />
      <Action5 />
    </Layout>
  );
}

export default Home;
