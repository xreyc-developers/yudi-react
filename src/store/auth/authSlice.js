import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uid: localStorage.getItem('auth_uid'),
    email: localStorage.getItem('auth_email'),
    fullname: localStorage.getItem('userDetails_fullname'),
    character_code: localStorage.getItem('userDetails_character_code')
}

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setAuthenticationValues: (state, action) => {
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.fullname = action.payload.fullname;
            state.character_code = action.payload.character_code;
        },
        setCharacterCode: (state, action) => {
            state.character_code = action.payload.character_code;
        },
        logoutAction: (state) => {
            localStorage.removeItem('auth_uid');
            localStorage.removeItem('auth_email');
            localStorage.removeItem('userDetails_fullname');
            localStorage.removeItem('userDetails_character_code');
            state.uid = '';
            state.email = '';
        }
    }
})

export const { setAuthenticationValues, setCharacterCode, logoutAction } = authSlice.actions;
export default authSlice.reducer;