/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import {
    Box,
    Button,
    Typography,
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
import { setSelectedPlanHistory } from "../features/PricingPlans";
import { toast } from "react-toastify";
import SpinnerLoader from "../components/common/spinnerLoader";
import { useNavigate } from "react-router-dom";
import { usePublishPricingPlansMutation } from "../features/PricingPlans/api";
import {
    usePublishPricingPlansDynamoMutation,
    useUpdatePricingPlansDynamoMutation,
} from "../features/dynamoDB";
import {
    setHistoryPublishable,
    setSaveable,
} from "../features/publishController";
import PriceHistoryRow from "../components/tables/rows/showPriceHistroyRow";

export default function ShowPricingPlanHistory() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsloading] = React.useState(false);
    const validators = useAppSelector((state) => state.validators);

    const selectedRow = useAppSelector(
        (state) => state.pricingPlans.selectedPlanHistory
    );

    const setSelectedRow = (payload: any) => {
        dispatch(setSelectedPlanHistory(payload));
    };
    // const [selectedRow, setSelectedRow] = React.useState<any>(null);

    const [
        publishPricingPlan,
        {
            data: pubPricingPlanReturnVal,
            isLoading: isPublishLoading,
            isSuccess: isSuccessPublish,
        },
    ] = usePublishPricingPlansMutation();

    const [
        publishPricingPlanDynamo,
        {
            data: pubPricingPlanReturnValDynamo,
            isLoading: isPublishLoadingDynamo,
            isSuccess: isSuccessPublishDynamo,
        },
    ] = usePublishPricingPlansDynamoMutation();

    const [
        updateHistoryDynamo,
        {
            data: updateHistoryDynamoData,
            isLoading: updateHistoryDynamoLoading,
            isSuccess: updateHistoryDynamoSuccess,
        },
    ] = useUpdatePricingPlansDynamoMutation();

    React.useEffect(() => {
        if (
            updateHistoryDynamoSuccess &&
            updateHistoryDynamoData &&
            updateHistoryDynamoData.responseCode.code === 200
        ) {
            toast.success("Saved successfully!");
            dispatch(setHistoryPublishable(true));
        }
    }, [updateHistoryDynamoSuccess, updateHistoryDynamoData]);

    React.useEffect(() => {
        if (
            isSuccessPublish &&
            pubPricingPlanReturnVal &&
            pubPricingPlanReturnValDynamo.responseCode.code === 200 &&
            isSuccessPublishDynamo
        ) {
            setSelectedRow({ ...selectedRow, publishStatus: "PUBLISHED" });
            toast.success("Published successfully!");
        }
    }, [
        isSuccessPublish,
        pubPricingPlanReturnVal,
        isSuccessPublishDynamo,
        pubPricingPlanReturnValDynamo,
    ]);
    const {
        data: programs,
        isLoading: isProgramsLoading,
        // isSuccess: isProgramsLoadingSuccess,
    } = useGetAllProgramsQuery();
    const {
        data: sponsors,
        isLoading: isSponsorsLoading,
        // isSuccess: isSponsorsSuccess,
    } = useGetAllSponsorsQuery();

    React.useEffect(() => {
        let flag: number = 0;
        for (let i = 0; i < selectedRow.pricing_plan.length; i++) {
            const element = selectedRow.pricing_plan[i];
            if (element.term_years === "") {
                flag += 1;
            }
            if (element.interest_rate === "") {
                flag += 1;
            }
            if (
                element.is_default !== "false" &&
                element.is_default !== "true"
            ) {
                flag += 1;
            }
            if (element.owner_buydown === "") {
                flag += 1;
            }
            if (element.dealer_fee === "") {
                flag += 1;
            }
        }
        if (!validators.financialValidation) {
            flag += 1;
        }
        if (flag > 0) {
            dispatch(setSaveable(false));
        } else {
            dispatch(setSaveable(true));
        }
    }, [selectedRow, validators.financialValidation]);

    return (
        <Box sx={{ position: "relative" }}>
            {isProgramsLoading ||
            isSponsorsLoading ||
            isPublishLoading ||
            isLoading ||
            updateHistoryDynamoLoading ||
            isPublishLoadingDynamo ? (
                <SpinnerLoader />
            ) : null}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                }}
            >
                <Typography
                    textAlign={"center"}
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                    sx={{ mt: 2, mb: 2 }}
                >
                    History Details{" "}
                    <span style={{ fontWeight: "bold" }}>
                        #{selectedRow.historyId}
                    </span>
                </Typography>
            </Box>
            <Typography
                textAlign={"center"}
                fontWeight="semibold"
                color={"GrayText"}
                sx={{ mb: 2 }}
            >
                Status: {selectedRow.publishStatus}
            </Typography>

            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell> Plan Name</TableCell>
                        <TableCell> Term</TableCell>
                        <TableCell> is Default</TableCell>
                        <TableCell> Interest Rate</TableCell>
                        <TableCell> Dealer Fee</TableCell>
                        <TableCell> Owner Buydown</TableCell>
                        <TableCell> Sponsor</TableCell>
                        <TableCell> Programs</TableCell>
                        <TableCell> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {selectedRow?.pricing_plan?.map(
                        (item: any, index: number) => (
                            <PriceHistoryRow
                                key={item.historyId}
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
            <hr />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                <Box sx={{ gap: 2, display: "flex" }}>
                    <Button
                        sx={{ px: 4, width: 150 }}
                        onClick={() => {
                            navigate("/history");
                        }}
                        variant="outlined"
                    >
                        Back
                    </Button>
                    {selectedRow.publishStatus === "SAVED" &&
                    validators.isHistoryPublishable ? (
                        <Button
                            sx={{ px: 4 }}
                            disabled={
                                isPublishLoading || isPublishLoadingDynamo
                            }
                            onClick={() => {
                                publishPricingPlan({
                                    pricing_plan: selectedRow.pricing_plan,
                                });
                                publishPricingPlanDynamo({
                                    id: selectedRow.historyId,
                                });
                            }}
                            variant="contained"
                            color="success"
                        >
                            Publish Now
                        </Button>
                    ) : null}

                    {selectedRow.publishStatus === "SAVED" &&
                    !validators.isHistoryPublishable ? (
                        <Button
                            disabled={
                                !validators.isSaveable ||
                                !validators.financialValidation ||
                                updateHistoryDynamoLoading
                            }
                            sx={{ px: 4, width: 150 }}
                            onClick={() => {
                                updateHistoryDynamo({
                                    id: selectedRow.historyId,
                                    data: selectedRow,
                                });
                            }}
                            variant="contained"
                        >
                            Save
                        </Button>
                    ) : null}
                </Box>
            </Box>
        </Box>
    );
}
