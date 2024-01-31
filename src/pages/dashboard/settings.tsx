import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayoutWithSidebar, {DashboardPages} from "@/open9/layout/DashboardLayoutWithSidebar";
import AutoSlider1 from "@/open9/slider/AutoSlider1";
import AutoSlider2 from "@/open9/slider/AutoSlider2";

function Settings() {

  return (
    <DashboardLayoutWithSidebar activePage={DashboardPages.SETTINGS}>
            <>
                <div className="action__body w-full mb-40">
                    <div className="tf-tsparticles">
                        <div id="tsparticles8" data-color="#161616" data-line="#000" />
                    </div>
                    <h2>Discover, create and sell your own NFT</h2>
                    <div className="flat-button flex">
                        <Link href="#" className="tf-button style-2 h50 w190 mr-10">Explore now<i className="icon-arrow-up-right2" /></Link>
                        <Link href="#" className="tf-button style-2 h50 w230">Create your first NFT<i className="icon-arrow-up-right2" /></Link>
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
                                <h6 className='to-white'>Upload a new avatar”</h6>
                                <label>
                                    <input type="file" name="file" />
                                    <span className="text filename to-white">No files selected</span>
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
                    <form id="commentform" className="comment-form">
                        <div className="flex gap30">
                            <fieldset className="name">
                                <label className='to-white'>Your name*</label>
                                <input type="text" id="name" placeholder="Enter your name" name="name" tabIndex={2} aria-required="true" required />
                            </fieldset>
                            <fieldset className="email">
                                <label className='to-white'>Email address*</label>
                                <input type="email" id="email" placeholder="Your email" name="email" tabIndex={2} aria-required="true" required />
                            </fieldset>
                            <fieldset className="tel">
                                <label className='to-white'>Phone number</label>
                                <input type="tel" id="tel" placeholder="Your phone" name="tel" tabIndex={2} aria-required="true" required />
                            </fieldset>
                        </div>
                        <fieldset className="message">
                            <label className='to-white'>Your Bio</label>
                            <textarea id="message" name="message" rows={4} placeholder="Say something about yourself" tabIndex={4} aria-required="true" required />
                        </fieldset>
                        <div className="flex gap30">
                            <fieldset className="name">
                                <label className='to-white'>Store name</label>
                                <input type="text" id="name" placeholder="Enter your name" name="name" tabIndex={2} aria-required="true" required />
                            </fieldset>
                            <fieldset className="curency">
                                <label className='to-white'>Curency</label>
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
                                <label className='to-white'>Location</label>
                                <select className="select" name="location" id="location">
                                    <option>United States</option>
                                    <option value="English">English</option>
                                    <option value="Japan">Japan</option>
                                    <option value="China">China</option>
                                </select>
                            </fieldset>
                            <fieldset className="address">
                                <label className='to-white'>Address</label>
                                <input type="text" id="address" placeholder="Your address" name="address" tabIndex={2} aria-required="true" required />
                            </fieldset>
                        </div>
                        <fieldset className="address">
                            <label className='to-white'>Address</label>
                            <input type="text" id="address" placeholder="Your address" name="address" tabIndex={2} aria-required="true" required />
                        </fieldset>
                        <div className="btn-submit">
                            <button className="w242 active mr-30">Cancel</button>
                            <button className="w242" style={{background:'#A4442B'}} type="submit">Save</button>
                        </div>
                    </form>
                </div>
                <div className="widget-edit mb-30 password">
                    <div className="title">
                        <h4 className='to-white'>Change password</h4>
                        <i className="icon-keyboard_arrow_up" />
                    </div>
                    <form id="commentform" className="comment-form">
                        <div className="flex gap30">
                            <fieldset className="tel">
                                <label className='to-white'>Phone number</label>
                                <input type="tel" id="tel" placeholder="Your phone" name="tel" tabIndex={2} aria-required="true" required />
                            </fieldset>
                            <fieldset className="email">
                                <label className='to-white'>Email address</label>
                                <input type="email" id="email" placeholder="Your email" name="email" tabIndex={2} aria-required="true" required />
                            </fieldset>
                        </div>
                        <fieldset className="password">
                            <label className='to-white'>Old password</label>
                            <input type="text" id="password" placeholder="Enter your Old password" name="password" tabIndex={2} aria-required="true" required />
                        </fieldset>
                        <fieldset className="password">
                            <label className='to-white'>New password</label>
                            <input type="text" id="password" placeholder="Enter your New password" name="password" tabIndex={2} aria-required="true" required />
                        </fieldset>
                        <fieldset className="password">
                            <label className='to-white'>Confirm password</label>
                            <input type="text" id="password" placeholder="Confirm password" name="password" tabIndex={2} aria-required="true" required />
                        </fieldset>
                        <div className="btn-submit">
                            <button className="w242 active mr-30">Cancel</button>
                            <button className="w242" style={{background:'#A4442B'}} type="submit">Save</button>
                        </div>
                    </form>
                </div>
                <div className="widget-edit mb-30 setting">
                    <div className="title">
                        <h4 className='to-white'>Notification setting</h4>
                        <i className="icon-keyboard_arrow_up" />
                    </div>
                    <form id="commentform" className="comment-form">
                        <div className="notification-setting-item">
                            <div className="content">
                                <h6 className='tf-color'>Order confirmation</h6>
                                <p>will be notified when customer order any product</p>
                            </div>
                            <input className="check" type="checkbox" defaultValue="checkbox" name="check" defaultChecked />
                        </div>
                        <div className="notification-setting-item">
                            <div className="content">
                                <h6 className='tf-color'>New Items Notification</h6>
                                <p>Mauris a velit commodo erat lobortis eleifend</p>
                            </div>
                            <input className="check" type="checkbox" defaultValue="checkbox" name="check" />
                        </div>
                        <div className="notification-setting-item">
                            <div className="content">
                                <h6 className='tf-color'>Payment Card Notification</h6>
                                <p>Proin rutrum nulla non</p>
                            </div>
                            <input className="check" type="checkbox" defaultValue="checkbox" name="check" defaultChecked />
                        </div>
                        <div className="notification-setting-item">
                            <div className="content">
                                <h6 className='tf-color'>Notification for approving product</h6>
                                <p>Nam in mi ac felis venenatis ultrices</p>
                            </div>
                            <input className="check" type="checkbox" defaultValue="checkbox" name="check" />
                        </div>
                        <div className="notification-setting-item">
                            <div className="content">
                                <h6 className='tf-color'>Email notification</h6>
                                <p>Turn on email notification to get updates through email</p>
                            </div>
                            <input className="check" type="checkbox" defaultValue="checkbox" name="check" />
                        </div>
                        <div className="btn-submit">
                            <button className="w242 active mr-30">Cancel</button>
                            <button className="w242" style={{background:'#A4442B'}} type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </>
    </DashboardLayoutWithSidebar>
  );
}

Settings.requiredAuth = true;
export default Settings;
