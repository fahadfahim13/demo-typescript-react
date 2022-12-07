import * as React from "react";
import { TextField, TableCell, TableRow } from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";
import BasicSelect from "../../common/basicSelect";
import { Program } from "../../../features/Programs/types";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import { useGetFinancingProductIdMutation } from "../../../features/PricingPlans/api";
import { setFinValidation } from "../../../features/publishController";

export default function ShowPricePlanRow(props: {
    item: any;
    index: number;
    sponsors: any;
    programs: any;
    selectedRow: any;
    setSelectedRow: any;
    setIsloading: any;
}) {
    const dispatch = useAppDispatch();
    const { item, index, sponsors, programs, selectedRow, setSelectedRow, setIsloading } =
        props;

    const [getFinanceId, { data: financeIdReturnVal, isSuccess, isLoading }] =
        useGetFinancingProductIdMutation();

    React.useEffect(() => {
        if (
            item.financing_products.sponsor_id &&
            item.financing_products.program_id
        ) {
            setIsloading(true);
            getFinanceId({
                program_id: item.financing_products.program_id,
                sponsor_id: item.financing_products.sponsor_id,
            });
        }
    }, [
        item.financing_products.sponsor_id,
        item.financing_products.program_id,
    ]);

    React.useEffect(() => {
        if (!isLoading && isSuccess && financeIdReturnVal) {
            setIsloading(false);
            if (financeIdReturnVal.isSuccess) {
                let tmp = selectedRow.financing_products_pricing_plans.map(
                    (el: any, subIndex: number) =>
                        index === subIndex
                            ? {
                                  ...el,
                                  financing_product_id: financeIdReturnVal.data?.id,
                              }
                            : { ...el }
                );
                setSelectedRow({
                    ...selectedRow,
                    financing_products_pricing_plans: [...tmp],
                });
                dispatch(setFinValidation(true));
            } else {
                dispatch(setFinValidation(false));
            }
        }
    }, [isSuccess, isLoading, financeIdReturnVal]);

    return (
        <TableRow
            key={item.id}
            sx={{
                "&:last-child td, &:last-child th": {
                    border: 0,
                },
            }}
        >
            <TableCell>
                <BasicSelect
                    error={financeIdReturnVal?.isFailure}
                    label="Sponsor"
                    value={item.financing_products.sponsor_id}
                    values={
                        sponsors && sponsors.data
                            ? sponsors.data.map((p: Program) => ({
                                  value: p.id,
                                  name: p.identifier,
                              }))
                            : []
                    }
                    setValue={(e: any) => {
                        let tmp =
                            selectedRow.financing_products_pricing_plans.map(
                                (el: any, subIndex: number) =>
                                    index === subIndex
                                        ? {
                                              ...el,
                                              financing_products: {
                                                  ...el.financing_products,
                                                  sponsor_id: e.target.value,
                                              },
                                          }
                                        : { ...el }
                            );
                        setSelectedRow({
                            ...selectedRow,
                            financing_products_pricing_plans: [...tmp],
                        });
                    }}
                />
            </TableCell>
            <TableCell>
                <BasicSelect
                    error={financeIdReturnVal?.isFailure}
                    label="Program"
                    value={item.financing_products.program_id}
                    values={
                        programs && programs?.data
                            ? programs?.data.map((p: Program) => ({
                                  value: p.id,
                                  name: p.identifier,
                              }))
                            : []
                    }
                    setValue={(e: any) => {
                        let tmp =
                            selectedRow.financing_products_pricing_plans.map(
                                (el: any, subIndex: number) =>
                                    index === subIndex
                                        ? {
                                              ...el,
                                              financing_products: {
                                                  ...el.financing_products,
                                                  program_id: e.target.value,
                                              },
                                          }
                                        : { ...el }
                            );
                        setSelectedRow({
                            ...selectedRow,
                            financing_products_pricing_plans: [...tmp],
                        });
                    }}
                />
            </TableCell>
            <TableCell>
                <BasicSelect
                    label="Is default"
                    value={item.is_default}
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
                        let tmp =
                            selectedRow.financing_products_pricing_plans.map(
                                (el: any, subIndex: number) =>
                                    index === subIndex
                                        ? {
                                              ...el,
                                              is_default: e.target.value,
                                          }
                                        : { ...el }
                            );
                        setSelectedRow({
                            ...selectedRow,
                            financing_products_pricing_plans: [...tmp],
                        });
                    }}
                />
            </TableCell>
            <TableCell>
                <DesktopDatePicker
                    label=""
                    inputFormat="DD MMM YYYY"
                    value={item.expires_at}
                    onChange={(e: any) => {
                        let tmp =
                            selectedRow.financing_products_pricing_plans.map(
                                (el: any, subIndex: number) =>
                                    index === subIndex
                                        ? {
                                              ...el,
                                              expires_at: format(
                                                  new Date(e),
                                                  "dd MMM Y"
                                              ),
                                          }
                                        : { ...el }
                            );

                        setSelectedRow({
                            ...selectedRow,
                            financing_products_pricing_plans: [...tmp],
                        });
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
                        let tmp =
                            selectedRow.financing_products_pricing_plans.map(
                                (el: any, subIndex: number) =>
                                    index === subIndex
                                        ? {
                                              ...el,
                                              active_at: format(
                                                  new Date(e),
                                                  "dd MMM Y"
                                              ),
                                          }
                                        : { ...el }
                            );

                        setSelectedRow({
                            ...selectedRow,
                            financing_products_pricing_plans: [...tmp],
                        });
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
        </TableRow>
    );
}
