import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { SelectedPricingPlan } from "./types";

const defaultPricingPlan: SelectedPricingPlan = {
    identifier: "",
    name: "0-0000-0000-0000",
    term_years: "0",
    is_default: "false",
    interest_rate: "0.00",
    dealer_fee: "0.00",
    owner_buydown: "0.00",
    sponsor_id: "",
    program_id: "",
    financing_product_id: "",
    expires_at: new Date().toDateString(),
    active_at: new Date().toDateString(),
};

const initialState: any = {
    pricingPlans: [defaultPricingPlan],
    selectedPlan: null,
    selectedPlanHistory: null,
};

export const pricingPlanSlice = createSlice({
    name: "pricingPlanSlice",
    initialState,
    reducers: {
        addNewPricingPlan: (state) => {
            if (state.pricingPlans.length > 0) {
                state.pricingPlans.push({
                    ...state.pricingPlans[state.pricingPlans.length - 1],
                    identifier: uuidv4(),
                });
            } else {
                state.pricingPlans.push({
                    ...defaultPricingPlan,
                    identifier: uuidv4(),
                });
            }
        },
        addPricingPlan: (
            state,
            action: PayloadAction<{
                idx: number;
                key: keyof SelectedPricingPlan;
                value: string;
            }>
        ) => {
            const { idx, key, value } = action.payload;
            state.pricingPlans[idx][key] = value;
            state.pricingPlans[idx]["name"] = `${
                state.pricingPlans[idx]["term_years"]
            }-${
                parseFloat(state.pricingPlans[idx]["interest_rate"])
                    .toFixed(4)
                    .toString()
                    .split(".")[1]
            }-${
                parseFloat(state.pricingPlans[idx]["dealer_fee"])
                    .toFixed(4)
                    .toString()
                    .split(".")[1]
            }-${
                parseFloat(state.pricingPlans[idx]["owner_buydown"])
                    .toFixed(4)
                    .toString()
                    .split(".")[1]
            }`;
        },
        deletePricingPlan: (state, action: PayloadAction<{ idx: number }>) => {
            const { idx } = action.payload;
            state.pricingPlans.splice(idx, 1);
        },
        clearPricingPlans: (state, action: PayloadAction) => {
            state.pricingPlans = [defaultPricingPlan];
        },
        setSelectedPlan: (
            state,
            action: PayloadAction<SelectedPricingPlan>
        ) => {
            state.selectedPlan = action.payload;
        },
        setSelectedPlanHistory: (state, action: PayloadAction<any>) => {
            state.selectedPlanHistory = action.payload;
        },
    },
});

export const {
    addNewPricingPlan,
    addPricingPlan,
    deletePricingPlan,
    setSelectedPlan,
    clearPricingPlans,
    setSelectedPlanHistory,
} = pricingPlanSlice.actions;
export default pricingPlanSlice.reducer;
