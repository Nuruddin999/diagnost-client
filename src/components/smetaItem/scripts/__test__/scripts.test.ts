import {
    calculateAccommodationCost,
    calculateLocalAccommodationCost,
    calculateLocalRoadCost, calculateMealCost, calculateMealLocalCost,
    calculateRoadCost
} from "../scripts";

const roadCostObj = {
    vehicle: 'taxi',
    directionTo: "sochi",
    directionFrom: "adler",
    departureDate: "24.10.2024",
    ticketQty: '2',
    cost: '',
    totalCost: '',
    infoSrc: 'site'
}
describe('RoadCost ', () => {
    it('calculateswith price', () => {
        const caclculatedObject = calculateRoadCost(roadCostObj,
            'cost', '2400'
        )
        expect(caclculatedObject).toEqual(
            expect.objectContaining({
                vehicle: 'taxi',
                directionTo: "sochi",
                directionFrom: "adler",
                departureDate: "24.10.2024",
                ticketQty: '2',
                cost: '2400',
                totalCost: '4800',
                infoSrc: 'site'
            }))
    })
    it('calculates with qty', () => {
        const caclculatedObject = calculateRoadCost({...roadCostObj, cost: '2400', ticketQty: ''},
            'ticketQty', '4'
        )
        expect(caclculatedObject).toEqual(
            expect.objectContaining({
                vehicle: 'taxi',
                directionTo: "sochi",
                directionFrom: "adler",
                departureDate: "24.10.2024",
                ticketQty: '4',
                cost: '2400',
                totalCost: '9600',
                infoSrc: 'site'
            }))
    })
    it('calculates with price undefined', () => {
        const caclculatedObject = calculateRoadCost({...roadCostObj, cost: ''},
            'ticketQty', '4'
        )
        expect(caclculatedObject).toEqual(
            expect.objectContaining({
                vehicle: 'taxi',
                directionTo: "sochi",
                directionFrom: "adler",
                departureDate: "24.10.2024",
                ticketQty: '4',
                cost: '',
                totalCost: '',
                infoSrc: 'site'
            }))
    })
    it('calculates with cost undefined', () => {
        const caclculatedObject = calculateRoadCost({...roadCostObj, cost: '2400', ticketQty: '3'},
            'cost', ''
        )
        expect(caclculatedObject).toEqual(
            expect.objectContaining({
                vehicle: 'taxi',
                directionTo: "sochi",
                directionFrom: "adler",
                departureDate: "24.10.2024",
                ticketQty: '3',
                cost: '',
                totalCost: '',
                infoSrc: 'site'
            }))
    })
    it('calculates with letters', () => {
        const caclculatedObject = calculateRoadCost({...roadCostObj, cost: '2400', ticketQty: '4'},
            'cost', 'rwerer'
        )
        expect(caclculatedObject).toEqual(
            expect.objectContaining({
                vehicle: 'taxi',
                directionTo: "sochi",
                directionFrom: "adler",
                departureDate: "24.10.2024",
                ticketQty: '4',
                cost: 'rwerer',
                totalCost: '',
                infoSrc: 'site'
            }))
    })
    it('calculates with qty letters', () => {
        const caclculatedObject = calculateRoadCost({...roadCostObj, cost: '2400', ticketQty: '4'},
            'ticketQty', 'rwerer'
        )
        expect(caclculatedObject).toEqual(
            expect.objectContaining({
                vehicle: 'taxi',
                directionTo: "sochi",
                directionFrom: "adler",
                departureDate: "24.10.2024",
                ticketQty: 'rwerer',
                cost: '2400',
                totalCost: '',
                infoSrc: 'site'
            }))
    })
})
describe('RoadCostLocal ', () => {
    it('calculateswith with price and qty', () => {
        const caclculatedObject = calculateLocalRoadCost('4',
            '2400'
        )
        expect(caclculatedObject).toBe('9600')
    })
    it('calculateswith with price and qty', () => {
        const caclculatedObject = calculateLocalRoadCost('    4       ',
            '2400'
        )
        expect(caclculatedObject).toBe('9600')
    })
    it('calculateswith qty empty', () => {
        const caclculatedObject = calculateLocalRoadCost('',
            '2400'
        )
        expect(caclculatedObject).toBe('')
    })
    it('calculateswith qty empty and spaces', () => {
        const caclculatedObject = calculateLocalRoadCost('          ',
            '2400'
        )
        expect(caclculatedObject).toBe('')
    })
    it('calculateswith qty with letters and spaces', () => {
        const caclculatedObject = calculateLocalRoadCost('    hggfhfghfg      ',
            '2400'
        )
        expect(caclculatedObject).toBe('')
    })
    it('calculateswith price empty', () => {
        const caclculatedObject = calculateLocalRoadCost('3',
            ''
        )
        expect(caclculatedObject).toBe('')
    })
    it('calculateswith price empty and spaces', () => {
        const caclculatedObject = calculateLocalRoadCost('      4  ',
            ''
        )
        expect(caclculatedObject).toBe('')
    })
    it('calculateswith price with letters and spaces', () => {
        const caclculatedObject = calculateLocalRoadCost('   2      ',
            'hggfhfghfg2400'
        )
        expect(caclculatedObject).toBe('')
    })
})
const testInDate = "Tue Oct 12 2024 17:43:20 GMT+0300 (Москва, стандартное время)"
const testOutDate = ""
const accommodationObj = {
    serviceName: "booking",
    city: "Makhachkala",
    inData: testInDate,
    outData: testOutDate,
    peopleQty: '10',
    costPerDay: '3000',
    totalCost: '',
    infoSrc: 'site',
}
describe('Accommodation calculator', () => {
    it('diffrenece in dates', () => {
        const processed = calculateAccommodationCost(accommodationObj, 'outData', "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)")
        expect(processed).toEqual(
            expect.objectContaining({
                outData: "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
            }))
    })
    it('invalid data', () => {
        const processed = calculateAccommodationCost(accommodationObj, 'outData', "  ")
        expect(processed).toEqual(
            expect.objectContaining({
                outData: "  ",
                totalCost: ""
            }))
    })
    it('invalid data inData empty', () => {
        const processed = calculateAccommodationCost({
            ...accommodationObj,
            inData: ''
        }, 'outData', "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)")
        expect(processed).toEqual(
            expect.objectContaining({
                outData: "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
                totalCost: ""
            }))
    })
    it('invalid data inData letters', () => {
        const processed = calculateAccommodationCost({
            ...accommodationObj,
            inData: 'letter'
        }, 'outData', "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)")
        expect(processed).toEqual(
            expect.objectContaining({
                outData: "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
                totalCost: ""
            }))
    })
    it('totalcost with out date ', () => {
        const processed = calculateAccommodationCost({
            ...accommodationObj,
            outData: ""
        }, 'outData', "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)")
        expect(processed).toEqual(
            expect.objectContaining({
                outData: "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
                totalCost: "510000"
            }))
    })
    it('totalcost with in date ', () => {
        const processed = calculateAccommodationCost({
            ...accommodationObj,
            inData: "",
            outData: "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)"
        }, 'inData', "Tue Oct 18 2024 17:43:20 GMT+0300 (Москва, стандартное время)")
        expect(processed).toEqual(
            expect.objectContaining({
                outData: "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
                totalCost: "330000"
            }))
    })
    it('totalcost with in peopleQty ', () => {
        const processed = calculateAccommodationCost({
            ...accommodationObj,
            inData: "Tue Oct 18 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
            outData: "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)"
        }, 'peopleQty', "5")
        expect(processed).toEqual(
            expect.objectContaining({
                outData: "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
                totalCost: "165000",
                peopleQty: '5'
            }))
    })
    it('totalcost with in cost ', () => {
        const processed = calculateAccommodationCost({
            ...accommodationObj,
            inData: "Tue Oct 18 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
            outData: "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)"
        }, 'costPerDay', "5000")
        expect(processed).toEqual(
            expect.objectContaining({
                outData: "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
                totalCost: "550000",
                costPerDay: '5000'
            }))
    })
    it('totalcost with in peopleQty empty ', () => {
        const processed = calculateAccommodationCost({
            ...accommodationObj,
            inData: "Tue Oct 18 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
            outData: "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)"
        }, 'peopleQty', "  ")
        expect(processed).toEqual(
            expect.objectContaining({
                outData: "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
                totalCost: "",
                peopleQty: '  '
            }))
    })
    it('totalcost with in cost empty', () => {
        const processed = calculateAccommodationCost({
            ...accommodationObj,
            inData: "Tue Oct 18 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
            outData: "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)"
        }, 'costPerDay', "    ")
        expect(processed).toEqual(
            expect.objectContaining({
                outData: "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
                totalCost: "",
                costPerDay: '    '
            }))
    })
})

const localTestInDate = "Tue Oct 12 2024 17:43:20 GMT+0300 (Москва, стандартное время)"
const localTestOutDate = ""

const localAccommodationObj = {
    inData: localTestInDate,
    outData: localTestOutDate,
    peopleQty: '10',
    costPerDay: '3000',
}

describe('localAccomodation', () => {
    it('invalid data', () => {
        const processed = calculateLocalAccommodationCost({...localAccommodationObj})
        expect(processed).toEqual("")
    })
    it('invalid data inData empty', () => {
        const processed = calculateLocalAccommodationCost({
            ...accommodationObj,
            outData: "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
            inData: ''
        })
        expect(processed).toEqual("")
    })
    it('invalid data inData letters', () => {
        const processed = calculateLocalAccommodationCost({
            ...localAccommodationObj,
            inData: 'letter',
            outData: "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)"
        })
        expect(processed).toEqual("")
    })
    it('totalcost with out date ', () => {
        const processed = calculateLocalAccommodationCost({
            ...localAccommodationObj,
            outData: "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)"
        })
        expect(processed).toEqual("510000")
    })
    it('totalcost with in date ', () => {
        const processed = calculateLocalAccommodationCost({
            ...localAccommodationObj,
            inData: "Tue Oct 12 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
            outData: "Tue Oct 29 2024 17:43:20 GMT+0300 (Москва, стандартное время)"
        })
        expect(processed).toEqual("540000")
    })
    it('totalcost with in peopleQty ', () => {
        const processed = calculateLocalAccommodationCost({
            ...localAccommodationObj,
            outData: "Tue Oct 29 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
            peopleQty: "7",
        })
        expect(processed).toEqual("378000")
    })
    it('totalcost with in cost ', () => {
        const processed = calculateLocalAccommodationCost({
            ...accommodationObj,
            inData: "Tue Oct 18 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
            outData: "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
            costPerDay: "1500"
        })
        expect(processed).toEqual("165000")
    })
    it('totalcost with in peopleQty empty ', () => {
        const processed = calculateLocalAccommodationCost({
            ...accommodationObj,
            inData: "Tue Oct 18 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
            outData: "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
            peopleQty: ""
        })
        expect(processed).toEqual("")
    })
    it('totalcost with in cost empty', () => {
        const processed = calculateLocalAccommodationCost({
            ...accommodationObj,
            inData: "Tue Oct 18 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
            outData: "Tue Oct 28 2024 17:43:20 GMT+0300 (Москва, стандартное время)",
            costPerDay: ""
        })
        expect(processed).toEqual("")
    })
})
describe('calculateMealCost', () => {

    it('should calculate total cost when valid numbers are provided', () => {
        const dataEl = { peopleQty: '3', costPerDay: '100', daysQty: '2', totalCost: '' };
        const keyVal = 'peopleQty';
        const val = '5';
        const result = calculateMealCost(dataEl, keyVal, val);
        expect(result.totalCost).toBe('1000');
    });

    it('should return empty totalCost when one or more fields are empty strings', () => {
        const dataEl = { peopleQty: '3', costPerDay: '', daysQty: '2', totalCost: '' };
        const keyVal = 'costPerDay';
        const val = '';
        const result = calculateMealCost(dataEl, keyVal, val);
        expect(result.totalCost).toBe('');
    });

    it('should return empty totalCost when peopleQty is NaN', () => {
        const dataEl = { peopleQty: 'NaN', costPerDay: '100', daysQty: '2', totalCost: '' };
        const keyVal = 'peopleQty';
        const val = 'NaN';
        const result = calculateMealCost(dataEl, keyVal, val);
        expect(result.totalCost).toBe('');
    });

    it('should return empty totalCost when costPerDay is NaN', () => {
        const dataEl = { peopleQty: '3', costPerDay: 'NaN', daysQty: '2', totalCost: '' };
        const keyVal = 'costPerDay';
        const val = 'NaN';
        const result = calculateMealCost(dataEl, keyVal, val);
        expect(result.totalCost).toBe('');
    });

    it('should return empty totalCost when daysQty is NaN', () => {
        const dataEl = { peopleQty: '3', costPerDay: '100', daysQty: 'NaN', totalCost: '' };
        const keyVal = 'daysQty';
        const val = 'NaN';
        const result = calculateMealCost(dataEl, keyVal, val);
        expect(result.totalCost).toBe('');
    });

    it('should calculate totalCost correctly when daysQty is updated', () => {
        const dataEl = { peopleQty: '3', costPerDay: '100', daysQty: '5', totalCost: '' };
        const keyVal = 'daysQty';
        const val = '7';
        const result = calculateMealCost(dataEl, keyVal, val);
        expect(result.totalCost).toBe('2100');
    });

    it('should handle non-integer inputs and return empty totalCost', () => {
        const dataEl = { peopleQty: 'abc', costPerDay: '100', daysQty: '2', totalCost: '' };
        const keyVal = 'peopleQty';
        const val = 'abc';
        const result = calculateMealCost(dataEl, keyVal, val);
        expect(result.totalCost).toBe('');
    });

    it('should ignore irrelevant key updates and return previous totalCost', () => {
        const dataEl = { peopleQty: '3', costPerDay: '100', daysQty: '2', totalCost: '600' };
        const keyVal = 'randomKey';
        const val = 'someVal';
        const result = calculateMealCost(dataEl, keyVal, val);
        expect(result.totalCost).toBe('600');
    });
});
describe('calculateMealLocalCost', () => {

    it('should calculate the total cost when valid numbers are provided', () => {
        const result = calculateMealLocalCost({ daysQty: '3', costPerDay: '100', peopleQty: '4' });
        expect(result).toBe('1200');
    });

    it('should return an empty string when any of the inputs is an empty string', () => {
        const result = calculateMealLocalCost({ daysQty: '', costPerDay: '100', peopleQty: '4' });
        expect(result).toBe('');
    });

    it('should return an empty string when daysQty is NaN', () => {
        const result = calculateMealLocalCost({ daysQty: 'abc', costPerDay: '100', peopleQty: '4' });
        expect(result).toBe('');
    });

    it('should return an empty string when costPerDay is NaN', () => {
        const result = calculateMealLocalCost({ daysQty: '3', costPerDay: 'abc', peopleQty: '4' });
        expect(result).toBe('');
    });

    it('should return an empty string when peopleQty is NaN', () => {
        const result = calculateMealLocalCost({ daysQty: '3', costPerDay: '100', peopleQty: 'abc' });
        expect(result).toBe('');
    });

    it('should return an empty string if any input is non-numeric', () => {
        const result = calculateMealLocalCost({ daysQty: 'NaN', costPerDay: '100', peopleQty: '4' });
        expect(result).toBe('');
    });

    it('should return an empty string when one of the inputs is missing', () => {
        const result = calculateMealLocalCost({ daysQty: '3', costPerDay: '100', peopleQty: '' });
        expect(result).toBe('');
    });

    it('should handle large numbers correctly', () => {
        const result = calculateMealLocalCost({ daysQty: '1000', costPerDay: '500', peopleQty: '5' });
        expect(result).toBe('2500000');
    });

});