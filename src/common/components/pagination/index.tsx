import React, {ChangeEvent, FC} from 'react';
import {  Pagination } from "@mui/material";
import "./style.pagination.scss"
type PaginationProps = {
    count: number,
    handleChange: (event: ChangeEvent<unknown>, page: number) => void,
}
const PaginationComponent: FC<PaginationProps> = ({count, handleChange}) => {
    return  <div className="pagination">
                <Pagination
                    count={(Math.ceil(count / 10))}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChange}
                    size='large'
                    color="primary"
                    boundaryCount={10}
                />
            </div>
};

export default PaginationComponent
