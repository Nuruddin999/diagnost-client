import {applicationItemResponse, consiliumDoctor} from '../sagas/application';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CheckupPlanDetailType, CheckupPlanItem, ReworkCommentType} from "../common/types";
import {formatPhone} from "../common/utils";
import {initComments} from '../common/constants';


export type applicationInitialState = {
    id: number,
    name: string,
    patientRequest: string,
    patientPromoter: string,
    fundName: string,
    manager: string,
    managerId: string,
    managerSpeciality: string,
    managerSignUrlPath: string,
    creationDate: string,
    execDate: string,
    passToCoordinatorTime:string,
    checkUpPlaceIsDeleted: boolean,
    consiliumDoctors: Array<consiliumDoctor>,
    diagnostic: Array<{
        id?: number,
        diagnosis: string,
    }>,
    anamnesis: string,
    complaint: string,
    patientName: string,
    diagnosticData: string,
    patientBirthDate: string,
    mostProblDiagnosis: string,
    secondaryDiagnosis: string,
    checkupPlans: Array<CheckupPlanItem>,
    comments: Array<{
        title?: string,
        comment: string,
    }>,
    status?: string,
    reworkComments:ReworkCommentType
}

export const initialState: applicationInitialState = {
    id: 0,
    name: '',
    managerId:'',
    patientRequest: '',
    patientPromoter: '',
    fundName: '',
    manager: '',
    managerSpeciality: '',
    managerSignUrlPath: '',
    creationDate: '',
    execDate: '',
    anamnesis: '',
    complaint: '',
    patientBirthDate: '',
    patientName: '',
    diagnosticData: '',
    passToCoordinatorTime:'',
    checkUpPlaceIsDeleted: false,
    consiliumDoctors: [],
    diagnostic: [],
    mostProblDiagnosis: '',
    secondaryDiagnosis: '',
    checkupPlans: [],
    comments: initComments,
    status: 'no',
    reworkComments: []
};


export const applicationItemSlice = createSlice({
    name: 'applicationItem',
    initialState,
    reducers: {
        saveApplicationItem: (state, action: PayloadAction<applicationItemResponse>) => {
            state.id = action.payload.id
            state.managerId=action.payload.managerId
            state.consiliumDoctors = action.payload.ConsiliumDoctors
            state.diagnostic = action.payload.Diagnostics
            state.mostProblDiagnosis = action.payload.mostProblDiagnosis
            state.secondaryDiagnosis = action.payload.secondaryDiagnosis
            state.checkupPlans = action.payload.CheckupPlans.map(el => ({...el, phone: formatPhone(el.phone || '')}))
            state.anamnesis = action.payload.anamnesis
            state.complaint = action.payload.complaint
            state.patientName = action.payload.patientName
            state.patientPromoter = action.payload.patientPromoter
            state.patientBirthDate = action.payload.patientBirthDate
            state.comments = action.payload.Comments.length > 0 ? action.payload.Comments : state.comments
            state.execDate = action.payload.execDate
            state.manager = action.payload.manager
            state.managerSpeciality = action.payload.managerSpeciality
            state.managerSignUrlPath = action.payload.managerSignUrlPath
            state.diagnosticData = action.payload.diagnosticData
            state.checkUpPlaceIsDeleted = action.payload.checkUpPlaceIsDeleted
            state.fundName = action.payload.fundName
            state.reworkComments = action.payload.ReworkComments
            state.passToCoordinatorTime=action.payload.passToCoordinatorTime
        },
        saveConsiliumDoctors: (state, action: PayloadAction<consiliumDoctor>) => {
            state.consiliumDoctors = [...state.consiliumDoctors, {
                name: action.payload.name,
                speciality: action.payload.speciality
            }]
        },
        changeConsiliumDoctors: (state, action: PayloadAction<{ index: number, name: string, speciality: string }>) => {
            state.consiliumDoctors = state.consiliumDoctors.map((doctor, doctorIndex) => doctorIndex === action.payload.index ? {
                name: action.payload.name,
                speciality: action.payload.speciality
            } : doctor)
        },
        deleteConsiliumDoctors: (state, action: PayloadAction<number>) => {
            state.consiliumDoctors = state.consiliumDoctors.filter((doctor, index) => index !== action.payload)
        },
        saveDiagnostic: (state, action: PayloadAction<string>) => {
            state.diagnostic = [...state.diagnostic, {diagnosis: action.payload}]
        },
        changeDiagnostic: (state, action: PayloadAction<{ index: number, diagnosis: string }>) => {
            state.diagnostic = state.diagnostic.map((diagnostEl, diagnosIndex) => diagnosIndex === action.payload.index ? {diagnosis: action.payload.diagnosis} : diagnostEl)
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
        saveCheckupPlan: (state, action: PayloadAction<CheckupPlanItem>) => {
            state.checkupPlans = [...state.checkupPlans, {...action.payload}]
        },
        changeCheckupPlan: (state, action: PayloadAction<CheckupPlanDetailType>) => {
            let totalCalc: string | undefined;
            const {qty, price, totalPrice} = action.payload.checkupPlan
            if (!action.payload.isTotalPriceEdit) {
                const isValidData = qty && price && parseInt(qty) && parseInt(price)
                totalCalc = isValidData ? (parseInt(qty as string) * parseInt(price as string)).toString() : ''
            } else {
                totalCalc = totalPrice
            }
            state.checkupPlans = state.checkupPlans.map((checkupPlanEl, checkupPlanIndex) => checkupPlanIndex === action.payload.index ? {
                ...action.payload.checkupPlan,
                totalPrice: totalCalc
            } : checkupPlanEl)
        },
        deleteCheckupPlan: (state, action: PayloadAction<number>) => {
            state.checkupPlans = state.checkupPlans.filter((checkupPlan, index) => index !== action.payload)
        },
        saveComment: (state, action: PayloadAction<string>) => {
            state.comments = [...state.comments, {comment: action.payload}]
        },
        changeComment: (state, action: PayloadAction<{ title: string, comment: string }>) => {
            state.comments = state.comments.map((commentEl) => commentEl.title === action.payload.title ? {
                ...commentEl,
                comment: action.payload.comment
            } : commentEl)
        },
        deleteComment: (state, action: PayloadAction<number>) => {
            state.comments = state.comments.filter((commentElm, index) => index !== action.payload)
        },
        changeAnamnesis: (state, action: PayloadAction<string>) => {
            state.anamnesis = action.payload
        },
        changeComplaints: (state, action: PayloadAction<string>) => {
            state.complaint = action.payload
        },
        changeDiagnosticData: (state, action: PayloadAction<string>) => {
            state.diagnosticData = action.payload
        },
        changePatientName: (state, action: PayloadAction<string>) => {
            state.patientName = action.payload
        },
        changePatientPromoter: (state, action: PayloadAction<string>) => {
            state.patientPromoter = action.payload
        },
        changePatientBirthDate: (state, action: PayloadAction<string>) => {
            state.patientBirthDate = action.payload
        },
        successUpdate: (state, action: PayloadAction<string>) => {
            state.status = action.payload
        },
        saveCheckupPlanDeletedPlace: (state, action: PayloadAction<boolean>) => {
            state.checkUpPlaceIsDeleted = action.payload
        }
    },
});

export const {
    saveApplicationItem,
    saveConsiliumDoctors,
    changePatientPromoter,
    deleteConsiliumDoctors,
    saveDiagnostic,
    changeDiagnostic,
    deleteDiagnostic,
    changeMostProblDiagnosis,
    changeSecondaryDiagnosis,
    saveCheckupPlan,
    changeCheckupPlan,
    deleteCheckupPlan,
    changeComment,
    changeAnamnesis,
    changeComplaints,
    changeDiagnosticData,
    changePatientBirthDate,
    changePatientName,
    successUpdate,
    saveCheckupPlanDeletedPlace
} = applicationItemSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export default applicationItemSlice.reducer;
