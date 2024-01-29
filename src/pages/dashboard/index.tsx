import ActiveBid from "@/open9/sections/ActiveBid"
import Collection from "@/open9/sections/Collection"
import Create from "@/open9/sections/Create"
import Explore from "@/open9/sections/Explore"
import Favourite from "@/open9/sections/Favourite"
import History from "@/open9/sections/History"
import Market from "@/open9/sections/Market"
import Settings from "@/open9/sections/Settings"
import Wallet from "@/open9/sections/Wallet"
import DashboardLayout from "@/open9/layout/DashboardLayout"
import Link from "next/link"
import { useState } from "react"

export default function Home() {

    const [activeIndex, setActiveIndex] = useState(9)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }

    return (
        <>
            <DashboardLayout
                handleOnClick={handleOnClick}
                activeIndex={activeIndex}
                >
                {activeIndex === 9 &&
                    <div id="create">
                        <Create />
                    </div>
                }
                {activeIndex === 1 &&
                    <div id="market">
                        <Market />
                    </div>
                }
                {activeIndex === 2 &&
                    <div id="bid">
                        <ActiveBid />
                    </div>
                }
                { activeIndex === 3 &&
                    <div id="explore">
                        <Explore />
                    </div>
                }
                { activeIndex === 4 &&
                    <div id="tf-collection">
                        <Collection />
                    </div>
                }
                { activeIndex === 5 &&
                    <div id="favorite">
                        <Favourite />
                    </div>
                }
                { activeIndex === 6 &&
                    <div id="wallet">
                        <Wallet />
                    </div>
                }
                { activeIndex === 7 &&
                    <div id="history">
                        <History />
                    </div>
                }
                { activeIndex === 8 &&
                    <div id="settings">
                        <Settings />
                    </div>
                }
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
                            <h2>Subscribe to our newsletter</h2>
                            <p>Subscribe for our newsletter to stay in the loop</p>
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
