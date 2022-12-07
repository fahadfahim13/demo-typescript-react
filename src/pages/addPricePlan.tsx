import React from "react";
import { Box, Button, IconButton } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";

import {
    useGetAllProgramsQuery,
    useGetAllSponsorsQuery,
} from "../features/Programs";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addNewPricingPlan, clearPricingPlans } from "../features/PricingPlans";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { useSavePricingPlansMutation } from "../features/dynamoDB/index";
import { usePublishPricingPlansMutation } from "../features/PricingPlans/api";
import PricePlanRow from "../components/tables/rows/addPricePlanRow";
import { setPublishable, setSaveable } from "../features/publishController";
import { toast } from "react-toastify";
import SpinnerLoader from "../components/common/spinnerLoader";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function AddPricePlanForm() {
    const navigate = useNavigate();
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
    const [
        savePricingPlan,
        {
            data: pricingPlanReturnVal,
            isSuccess: isSuccessSave,
            isLoading: savePriceReqLoading,
        },
    ] = useSavePricingPlansMutation();
    const [
        publishPricingPlan,
        { data: pubPricingPlanReturnVal, isSuccess: isSuccessPublish },
    ] = usePublishPricingPlansMutation();

    const dispatch = useAppDispatch();
    const [isLoading, setIsloading] = React.useState(false);
    const pricingPlan = useAppSelector(
        (state) => state.pricingPlans.pricingPlans
    );
    const validators = useAppSelector((state) => state.validators);

    const addItem = () => {
        dispatch(addNewPricingPlan());
    };

    React.useEffect(() => {validation()}, [pricingPlan, validators.financialValidation]);

    // console.log({pricingPlan})
    const validation = () => {
        dispatch(setPublishable(false));
        let flag: number = 0;
        for (let i = 0; i < pricingPlan.length; i++) {
            const element = pricingPlan[i];
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
            if (
                !element.sponsor_id ||
                !element.program_id
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
            return false;
        } else {
            dispatch(setSaveable(true));
            return true;
        }
    };

    React.useEffect(() => {
        if (
            pricingPlanReturnVal?.status !== "NO_RECORDS_FOUND" &&
            isSuccessSave
        ) {
            toast.success("Save successful!");
            dispatch(setPublishable(true));
        } else {
            if (pricingPlanReturnVal) {
                toast.warning(pricingPlanReturnVal.status);
            }
        }
    }, [pricingPlanReturnVal, isSuccessSave]);

    return (
        <Box sx={{ width: "100%", overflow: "auto", position: "relative" }}>
            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    mb: 4,
                    justifyContent: "center",
                }}
            >
                <Button
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <ArrowBackIosNewIcon />
                </Button>
                <Box fontSize={"2rem"}>Add New Price Plans</Box>
            </Box>

            <TableContainer
                component={Card}
                elevation={4}
                sx={{ py: 4, position: "relative" }}
            >
                {isProgramsLoading ||
                isSponsorsLoading ||
                isLoading ||
                savePriceReqLoading ? (
                    <SpinnerLoader />
                ) : null}

                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell> Plan Name</TableCell>
                            <TableCell> Term</TableCell>
                            <TableCell> is Default</TableCell>
                            <TableCell> Interest Rate</TableCell>
                            <TableCell> Dealer Fee</TableCell>
                            <TableCell> Owner Buydown</TableCell>
                            <TableCell> Active Date</TableCell>
                            <TableCell> Expiry Date</TableCell>
                            <TableCell> Sponsor</TableCell>
                            <TableCell> Programs</TableCell>
                            <TableCell>
                                <IconButton
                                    size="small"
                                    sx={{ boxShadow: 1 }}
                                    color="error"
                                    onClick={() => {
                                        dispatch(clearPricingPlans());
                                    }}
                                >
                                    <RestartAltIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pricingPlan.map((item: any, index: number) => (
                            <PricePlanRow
                                key={item.identifier}
                                item={item}
                                index={index}
                                pricingPlan={pricingPlan}
                                sponsors={sponsors}
                                programs={programs}
                                setIsloading={setIsloading}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                sx={{
                    mt: 2,
                    width: "100%",
                    display: "flex",
                    justifyContent: "end",
                }}
            >
                <Button
                    sx={{ width: 180, boxShadow: 2 }}
                    color="primary"
                    onClick={addItem}
                    startIcon={<AddIcon />}
                >
                    Add more
                </Button>
            </Box>
            <Box
                sx={{
                    mt: 2,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                }}
            >
                <Button
                    disabled={!validators.isPublishable}
                    color="primary"
                    variant="contained"
                    sx={{ boxShadow: 1, px: 4, py: 1 }}
                    onClick={() => {
                        publishPricingPlan({ pricing_plan: pricingPlan });
                    }}
                >
                    Publish
                </Button>
                <Button
                    disabled={!validators.isSaveable || savePriceReqLoading}
                    variant="contained"
                    sx={{
                        boxShadow: 1,
                        px: 4,
                        py: 1,
                        backgroundColor: "#7Cba1a",
                    }}
                    onClick={() => {
                        if (validation()) {
                            savePricingPlan({ pricing_plan: pricingPlan });
                        }
                    }}
                >
                    Save
                </Button>
            </Box>
        </Box>
    );
}
