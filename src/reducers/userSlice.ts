import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface User {
  id:string,
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
  useritem: User,
  isLoading: boolean,
  reqStatus: string,
  hasSuperUser?: boolean,
  count: number
}
const initialState: UserState = {
  user: {
    id:'0',
    phone: '',
    role: 'doctor',
    name: '',
    email: '',
    speciality: '',
    isDeletedPlace: false
  },
  useritem: {
    id:'0',
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
    saveUser: (state, action: PayloadAction<{id: string, email:string, phone:string, role:string, name:string, speciality:string, isDeletedPlace:boolean,  isLoading: boolean, reqStatus: string}>) => {
      const {name,phone,role,email,speciality, id, isDeletedPlace } = action.payload
      state.user = {id,phone, role, name, speciality, email, isDeletedPlace }
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
    },
    saveUserItem: (state, action: PayloadAction<{id: string, email:string, phone:string, role:string, name:string, speciality:string, isDeletedPlace:boolean,  isLoading: boolean, reqStatus: string}>) => {
      const {name,phone,role,email,speciality, id, isDeletedPlace } = action.payload
      state.useritem = {id,phone, role, name, speciality, email, isDeletedPlace }
      state.isLoading = action.payload.isLoading
      state.reqStatus = action.payload.reqStatus
    },

  },
});

export const { saveUser, changeReqStatus, changeLoadStatus, saveSuperUser, saveUsers, saveUserItem } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export default userSlice.reducer;
