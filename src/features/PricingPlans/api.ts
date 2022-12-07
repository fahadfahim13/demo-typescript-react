import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PricingPlanResponse } from "./types";

// Define a service using a base URL and expected endpoints
export const pricingPlanApi = createApi({
    reducerPath: "pricingPlanApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
    endpoints: (builder) => ({
        getAllPricingPlans: builder.query<PricingPlanResponse, void>({
            query: () => `pricing-plans/saved`,
        }),
        publishPricingPlans: builder.mutation({
            query: (data: any) => ({
                url: `add-multiple-pricing`,
                body: data,
                method: "POST",
            }),
        }),
        editPricingPlan: builder.mutation({
            query: (data: any) => ({
                url: `edit-pricing`,
                body: data,
                method: "POST",
            }),
        }),
        deletePricingPlan: builder.mutation({
            query: (data: any) => ({
                url: `pricing-plans/saved/${data.id}`,
                body: data.data,
                method: "DELETE",
            }),
        }),
        editPricingPlanHistory: builder.mutation({
            query: (data: any) => ({
                url: `pricing-plan-history`,
                body: data,
                method: "POST",
            }),
        }),
        getFinancingProductId: builder.mutation({
            query: (data: { program_id: string; sponsor_id: string }) => ({
                url: `financingProducts/withSponsorAndProgram`,
                body: data,
                method: "POST",
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAllPricingPlansQuery,
    usePublishPricingPlansMutation,
    useGetFinancingProductIdMutation,
    useEditPricingPlanMutation,
    useDeletePricingPlanMutation,
} = pricingPlanApi;
