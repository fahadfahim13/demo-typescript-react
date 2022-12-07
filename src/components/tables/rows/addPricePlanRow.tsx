import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TextField } from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";
import BasicSelect from "../../common/basicSelect";
import { addPricingPlan, deletePricingPlan } from "../../../features/PricingPlans";
import { Program } from "../../../features/Programs/types";
import { useGetFinancingProductIdMutation } from "../../../features/PricingPlans/api";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import { setFinValidation } from "../../../features/publishController";

export default function PricePlanRow(props: {
    item: any;
    index: number;
    pricingPlan: any;
    sponsors: any;
    programs: any;
    setIsloading: any;
}) {
    const dispatch = useAppDispatch();
    const { item, index, pricingPlan, sponsors, programs, setIsloading } =
        props;

    const [getFinanceId, { data: financeIdReturnVal, isSuccess, isLoading }] =
        useGetFinancingProductIdMutation();

    React.useEffect(() => {
        if (item.sponsor_id && item.program_id) {
            setIsloading(true);
            getFinanceId({
                program_id: item.program_id,
                sponsor_id: item.sponsor_id,
            });
        }
    }, [item.sponsor_id, item.program_id]);

    React.useEffect(() => {
        if (!isLoading && isSuccess && financeIdReturnVal) {
            setIsloading(false);
            if (financeIdReturnVal.isSuccess) {
                dispatch(
                    addPricingPlan({
                        idx: index,
                        key: "financing_product_id",
                        value: financeIdReturnVal.data?.id,
                    })
                );
                dispatch(setFinValidation(true));
            } else {
                dispatch(setFinValidation(false));
            }
        }
    }, [isSuccess, isLoading, financeIdReturnVal]);

    return (
        <TableRow
            key={item.identifier}
            sx={{
                "&:last-child td, &:last-child th": {
                    border: 0,
                },
            }}
        >
            <TableCell>
                <TextField
                    sx={{ width: 200 }}
                    onChange={(e) => {
                        // dispatch(
                        //     addPricingPlan({
                        //         idx: index,
                        //         key: "name",
                        //         value: e.target.value,
                        //     })
                        // );
                    }}
                    value={item.name}
                    error={item.name === ""}
                />
            </TableCell>
            <TableCell>
                <TextField
                    sx={{ width: 90 }}
                    error={item.term_years === ""}
                    onChange={(e) => {
                        dispatch(
                            addPricingPlan({
                                idx: index,
                                key: "term_years",
                                value: e.target.value,
                            })
                        );
                    }}
                    value={item.term_years}
                />
            </TableCell>
            <TableCell>
                <BasicSelect
                    error={
                        item.is_default !== "false" &&
                        item.is_default !== "true"
                    }
                    label="Is default"
                    value={item.is_default}
                    values={[
                        { value: "true", name: "True" },
                        { value: "false", name: "False" },
                    ]}
                    setValue={(e: any) => {
                        dispatch(
                            addPricingPlan({
                                idx: index,
                                key: "is_default",
                                value: e.target.value,
                            })
                        );
                    }}
                />
            </TableCell>
            <TableCell>
                <TextField
                    sx={{ width: 90 }}
                    error={item.interest_rate === ""}
                    onChange={(e: any) => {
                        dispatch(
                            addPricingPlan({
                                idx: index,
                                key: "interest_rate",
                                value: e.target.value,
                            })
                        );
                    }}
                    value={item.interest_rate}
                />
            </TableCell>
            <TableCell>
                <TextField
                    sx={{ width: 90 }}
                    error={item.dealer_fee === ""}
                    onChange={(e: any) => {
                        dispatch(
                            addPricingPlan({
                                idx: index,
                                key: "dealer_fee",
                                value: e.target.value,
                            })
                        );
                    }}
                    value={item.dealer_fee}
                />
            </TableCell>
            <TableCell>
                <TextField
                    sx={{ width: 90 }}
                    onChange={(e: any) => {
                        dispatch(
                            addPricingPlan({
                                idx: index,
                                key: "owner_buydown",
                                value: e.target.value,
                            })
                        );
                    }}
                    error={item.owner_buydown === ""}
                    value={item.owner_buydown}
                />
            </TableCell>
            <TableCell>
                <DesktopDatePicker
                    label=""
                    inputFormat="DD MMM YYYY"
                    value={item.expires_at}
                    onChange={(e: any) => {
                        dispatch(
                            addPricingPlan({
                                idx: index,
                                key: "expires_at",
                                value: format(new Date(e), "dd MMM Y"),
                            })
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            sx={{
                                width: "100%",
                            }}
                            {...params}
                        />
                    )}
                />
            </TableCell>
            <TableCell>
                <DesktopDatePicker
                    label=""
                    inputFormat="DD MMM YYYY"
                    value={item.active_at}
                    onChange={(e: any) => {
                        dispatch(
                            addPricingPlan({
                                idx: index,
                                key: "active_at",
                                value: format(new Date(e), "dd MMM Y"),
                            })
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            sx={{
                                width: "100%",
                            }}
                            {...params}
                        />
                    )}
                />
            </TableCell>
            <TableCell>
                <BasicSelect
                    label="Sponsor"
                    error={financeIdReturnVal?.isFailure}
                    value={pricingPlan[index].sponsor_id}
                    values={
                        sponsors && sponsors.data
                            ? sponsors.data.map((p: Program) => ({
                                  value: p.id,
                                  name: p.identifier,
                              }))
                            : []
                    }
                    setValue={(e: any) => {
                        dispatch(
                            addPricingPlan({
                                idx: index,
                                key: "sponsor_id",
                                value: e.target.value,
                            })
                        );
                    }}
                />
            </TableCell>
            <TableCell>
                <BasicSelect
                    label="Program"
                    value={pricingPlan[index].program_id}
                    values={
                        programs && programs?.data
                            ? programs?.data.map((p: Program) => ({
                                  value: p.id,
                                  name: p.identifier,
                              }))
                            : []
                    }
                    error={financeIdReturnVal?.isFailure}
                    setValue={(e: any) => {
                        dispatch(
                            addPricingPlan({
                                idx: index,
                                key: "program_id",
                                value: e.target.value,
                            })
                        );
                    }}
                />
            </TableCell>
            <TableCell>
                <IconButton
                    disabled={pricingPlan.length === 1}
                    size="small"
                    sx={{ boxShadow: 1 }}
                    color="error"
                    onClick={() => {
                        dispatch(
                            deletePricingPlan({
                                idx: index,
                            })
                        );
                    }}
                >
                    <RemoveIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
