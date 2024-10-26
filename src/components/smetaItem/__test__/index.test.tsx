import React from 'react'
import {render} from '@testing-library/react';
import SmetaItem from "../index";
import {useManageSmetaItem} from "../../../common/hooks/useManageSmetaItem";
import SmetaTransportCostItem from "../smeta_transport_costs";


jest.mock('../../../common/hooks/useManageSmetaItem');
jest.mock('../smeta_transport_costs', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => <div>test modal content</div>),
}));

describe('MyComponent', () => {
    beforeEach(() => {
        // Мокаем начальные данные состояния, возвращаемые из кастомного хука
        (useManageSmetaItem as jest.Mock).mockReturnValue({
            smetaItem: {
                diagnosis:'diagnosis',
                patientBirthDate:'19.06.1987',
                patientName:"nur",
                Smetasecdiags:[],
                Smetaroadcosts:[],
                Smetaroaccomodations:[],
                Smetamealcosts:[],
                Smetaplans:[],
                Smetacosts:[],
                Smetatransportcosts: [
                    {
                        transportKind: 'Автобус',
                        tripsQty: 2,
                        peopleQty: 3,
                        costPerTrip: 100,
                        totalCost: 600,
                        fromTo: "soch/adler",
                        infoSrc: 'site'
                    },
                ],
            },
            handleChangeSmetaItem: jest.fn(),
        });
        (SmetaTransportCostItem as jest.Mock).mockImplementation(() => <div>test modal content</div>);
    });
    it('renders SmetaItem and passes data to SmetaTransportCostItem',  async () => {
        render(<SmetaItem/>);
        expect(SmetaTransportCostItem).toHaveBeenCalledWith(
            expect.objectContaining({
                data: [
                    {
                        transportKind: 'Автобус',
                        tripsQty: 2,
                        peopleQty: 3,
                        costPerTrip: 100,
                        totalCost: 600,
                        fromTo: "soch/adler",
                        infoSrc: 'site'
                    },
                ],
                handleChangeSmeta: expect.any(Function),
                headers: expect.any(Array),
            }),
            {}
        );
    });
});