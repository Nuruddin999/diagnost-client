
import { all, takeLatest } from 'redux-saga/effects';
import { Types } from '../actions/application';
import { TYPES } from '../actions/user';
import {Types as CommonTypes} from '../common/actions/common'
import {Types as SpecTypes} from '../actions/speciality'
import { fetchListItem } from '../common/sagas/common';
import {
    fetchOneApplication,
    updateOneApplication,
    changeDeleteOptionInPlan,
} from './application';
import { checkUserAuth, loginUser, logoutUser, registerUser, changeIsDeletedPlace, fetchUser, removeUser, updateUserRights, updateUserSignFile, updateUserPrimary } from './user';
import {addSpeciality, fetchSpeciality, removeSpeciality} from "./speciality";
export default function* runSagas(){
    yield all([
        takeLatest(TYPES.userLoginType, loginUser),
        takeLatest(TYPES.userRegisterType, registerUser),
        takeLatest(TYPES.userCheckType, checkUserAuth),
        takeLatest(TYPES.userLogOut, logoutUser),
        takeLatest(TYPES.changeIsDeletedPlaceType, changeIsDeletedPlace),
        takeLatest(TYPES.getByLetter, fetchUser),
        takeLatest(TYPES.userDel, removeUser),
        takeLatest(TYPES.userUpdateRights, updateUserRights),
        takeLatest(TYPES.userUpdatePrimary, updateUserPrimary),
        takeLatest(TYPES.userUpdateSignFile, updateUserSignFile),
        takeLatest(Types.applicationGetOne, fetchOneApplication),
        takeLatest(CommonTypes.getListItem, fetchListItem),
        takeLatest(Types.applicationUpdate, updateOneApplication),
        takeLatest(Types.applicationChangeDeleteOption, changeDeleteOptionInPlan),
        takeLatest(SpecTypes.specialityAdd, addSpeciality),
        takeLatest(SpecTypes.specialityGet, fetchSpeciality),
        takeLatest(SpecTypes.specialityDel, removeSpeciality),
    ])
}