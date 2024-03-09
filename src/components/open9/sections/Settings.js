import Link from "next/link";
import AutoSlider1 from "../slider/AutoSlider1";
import AutoSlider2 from "../slider/AutoSlider2";

export default function Settings() {
  return (
    <>
      <div className="wrapper-content">
        <div className="inner-content">
          <div className="action__body w-full mb-40">
            <div className="tf-tsparticles">
              <div id="tsparticles8" data-color="#161616" data-line="#000" />
            </div>
            <h2>Discover, create and share your Art</h2>
            <div className="flat-button flex">
              <Link href="#" className="tf-button style-2 h50 w190 mr-10">
                Explore now
                <i className="icon-arrow-up-right2" />
              </Link>
              <Link href="#" className="tf-button style-2 h50 w230">
                Create Art Piece
                <i className="icon-arrow-up-right2" />
              </Link>
            </div>
            <div className="bg-home7">
              <AutoSlider1 />
              <AutoSlider2 />
              <AutoSlider1 />
            </div>
          </div>
          <div className="heading-section">
            <h2 className="tf-title pb-30">Setting</h2>
          </div>
          <div className="widget-edit mb-30 avatar">
            <div className="title to-white">
              <h4>Edit your avatar</h4>
              <i className="icon-keyboard_arrow_up" />
            </div>
            <form action="#">
              <div className="uploadfile flex">
                <img src="assets/images/avatar/avatar-07.png" alt="" />
                <div>
                  <h6 className="to-white">Upload a new avatar”</h6>
                  <label>
                    <input type="file" name="file" />
                    <span className="text filename to-white">
                      No files selected
                    </span>
                  </label>
                  <p className="text">JPEG 100x100</p>
                </div>
              </div>
            </form>
          </div>
          <div className="widget-edit mb-30 profile">
            <div className="title to-white">
              <h4>Edit your profile</h4>
              <i className="icon-keyboard_arrow_up" />
            </div>
            <form
              id="commentform"
              className="comment-form"
              noValidate="novalidate"
            >
              <div className="flex gap30">
                <fieldset className="name">
                  <label className="to-white">Your name*</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    name="name"
                    tabIndex={2}
                    aria-required="true"
                    required
                  />
                </fieldset>
                <fieldset className="email">
                  <label className="to-white">Email address*</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your email"
                    name="email"
                    tabIndex={2}
                    aria-required="true"
                    required
                  />
                </fieldset>
                <fieldset className="tel">
                  <label className="to-white">Phone number</label>
                  <input
                    type="tel"
                    id="tel"
                    placeholder="Your phone"
                    name="tel"
                    tabIndex={2}
                    aria-required="true"
                    required
                  />
                </fieldset>
              </div>
              <fieldset className="message">
                <label className="to-white">Your Bio</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Say something about yourself"
                  tabIndex={4}
                  aria-required="true"
                  required
                />
              </fieldset>
              <div className="flex gap30">
                <fieldset className="name">
                  <label className="to-white">Store name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    name="name"
                    tabIndex={2}
                    aria-required="true"
                    required
                  />
                </fieldset>
                <fieldset className="curency">
                  <label className="to-white">Curency</label>
                  <select className="select" name="curency" id="curency">
                    <option>Us Dollar ($)</option>
                    <option value="100$">100$</option>
                    <option value="1000$">1000$</option>
                    <option value="10000$">10000$</option>
                  </select>
                </fieldset>
              </div>
              <div className="flex gap30">
                <fieldset className="location">
                  <label className="to-white">Location</label>
                  <select className="select" name="location" id="location">
                    <option>United States</option>
                    <option value="English">English</option>
                    <option value="Japan">Japan</option>
                    <option value="China">China</option>
                  </select>
                </fieldset>
                <fieldset className="address">
                  <label className="to-white">Address</label>
                  <input
                    type="text"
                    id="address"
                    placeholder="Your address"
                    name="address"
                    tabIndex={2}
                    aria-required="true"
                    required
                  />
                </fieldset>
              </div>
              <fieldset className="address">
                <label className="to-white">Address</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Your address"
                  name="address"
                  tabIndex={2}
                  aria-required="true"
                  required
                />
              </fieldset>
              <div className="btn-submit">
                <button className="w242 active mr-30">Cancel</button>
                <button
                  className="w242"
                  style={{ background: "#3E7AA2" }}
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
          <div className="widget-edit mb-30 password">
            <div className="title">
              <h4 className="to-white">Change password</h4>
              <i className="icon-keyboard_arrow_up" />
            </div>
            <form
              id="commentform"
              className="comment-form"
              noValidate="novalidate"
            >
              <div className="flex gap30">
                <fieldset className="tel">
                  <label className="to-white">Phone number</label>
                  <input
                    type="tel"
                    id="tel"
                    placeholder="Your phone"
                    name="tel"
                    tabIndex={2}
                    aria-required="true"
                    required
                  />
                </fieldset>
                <fieldset className="email">
                  <label className="to-white">Email address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your email"
                    name="email"
                    tabIndex={2}
                    aria-required="true"
                    required
                  />
                </fieldset>
              </div>
              <fieldset className="password">
                <label className="to-white">Old password</label>
                <input
                  type="text"
                  id="password"
                  placeholder="Enter your Old password"
                  name="password"
                  tabIndex={2}
                  aria-required="true"
                  required
                />
              </fieldset>
              <fieldset className="password">
                <label className="to-white">New password</label>
                <input
                  type="text"
                  id="password"
                  placeholder="Enter your New password"
                  name="password"
                  tabIndex={2}
                  aria-required="true"
                  required
                />
              </fieldset>
              <fieldset className="password">
                <label className="to-white">Confirm password</label>
                <input
                  type="text"
                  id="password"
                  placeholder="Confirm password"
                  name="password"
                  tabIndex={2}
                  aria-required="true"
                  required
                />
              </fieldset>
              <div className="btn-submit">
                <button className="w242 active mr-30">Cancel</button>
                <button
                  className="w242"
                  style={{ background: "#3E7AA2" }}
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
          <div className="widget-edit mb-30 setting">
            <div className="title">
              <h4 className="to-white">Notification setting</h4>
              <i className="icon-keyboard_arrow_up" />
            </div>
            <form
              id="commentform"
              className="comment-form"
              noValidate="novalidate"
            >
              <div className="notification-setting-item">
                <div className="content">
                  <h6 className="tf-color">Order confirmation</h6>
                  <p>will be notified when customer order any product</p>
                </div>
                <input
                  className="check"
                  type="checkbox"
                  defaultValue="checkbox"
                  name="check"
                  defaultChecked
                />
              </div>
              <div className="notification-setting-item">
                <div className="content">
                  <h6 className="tf-color">New Items Notification</h6>
                  <p>Mauris a velit commodo erat lobortis eleifend</p>
                </div>
                <input
                  className="check"
                  type="checkbox"
                  defaultValue="checkbox"
                  name="check"
                />
              </div>
              <div className="notification-setting-item">
                <div className="content">
                  <h6 className="tf-color">Payment Card Notification</h6>
                  <p>Proin rutrum nulla non</p>
                </div>
                <input
                  className="check"
                  type="checkbox"
                  defaultValue="checkbox"
                  name="check"
                  defaultChecked
                />
              </div>
              <div className="notification-setting-item">
                <div className="content">
                  <h6 className="tf-color">
                    Notification for approving product
                  </h6>
                  <p>Nam in mi ac felis venenatis ultrices</p>
                </div>
                <input
                  className="check"
                  type="checkbox"
                  defaultValue="checkbox"
                  name="check"
                />
              </div>
              <div className="notification-setting-item">
                <div className="content">
                  <h6 className="tf-color">Email notification</h6>
                  <p>Turn on email notification to get updates through email</p>
                </div>
                <input
                  className="check"
                  type="checkbox"
                  defaultValue="checkbox"
                  name="check"
                />
              </div>
              <div className="btn-submit">
                <button className="w242 active mr-30">Cancel</button>
                <button
                  className="w242"
                  style={{ background: "#3E7AA2" }}
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="side-bar">
          <div className="widget widget-recently">
            <h5 className="title-widget">Recently added</h5>
            <div className="card-small-main">
              <img src="assets/images/blog/sidebar-05.jpg" alt="" />
              <div className="card-bottom">
                <h5>
                  <Link href="#">Photography</Link>
                </h5>
                <span className="date">16hr ago</span>
              </div>
            </div>
            <div className="card-small">
              <div className="author">
                <img src="assets/images/blog/sidebar-06.jpg" alt="" />
                <div className="info">
                  <h6>
                    <Link href="#">Propw</Link>
                  </h6>
                  <p>
                    <Link href="#">@themes</Link>
                  </p>
                </div>
              </div>
              <span className="date">Mon, 08 May </span>
            </div>
            <div className="card-small">
              <div className="author">
                <img src="assets/images/blog/sidebar-07.jpg" alt="" />
                <div className="info">
                  <h6>
                    <Link href="#">Propw</Link>
                  </h6>
                  <p>
                    <Link href="#">@themes</Link>
                  </p>
                </div>
              </div>
              <span className="date">Mon, 08 May </span>
            </div>
            <div className="card-small">
              <div className="author">
                <img src="assets/images/blog/sidebar-08.jpg" alt="" />
                <div className="info">
                  <h6>
                    <Link href="#">Propw</Link>
                  </h6>
                  <p>
                    <Link href="#">@themes</Link>
                  </p>
                </div>
              </div>
              <span className="date">Mon, 08 May </span>
            </div>
          </div>
          <div className="widget widget-creators">
            <div className="flex items-center justify-between">
              <h5 className="title-widget">Top Creators</h5>
              <Link className="see-all" href="#">
                See all
              </Link>
            </div>
            <div className="widget-creators-item flex items-center mb-20">
              <div className="order">1. </div>
              <div className="author flex items-center flex-grow">
                <img src="assets/images/avatar/avatar-small-01.png" alt="" />
                <div className="info">
                  <h6>
                    <Link href="#">Brooklyn Simmons</Link>
                  </h6>
                  <span>
                    <Link href="#">@themes</Link>
                  </span>
                </div>
              </div>
              <button className="follow">Follow</button>
            </div>
            <div className="widget-creators-item flex items-center mb-20">
              <div className="order">2. </div>
              <div className="author flex items-center flex-grow">
                <img src="assets/images/avatar/avatar-small-02.png" alt="" />
                <div className="info">
                  <h6>
                    <Link href="#">Brooklyn Simmons</Link>
                  </h6>
                  <span>
                    <Link href="#">@themes</Link>
                  </span>
                </div>
              </div>
              <button className="follow">Follow</button>
            </div>
            <div className="widget-creators-item flex items-center mb-20">
              <div className="order">3. </div>
              <div className="author flex items-center flex-grow">
                <img src="assets/images/avatar/avatar-small-03.png" alt="" />
                <div className="info">
                  <h6>
                    <Link href="#">Brooklyn Simmons</Link>
                  </h6>
                  <span>
                    <Link href="#">@themes</Link>
                  </span>
                </div>
              </div>
              <button className="follow">Follow</button>
            </div>
            <div className="widget-creators-item flex items-center mb-20">
              <div className="order">4. </div>
              <div className="author flex items-center flex-grow">
                <img src="assets/images/avatar/avatar-small-04.png" alt="" />
                <div className="info">
                  <h6>
                    <Link href="#">Brooklyn Simmons</Link>
                  </h6>
                  <span>
                    <Link href="#">@themes</Link>
                  </span>
                </div>
              </div>
              <button className="follow">Follow</button>
            </div>
            <div className="widget-creators-item flex items-center">
              <div className="order">5. </div>
              <div className="author flex items-center flex-grow">
                <img src="assets/images/avatar/avatar-small-01.png" alt="" />
                <div className="info">
                  <h6>
                    <Link href="#">Brooklyn Simmons</Link>
                  </h6>
                  <span>
                    <Link href="#">@themes</Link>
                  </span>
                </div>
              </div>
              <button className="follow">Follow</button>
            </div>
          </div>
          <div className="widget widget-coins">
            <h5 className="title-widget">Trending coins</h5>
            <div className="widget-coins-item flex items-center mb-20">
              <img src="assets/images/box-icon/coin-01.png" alt="" />
              <p>
                <Link href="#">Bitcoin</Link>
              </p>
            </div>
            <div className="widget-coins-item flex items-center mb-20">
              <img src="assets/images/box-icon/coin-02.png" alt="" />
              <p>
                <Link href="#">Ethereum</Link>
              </p>
            </div>
            <div className="widget-coins-item flex items-center mb-20">
              <img src="assets/images/box-icon/coin-03.png" alt="" />
              <p>
                <Link href="#">Cardano</Link>
              </p>
            </div>
            <div className="widget-coins-item flex items-center mb-20">
              <img src="assets/images/box-icon/coin-04.png" alt="" />
              <p>
                <Link href="#">Solana</Link>
              </p>
            </div>
            <div className="widget-coins-item flex items-center">
              <img src="assets/images/box-icon/coin-05.png" alt="" />
              <p>
                <Link href="#">Litecoin</Link>
              </p>
            </div>
          </div>
          <div className="widget widget-history">
            <div className="flex items-center justify-between">
              <h5 className="title-widget">History</h5>
              <Link className="see-all" href="#">
                See all
              </Link>
            </div>
            <div className="widget-creators-item flex items-center mb-20">
              <div className="author flex items-center flex-grow">
                <img src="assets/images/avatar/avatar-small-01.png" alt="" />
                <div className="info">
                  <h6>
                    <Link href="#">Lorem NFT sold</Link>
                  </h6>
                  <span>
                    <Link href="#">Sold at 1.32 ETH</Link>
                  </span>
                </div>
              </div>
              <span className="time">Just now</span>
            </div>
            <div className="widget-creators-item flex items-center mb-20">
              <div className="author flex items-center flex-grow">
                <img src="assets/images/avatar/avatar-small-02.png" alt="" />
                <div className="info">
                  <h6>
                    <Link href="#">New NFT uploaded</Link>
                  </h6>
                  <span>
                    <Link href="#">By Marisol Pena</Link>
                  </span>
                </div>
              </div>
              <span className="time">1hr ago</span>
            </div>
            <div className="widget-creators-item flex items-center mb-20">
              <div className="author flex items-center flex-grow">
                <img src="assets/images/avatar/avatar-small-03.png" alt="" />
                <div className="info">
                  <h6>
                    <Link href="#">You followed a creator</Link>
                  </h6>
                  <span>
                    <Link href="#">Jane Cooper</Link>
                  </span>
                </div>
              </div>
              <span className="time">2hr ago</span>
            </div>
            <div className="widget-creators-item flex items-center mb-20">
              <div className="author flex items-center flex-grow">
                <img src="assets/images/avatar/avatar-small-04.png" alt="" />
                <div className="info">
                  <h6>
                    <Link href="#">You placed a bid</Link>
                  </h6>
                  <span>
                    <Link href="#">Whirl wind NFT</Link>
                  </span>
                </div>
              </div>
              <span className="time">4hr ago</span>
            </div>
            <div className="widget-creators-item flex items-center">
              <div className="author flex items-center flex-grow">
                <img src="assets/images/avatar/avatar-small-01.png" alt="" />
                <div className="info">
                  <h6>
                    <Link href="#">You followed a creator</Link>
                  </h6>
                  <span>
                    <Link href="#">Courtney Henry</Link>
                  </span>
                </div>
              </div>
              <span className="time">16hr ago</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
