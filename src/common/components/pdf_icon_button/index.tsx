import React from "react";
import './style.pdfbutton.scss'
import { IconButton } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export const PDFButton = ({ url }: { url: string }): React.ReactElement => {
    return <a href={url} target='_blank' rel="noreferrer"><IconButton size='medium' className='pdf-btn'>
        <PictureAsPdfIcon className='only-for-inner-warning' />
    </IconButton></a>
} 