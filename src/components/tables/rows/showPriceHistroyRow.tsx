/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { TextField, TableCell, TableRow } from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";
import BasicSelect from "../../common/basicSelect";
import { Program } from "../../../features/Programs/types";
import { useGetFinancingProductIdMutation } from "../../../features/PricingPlans/api";
import {
    setFinValidation,
    setHistoryPublishable,
} from "../../../features/publishController";

export default function PriceHistoryRow(props: {
    item: any;
    index: number;
    sponsors: any;
    programs: any;
    selectedRow: any;
    setSelectedRow: any;
    setIsloading: any;
}) {
    const dispatch = useAppDispatch();
    const {
        item,
        index,
        sponsors,
        programs,
        selectedRow,
        setSelectedRow,
        setIsloading,
    } = props;

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
                let tmp = selectedRow.pricing_plan.map(
                    (el: any, subIndex: number) =>
                        index === subIndex
                            ? {
                                  ...el,
                                  financing_product_id:
                                      financeIdReturnVal.data?.id,
                              }
                            : { ...el }
                );
                setSelectedRow({
                    ...selectedRow,
                    pricing_plan: [...tmp],
                });
                dispatch(setFinValidation(true));
            } else {
                dispatch(setFinValidation(false));
            }
        }
    }, [isSuccess, isLoading, financeIdReturnVal]);

    React.useEffect(() => {
        const tmp = selectedRow.pricing_plan.map((el: any, index2: number) =>
            index === index2
                ? {
                      ...el,
                      name: `${item["term_years"]}-${
                          parseFloat(item["interest_rate"])
                              .toFixed(4)
                              .toString()
                              .split(".")[1]
                      }-${
                          parseFloat(item["dealer_fee"])
                              .toFixed(4)
                              .toString()
                              .split(".")[1]
                      }-${
                          parseFloat(item["owner_buydown"])
                              .toFixed(4)
                              .toString()
                              .split(".")[1]
                      }`,
                  }
                : { ...el }
        );
        console.log(tmp);
        setSelectedRow({
            ...selectedRow,
            pricing_plan: [...tmp],
        });
    }, [
        item.dealer_fee,
        item.term_years,
        item.owner_buydown,
        item.interest_rate,
    ]);

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
                    error={item.name === ""}
                    sx={{ width: 200 }}
                    onChange={(e: any) => {
                        if (selectedRow.publishStatus === "SAVED") {
                            dispatch(setHistoryPublishable(false));
                            const tmp = selectedRow.pricing_plan.map(
                                (el: any, index2: number) =>
                                    index === index2
                                        ? {
                                              ...el,
                                              name: e.target.value,
                                          }
                                        : { ...el }
                            );
                            setSelectedRow({
                                ...selectedRow,
                                pricing_plan: [...tmp],
                            });
                        }
                    }}
                    value={item.name}
                />
            </TableCell>
            <TableCell>
                <TextField
                    error={item.term_years === ""}
                    sx={{ width: 90 }}
                    onChange={(e: any) => {
                        if (selectedRow.publishStatus === "SAVED") {
                            dispatch(setHistoryPublishable(false));
                            const tmp = selectedRow.pricing_plan.map(
                                (el: any, index2: number) =>
                                    index === index2
                                        ? {
                                              ...el,
                                              term_years: e.target.value,
                                          }
                                        : { ...el }
                            );
                            setSelectedRow({
                                ...selectedRow,
                                pricing_plan: [...tmp],
                            });
                        }
                    }}
                    value={item.term_years}
                />
            </TableCell>
            <TableCell>
                <BasicSelect
                    label="Is default"
                    value={item.is_default}
                    disabled={selectedRow.publishStatus === "PUBLISHED"}
                    values={[
                        {
                            value: "true",
                            name: "True",
                        },
                        {
                            value: "false",
                            name: "False",
                        },
                    ]}
                    setValue={(e: any) => {
                        dispatch(setHistoryPublishable(false));
                        const tmp = selectedRow.pricing_plan.map(
                            (el: any, index2: number) =>
                                index === index2
                                    ? {
                                          ...el,
                                          is_default: e.target.value,
                                      }
                                    : { ...el }
                        );
                        setSelectedRow({
                            ...selectedRow,
                            pricing_plan: [...tmp],
                        });
                    }}
                />
            </TableCell>
            <TableCell>
                <TextField
                    error={item.interest_rate === ""}
                    sx={{ width: 90 }}
                    onChange={(e: any) => {
                        if (selectedRow.publishStatus === "SAVED") {
                            dispatch(setHistoryPublishable(false));
                            const tmp = selectedRow.pricing_plan.map(
                                (el: any, index2: number) =>
                                    index === index2
                                        ? {
                                              ...el,
                                              interest_rate: e.target.value,
                                          }
                                        : { ...el }
                            );
                            setSelectedRow({
                                ...selectedRow,
                                pricing_plan: [...tmp],
                            });
                        }
                    }}
                    value={item.interest_rate}
                />
            </TableCell>
            <TableCell>
                <TextField
                    error={item.dealer_fee === ""}
                    sx={{ width: 90 }}
                    onChange={(e: any) => {
                        if (selectedRow.publishStatus === "SAVED") {
                            dispatch(setHistoryPublishable(false));
                            const tmp = selectedRow.pricing_plan.map(
                                (el: any, index2: number) =>
                                    index === index2
                                        ? {
                                              ...el,
                                              dealer_fee: e.target.value,
                                          }
                                        : { ...el }
                            );
                            setSelectedRow({
                                ...selectedRow,
                                pricing_plan: [...tmp],
                            });
                        }
                    }}
                    value={item.dealer_fee}
                />
            </TableCell>
            <TableCell>
                <TextField
                    error={item.owner_buydown === ""}
                    sx={{ width: 90 }}
                    onChange={(e: any) => {
                        if (selectedRow.publishStatus === "SAVED") {
                            dispatch(setHistoryPublishable(false));
                            const tmp = selectedRow.pricing_plan.map(
                                (el: any, index2: number) =>
                                    index === index2
                                        ? {
                                              ...el,
                                              owner_buydown: e.target.value,
                                          }
                                        : { ...el }
                            );
                            setSelectedRow({
                                ...selectedRow,
                                pricing_plan: [...tmp],
                            });
                        }
                    }}
                    value={item.owner_buydown}
                />
            </TableCell>
            <TableCell>
                <BasicSelect
                    disabled={selectedRow.publishStatus === "PUBLISHED"}
                    error={financeIdReturnVal?.isFailure}
                    label="Sponsor"
                    value={item.sponsor_id}
                    values={
                        sponsors && sponsors.data
                            ? sponsors.data.map((p: Program) => ({
                                  value: p.id,
                                  name: p.identifier,
                              }))
                            : []
                    }
                    setValue={(e: any) => {
                        dispatch(setHistoryPublishable(false));
                        const tmp = selectedRow.pricing_plan.map(
                            (el: any, index2: number) =>
                                index === index2
                                    ? {
                                          ...el,
                                          sponsor_id: e.target.value,
                                      }
                                    : { ...el }
                        );
                        setSelectedRow({
                            ...selectedRow,
                            pricing_plan: [...tmp],
                        });
                    }}
                />
            </TableCell>
            <TableCell>
                <BasicSelect
                    disabled={selectedRow.publishStatus === "PUBLISHED"}
                    error={financeIdReturnVal?.isFailure}
                    label="Program"
                    value={item.program_id}
                    values={
                        programs && programs?.data
                            ? programs?.data.map((p: Program) => ({
                                  value: p.id,
                                  name: p.identifier,
                              }))
                            : []
                    }
                    setValue={(e: any) => {
                        dispatch(setHistoryPublishable(false));
                        const tmp = selectedRow.pricing_plan.map(
                            (el: any, index2: number) =>
                                index === index2
                                    ? {
                                          ...el,
                                          program_id: e.target.value,
                                      }
                                    : { ...el }
                        );
                        setSelectedRow({
                            ...selectedRow,
                            pricing_plan: [...tmp],
                        });
                    }}
                />
            </TableCell>
        </TableRow>
    );
}
