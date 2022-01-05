import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isShow: false
}

const uiLoading = createSlice({
    name: 'uiLoading',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.isShow = true;
        },
        hideLoading: (state) => {
            state.isShow = false;
        }
    }
});

export const { showLoading, hideLoading } = uiLoading.actions;
export default uiLoading.reducer;