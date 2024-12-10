import React from "react";
import {Box, Typography} from "@mui/material";
import {CommonButton} from "../button";
import "./style.remobody.scss"

type DeleteModalBodyProps = {
    removeAppl: () => void;
    setDeleteModal: () => void;
    entityTitle: string;
}
const DeleteModalBody: React.FC<DeleteModalBodyProps> = ({removeAppl, setDeleteModal, entityTitle}) => {
    return <Box className='delete-modal-block'>
        <Typography variant='h5'>
            Удалить {entityTitle} ?
        </Typography>
        <div className='delete-modal-btns'>
            <CommonButton
                onClick={removeAppl}
                color='error'
                title='Да'/>
            <CommonButton
                title='Нет'
                onClick={setDeleteModal}/>
        </div>
    </Box>
}

export default DeleteModalBody