import * as React from "react";
import { Box, Button } from "@mui/material";
import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridToolbar,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmModal from "../common/deletePromptModal";
import {
    useDeletePricingPlanMutation,
    useGetAllPricingPlansQuery,
} from "../../features/PricingPlans/api";
import LinearProgress from "@mui/material/LinearProgress";
import { setSelectedPlan } from "../../features/PricingPlans";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { toast } from "react-toastify";

export default function PricePlanTable() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [selectedRow, setSelectedRow] = React.useState<any>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

    const {
        data: pricingPlans,
        isLoading: isPricingPlanLoading,
        isSuccess: isPricingPlanSuccess,
        refetch:refetchPricePlan,
        isFetching: pricePlanFetching,
    } = useGetAllPricingPlansQuery();

    const [
        deletePlan,
        {
            data: deletePlanData,
            isLoading: deletePlanLoading,
            isSuccess: deletePlanSuccess,
        },
    ] = useDeletePricingPlanMutation();

    const handleDelete = () => {
        deletePlan(selectedRow)
    };

    const columns: GridColDef[] = [
        { field: "identifier", headerName: "UUID", width: 250 },
        { field: "name", headerName: "Plan Name", width: 150 },
        { field: "term_years", headerName: "Term", width: 150 },
        // { field: "col3", headerName: "is Default", width: 150 },
        { field: "interest_rate", headerName: "Interest Rate", width: 100 },
        { field: "dealer_fee", headerName: "Dealer Fee", width: 100 },
        { field: "owner_buydown", headerName: "Owner Buydown", width: 120 },
        // { field: "col7", headerName: "Sponsor", width: 150 },
        // { field: "col8", headerName: "Programn", width: 150 },
        // { field: "col9", headerName: "Activation Date", width: 150 },
        // { field: "col11", headerName: "Expiry Date", width: 150 },
        {
            field: "col12",
            headerName: "Action",
            width: 250,
            renderCell: (params) => {
                const handleEdit = (e: any) => {
                    e.stopPropagation();
                    setSelectedRow(params.row);
                    dispatch(setSelectedPlan(params.row));
                    navigate(`/pricing-plans/edit/${params.row.identifier}`);
                };

                const handleDeletePrompt = (e: any) => {
                    e.stopPropagation();
                    setSelectedRow(params.row);
                    setShowDeleteConfirm(true);
                };

                return (
                    <Box>
                        <Button startIcon={<EditIcon />} onClick={handleEdit}>
                            Edit
                        </Button>
                        <Button
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

    React.useEffect(()=>{
        if(deletePlanData?.isSuccess && deletePlanSuccess){
            refetchPricePlan();
            setShowDeleteConfirm(false);
            toast.success("Deleted Successfully!");
        }
    },[deletePlanData,deletePlanSuccess])

    React.useEffect(()=>{
        refetchPricePlan();
    },[])
    return (
        <Box>
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    loading={isPricingPlanLoading || pricePlanFetching}
                    rows={
                        !isPricingPlanLoading &&
                        isPricingPlanSuccess &&
                        pricingPlans.data
                            ? pricingPlans.data
                            : []
                    }
                    columns={columns}
                    components={{
                        Toolbar: GridToolbar,
                        LoadingOverlay: LinearProgress,
                    }}
                />
            </div>

            <DeleteConfirmModal
                closeDialog={setShowDeleteConfirm}
                showDeleteConfirm={showDeleteConfirm}
                onDelete={handleDelete}
                isDeleting={deletePlanLoading}
            />
        </Box>
    );
}
