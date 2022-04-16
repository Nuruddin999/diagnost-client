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
  secondaryDiagnosis: string,
  checkupPlans: Array<{
    id?: number,
    kind?: string,
    place?: string,
    target?: string
  }>,
  comments: Array<string>
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
  secondaryDiagnosis: '',
  checkupPlans: [],
  comments: []
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
      state.checkupPlans = action.payload.CheckupPlans
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
    },
    saveCheckupPlan: (state, action: PayloadAction<{
      kind?: string,
      place?: string,
      target?: string
    }>) => {
      state.checkupPlans = [...state.checkupPlans, { ...action.payload }]
    },
    changeCheckupPlan: (state, action: PayloadAction<{
      index: number, checkupPlan: {
        kind?: string,
        place?: string,
        target?: string
      }
    }>) => {
      state.checkupPlans = state.checkupPlans.map((checkupPlanEl, checkupPlanIndex) => checkupPlanIndex === action.payload.index ? { ...action.payload.checkupPlan } : checkupPlanEl)
    },
    deleteCheckupPlan: (state, action: PayloadAction<number>) => {
      state.checkupPlans = state.checkupPlans.filter((checkupPlan, index) => index !== action.payload)
    },
    saveComment: (state, action: PayloadAction<string>) => {
      state.comments = [...state.comments, action.payload]
    },
    changeComment: (state, action: PayloadAction<{ index: number, comment: string }>) => {
      state.comments = state.comments.map((commentEl, commentIndex) => commentIndex === action.payload.index ? action.payload.comment : commentEl)
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter((commentElm, index) => index !== action.payload)
    },
  },
});

export const { saveApplicationItem, saveConsiliumDoctors, changeConsiliumDoctors, deleteConsiliumDoctors, saveDiagnostic, changeDiagnostic, deleteDiagnostic, changeMostProblDiagnosis, changeSecondaryDiagnosis, saveCheckupPlan, changeCheckupPlan, deleteCheckupPlan, saveComment, changeComment, deleteComment } = applicationItemSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export default applicationItemSlice.reducer;
