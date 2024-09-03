import { BsFillCollectionFill } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { TbCategory } from "react-icons/tb";

export const landingPageNavMenu = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Service",
    link: "/service",
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
    title: "Pricing",
    link: "/pricing",
  },

  {
    title: "About",
    link: "/about",
  },

  {
    title: "Explore",
    link: "/explore",
  },
  {
    title: "Contact",
    link: "/contact",
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
      },
      {
        title: "Series",
        icon: "/images/dashboard-icons/collection-icon.png",
        link: "/dashboard/series",
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
      },
      {
        title: "Collections",
        icon: "/images/dashboard-icons/collection-icon.png",
        link: "/dashboard/collections",
      },
      // {
      //   title: "Deals",
      //   icon: "/images/dashboard-icons/deal-icon.png",
      //   link: "/dashboard/Deals",
      // },
    ],
  },
  {
    title: "Account",
    menus: [
      {
        title: "Activities",
        icon: "/images/dashboard-icons/activity-icon.png",
        link: "/dashboard/activities",
      },
      {
        title: "Wallet",
        icon: "/images/dashboard-icons/security-icon.png",
        link: "/dashboard/wallet",
      },
      {
        title: "Settings",
        icon: "/images/dashboard-icons/setting.png",
        link: "/dashboard/settings",
      },
      {
        title: "Logout",
        icon: "/images/dashboard-icons/logout-icon.png",
        isButton: true,
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
