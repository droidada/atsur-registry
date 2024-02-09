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

// export const getServerSideProps = async ({req, query}) => {
//   try {
//       const res = await axios.get(`/home`);
//       return { props: { data: res.data } }

//   } catch (error) {
//      throw new Error(error);
//   }
// }

function Home() {
  return (
    <Layout headerStyle={2} footerStyle={1} currentMenuItem={"home"}>
      <FlatTitle5 />
      <FeaturedItem5 />
      <Seller7 />
      <FeaturedItem6 />
      {/* <Seller8 />
            <DiscoverItem5 /> */}
      <TopCollections5 />
      <Action5 />
    </Layout>
  );
}

export default Home;
