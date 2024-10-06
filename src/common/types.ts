
export type CheckupPlanItem = {
    id?: number,
    kind?: string,
    place?: string,
    target?: string,
    supplier?: string,
    address?:string,
    phone?:string,
    price?:string,
    medicine?:string,
    qty?:string,
    totalPrice?:string,
}
export type CheckupPlanDetailType = {
    index: number, checkupPlan:CheckupPlanItem
}

export type SmetaItemType = {
    applId: string
    createdAt: string
    diagnosis: string
    id: number
    patientBirthDate:string
    patientName: string
    patientPromoter:string,
    patientRequest:string,
    fundRequest:string,
    status:string,
    customer:string,
    patientPhone:string,
    updatedAt:string
}

export type SmetasResponseType = {
    count: number, rows: Array<SmetaItemType>
}