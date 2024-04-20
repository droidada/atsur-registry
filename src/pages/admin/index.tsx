import Layout from "@/open9/layout/Layout";
import Link from "next/link";

export default function Admin() {
  return (
    <>
      <Layout headerStyle={2} footerStyle={1}>
        <div className="section-404-page relative">
          <div className="content">
            <span className="tf-color">A</span>DMI
            <span className="tf-color">N</span>
          </div>
          <h2>Welcome to the admin page</h2>
          <p>We will be populating this with site admin stuff. </p>
          <Link href="/" className="tf-button w320 style-1 h50">
            Back to home
            <i className="icon-arrow-up-right2" />
          </Link>
        </div>
      </Layout>
    </>
  );
}
