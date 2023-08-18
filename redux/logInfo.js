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
        setLogoutState(state, action) {
            state.id = '';
            state.login = false;
        },
    },
});

export default configureStore({
    reducer: {
        loginState: loginState.reducer,
    },
});

export const { setLoginState, setLogoutState } = loginState.actions;