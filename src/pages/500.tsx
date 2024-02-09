import Layout from "@/open9/layout/Layout";
import Link from "next/link";
export default function Custom500() {
  return (
    <>
      <Layout headerStyle={2} footerStyle={1}>
        <div className="section-404-page relative">
          <div className="content">
            5<span className="tf-color">0</span>0
          </div>
          <h2>Oh no... This is embarrassing... </h2>
          <p>
            Something seems to have gone wrong.{" "}
            <br />
            Let’s find a better place for you to go.
          </p>
          <Link href="/" className="tf-button w320 style-1 h50">
            Back to home
            <i className="icon-arrow-up-right2" />
          </Link>
        </div>
      </Layout>
    </>
  );
}
