import React from 'react'
import {render} from '@testing-library/react';
import ReturnToRework from '../index';
import BasicModal from '../../../common/components/modal/ConsiliumModal';



jest.mock('../../../common/components/modal/ConsiliumModal',  () => ({
    __esModule: true,
    default: jest.fn(),
}));


describe('MyComponReturnToReworkent', () => {
    it('renders ReturnToRework close', async () => {
        const r = render(<ReturnToRework/>);
        expect(BasicModal).toHaveBeenCalledWith(
            expect.objectContaining({
                open: expect.any(Boolean),
                onClose: expect.any(Function),
                bodyStyle: expect.any(Object),
                body: expect.any(Object),
            }),
            expect.anything()
        );
    });
});