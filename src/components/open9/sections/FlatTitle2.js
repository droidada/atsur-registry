import Link from "next/link";
import TitileSlider2 from "../slider/TitileSlider2";


export default function FlatTitle2({pieces}) {
  return (
    <>
      <div className="flat-pages-title-home2 relative">
        <div className="themesflat-container w-full">
          <div className="row">
            <div className="col-md-7">
              <div className="content">
                <h1>
                Find verified information on African art and artifacts.
                </h1>
                <p>
                  Buy and sell NFTs from the world’s top artists. More than
                  1.000 premium digital artworks are available to be yours!
                  Vorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Etiam eu turpis molestie, dictum est a, mattis tellus.
                  Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus,
                  ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra
                </p>
                <div
                  data-wow-delay="0.2s"
                  className="wow fadeInUp flat-button flex"
                >
                  <Link href="#" className="tf-button style-1 h50 w190 mr-30">
                    Explore
                    <i className="icon-arrow-up-right2" />
                  </Link>
                  <Link href="#" className="tf-button style-2 h50 w190 active">
                    Create
                    <i className="icon-arrow-up-right2" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="banner__right relative">
                {/* <TitileSlider2 /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
