import {diagnostApi} from "./index";
import {SmetasResponseType, SmetaUpdate} from "../common/types";

/**
 * Получаем список заключений.
 * @param {number} page Страница.
 * @param {number} limit Сколько показывать.
 * @param {string} status Есть ли режим выдачи смет отправленных на проверку.
 * @returns
 */
export const getSmetasApi = async (page: number,
                                   limit: number,
                                   status?: string,
                                   patientName?: string,
                                   fundRequest?: string,
                                   patientRequest?: string,
                                   patientPromoter?: string,
                                   customer?: string
): Promise<SmetasResponseType> => {
    const response = await diagnostApi.get('/smetas', {
        headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`},
        params: {page, limit, status, patientName, patientRequest, patientPromoter, customer, fundRequest},
    })
    return response.data
}
export const makeSmetaReadyForCoordApi = async (id: string): Promise<{ success: boolean, message?: string }> => {
    const response = await diagnostApi.post('/smetas-mkrd', {
        id,
    }, {headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`},})
    return response.data
}

export const updateSmetaStatusApi = async (id: string, status: string): Promise<{
    success: boolean,
    message?: string
}> => {
    const response = await diagnostApi.post('/smetas-mvdir', {
        id,
        status
    }, {headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`},})
    return response.data
}

export const updateOneSmetaApi = async (smeta: SmetaUpdate) => {
    const response = await diagnostApi.post('/smetas-upd-f', {
        ...smeta,
    }, {headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`},})
    return response.data
}

export const deleteSmetaItemApi = async (id: string) => {
    const response = await diagnostApi.get(`/smetasdel/${id}`,
        {
            headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`},
        })
    return response.data
}

export const uploadReworkCommentFilesApi = async (reworkCommentId: string, file: File) => {
    let formData = new FormData();
    formData.append('file', file)
    formData.append('reworkCommentId', reworkCommentId)

    const response = await diagnostApi.post('/uploadrwf', formData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`,
            "Content-Type": "multipart/form-data",
        }
    })

    return response.data
}

export const uploadMultipleFilesApi = async (reworkCommentId: string, files: Array<File>) => {
    const resp = []
    for (const file of files) {
        const response = await uploadReworkCommentFilesApi(reworkCommentId, file)
        resp.push(response)
    }
    return resp
}

export const addSmetaReworkCommentApi = async (smetaId: string, comment: string) => {
    const response = await diagnostApi.post('/smetas-mkrwc', {
        comment, smetaId
    }, {headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`},})
    return response.data
}