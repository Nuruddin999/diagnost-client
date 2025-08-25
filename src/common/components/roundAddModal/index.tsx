import {Typography} from "@mui/material";
import React, {FC} from "react";
import "./style.roundaddbtn.scss"

const RoundAddModal:FC<{onClick: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined}>=({onClick})=>{
    return         <div className={'add-appl-button'} data-testid="add-button"  onClick={onClick}><Typography
        variant={'h3'} sx={{marginBottom:"calc(50% - 22px)"}}>+</Typography></div>
}

export default RoundAddModal;