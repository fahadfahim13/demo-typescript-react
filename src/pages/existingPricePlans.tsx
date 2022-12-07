import React from "react";
import PricePlanTable from "../components/tables/pricePlanTable";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ExistingPricePlans() {
    const navigate = useNavigate();

    const handleOpen = () => {
        navigate("/create-plan");
    };

    return (
        <React.Fragment>
            <Box fontSize={"2rem"}>Existing Active Price Plans</Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                }}
            >
                <Box sx={{ width: "100%" }}>
                    <Box
                        sx={{
                            my: 2,
                            display: "flex",
                            justifyContent: "end",
                            gap: 2,
                        }}
                    >
                        <Button
                            onClick={() => {
                                navigate('/import-file')
                            }}
                            variant="contained"
                        >
                            Import
                        </Button>
                        <Button onClick={handleOpen} variant="contained">
                            Add new
                        </Button>
                    </Box>

                    <PricePlanTable />
                </Box>
            </Box>
        </React.Fragment>
    );
}
