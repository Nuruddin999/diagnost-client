export type CheckupPlanDetailType = {
    index: number, checkupPlan: {
        kind?: string,
        place?: string,
        target?: string,
        supplier?: string,
        address?:string,
        phone?:string,
        price?:string
    }
}