/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import {
    Box,
    Button,
    Typography,
    TextField,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
} from "@mui/material";
import {
    useGetAllProgramsQuery,
    useGetAllSponsorsQuery,
} from "../features/Programs";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSelectedPlan } from "../features/PricingPlans";
import { useEditPricingPlanMutation } from "../features/PricingPlans/api";
import { toast } from "react-toastify";
import SpinnerLoader from "../components/common/spinnerLoader";
import { useNavigate } from "react-router-dom";
import ShowPricePlanRow from "../components/tables/rows/showPricePlanRow";

export default function ShowPricingPlan() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsloading] = React.useState(false);

    const { data: sponsors, isLoading: isSponsorsLoading } =
        useGetAllSponsorsQuery();

    const { data: programs, isLoading: isProgramsLoading } =
        useGetAllProgramsQuery();

    const [
        editPricePlan,
        {
            data: editPricePlanReturnData,
            isLoading: editPriceRequestLoading,
            isSuccess: editPriceRequestSuccess,
        },
    ] = useEditPricingPlanMutation();

    const selectedRow = useAppSelector(
        (state) => state.pricingPlans.selectedPlan
    );

    const validators = useAppSelector((state) => state.validators);

    const setSelectedRow = (payload: any) => {
        dispatch(setSelectedPlan(payload));
    };

    console.log(selectedRow);

    React.useEffect(() => {
        if (editPricePlanReturnData && editPriceRequestSuccess) {
            toast.success("Successful!");
            navigate('/')
        }
    }, [editPricePlanReturnData, editPriceRequestSuccess]);

    React.useEffect(() => {
        setSelectedRow({
            ...selectedRow,
            name: `${selectedRow.term_years}-${
                parseFloat(selectedRow["interest_rate"])
                    .toFixed(4)
                    .toString()
                    .split(".")[1]
            }-${
                parseFloat(selectedRow["dealer_fee"])
                    .toFixed(4)
                    .toString()
                    .split(".")[1]
            }-${
                parseFloat(selectedRow["owner_buydown"])
                    .toFixed(4)
                    .toString()
                    .split(".")[1]
            }`,
        });
    }, [
        selectedRow.term_years,
        selectedRow.interest_rate,
        selectedRow.owner_buydown,
        selectedRow.dealer_fee,
    ]);

    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "stretch",
                px: 10,
                py: 6,
                overflow: "auto",
                textAlign: "start",
                position: "relative",
            }}
        >
            {isProgramsLoading ||
            isSponsorsLoading ||
            isLoading ||
            editPriceRequestLoading ? (
                <SpinnerLoader />
            ) : null}
            <Box>
                <Typography fontWeight="bold">Plan Name</Typography>
                <TextField
                    sx={{ width: "100%" }}
                    value={selectedRow?.name}
                    onChange={(e: any) => {
                        setSelectedRow({
                            ...selectedRow,
                            name: e.target.value,
                        });
                    }}
                />
            </Box>
            <Box>
                <Typography fontWeight="bold">Term</Typography>
                <TextField
                    sx={{ width: "100%" }}
                    value={selectedRow?.term_years}
                    onChange={(e: any) => {
                        setSelectedRow({
                            ...selectedRow,
                            term_years: e.target.value,
                        });
                    }}
                />
            </Box>

            <Box>
                <Typography fontWeight="bold">Interest Fee</Typography>
                <TextField
                    sx={{ width: "100%" }}
                    value={selectedRow?.interest_rate}
                    onChange={(e: any) => {
                        setSelectedRow({
                            ...selectedRow,
                            interest_rate: e.target.value,
                        });
                    }}
                />
            </Box>
            <Box>
                <Typography fontWeight="bold">Dealer Fee</Typography>
                <TextField
                    sx={{ width: "100%" }}
                    value={selectedRow?.dealer_fee}
                    onChange={(e: any) => {
                        setSelectedRow({
                            ...selectedRow,
                            dealer_fee: e.target.value,
                        });
                    }}
                />
            </Box>
            <Box>
                <Typography fontWeight="bold">Owner Buydown</Typography>
                <TextField
                    sx={{ width: "100%" }}
                    value={selectedRow?.owner_buydown}
                    onChange={(e: any) => {
                        setSelectedRow({
                            ...selectedRow,
                            owner_buydown: e.target.value,
                        });
                    }}
                />
            </Box>

            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell> Sponsor</TableCell>
                        <TableCell> Program</TableCell>
                        <TableCell> is Default</TableCell>
                        <TableCell> Expiry Date</TableCell>
                        <TableCell> Activation Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {selectedRow?.financing_products_pricing_plans.map(
                        (item: any, index: number) => (
                            <ShowPricePlanRow
                                item={item}
                                index={index}
                                selectedRow={selectedRow}
                                setSelectedRow={setSelectedRow}
                                sponsors={sponsors}
                                programs={programs}
                                setIsloading={setIsloading}
                            />
                        )
                    )}
                </TableBody>
            </Table>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ gap: 2, display: "flex" }}>
                    <Button
                        onClick={() => {
                            navigate("/");
                        }}
                        variant="outlined"
                        color="primary"
                    >
                        Back
                    </Button>
                    <Button
                        disabled={
                            !validators.financialValidation || editPriceRequestLoading
                        }
                        onClick={() => {
                            editPricePlan({
                                ...selectedRow,
                                financing_products_pricing_plan_id:
                                    selectedRow
                                        .financing_products_pricing_plans[0].id,
                                financing_product_id:
                                    selectedRow
                                        .financing_products_pricing_plans[0]
                                        .financing_product_id,
                                is_default:
                                    selectedRow
                                        .financing_products_pricing_plans[0]
                                        .is_default,
                                active_at:
                                    selectedRow
                                        .financing_products_pricing_plans[0]
                                        .active_at,
                                expires_at:
                                    selectedRow
                                        .financing_products_pricing_plans[0]
                                        .expires_at,
                            });
                        }}
                        variant="contained"
                        color="success"
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
