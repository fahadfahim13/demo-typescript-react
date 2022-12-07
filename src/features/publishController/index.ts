import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = { isPublishable: false, isSaveable: false, financialValidation:false, isHistoryPublishable:true, touched:false };

export const validatorSlice = createSlice({
    name: "validatorSlice",
    initialState,
    reducers: {
        setTouched: (state, action: PayloadAction<boolean>) => {
            state.touched = action.payload;
        },
        setHistoryPublishable: (state, action: PayloadAction<boolean>) => {
            state.isHistoryPublishable = action.payload;
        },
        setPublishable: (state, action: PayloadAction<boolean>) => {
            state.isPublishable = action.payload;
        },
        setSaveable: (state, action: PayloadAction<boolean>) => {
            state.isSaveable = action.payload;
        },
        setFinValidation: (state, action: PayloadAction<boolean>) => {
            state.financialValidation = action.payload;
        },
    },
});

export const { setPublishable, setSaveable, setFinValidation, setHistoryPublishable, setTouched } = validatorSlice.actions;
export default validatorSlice.reducer;
