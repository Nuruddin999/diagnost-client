import { consiliumDoctor } from './../sagas/application';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { applicationItemResponse } from '../sagas/application';



export type applicationInitialState = {
    id: number,
    name: string,
    patientRequest: string,
    fundName: string,
    manager: string,
    creationDate: string,
    execDate: string,
    consiliumDoctors: Array<consiliumDoctor>,
    diagnostic: Array<{
        id?: number,
        diagnosis: string,
    }>,
    mostProblDiagnosis: string,
    secondaryDiagnosis: string
}

const initialState: applicationInitialState = {
    id: 0,
    name: '',
    patientRequest: '',
    fundName: '',
    manager: '',
    creationDate: '',
    execDate: '',
    consiliumDoctors: [],
    diagnostic: [],
    mostProblDiagnosis: '',
    secondaryDiagnosis: ''
};


export const applicationItemSlice = createSlice({
    name: 'applicationItem',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        saveApplicationItem: (state, action: PayloadAction<applicationItemResponse>) => {
            state.id = action.payload.id
            state.consiliumDoctors = action.payload.ConsiliumDoctors
            state.diagnostic = action.payload.Diagnostics
            state.mostProblDiagnosis = action.payload.mostProblDiagnosis
            state.secondaryDiagnosis = action.payload.secondaryDiagnosis
        },
        saveConsiliumDoctors: (state, action: PayloadAction<consiliumDoctor>) => {
            state.consiliumDoctors = [...state.consiliumDoctors, { name: action.payload.name, speciality: action.payload.speciality }]
        },
        changeConsiliumDoctors: (state, action: PayloadAction<{ index: number, name: string, speciality: string }>) => {
            state.consiliumDoctors = state.consiliumDoctors.map((doctor, doctorIndex) => doctorIndex === action.payload.index ? { name: action.payload.name, speciality: action.payload.speciality } : doctor)
        },
        deleteConsiliumDoctors: (state, action: PayloadAction<number>) => {
            state.consiliumDoctors = state.consiliumDoctors.filter((doctor, index) => index !== action.payload)
        },
        saveDiagnostic: (state, action: PayloadAction<string>) => {
            state.diagnostic = [...state.diagnostic, { diagnosis: action.payload }]
        },
        changeDiagnostic: (state, action: PayloadAction<{ index: number, diagnosis: string }>) => {
            state.diagnostic = state.diagnostic.map((diagnostEl, diagnosIndex) => diagnosIndex === action.payload.index ? { diagnosis: action.payload.diagnosis } : diagnostEl)
        },
        deleteDiagnostic: (state, action: PayloadAction<number>) => {
            state.diagnostic = state.diagnostic.filter((doctor, index) => index !== action.payload)
        },
        changeMostProblDiagnosis: (state, action: PayloadAction<string>) => {
            state.mostProblDiagnosis = action.payload
        },
        changeSecondaryDiagnosis: (state, action: PayloadAction<string>) => {
            state.secondaryDiagnosis = action.payload
        }
        // changeLoadStatus: (state, action: PayloadAction<boolean>) => {
        //     state.isLoading = action.payload
        // },
        // changeReqStatus: (state, action: PayloadAction<string>) => {
        //     state.reqStatus = action.payload
        // }

    },
});

export const { saveApplicationItem, saveConsiliumDoctors, changeConsiliumDoctors, deleteConsiliumDoctors, saveDiagnostic, changeDiagnostic, deleteDiagnostic, changeMostProblDiagnosis, changeSecondaryDiagnosis } = applicationItemSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export default applicationItemSlice.reducer;
