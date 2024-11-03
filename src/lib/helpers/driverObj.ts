import { DriveStep } from "driver.js";

export const driverAllPageSteps = (pathname: string): DriveStep[] => {
  return [
    {
      element: "#welcome",
      popover: {
        title: "Welcome to Your Dashboard",
        description:
          "This is your central hub for managing all your activities.",
        side: "right",
        align: "start",
      },
    },
    {
      element: "#createButton",
      popover: {
        title: "Create New Artwork",
        description: "Click here to start creating your new artwork piece.",
        side: "right",
        align: "center",
      },
    },
    // {
    //     element: "#artwork-nav",
    //     popover: {
    //         title: "Artworks",
    //         description: "Click here to manage your artworks.",
    //         side: "right",
    //         align: "center",
    //     },
    // },
    // {
    //     element: "#series-nav",
    //     popover: {
    //         title: "Series",
    //         description: "Series are a group of related artworks.Click here to manage your series.",
    //         side: "right",
    //         align: "center",
    //     },
    // },
    // {
    //     element: "#organization-nav",
    //     popover: {
    //         title: "Organizations",
    //         description: "Click here to manage your organizations.",
    //         side: "right",
    //         align: "center",
    //     },
    // },
    // {
    //     element: "#collection-nav",
    //     popover: {
    //         title: "Collections",
    //         description: "Click here to manage your collections.",
    //         side: "right",
    //         align: "center",
    //     },
    // },

    // {
    //     element: "#order-nav",
    //     popover: {
    //         title: "Orders",
    //         description: "Click here to manage your orders.",
    //         side: "right",
    //         align: "center",
    //     },
    // },
    // {
    //     element: "#activity-nav",
    //     popover: {
    //         title: "Activities",
    //         description: "Click here to manage your activities.",
    //         side: "right",
    //         align: "center",
    //     },
    // },
    // {
    //     element: "#wallet-nav",
    //     popover: {
    //         title: "Wallet",
    //         description: "Click here to manage your wallet.",
    //         side: "right",
    //         align: "center",
    //     },
    // },
    // {
    //     element: "#setting-nav",
    //     popover: {
    //         title: "Settings",
    //         description: "Click here to manage your settings. View your profile information, credits and logout here.",
    //         side: "right",
    //         align: "center",
    //     },
    // },
    // {
    //     element: "#user-logout",
    //     popover: {
    //         title: "Logout",
    //         description: "Click here when you're ready to end your session.",
    //         side: "right" as const,
    //         align: "end",
    //     },
    // },
    // {
    //     element: "#messages",
    //     popover: {
    //         title: "Messages",
    //         description: "View and manage your messages here.",
    //         side: "right" as const,
    //         align: "end",
    //     },
    // },
    // {
    //     element: "#notifications",
    //     popover: {
    //         title: "Notifications",
    //         description: "View and manage your notifications here.",
    //         side: "right" as const,
    //         align: "end",
    //     },
    // },
    // {
    //     element: "#profileButton",
    //     popover: {
    //         title: "View Quick Information",
    //         description: "View your profile information, credits and logout here. Click to view more",
    //         side: "right" as const,
    //         align: "center",
    //     },
    // },
    ...(pathname === "/dashboard/artworks/create"
      ? [
          {
            element: "#illustration-form",
            popover: {
              title: "Next",
              description: "Fill out the form to create your new artwork.",
              side: "bottom" as const,
            },
          },

          {
            element: "#next",
            popover: {
              title: "Next ",
              description:
                "Click here to go to the next step. and fill up the rest of the other forms steps",
              side: "bottom" as const,
            },
          },

          {
            element: "#next",
            popover: {
              title: "Next ",
              description: "Click here to go to the next step.",
              side: "bottom" as const,
            },
          },
        ]
      : pathname === "/dashboard/series"
      ? [
          {
            element: "#title",
            popover: {
              title: "what is a series ",
              description: "A series is a group of related artworks.",
              side: "bottom" as const,
            },
          },
          {
            element: "#new-artwork",
            popover: {
              title: "Create New Series",
              description: "Click to create new series",
              side: "bottom" as const,
            },
          },
          {
            element: "#view-toggle",
            popover: {
              title: "Display Preferences",
              description:
                "Switch between grid and list view based on your preference.",
              side: "left" as const,
            },
          },

          {
            element: "#series-list",
            popover: {
              title: "Series LIst",
              description: "Click any of the series to view more details",
              side: "bottom" as const,
            },
          },
        ]
      : []),
  ];
};
