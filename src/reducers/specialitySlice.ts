import {createSlice, PayloadAction} from "@reduxjs/toolkit";



type specialityState = {
    specialities:Array<{ id:number, name:string }>,
    count:number
}
const initState: specialityState = {
    specialities:[],
    count:0
}
export const specialitySlice = createSlice({
    name: 'speciality',
    initialState:initState,
    reducers: {
saveSpecialities:(state, action: PayloadAction<{ specialities: Array<{ id:number, name:string }>, count: number }>) => {
    state.specialities = action.payload.specialities
    state.count = action.payload.count
},
    },
});

export const {saveSpecialities}=specialitySlice.actions;
export default specialitySlice.reducer