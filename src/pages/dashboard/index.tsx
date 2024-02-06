import Link from 'next/link';
import DashboardLayout from "@/open9/layout/DashboardLayout";
import { useState } from "react";
import CreateMetadata from '@/components/dashboard/create-metadata';

export default function Home() {

    const [activeIndex, setActiveIndex] = useState(11);
    const handleOnClick = (index) => {
        setActiveIndex(index);
    }

    return (
        <>
            <DashboardLayout
                handleOnClick={handleOnClick}
                activeIndex={activeIndex}
                >
                <div id="create">
                    <div className="wrapper-content-create">
                        <div className="heading-section">
                            <h2 className="tf-title pb-30">Create Artwork</h2>
                        </div>
                        <div className="widget-tabs relative">
                            <ul className="widget-menu-tab">
                                <li className={activeIndex === 11 ? "item-title active tf-color" : "item-title"} onClick={() => handleOnClick(11)}>
                                    <span className="inner"><span className="order">1</span> Metadata <i className="icon-keyboard_arrow_right" /></span>
                                </li>
                                <li className={activeIndex === 12 ? "item-title active" : "item-title"} onClick={() => handleOnClick(12)}>
                                    <span className="inner"><span className="order">2</span>Assets <i className="icon-keyboard_arrow_right" /></span>
                                </li>
                                <li className={activeIndex === 13 ? "item-title active" : "item-title"} onClick={() => handleOnClick(13)}>
                                    <span className="inner"><span className="order">3</span>Preview</span>
                                </li>
                            </ul>
                            <div className="widget-content-tab">
                                <div className={activeIndex === 11 ? "widget-content-inner description active" : "widget-content-inner description"} style={{ display: `${activeIndex == 11 ? "" : "none"}` }}>
                                    <CreateMetadata nextPage={handleOnClick} />
                                </div>

                                <div className={activeIndex === 12 ? "widget-content-inner upload active" : "widget-content-inner upload"} style={{ display: `${activeIndex == 12 ? "" : "none"}` }}>
                                    <div className="wrap-upload w-full">
                                        <form action="#">
                                            <label className="uploadfile" style={{marginBottom: '3%'}}>
                                                <img src="assets/images/box-icon/upload.png" alt="" />
                                                <h5 className='to-white'>Left Angle View</h5>
                                                <p className="text">Drag or choose your file to upload</p>
                                                <div className="text filename">PNG, GIF, WEBP, MP4 or MP3.Max 1Gb.</div>
                                                <input type="file" name="file" />
                                            </label><br />
                                            <label className="uploadfile" style={{marginBottom: '3%'}}>
                                                <img src="assets/images/box-icon/upload.png" alt="" />
                                                <h5 className='to-white'>Right Angle View</h5>
                                                <p className="text">Drag or choose your file to upload</p>
                                                <div className="text filename">PNG, GIF, WEBP, MP4 or MP3.Max 1Gb.</div>
                                                <input type="file" name="file" />
                                            </label> <br />
                                            <label className="uploadfile">
                                                <img src="assets/images/box-icon/upload.png" alt="" />
                                                <h5 className='to-white'>Mounted</h5>
                                                <p className="text">Drag or choose your file to upload</p>
                                                <div className="text filename">PNG, GIF, WEBP, MP4 or MP3.Max 1Gb.</div>
                                                <input type="file" name="file" />
                                            </label>
                                        </form>
                                    </div>
                                </div>

                                <div className={activeIndex === 13 ? "widget-content-inner submit active" : "widget-content-inner submit"} style={{ display: `${activeIndex == 13 ? "" : "none"}` }}>
                                    <div className="wrap-upload w-full">
                                        <form id="commentform" className="comment-form">
                                            <fieldset className="name">
                                                <label>Product name *</label>
                                                <input type="text" id="name" placeholder="Product name" name="name" tabIndex={2} aria-required="true" required />
                                            </fieldset>
                                            <fieldset className="message">
                                                <label>Description *</label>
                                                <textarea id="message" name="message" rows={4} placeholder="Please describe your product*" tabIndex={4} aria-required="true" required />
                                            </fieldset>
                                            <div className="flex gap30">
                                                <fieldset className="price">
                                                    <label>Price</label>
                                                    <input type="text" id="price" placeholder="Price" name="price" tabIndex={2} aria-required="true" required />
                                                </fieldset>
                                                <fieldset className="properties">
                                                    <label>Properties</label>
                                                    <input type="text" id="properties" placeholder="Properties" name="properties" tabIndex={2} aria-required="true" required />
                                                </fieldset>
                                                <fieldset className="size">
                                                    <label>Size</label>
                                                    <input type="text" id="size" placeholder="Size" name="size" tabIndex={2} aria-required="true" required />
                                                </fieldset>
                                            </div>
                                            <fieldset className="rarity">
                                                <label>Rarity</label>
                                                <select className="select" name="rarity" id="rarity">
                                                    <option>afafdas</option>
                                                    <option value="100$">100$</option>
                                                    <option value="1000$">1000$</option>
                                                    <option value="10000$">10000$</option>
                                                </select>
                                            </fieldset>
                                            <fieldset className="royatity">
                                                <label>Royatity</label>
                                                <input type="text" id="royatity" placeholder="Royatity" name="royatity" tabIndex={2} aria-required="true" required />
                                            </fieldset>
                                            <div className="btn-submit flex gap30 justify-center">
                                                <button className="tf-button style-1 h50 w320 active">Clear<i className="icon-arrow-up-right2" /></button>
                                                <button className="tf-button style-1 h50 w320" type="submit">Create Record<i className="icon-arrow-up-right2" /></button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
            <div className="modal fade popup" id="popup_bid" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <div className="modal-body">
                            <div className="image">
                                <img src="assets/images/backgroup-section/popup.png" alt="" />
                            </div>
                            <div className="logo-rotate">
                                <img src="assets/images/item-background/item6-img.png" alt="" />
                            </div>
                            <h2 className="to-white">Subscribe to our newsletter</h2>
                            <p className="to-white">Subscribe for our newsletter to stay in the loop</p>
                            <fieldset className="email">
                                <input type="email" className="style-1" id="email" placeholder="Email address*" name="email" tabIndex={2} aria-required="true" required />
                            </fieldset>
                            <Link href="#" className="tf-button style-1 h50">Subscribe<i className="icon-arrow-up-right2" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
