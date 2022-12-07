import * as React from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmModal from "../common/deletePromptModal";
import { useGetPricingHistoryQuery } from "../../features/dynamoDB";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { setSelectedPlanHistory } from "../../features/PricingPlans";

export default function HistoryTable() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState<any>(null);

    const {
        data: historyData,
        isSuccess,
        isLoading,
        refetch,
        isFetching,
    } = useGetPricingHistoryQuery();

    const [stateRows, setStateRows] = React.useState<any>([]);

    const columns: GridColDef[] = [
        { field: "createdAt", headerName: "Plan Creation Date", width: 250 },
        { field: "updatedAt", headerName: "Last Updated Date", width: 250 },
        {
            field: "publishedAt",
            headerName: "Publish Date",
            width: 250,
            renderCell: (params: any) => {
                return <div>{params.row.publishedAt || "N/A"}</div>;
            },
        },
        { field: "publishStatus", headerName: "Status", width: 250 },
        {
            field: "col12",
            headerName: "Action",
            width: 250,
            renderCell: (params) => {
                const handleView = (e: any) => {
                    e.stopPropagation();
                    dispatch(setSelectedPlanHistory(params.row));
                    navigate(`/pricing-plan-history/${params.row.historyId}`);
                };
                const handleEdit = (e: any) => {
                    e.stopPropagation();
                    dispatch(setSelectedPlanHistory(params.row));
                    navigate(`/pricing-plan-history/${params.row.historyId}`);
                };
                const handleDeletePrompt = (e: any) => {
                    e.stopPropagation();
                    setSelectedRow(params.row);
                    setShowDeleteConfirm(true);
                };

                return (
                    <Box>
                        <Button
                            startIcon={<VisibilityIcon />}
                            onClick={handleView}
                        >
                            View
                        </Button>
                        <Button
                            disabled={params.row.publishStatus !== "SAVED"}
                            startIcon={<EditIcon />}
                            onClick={handleEdit}
                        >
                            Edit
                        </Button>
                        <Button
                            disabled={params.row.publishStatus !== "SAVED"}
                            startIcon={<DeleteIcon />}
                            onClick={handleDeletePrompt}
                        >
                            Delete
                        </Button>
                    </Box>
                );
            },
        },
    ];

    const handleDelete = () => {
        setStateRows(stateRows.filter((el: any) => el.id !== selectedRow.id));
        setShowDeleteConfirm(false);
    };

    React.useEffect(()=>{
        refetch();
    },[]);

    return (
        <Box>
            <Box sx={{ height: 600, mx: "auto" }}>
                <DataGrid
                    loading={isLoading || isFetching}
                    rows={
                        !isLoading && isSuccess && historyData
                            ? historyData.data.map((item: any) => {
                                  return { ...item, id: item.historyId };
                              })
                            : []
                    }
                    columns={columns}
                    components={{
                        Toolbar: GridToolbar,
                        LoadingOverlay: LinearProgress,
                    }}
                />
            </Box>

            <DeleteConfirmModal
                closeDialog={setShowDeleteConfirm}
                showDeleteConfirm={showDeleteConfirm}
                onDelete={handleDelete}
            />
        </Box>
    );
}
