import { BsFillCollectionFill } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { FaShippingFast } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import { SlOrganization } from "react-icons/sl";
import { TbCategory } from "react-icons/tb";

const HOME_WEBSITE = "https://www.atsur.art";

export const landingPageNavMenu = [
  {
    title: "Service",
    link: "/services",
    menus: [
      {
        title: "Archiving ",
        link: "/services/archiving",
      },
      // {
      //   title: "Due Diligence",
      //   link: "/services/due-diligence",
      // },
      {
        title: "Tokenization",
        link: "/services/tokenization",
      },
      {
        title: "Asset Tagging",
        link: "/services/asset-tagging",
      },
      {
        title: "Certificates of Authenticity",
        link: "/services/certificates-of-authenticity",
      },
      {
        title: "Sales Smart Contracts",
        link: "/services/sales-smart-contracts",
      },

      {
        title: "Asset Ownership",
        link: "/services/asset-ownership",
      },
      {
        title: "Custom Services",
        link: "/services/custom-services",
      },
    ],
  },
  {
    title: "About Us",
    link: `${HOME_WEBSITE}/about`,
  },
  {
    title: "Pricing",
    link: "/pricing",
  },
  {
    title: "Registry",
    link: "/explore",
  },
  {
    title: "Blog",
    link: `${HOME_WEBSITE}/blog`,
  },
  {
    title: "Contact",
    link: `${HOME_WEBSITE}/contact`,
  },
];

export const dashboardSidebarMenu = [
  {
    title: "Art",
    menus: [
      {
        title: "Art Pieces",
        icon: "/images/dashboard-icons/artwork-icon.png",
        link: "/dashboard",
        id: "artwork-nav",
      },
      {
        title: "Series",
        icon: "/images/dashboard-icons/collection-icon.png",
        link: "/dashboard/series",
        id: "series-nav",
      },

      // {
      //   title: "Wishlist",
      //   icon: "/images/dashboard-icons/wishlist.png",
      //   link: "/dashboard/Wishlist",
      // },
    ],
  },
  {
    title: "Business",
    menus: [
      {
        title: "Organizations",
        icon: "/images/dashboard-icons/organization-icon.png",
        link: "/dashboard/organizations",
        id: "organization-nav",
      },
      {
        title: "Collections",
        icon: "/images/dashboard-icons/collection-icon.png",
        link: "/dashboard/collections",
        id: "collection-nav",
      },
      {
        title: "My Orders",
        icon: FaShippingFast,
        link: "/dashboard/orders",
        id: "order-nav",
      },
    ],
  },
  {
    title: "Account",
    menus: [
      {
        title: "Activities",
        icon: "/images/dashboard-icons/activity-icon.png",
        link: "/dashboard/activities",
        id: "activity-nav",
      },
      {
        title: "Wallet",
        icon: "/images/dashboard-icons/security-icon.png",
        link: "/dashboard/wallet",
        id: "wallet-nav",
      },
      {
        title: "Settings",
        icon: "/images/dashboard-icons/setting.png",
        link: "/dashboard/settings",
        id: "setting-nav",
      },
      {
        title: "Logout",
        icon: "/images/dashboard-icons/logout-icon.png",

        isButton: true,
        id: "logout-nav",
      },
    ],
  },
];
export const adminDashboardSidebarMenu = [
  {
    title: "User",
    menus: [
      {
        title: "Users",
        icon: "/images/dashboard-icons/artwork-icon.png",
        link: "/admin",
      },
      {
        title: "Orders",
        icon: LiaShippingFastSolid,
        link: "/admin/orders",
      },
      {
        title: "Coupon",
        icon: RiCoupon2Line,
        link: "/admin/coupon",
      },
    ],
  },
  {
    title: "Verification",
    menus: [
      {
        title: "Ready for verification",
        icon: "/images/dashboard-icons/security-icon.png",
        link: "/admin/verification",
      },
    ],
  },
  {
    title: "Public",
    menus: [
      {
        title: "Hero Images",
        icon: CiImageOn,
        link: "/admin/public/hero-image",
      },
      {
        title: "Top Collection",
        icon: BsFillCollectionFill,
        link: "/admin/public/collections",
      },
      {
        title: "Top Artist",
        icon: FiUsers,
        link: "/admin/public/artist",
      },
      {
        title: "Featured Artworks",
        icon: MdOutlineFeaturedPlayList,
        link: "/admin/public/featured",
      },
      {
        title: "Top Categories",
        icon: TbCategory,
        link: "/admin/public/category",
      },
    ],
  },
  {
    title: "Artworks",
    menus: [
      {
        title: "All Artworks",
        icon: "/images/dashboard-icons/activity-icon.png",
        link: "/admin/artwork",
      },
    ],
  },
  {
    title: "Organizations",
    menus: [
      {
        title: "All organizations",
        icon: SlOrganization,
        link: "/admin/organization",
      },
    ],
  },
  {
    title: "Account",
    menus: [
      // {
      //   title: "Activities",
      //   icon: "/images/dashboard-icons/activity-icon.png",
      //   link: "/dashboard/activities",
      // },
      // {
      //   title: "Security",
      //   icon: "/images/dashboard-icons/security-icon.png",
      //   link: "/dashboard/security",
      // },
      // {
      //   title: "Settings",
      //   icon: "/images/dashboard-icons/setting.png",
      //   link: "/dashboard/settings",
      // },
      {
        title: "Logout",
        icon: "/images/dashboard-icons/logout-icon.png",
        isButton: true,
      },
    ],
  },
];

export const walletDashboardSideMenu = [
  {
    title: "Dashboard",
    icon: "/images/dashboard-icons/artwork-icon.png",
    link: "/dashboard/wallet",
  },
  {
    title: "My Wallet",
    icon: "/images/dashboard-icons/collection-icon.png",
    link: "/dashboard/wallet/my-wallet",
  },
  {
    title: "Transaction",
    icon: "/images/dashboard-icons/organization-icon.png",
    link: "/dashboard/wallet/transaction",
  },
  {
    title: "Crypto",
    icon: "/images/dashboard-icons/wishlist.png",
    link: "/dashboard/dashboard/crypto",
  },
  {
    title: "Settings",
    icon: "/images/dashboard-icons/setting.png",
    link: "/dashboard/wallet/setting",
  },
];
