import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { programsApi } from "../features/Programs";
import pricingPlanReducer from "../features/PricingPlans";
import validatorReducer from "../features/publishController";
import { pricingPlanApi } from "../features/PricingPlans/api";
import { dynamoApi } from "../features/dynamoDB";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        pricingPlans: pricingPlanReducer,
        validators: validatorReducer,
        [programsApi.reducerPath]: programsApi.reducer,
        [dynamoApi.reducerPath]: dynamoApi.reducer,
        [pricingPlanApi.reducerPath]: pricingPlanApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            programsApi.middleware,
            pricingPlanApi.middleware,
            dynamoApi.middleware,
        ]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
