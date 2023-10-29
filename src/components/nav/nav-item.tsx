import { useState, useEffect } from "react";
import { Box, ListItemButton } from "@mui/material";
import { alpha } from "@mui/material/styles";

function NavItem({ title }) {
  // const pathname = usePathname();
  // const active = item.path === pathname;

  return (
    <ListItemButton
      // component={RouterLink}
      // href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: "body2",
        color: "text.secondary",
        textTransform: "capitalize",
        fontWeight: "fontWeightMedium",
        ...{
          color: "primary.main",
          fontWeight: "fontWeightSemiBold",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        },
      }}
    >
      {/* <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
          {item.icon}
        </Box> */}

      <Box component="span">{title}</Box>
    </ListItemButton>
  );
}

export default NavItem;
