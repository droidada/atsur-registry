import Link from "next/link";
import Image from "@/components/common/image";
import { useState } from "react";

const RadioButton = ({ id, text, name, onChange, checked, value }) => {
  return (
    <div>
      <input
        className="custom-radio"
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <div className="box-icon-item">
        <Image src="/assets/images/box-icon/address.png" alt="" />
        <div className="title">
          <Link href="#">Artist</Link>
        </div>
        <p>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
      </div>
    </div>
  );
};

export default function Create() {
  const [activeIndex, setActiveIndex] = useState(1);
  const handleOnClick = (index) => {
    setActiveIndex(index);
  };
  return (
    <div id="create">
      <div className="wrapper-content-create">
        <div className="heading-section">
          <h2 className="tf-title pb-30">Create Artwork</h2>
        </div>
        <div className="widget-tabs relative">
          <ul className="widget-menu-tab">
            <li
              className={
                activeIndex === 1 ? "item-title active tf-color" : "item-title"
              }
              onClick={() => handleOnClick(1)}
            >
              <span className="inner">
                <span className="order">1</span> Metadata{" "}
                <i className="icon-keyboard_arrow_right" />
              </span>
            </li>
            <li
              className={activeIndex === 2 ? "item-title active" : "item-title"}
              onClick={() => handleOnClick(2)}
            >
              <span className="inner">
                <span className="order">2</span>Assets{" "}
                <i className="icon-keyboard_arrow_right" />
              </span>
            </li>
            <li
              className={activeIndex === 3 ? "item-title active" : "item-title"}
              onClick={() => handleOnClick(3)}
            >
              <span className="inner">
                <span className="order">3</span>Provenance
              </span>
            </li>
          </ul>
          <div className="widget-content-tab">
            <div
              className={
                activeIndex === 1
                  ? "widget-content-inner description active"
                  : "widget-content-inner description"
              }
              style={{ display: `${activeIndex == 1 ? "" : "none"}` }}
            >
              <div className="wrap-upload">
                <form action="#" className="h-full">
                  <label className="uploadfile h-full flex items-center justify-center">
                    <div className="text-center">
                      <Image src="/assets/images/box-icon/upload.png" alt="" />
                      <h5>Upload file</h5>
                      <p className="text">Drag or choose your file to upload</p>
                      <div className="text filename">
                        PNG, GIF, WEBP, MP4 or MP3.Max 1Gb.
                      </div>
                      <input type="file" name="file" />
                    </div>
                  </label>
                </form>
              </div>
              <div className="wrap-content w-full">
                <form
                  id="commentform"
                  className="comment-form"
                  noValidate="novalidate"
                >
                  <fieldset className="name">
                    <label>Product name *</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Product name"
                      name="name"
                      tabIndex={2}
                      aria-required="true"
                      required
                    />
                  </fieldset>
                  <fieldset className="message">
                    <label>Description *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Please describe your product*"
                      tabIndex={4}
                      aria-required="true"
                      required
                    />
                  </fieldset>
                  <div className="flex gap30">
                    <fieldset className="price">
                      <label>Price</label>
                      <input
                        type="text"
                        id="price"
                        placeholder="Price"
                        name="price"
                        tabIndex={2}
                        aria-required="true"
                        required
                      />
                    </fieldset>
                    <fieldset className="properties">
                      <label>Properties</label>
                      <input
                        type="text"
                        id="properties"
                        placeholder="Properties"
                        name="properties"
                        tabIndex={2}
                        aria-required="true"
                        required
                      />
                    </fieldset>
                    <fieldset className="size">
                      <label>Size</label>
                      <input
                        type="text"
                        id="size"
                        placeholder="Size"
                        name="size"
                        tabIndex={2}
                        aria-required="true"
                        required
                      />
                    </fieldset>
                  </div>
                  <fieldset className="blockchain">
                    <label>Blockchain</label>
                    <div className="widget-coins flex gap30 flex-wrap">
                      <div className="widget-coins-item flex items-center">
                        <Image
                          src="/assets/images/box-icon/coin-01.png"
                          alt=""
                        />
                        <p>
                          <Link href="#">Bitcoin</Link>
                        </p>
                      </div>
                      <div className="widget-coins-item flex items-center">
                        <Image
                          src="/assets/images/box-icon/coin-02.png"
                          alt=""
                        />
                        <p>
                          <Link href="#">Ethereum</Link>
                        </p>
                      </div>
                      <div className="widget-coins-item flex items-center">
                        <Image
                          src="/assets/images/box-icon/coin-03.png"
                          alt=""
                        />
                        <p>
                          <Link href="#">Cardano</Link>
                        </p>
                      </div>
                      <div className="widget-coins-item flex items-center">
                        <Image
                          src="/assets/images/box-icon/coin-04.png"
                          alt=""
                        />
                        <p>
                          <Link href="#">Solana</Link>
                        </p>
                      </div>
                      <div className="widget-coins-item flex items-center">
                        <Image
                          src="/assets/images/box-icon/coin-05.png"
                          alt=""
                        />
                        <p>
                          <Link href="#">Litecoin</Link>
                        </p>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className="collection">
                    <label>Collection</label>
                    <input
                      type="text"
                      id="collection"
                      placeholder="Collection"
                      name="collection"
                      tabIndex={2}
                      aria-required="true"
                      required
                    />
                  </fieldset>
                  <fieldset className="royatity">
                    <label>Royatity</label>
                    <input
                      type="text"
                      id="royatity"
                      placeholder="Royatity"
                      name="royatity"
                      tabIndex={2}
                      aria-required="true"
                      required
                    />
                  </fieldset>
                  <div className="btn-submit flex gap30 justify-center">
                    <button className="tf-button style-1 h50 active">
                      Preview
                      <i className="icon-arrow-up-right2" />
                    </button>
                    <button className="tf-button style-1 h50" type="submit">
                      Submit item
                      <i className="icon-arrow-up-right2" />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div
              className={
                activeIndex === 2
                  ? "widget-content-inner upload active"
                  : "widget-content-inner upload"
              }
              style={{ display: `${activeIndex == 2 ? "" : "none"}` }}
            >
              <div className="wrap-upload w-full">
                <form action="#">
                  <label className="uploadfile" style={{ marginBottom: "3%" }}>
                    <Image src="/assets/images/box-icon/upload.png" alt="" />
                    <h5 className="to-white">Left Angle View</h5>
                    <p className="text">Drag or choose your file to upload</p>
                    <div className="text filename">
                      PNG, GIF, WEBP, MP4 or MP3.Max 1Gb.
                    </div>
                    <input type="file" name="file" />
                  </label>
                  <br />
                  <label className="uploadfile" style={{ marginBottom: "3%" }}>
                    <Image src="/assets/images/box-icon/upload.png" alt="" />
                    <h5 className="to-white">Right Angle View</h5>
                    <p className="text">Drag or choose your file to upload</p>
                    <div className="text filename">
                      PNG, GIF, WEBP, MP4 or MP3.Max 1Gb.
                    </div>
                    <input type="file" name="file" />
                  </label>{" "}
                  <br />
                  <label className="uploadfile">
                    <Image src="/assets/images/box-icon/upload.png" alt="" />
                    <h5 className="to-white">Mounted</h5>
                    <p className="text">Drag or choose your file to upload</p>
                    <div className="text filename">
                      PNG, GIF, WEBP, MP4 or MP3.Max 1Gb.
                    </div>
                    <input type="file" name="file" />
                  </label>
                </form>
              </div>
            </div>

            <div
              className={
                activeIndex === 3
                  ? "widget-content-inner submit active"
                  : "widget-content-inner submit"
              }
              style={{ display: `${activeIndex == 3 ? "" : "none"}` }}
            >
              <div className="wrap-upload w-full">
                <div className="tf-section-2 widget-box-icon">
                  <div className="themesflat-container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="heading-section-1">
                          <h2 className="tf-title pb-20 to-black">
                            Information
                          </h2>
                          <p className="pb-40 to-black">
                            Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur.
                          </p>
                        </div>
                      </div>
                      <h6 className="pb-2 to-black">Ownership *</h6>
                      <p className="pb-2 to-black">
                        How would you describe your relationship with the
                        art-piece.
                      </p>
                      <div
                        data-wow-delay="0s"
                        className="wow fadeInUp col-md-4"
                      >
                        <RadioButton
                          id="Apple"
                          name="Apple"
                          value="Apple"
                          text="Apple"
                          onChange={(event) =>
                            console.log("selected ", event?.target?.value)
                          }
                          checked={true}
                        />
                      </div>
                      <div
                        data-wow-delay="0.1s"
                        className="wow fadeInUp col-md-4"
                      >
                        <div className="box-icon-item">
                          <Image
                            src="/assets/images/box-icon/email.png"
                            alt=""
                          />
                          <div className="title">
                            <Link href="#">Broker</Link>
                          </div>
                          <p>open9@support.com open9vietnam@support.com</p>
                        </div>
                      </div>
                      <div
                        data-wow-delay="0.2s"
                        className="wow fadeInUp col-md-4"
                      >
                        <div className="box-icon-item">
                          <Image
                            src="/assets/images/box-icon/phone.png"
                            alt=""
                          />
                          <div className="title">
                            <Link href="#">Collector</Link>
                          </div>
                          <p>
                            (316) 555-0116 <br />
                            (219) 555-0114
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <form
                  id="commentform"
                  className="comment-form"
                  noValidate="novalidate"
                >
                  <fieldset className="name">
                    <label>Product name *</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Product name"
                      name="name"
                      tabIndex={2}
                      aria-required="true"
                      required
                    />
                  </fieldset>
                  <fieldset className="message">
                    <label>Description *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Please describe your product*"
                      tabIndex={4}
                      aria-required="true"
                      required
                    />
                  </fieldset>
                  <div className="flex gap30">
                    <fieldset className="price">
                      <label>Price</label>
                      <input
                        type="text"
                        id="price"
                        placeholder="Price"
                        name="price"
                        tabIndex={2}
                        aria-required="true"
                        required
                      />
                    </fieldset>
                    <fieldset className="properties">
                      <label>Properties</label>
                      <input
                        type="text"
                        id="properties"
                        placeholder="Properties"
                        name="properties"
                        tabIndex={2}
                        aria-required="true"
                        required
                      />
                    </fieldset>
                    <fieldset className="size">
                      <label>Size</label>
                      <input
                        type="text"
                        id="size"
                        placeholder="Size"
                        name="size"
                        tabIndex={2}
                        aria-required="true"
                        required
                      />
                    </fieldset>
                  </div>
                  <fieldset className="blockchain">
                    <label>Blockchain</label>
                    <div className="widget-coins flex gap30 flex-wrap">
                      <div className="widget-coins-item flex items-center">
                        <Image
                          src="/assets/images/box-icon/coin-01.png"
                          alt=""
                        />
                        <p>
                          <Link href="#">Bitcoin</Link>
                        </p>
                      </div>
                      <div className="widget-coins-item flex items-center">
                        <Image
                          src="/assets/images/box-icon/coin-02.png"
                          alt=""
                        />
                        <p>
                          <Link href="#">Ethereum</Link>
                        </p>
                      </div>
                      <div className="widget-coins-item flex items-center">
                        <Image
                          src="/assets/images/box-icon/coin-03.png"
                          alt=""
                        />
                        <p>
                          <Link href="#">Cardano</Link>
                        </p>
                      </div>
                      <div className="widget-coins-item flex items-center">
                        <Image
                          src="/assets/images/box-icon/coin-04.png"
                          alt=""
                        />
                        <p>
                          <Link href="#">Solana</Link>
                        </p>
                      </div>
                      <div className="widget-coins-item flex items-center">
                        <Image
                          src="/assets/images/box-icon/coin-05.png"
                          alt=""
                        />
                        <p>
                          <Link href="#">Litecoin</Link>
                        </p>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className="collection">
                    <label>Collection</label>
                    <input
                      type="text"
                      id="collection"
                      placeholder="Collection"
                      name="collection"
                      tabIndex={2}
                      aria-required="true"
                      required
                    />
                  </fieldset>
                  <fieldset className="royatity">
                    <label>Royatity</label>
                    <input
                      type="text"
                      id="royatity"
                      placeholder="Royatity"
                      name="royatity"
                      tabIndex={2}
                      aria-required="true"
                      required
                    />
                  </fieldset>
                  <div className="btn-submit flex gap30 justify-center">
                    <button className="tf-button style-1 h50 w320 active">
                      Preview
                      <i className="icon-arrow-up-right2" />
                    </button>
                    <button
                      className="tf-button style-1 h50 w320"
                      type="submit"
                    >
                      Submit item
                      <i className="icon-arrow-up-right2" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
