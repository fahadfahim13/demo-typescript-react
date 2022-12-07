import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const dynamoApi = createApi({
    reducerPath: "dynamoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_DYNAMO_BASE_URL,
    }),
    endpoints: (builder) => ({
        savePricingPlans: builder.mutation({
            query: (data: any) => ({
                url: `pricing-plan-history`,
                body: data,
                method: "POST",
            }),
        }),
        updatePricingPlansDynamo: builder.mutation({
            query: (data: any) => ({
                url: `pricing-plan-history`,
                body: data,
                method: "PUT",
            }),
        }),
        publishPricingPlansDynamo: builder.mutation({
            query: (data: any) => ({
                url: `publish-pricing-plan`,
                body: data,
                method: "POST",
            }),
        }),
        uploadFile: builder.mutation({
            query: (data: any) => ({
                url: `file-upload`,
                body: data,
                method: "POST",
            }),
        }),
        getPricingHistory: builder.query<any, void>({
            query: () => `pricing-plan-history`,
        }),
    }),
});

export const {
    useSavePricingPlansMutation,
    useGetPricingHistoryQuery,
    useLazyGetPricingHistoryQuery,
    useUpdatePricingPlansDynamoMutation,
    usePublishPricingPlansDynamoMutation,
    useUploadFileMutation,
} = dynamoApi;
