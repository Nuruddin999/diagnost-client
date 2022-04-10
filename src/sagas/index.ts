import { all, takeLatest } from 'redux-saga/effects';
import { Types } from '../actions/application';
import { TYPES } from '../actions/user';
import { addApplication, fetchApplication, fetchOneApplication, updateOneApplication } from './application';
import { checkUserAuth, loginUser, logoutUser, registerUser } from './user';
export default function* runSagas(){
    yield all([
        takeLatest(TYPES.userLoginType, loginUser),
        takeLatest(TYPES.userRegisterType, registerUser),
        takeLatest(TYPES.userCheckType, checkUserAuth),
        takeLatest(TYPES.userLogOut, logoutUser),
        takeLatest(Types.applicationAdd, addApplication),
        takeLatest(Types.applicationGet, fetchApplication),
        takeLatest(Types.applicationGetOne, fetchOneApplication),
        takeLatest(Types.applicationUpdate, updateOneApplication)
    ])
}