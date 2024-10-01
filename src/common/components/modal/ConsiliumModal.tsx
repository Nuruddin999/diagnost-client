import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {ReactElement} from "react";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({open,onClose,body, className}:{open:boolean, onClose:()=>void,body:ReactElement, className?:string}) {


    return (
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={className}
                disablePortal
            >
                <Box sx={style}>
                {body}
                </Box>
            </Modal>
    );
}