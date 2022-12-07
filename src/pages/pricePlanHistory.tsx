import React from "react";
import { Box } from "@mui/material";
import HistoryTable from "../components/tables/historyTables";

export default function PlanHistory() {
    return (
        <Box>
            <Box fontSize={"2rem"} sx={{mb:2}} >Pricing plan load history</Box>
            <HistoryTable />
        </Box>
    );
}
