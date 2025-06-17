import {diagnostApi} from "./index";
import {UsersRecapType} from "../common/types";



export const getUsersRecapApi = async (period: string
): Promise<{users:Array<UsersRecapType>}> => {
    const response = await diagnostApi.get('/gurec', {
        headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`},
        params: {period},
    })
    return response.data
}