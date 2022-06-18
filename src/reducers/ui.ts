import {  createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UiState {
    status: string,
    isModalOpened: boolean,

}

const initialState: UiState = {
    status:'none',
    isModalOpened: false
};


export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload
        },
        openModal: (state, action: PayloadAction<boolean>) => {
            state.isModalOpened = !state.isModalOpened
        },
    },
});

export const { setStatus, openModal } = uiSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export default uiSlice.reducer;
