import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface User {
  id:number,
  phone: string;
  role: string,
  name: string,
  email: string,
  speciality: string,
  isDeletedPlace?: boolean
}
interface UserState {
  user: User,
  users: Array<User>,
  isLoading: boolean,
  reqStatus: string,
  hasSuperUser?: boolean,
  count: number
}
const initialState: UserState = {
  user: {
    id:0,
    phone: '',
    role: 'doctor',
    name: '',
    email: '',
    speciality: '',
    isDeletedPlace: false
  },
  users: [],
  isLoading: false,
  reqStatus: 'no',
  hasSuperUser: true,
  count: 0
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    saveUser: (state, action: PayloadAction<{user: User, isLoading: boolean, reqStatus: string}>) => {
      state.user = action.payload.user
      state.isLoading = action.payload.isLoading
      state.reqStatus = action.payload.reqStatus
    },
    changeLoadStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    changeReqStatus: (state, action: PayloadAction<string>) => {
      state.reqStatus = action.payload
    },
    saveSuperUser: (state, action: PayloadAction<boolean>) => {
      state.hasSuperUser = action.payload
    },
    saveUsers: (state, action: PayloadAction<{users:Array<User>, count: number}>) => {
      state.users = action.payload.users
      state.count = action.payload.count
      // state.role = action.payload.role
      // state.isLoading = action.payload.isLoading
      // state.name = action.payload.name
      // state.isDeletedPlace = action.payload.isDeletedPlace
    },

  },
});

export const { saveUser, changeReqStatus, changeLoadStatus, saveSuperUser, saveUsers } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export default userSlice.reducer;
