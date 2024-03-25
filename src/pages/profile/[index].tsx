import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import Image from "@/components/common/image";
import { AccountProfile } from "@/components/profile/profile";
import { AccountProfileDetails } from "@/components/profile/profileDetails";
import Layout from "@/open9/layout/Layout";

const Profile = () => (
  <Layout headerStyle={2} footerStyle={1}>
    <div className="main main-raised">
      <div className="profile-content">
        <div className="container">
          <div className="row">
            <div className="col-md-6 ml-auto mr-auto">
              <div className="profile">
                <div className="avatar">
                  <Image
                    src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU0NjQzOTk4OTQ4OTkyMzQy/ansel-elgort-poses-for-a-portrait-during-the-baby-driver-premiere-2017-sxsw-conference-and-festivals-on-march-11-2017-in-austin-texas-photo-by-matt-winkelmeyer_getty-imagesfor-sxsw-square.jpg"
                    alt="Circle Image"
                    className="img-raised rounded-circle img-fluid"
                  />
                </div>
                <div className="name">
                  <h3 className="title">Christian Louboutin</h3>
                  <h6>Designer</h6>
                  <a
                    href="#pablo"
                    className="btn btn-just-icon btn-link btn-dribbble"
                  >
                    <i className="fa fa-dribbble"></i>
                  </a>
                  <a
                    href="#pablo"
                    className="btn btn-just-icon btn-link btn-twitter"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a
                    href="#pablo"
                    className="btn btn-just-icon btn-link btn-pinterest"
                  >
                    <i className="fa fa-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="description text-center">
            <p>
              An artist of considerable range, Chet Faker — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
              and records all of his own music, giving it a warm, intimate feel
              with a solid groove structure.{" "}
            </p>
          </div>
          <div className="row">
            <div className="col-md-6 ml-auto mr-auto">
              <div className="profile-tabs">
                <ul
                  className="nav nav-pills nav-pills-icons justify-content-center"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      href="#studio"
                      role="tab"
                      data-toggle="tab"
                    >
                      <i className="material-icons">camera</i>
                      Studio
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#works"
                      role="tab"
                      data-toggle="tab"
                    >
                      <i className="material-icons">palette</i>
                      Work
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#favorite"
                      role="tab"
                      data-toggle="tab"
                    >
                      <i className="material-icons">favorite</i>
                      Favorite
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="tab-content tab-space">
            <div className="tab-pane active text-center gallery" id="studio">
              <div className="row">
                <div className="col-md-3 ml-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1524498250077-390f9e378fc0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=83079913579babb9d2c94a5941b2e69d&auto=format&fit=crop&w=751&q=80"
                    className="rounded"
                    alt={"sample image"}
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1528249227670-9ba48616014f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=66b8e7db17b83084f16fdeadfc93b95b&auto=format&fit=crop&w=357&q=80"
                    className="rounded"
                    alt={"sample image"}
                  />
                </div>
                <div className="col-md-3 mr-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1521341057461-6eb5f40b07ab?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=72da2f550f8cbd0ec252ad6fb89c96b2&auto=format&fit=crop&w=334&q=80"
                    className="rounded"
                    alt={"sample image"}
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1506667527953-22eca67dd919?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6326214b7ce18d74dde5e88db4a12dd5&auto=format&fit=crop&w=750&q=80"
                    className="rounded"
                    alt={"sample image"}
                  />
                </div>
              </div>
            </div>
            <div className="tab-pane text-center gallery" id="works">
              <div className="row">
                <div className="col-md-3 ml-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1524498250077-390f9e378fc0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=83079913579babb9d2c94a5941b2e69d&auto=format&fit=crop&w=751&q=80"
                    className="rounded"
                    alt={"sample image"}
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1506667527953-22eca67dd919?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6326214b7ce18d74dde5e88db4a12dd5&auto=format&fit=crop&w=750&q=80"
                    className="rounded"
                    alt={"sample image"}
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1505784045224-1247b2b29cf3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec2bdc92a9687b6af5089b335691830e&auto=format&fit=crop&w=750&q=80"
                    className="rounded"
                    alt={"sample image"}
                  />
                </div>
                <div className="col-md-3 mr-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1504346466600-714572c4b726?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6754ded479383b7e3144de310fa88277&auto=format&fit=crop&w=750&q=80"
                    className="rounded"
                    alt={"sample image"}
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1494028698538-2cd52a400b17?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=83bf0e71786922a80c420c17b664a1f5&auto=format&fit=crop&w=334&q=80"
                    className="rounded"
                    alt={"sample image"}
                  />
                </div>
              </div>
            </div>
            <div className="tab-pane text-center gallery" id="favorite">
              <div className="row">
                <div className="col-md-3 ml-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1504346466600-714572c4b726?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6754ded479383b7e3144de310fa88277&auto=format&fit=crop&w=750&q=80"
                    className="rounded"
                    alt={"sample image"}
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1494028698538-2cd52a400b17?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=83bf0e71786922a80c420c17b664a1f5&auto=format&fit=crop&w=334&q=80"
                    className="rounded"
                    alt={"sample image"}
                  />
                </div>
                <div className="col-md-3 mr-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1505784045224-1247b2b29cf3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec2bdc92a9687b6af5089b335691830e&auto=format&fit=crop&w=750&q=80"
                    className="rounded"
                    alt={"sample image"}
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1524498250077-390f9e378fc0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=83079913579babb9d2c94a5941b2e69d&auto=format&fit=crop&w=751&q=80"
                    className="rounded"
                    alt={"sample image"}
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1506667527953-22eca67dd919?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6326214b7ce18d74dde5e88db4a12dd5&auto=format&fit=crop&w=750&q=80"
                    className="rounded"
                    alt={"sample image"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);
Profile.requireAuth = true;
export default Profile;

{
  /* <div className="row">
          <div className="col-md-12">
            <div id="content" className="content content-full-width">
                <div className="profile">
                  <div className="profile-header">
                      <div className="profile-header-cover"></div>
                      <div className="profile-header-content">
                        <div className="profile-header-img">
                            <Image src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" />
                        </div>
                        <div className="profile-header-info">`
                            <h4 className="m-t-10 m-b-5">Sean Ngu</h4>
                            <p className="m-b-10">UXUI + Frontend Developer</p>
                            <a href="#" className="btn btn-sm btn-info mb-2">Edit Profile</a>
                        </div>
                      </div>
                      <ul className="profile-header-tab nav nav-tabs">
                        <li className="nav-item"><a href="https://www.bootdey.com/snippets/view/bs4-profile-with-timeline-posts" target="__blank" className="nav-link_">POSTS</a></li>
                        <li className="nav-item"><a href="https://www.bootdey.com/snippets/view/bs4-profile-about" target="__blank" className="nav-link_">ABOUT</a></li>
                        <li className="nav-item"><a href="https://www.bootdey.com/snippets/view/profile-photos" target="__blank" className="nav-link_">PHOTOS</a></li>
                        <li className="nav-item"><a href="https://www.bootdey.com/snippets/view/profile-videos" target="__blank" className="nav-link_">VIDEOS</a></li>
                        <li className="nav-item"><a href="https://www.bootdey.com/snippets/view/bs4-profile-friend-list" target="__blank" className="nav-link_ active show">FRIENDS</a></li>
                      </ul>
                  </div>
                </div>
                <div className="profile-content">
                  <div className="tab-content p-0">
                      <div className="tab-pane fade active show" id="profile-post">
                        <ul className="timeline">
                            <li>
                              <div className="timeline-time">
                                  <span className="date">today</span>
                                  <span className="time">04:20</span>
                              </div>
                              <div className="timeline-icon">
                                  <a href="javascript:;">&nbsp;</a>
                              </div>
                              <div className="timeline-body">
                                  <div className="timeline-header">
                                    <span className="userimage"><Image src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" /></span>
                                    <span className="username"><a href="javascript:;">Sean Ngu</a> <small></small></span>
                                    <span className="pull-right text-muted">18 Views</span>
                                  </div>
                                  <div className="timeline-content">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus turpis quis tincidunt luctus.
                                        Nam sagittis dui in nunc consequat, in imperdiet nunc sagittis.
                                    </p>
                                  </div>
                                  <div className="timeline-likes">
                                    <div className="stats-right">
                                        <span className="stats-text">259 Shares</span>
                                        <span className="stats-text">21 Comments</span>
                                    </div>
                                    <div className="stats">
                                        <span className="fa-stack fa-fw stats-icon">
                                        <i className="fa fa-circle fa-stack-2x text-danger"></i>
                                        <i className="fa fa-heart fa-stack-1x fa-inverse t-plus-1"></i>
                                        </span>
                                        <span className="fa-stack fa-fw stats-icon">
                                        <i className="fa fa-circle fa-stack-2x text-primary"></i>
                                        <i className="fa fa-thumbs-up fa-stack-1x fa-inverse"></i>
                                        </span>
                                        <span className="stats-total">4.3k</span>
                                    </div>
                                  </div>
                                  <div className="timeline-footer">
                                    <a href="javascript:;" className="m-r-15 text-inverse-lighter"><i className="fa fa-thumbs-up fa-fw fa-lg m-r-3"></i> Like</a>
                                    <a href="javascript:;" className="m-r-15 text-inverse-lighter"><i className="fa fa-comments fa-fw fa-lg m-r-3"></i> Comment</a> 
                                    <a href="javascript:;" className="m-r-15 text-inverse-lighter"><i className="fa fa-share fa-fw fa-lg m-r-3"></i> Share</a>
                                  </div>
                                  <div className="timeline-comment-box">
                                    <div className="user"><Image src="https://bootdey.com/img/Content/avatar/avatar3.png" /></div>
                                    <div className="input">
                                        <form action="">
                                          <div className="input-group">
                                              <input type="text" className="form-control rounded-corner" placeholder="Write a comment..." />
                                              <span className="input-group-btn p-l-10">
                                              <button className="btn btn-primary f-s-12 rounded-corner" type="button">Comment</button>
                                              </span>
                                          </div>
                                        </form>
                                    </div>
                                  </div>
                              </div>
                            </li>
                            <li>
                              <div className="timeline-time">
                                  <span className="date">yesterday</span>
                                  <span className="time">20:17</span>
                              </div>
                              <div className="timeline-icon">
                                  <a href="javascript:;">&nbsp;</a>
                              </div>
                              <div className="timeline-body">
                                  <div className="timeline-header">
                                    <span className="userimage"><Image src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" /></span>
                                    <span className="username">Sean Ngu</span>
                                    <span className="pull-right text-muted">82 Views</span>
                                  </div>
                                  <div className="timeline-content">
                                    <p>Location: United States</p>
                                  </div>
                                  <div className="timeline-footer">
                                    <a href="javascript:;" className="m-r-15 text-inverse-lighter"><i className="fa fa-thumbs-up fa-fw fa-lg m-r-3"></i> Like</a>
                                    <a href="javascript:;" className="m-r-15 text-inverse-lighter"><i className="fa fa-comments fa-fw fa-lg m-r-3"></i> Comment</a> 
                                    <a href="javascript:;" className="m-r-15 text-inverse-lighter"><i className="fa fa-share fa-fw fa-lg m-r-3"></i> Share</a>
                                  </div>
                              </div>
                            </li>
                            <li>
                              <div className="timeline-time">
                                  <span className="date">24 February 2014</span>
                                  <span className="time">08:17</span>
                              </div>
                              <div className="timeline-icon">
                                  <a href="javascript:;">&nbsp;</a>
                              </div>
                              <div className="timeline-body">
                                  <div className="timeline-header">
                                    <span className="userimage"><Image src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" /></span>
                                    <span className="username">Sean Ngu</span>
                                    <span className="pull-right text-muted">1,282 Views</span>
                                  </div>
                                  <div className="timeline-content">
                                    <p className="lead">
                                        <i className="fa fa-quote-left fa-fw pull-left"></i>
                                        Quisque sed varius nisl. Nulla facilisi. Phasellus consequat sapien sit amet nibh molestie placerat. Donec nulla quam, ullamcorper ut velit vitae, lobortis condimentum magna. Suspendisse mollis in sem vel mollis.
                                        <i className="fa fa-quote-right fa-fw pull-right"></i>
                                    </p>
                                  </div>
                                  <div className="timeline-footer">
                                    <a href="javascript:;" className="m-r-15 text-inverse-lighter"><i className="fa fa-thumbs-up fa-fw fa-lg m-r-3"></i> Like</a>
                                    <a href="javascript:;" className="m-r-15 text-inverse-lighter"><i className="fa fa-comments fa-fw fa-lg m-r-3"></i> Comment</a> 
                                    <a href="javascript:;" className="m-r-15 text-inverse-lighter"><i className="fa fa-share fa-fw fa-lg m-r-3"></i> Share</a>
                                  </div>
                              </div>
                            </li>
                            <li>
                              <div className="timeline-time">
                                  <span className="date">10 January 2014</span>
                                  <span className="time">20:43</span>
                              </div>
                              <div className="timeline-icon">
                                  <a href="javascript:;">&nbsp;</a>
                              </div>
                              <div className="timeline-body">
                                  <div className="timeline-header">
                                    <span className="userimage"><Image src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" /></span>
                                    <span className="username">Sean Ngu</span>
                                    <span className="pull-right text-muted">1,021,282 Views</span>
                                  </div>
                                  <div className="timeline-content">
                                    <h4 className="template-title">
                                        <i className="fa fa-map-marker text-danger fa-fw"></i>
                                        795 Folsom Ave, Suite 600 San Francisco, CA 94107
                                    </h4>
                                    <p>In hac habitasse platea dictumst. Pellentesque bibendum id sem nec faucibus. Maecenas molestie, augue vel accumsan rutrum, massa mi rutrum odio, id luctus mauris nibh ut leo.</p>
                                    <p className="m-t-20">
                                        <Image src="../assets/img/gallery/gallery-5.jpg" alt="" />
                                    </p>
                                  </div>
                                  <div className="timeline-footer">
                                    <a href="javascript:;" className="m-r-15 text-inverse-lighter"><i className="fa fa-thumbs-up fa-fw fa-lg m-r-3"></i> Like</a>
                                    <a href="javascript:;" className="m-r-15 text-inverse-lighter"><i className="fa fa-comments fa-fw fa-lg m-r-3"></i> Comment</a> 
                                    <a href="javascript:;" className="m-r-15 text-inverse-lighter"><i className="fa fa-share fa-fw fa-lg m-r-3"></i> Share</a>
                                  </div>
                              </div>
                            </li>
                            <li>
                              <div className="timeline-icon">
                                  <a href="javascript:;">&nbsp;</a>
                              </div>
                              <div className="timeline-body">
                                  Loading...
                              </div>
                            </li>
                        </ul>
                      </div>
                  </div>
                </div>
            </div>
          </div>
    </div> */
}
