import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UiState {
    status: string,
    userItemStatus: string,
    isModalOpened: boolean,
    isManagerChangeModalOpened?: number | undefined,
    addUserStatus: string,
    isCircular: boolean,
    fileProgress: number,
    fileUploadStatus: string,
    errorMessage: string,
    isExpanded: boolean,

}

const initialState: UiState = {
    status: 'none',
    userItemStatus: 'none',
    addUserStatus: 'none',
    isModalOpened: false,
    isManagerChangeModalOpened: undefined,
    isCircular: false,
    fileProgress: 0,
    fileUploadStatus: 'none',
    errorMessage: '',
    isExpanded: true
};


export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload
        },
        setUserItemStatus: (state, action: PayloadAction<string>) => {
            state.userItemStatus = action.payload
        },
        setAddUserStatus: (state, action: PayloadAction<string>) => {
            state.addUserStatus = action.payload
        },
        openModal: (state, action: PayloadAction<boolean>) => {
            state.isModalOpened = !state.isModalOpened
        },
        openManagerChangeModal: (state, action: PayloadAction<number | undefined>) => {
            state.isManagerChangeModalOpened = action.payload
        },
        setCircular: (state, action: PayloadAction<boolean>) => {
            state.isCircular = action.payload
        },
        setProgress: (state, action: PayloadAction<number>) => {
            state.fileProgress = action.payload
        },
        setFileUploadStatus: (state, action: PayloadAction<string>) => {
            state.fileUploadStatus = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload
        },
        setExpanded: (state, action: PayloadAction<boolean>) => {
            state.isExpanded = action.payload
        },
    },
});

export const {
    setStatus,
    openModal,
    setCircular,
    setProgress,
    setFileUploadStatus,
    setError,
    setUserItemStatus,
    setAddUserStatus,
    openManagerChangeModal,
    setExpanded
} = uiSlice.actions;

export default uiSlice.reducer;
