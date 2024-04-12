import Link from "next/link";
export default function Action5() {
  return (
    <>
      <div className="tf-section action">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="action__body bg-white">
                <div className="tf-tsparticles">
                  <div
                    id="tsparticles1"
                    data-color="#d9d9d9"
                    data-line="#000"
                  />
                </div>
                <p className="text-center capitalize mx-auto mw-667">
                  Explore the largest catalogue of African art and artifacts.{" "}
                </p>
                <div className="flat-button flex justify-center">
                  <Link href="/explore" className="tf-button style-2 h50 w190">
                    Explore now
                    <i className="icon-arrow-up-right2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
