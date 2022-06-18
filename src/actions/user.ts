import { createAction } from "@reduxjs/toolkit";
export const TYPES = {
    userLoginType:'user/login',
    userRegisterType:'user/register',
    userCheckType:'user/check',
    userLogOut:'user/logout',
    userCheckIsAdmin:'user/checkIsSuperAdmn'
}
export type registeredUser = {
    email: string,
    password: string,
    name: string,
    phone: string,
    speciality: string,
    role: string
}

export const login = createAction(TYPES.userLoginType, function prepare(email: string, password: string) {
    return {
        payload: {
            email,
            password
        },
    }
})

export const registerUser = createAction(TYPES.userRegisterType, function prepare(body:registeredUser) {
    return {
        payload: {
           ...body
        },
    }
})
export const checkUser = createAction(TYPES.userCheckType)
export const logOutUser = createAction(TYPES.userLogOut)
export const checkIsSuperAdmin = createAction(TYPES.userCheckIsAdmin)