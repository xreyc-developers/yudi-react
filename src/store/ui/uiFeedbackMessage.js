import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isShow: false,
    messageContent: ''
}

const uiFeedbackMessageSlice = createSlice({
    name: 'uiFeedbackMessage',
    initialState,
    reducers: {
        showFeedbackMessage: (state, action) => {
            state.isShow = true;
            state.messageContent = action.payload;
        },
        hideFeedbackMessage: (state) => {
            state.isShow = false;
            state.messageContent = '';
        }
    }
});

export const { showFeedbackMessage, hideFeedbackMessage } = uiFeedbackMessageSlice.actions;
export default uiFeedbackMessageSlice.reducer;