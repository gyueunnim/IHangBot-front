import { configureStore, createSlice } from "@reduxjs/toolkit";

const loginInitialState = {
    id: '',
    login: false,
};

const loginState = createSlice({
    name: 'loginState',
    initialState: loginInitialState,
    reducers: {
        setLoginState(state, action) {
            state.id = action.payload;
            state.login = true;
        },
    },
});

export default configureStore({
    reducer: {
        loginState: loginState.reducer,
    },
});

export const { setLoginState } = loginState.actions;