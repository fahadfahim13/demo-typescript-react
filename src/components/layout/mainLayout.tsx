import React from "react";
import { Box } from "@mui/material";
import SideNav from "./sidebar";

type Props = {
    children?: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
    return (
        <Box sx={{ display: "flex" }}>
            <Box sx={{ minWidth: 250 }}>
                <SideNav />
            </Box>
            <Box
                sx={{
                    height: "100%",
                    flexGrow: 1,
                    px: 2,
                    pt: 10,
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default MainLayout;
