import { useEffect, useState } from "react";
import axios from "@/lib/axios";

export default function SelectOrg() {
  const [searchItem, setSearchItem] = useState("");
  const [pieces, setPieces] = useState([]);

  const handleOnClick = (index) => {};

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    if (!searchTerm || searchTerm === "") return;
  };
  const filterPieces = async () => {
    const res = await axios.get("/public/explore");
    console.log("res here is ", res);
    setPieces(res.data?.artPieces);
  };

  useEffect(() => {
    filterPieces();
  }, []);

  return (
    <>
      <div>
        <div className="flat-title-page">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-2"></div>
              <div className="col-8">
                <div
                  data-wow-delay="0.2s"
                  className="wow fadeInUp widget-search"
                  style={{ marginTop: "20px" }}
                >
                  <form
                    action="#"
                    method="get"
                    role="search"
                    className="search-form relative"
                  >
                    <input
                      type="search"
                      id="search"
                      className="search-field style-2"
                      placeholder="Search..."
                      name="s"
                      title="Search for"
                      value={searchItem}
                      onChange={handleSearch}
                    />
                    <button
                      className="search search-submit"
                      type="submit"
                      title="Search"
                    >
                      <i className="icon-search" />
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-2"></div>
            </div>
          </div>
        </div>
        <div className="tf-section-2 discover-item loadmore-12-item">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-md-12 load-more">
                <a id="button-loadmore" className="tf-button-loadmore">
                  <span>Load More</span>
                  <i className="icon-loading-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
