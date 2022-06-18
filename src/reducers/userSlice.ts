import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface UserState {
  phone: string;
  role: string,
  name:string,
  email:string,
  speciality:string,
  isLoading: boolean ,
  reqStatus:string,
  hasSuperUser?: boolean
}

const initialState: UserState = {
  phone: '',
  role: 'doctor',
  name:'',
  email:'',
  speciality:'',
  isLoading:  false,
  reqStatus: 'no',
  hasSuperUser: false
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    saveUser: (state,action: PayloadAction<UserState>) => {
      state.email=action.payload.email
      state.role=action.payload.role
      state.isLoading=action.payload.isLoading
      state.name=action.payload.name
    },
    changeLoadStatus:(state,action:PayloadAction<boolean>) => {
      state.isLoading=action.payload
    },
    changeReqStatus:(state,action:PayloadAction<string>) => {
      state.reqStatus=action.payload
    },
    saveSuperUser:(state) => {
      state.hasSuperUser=true
    },

  },
});

export const { saveUser, changeReqStatus, changeLoadStatus, saveSuperUser } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export default userSlice.reducer;
