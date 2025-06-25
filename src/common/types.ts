export type CheckupPlanItem = {
    id?: number,
    kind?: string,
    place?: string,
    target?: string,
    supplier?: string,
    address?: string,
    phone?: string,
    price?: string,
    medicine?: string,
    qty?: string,
    totalPrice?: string,
}
export type CheckupPlanDetailType = {
    index: number, checkupPlan: CheckupPlanItem, isTotalPriceEdit?: boolean
}

export type SmetaItemType = {
    applId: string
    createdAt: string
    diagnosis: string
    id: number
    patientBirthDate: string
    patientName: string
    patientPromoter: string,
    patientRequest: string,
    fundRequest: string,
    status: string,
    customer: string,
    patientPhone: string,
    updatedAt: string,
    allTotalSum: string
}

type SmetaCosts = Array<{
    kind: string,
    supplier: string,
    phone: string,
    address: string,
    qty: string,
    price: string,
    totalCost: string
}>

type SmetaRoadCostItem = {
    vehicle: string,
    directionFrom: string,
    directionTo: string,
    departureDate: string,
    ticketQty: string,
    cost: string,
    totalCost: string,

}

type SmetaLists = {
    Smetacosts: Array<any>,
    Smetamealcosts: Array<any>,
    Smetaplans: Array<any>,
    Smetaroaccomodations: Array<any>,
    Smetaroadcosts: Array<any>,
    Smetasecdiags: Array<any>,
    Smetatransportcosts: Array<any>,
}

export type SmetaUpdate = Omit<SmetaItemType, "createdAt" | "updatedAt"> & SmetaLists
export type SmetasResponseType = {
    count: number, rows: Array<SmetaItemType>
}

export type ReworkCommentType = Array<{
    ReworkCommentFiles?: Array<{ type: string, url: string }>,
    comment: string,
    createdAt: string,
}>

export type UsersRecapType = {
    id: number, name: string, speciality: string, applications: number
}

export type UserItemRecapType = {
    count: number,
    period:Array<Date>,
    user: {
        name: string,
        speciality: string,
        applications: Array<{
            name: string,
            birth: string,
            createdAt: Date,
            passToCoordinatorTime: Date | null,
            duration:number,
        }>
    }
}