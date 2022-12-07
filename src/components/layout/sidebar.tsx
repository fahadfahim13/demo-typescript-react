import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";

export default function SideNav() {
    const navigate = useNavigate();

    return (
        <Box>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${250}px)` },
                    ml: { sm: `${250}px` },
                    backgroundColor: "#fff",
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                    ></Typography>
                </Toolbar>
            </AppBar>
            <List
                sx={{
                    borderRight: "1px solid #f2f2f2",
                    height: "100vh",
                    backgroundColor: "#003162",
                    position: "fixed",
                    width: 250,
                }}
            >
                <ListItem>
                    <div>
                        <img
                            src={`/logo.png`}
                            alt="logo"
                            style={{ objectFit: "cover", width: "100%" }}
                        />
                    </div>
                </ListItem>
                <Box sx={{ borderTop: "1px solid #010101", pt: 4, mt: 2 }}>
                    {[
                        { text: "Existing Plans", route: "/" },
                        { text: "Pricing Plan History", route: "/history" },
                    ].map((item, index) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                onClick={() => navigate(item.route)}
                            >
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon sx={{ color: "white" }} />
                                    ) : (
                                        <MailIcon sx={{ color: "white" }} />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{ color: "white" }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </Box>
            </List>
        </Box>
    );
}
