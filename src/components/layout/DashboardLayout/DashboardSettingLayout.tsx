import { Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
interface Props {
  children: React.ReactNode;
}

const navs = [
  {
    title: "My Profile",
    link: "/dashboard/settings",
  },
  {
    title: "Security",
    link: "/dashboard/settings/security",
  },
  {
    title: "Artworks",
    link: "/dashboard/settings/artworks",
  },
  {
    title: "Notifications",
    link: "/dashboard/settings/notifications",
  },
  {
    title: "Billing",
    link: "/dashboard/settings/billing",
  },
  {
    title: "Data Entry",
    link: "/dashboard/settings/data-entry",
  },
];

const DashboardSettingLayout: React.FC<Props> = ({ children }) => {
  const pathname = useRouter().pathname;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl lg:text-[30px] font-[600] lg:leading-[40px] text-primary">
        Settings
      </h1>
      <div className="bg-secondary-white flex lg:flex-row flex-col  lg:divide-x-[1px] p-2 lg:p-10 divide-secondary">
        <div className="flex flex-row overflow-x-auto lg:flex-col gap-4 pr-4 lg:pr-10 p-2 lg:p-5">
          {navs.map((nav, id) => (
            <Link
              key={`settings-nav-${id}`}
              className={`flex-shrink-0 mb-4 lg:mb-0 p-2 text-[17px] leading-[16px] ${
                pathname === nav.link
                  ? "bg-secondary rounded-[22px] font-[600]"
                  : "font-[300]"
              } `}
              href={nav.link}
            >
              {nav.title}
            </Link>
          ))}
        </div>
        <div className="flex-1 p-2 lg:p-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardSettingLayout;
