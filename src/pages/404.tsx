import UnprotectedPage from "@/HOC/Unprotected";
import Layout from "@/open9/layout/Layout";
import Link from "next/link";
function Custom404() {
  return (
    <>
      <div className="section-404-page relative">
        <div className="content">
          4<span className="tf-color">0</span>4
        </div>
        <h2>Oh no... We lost this page</h2>
        <p>
          We searched everywhere but couldn&apos;t find what you&apos;re looking
          for. <br />
          Let&apos;s find a better place for you to go.
        </p>
        <Link href="/" className="tf-button w320 style-1 h50">
          Back to home
          <i className="icon-arrow-up-right2" />
        </Link>
      </div>
    </>
  );
}

export default UnprotectedPage(Custom404);
