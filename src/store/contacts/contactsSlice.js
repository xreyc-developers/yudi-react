import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contacts: [],
    activeContact: {
        uid: '',
        fullname: '',
        character_code: ''
    }
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts: (state, action) => {
            state.contacts = action.payload;
        },
        setActiveContact: (state, action) => {
            state.activeContact.uid = action.payload.uid;
            state.activeContact.fullname = action.payload.fullname;
            state.activeContact.character_code = action.payload.character_code;
        }
    }
});

export const { setContacts, setActiveContact } = contactsSlice.actions;
export default contactsSlice.reducer;