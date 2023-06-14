import BlogCard from "@/components/layouts/shared/BlogCard";
import config from "@/data/config.json";
import { getSinglePage } from "@/lib/contentParser";
import { getTaxonomy } from "@/lib/taxonomyParser";
import taxonomyFilter from "@/lib/utils/taxonomyFilter";
import { humanize } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";

const { blog_folder } = config.settings;
type StaticParams = () => { single: string }[];

// remove dynamicParams
export const dynamicParams = false;

export const getStaticPaths = () => {
  return { paths: [], fallback: false };
};

// generate static params
export const generateStaticParams: StaticParams = () => {
  const categories = getTaxonomy(blog_folder, "categories");

  const paths = categories.map((category) => ({
    single: category,
  }));

  return paths;
};

const CategorySingle = ({
  params,
  props,
}: {
  params: { single: string };
  props;
}) => {
  const filterByCategories = taxonomyFilter(
    props.posts,
    "categories",
    params.single
  );

  return (
    <>
      <SeoMeta title={humanize(params.single)} />
      <PageHeader title={humanize(params.single)} />
      <div className="section-sm pb-0">
        <div className="container">
          <div className="row">
            {filterByCategories.map((post: Post, index: number) => (
              <div className="mb-14 md:col-6 lg:col-4" key={index}>
                <BlogCard data={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const posts: Post[] = getSinglePage(blog_folder);
  return {
    props: {
      posts,
    },
  };
}

export default CategorySingle;
