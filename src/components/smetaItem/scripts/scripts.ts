const calculateQtyByCost = ({
                                val,
                                currentKeyVal
                            }: { val: string, currentKeyVal: string }, fields: Array<string>, dataObj: any) => {
    if (val.trim() === '') {
        dataObj.totalCost = ''
    } else {
        const qty = parseInt(val)
        const price = currentKeyVal === fields[0] ? fields[1] : fields[0]
        const parcedPriceField = parseInt(dataObj[price])
        dataObj.totalCost = !Number.isNaN(qty) && !Number.isNaN(parcedPriceField) ? (qty * parseInt(dataObj[price])).toString() : ''
    }
}

export const calculateRoadCost = (dataEl: any, keyVal: string, val: string) => {
    const dataObj = {
        ...dataEl,
        [keyVal]: val
    }
    if (keyVal === 'ticketQty' || keyVal === 'cost') {
        calculateQtyByCost({val, currentKeyVal: keyVal}, ['ticketQty', 'cost'], dataObj)
    }
    return dataObj
}
export const calculateLocalRoadCost = (ticketQty: string, cost: string) => {
    const qty = parseInt(ticketQty)
    const price = parseInt(cost)
    const isValidNumbers = !Number.isNaN(qty) && !Number.isNaN(price)
    return isValidNumbers ? (qty * price).toString() : ''
}

export const calculateThreeFieldsCost = (entityQty: string, cost: string, people: string) => {
    const qty = parseInt(entityQty)
    const price = parseInt(cost)
    const peopleQty = parseInt(people)
    const isValidNumbers = !Number.isNaN(qty) && !Number.isNaN(price) && !Number.isNaN(peopleQty)
    return isValidNumbers ? (qty * price * peopleQty).toString() : ''
}

const getDifferenceInDays = (outDate: Date, inDate: Date) => {
    const msInDay = 24 * 60 * 60 * 1000; // Количество миллисекунд в одном дне
    const differenceInMs = outDate.getTime() - inDate.getTime();
    return Math.floor(differenceInMs / msInDay) + 1;
}

export const calculateAccommodationCost = (dataEl: any, keyVal: string, val: string) => {
    const dataObj = {
        ...dataEl,
        [keyVal]: val
    }

    if (['inData', 'outData'].includes(keyVal)) {
        const inDate = new Date(keyVal === 'inData' ? val : dataObj.inData)
        const outDate = new Date(keyVal === 'outData' ? val : dataObj.outData)
        if (val.toString().trim() === '') {
            dataObj.totalCost = ''
        } else if (inDate.toString() === 'Invalid Date' || outDate.toString() === 'Invalid Date') {
            dataObj.totalCost = ''
        } else {
            const qty = parseInt(dataObj.peopleQty)
            const price = parseInt(dataObj.costPerDay)
            const isValidNumbers = !Number.isNaN(qty) && !Number.isNaN(price)
            const differenceInDays = getDifferenceInDays(outDate, inDate)
            dataObj.totalCost = !!(isValidNumbers && differenceInDays) ? (qty * price * differenceInDays).toString() : ''
        }
    } else if (keyVal === 'peopleQty' || keyVal === 'costPerDay') {
        calculateQtyByCost({val, currentKeyVal: keyVal}, ['peopleQty', 'costPerDay'], dataObj)
        const diffsInDays = getDifferenceInDays(new Date(dataObj.outData), new Date(dataObj.inData))
        dataObj.totalCost = dataObj.totalCost ? (dataObj.totalCost * diffsInDays).toString() : ''

    }
    return dataObj
}

export const calculateLocalAccommodationCost = ({
                                                    inData,
                                                    outData,
                                                    peopleQty,
                                                    costPerDay,
                                                }: {
    peopleQty: any,
    costPerDay: string,
    inData: string,
    outData: string
}): string => {
    const qty = parseInt(peopleQty)
    const price = parseInt(costPerDay)
    const inDate = new Date(inData)
    const outDate = new Date(outData);
    if (inDate.toString() === 'Invalid Date' || outDate.toString() === 'Invalid Date') {
        return ''
    }
    const msInDay = 24 * 60 * 60 * 1000; // Количество миллисекунд в одном дне
    const differenceInMs = outDate.getTime() - inDate.getTime();
    const differenceInDays = Math.floor(differenceInMs / msInDay) + 1;
    return !!(price && qty && differenceInDays) ? (qty * price * differenceInDays).toString() : ''
}

export const calculateMealCost = (dataEl: any, keyVal: string, val: string) => {
    const dataObj = {
        ...dataEl,
        [keyVal]: val
    }
    if (['daysQty', 'peopleQty', 'costPerDay'].includes(keyVal)) {
        if (val.trim() === '') {
            dataObj.totalCost = ''
        } else {
            dataObj.totalCost = calculateThreeFieldsCost(dataObj.daysQty, dataObj.costPerDay, dataObj.peopleQty)
        }
    }
    return dataObj
}

export const calculateMealLocalCost = ({
                                           daysQty,
                                           peopleQty,
                                           costPerDay
                                       }: { daysQty: string, costPerDay: string, peopleQty: string }) => {

    return calculateThreeFieldsCost(daysQty, costPerDay, peopleQty)
}

export const calculateTransportCost = (dataEl: any, keyVal: string, val: string) => {
    const dataObj = {
        ...dataEl,
        [keyVal]: val
    }
    if (['tripsQty', 'peopleQty', 'costPerTrip'].includes(keyVal)) {
        if (val.trim() === '') {
            dataObj.totalCost = ''
        } else {
            dataObj.totalCost = calculateThreeFieldsCost(dataObj.tripsQty, dataObj.costPerTrip, dataObj.peopleQty)
        }
    }
    return dataObj
}

export const calculateTransportLocalCost = ({
                                                tripsQty,
                                                peopleQty,
                                                costPerTrip
                                            }: { tripsQty: string, peopleQty: string, costPerTrip: string }) => {
    return calculateThreeFieldsCost(tripsQty, costPerTrip, peopleQty)
}

export const calculateMedCost = (dataEl: any, keyVal: string, val: string) => {
    const dataObj = {
        ...dataEl,
        [keyVal]: val
    }
    if (['price', 'qty'].includes(keyVal)) {
        if (val.trim() === '') {
            dataObj.totalPrice = ''
        } else {
            dataObj.totalPrice = calculateLocalRoadCost(dataObj.qty, dataObj.price)
        }
    }
    return dataObj
}

export const getAllCostsTotalSum = <T extends Record<string, any>>(data: Array<T>, key: keyof T) => {
    return data.reduce((acc, prev) => acc + parseInt(prev[key as any]), 0)
}

export const processListData = (currentChangeObj:{id: number, keyVal: string, val: string},data: any, callback:(dataEl:any,keyVal:string,val:any)=>void,calculationFields:Array<string>) => {
    let {id,keyVal,val}=currentChangeObj;
    if (['totalCost','totalPrice'].includes(keyVal)) {
        return false
    }
    if (!val.trim()) {
        val='0';
    }
    if (calculationFields.includes(keyVal)) {
        val = parseInt(val).toString()
    }
    return data.map((dataEl: any, index: number) => {
        if (id === index) {
            return callback(dataEl, keyVal, val)
        }
        return dataEl
    })
}