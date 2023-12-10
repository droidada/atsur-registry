import React from "react";
import Layout from "./layout";
import Footer from "./footer";
import { ListItem, Divider, Link } from "@mui/material";
import NavItem from "./nav/nav-item";

const DashboardLayout = ({ children }) => {
  return (
    <div className="bg-white text-black min-h-[100vh]">
      <Layout>
        <div className="px-10 flex flex-col gap-6">
          <div className="flex flex-wrap">
            <h1 className="text-[48px] font-[300]">Dashboard</h1>
          </div>
          <p style={{ marginTop: -20 }}>
            Discover Artwork and artifact history
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="flex flex-col gap-4 py-10 mt-20">
              <Divider />
              <Link href="/dashboard/artists">
                <p style={{ padding: 5 }}>
                  Artists
                </p>
              </Link>
              <Divider />
              <Link href="/dashboard/organizations">
              <p style={{ padding: 5 }}>
                Organizations
              </p>
              </Link>
              <Divider />
              <Link href="/dashboard/artworks">
              <p style={{ padding: 5 }}>
                Artworks
              </p>
              </Link>
              <Divider />
              <Link href="/dashboard/account">
              <p style={{ padding: 5 }}>
                Account
              </p>
              </Link>
              <Divider />
              <Link href="/dashboard/settings">
              <p style={{ padding: 5 }}>
                Settings
              </p>
              </Link>
              <Divider />
            </div>
            <div className="col-span-3">{children}</div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default DashboardLayout;
