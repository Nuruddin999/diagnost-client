import React from "react";
import {IconButton, Typography} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import './style.auth.scss'
import {isEmpty} from "lodash";
import Box from "@mui/material/Box";
import {FileThumbnail} from "../file_thumbnail/file_thumbnail";

type FileUploadProps = {
    files: Array<File>,
    setFiles: (el: Array<File>) => void,
    isThumbnails?: boolean,
}
export const FileUpload = ({files, setFiles, isThumbnails}: FileUploadProps): React.ReactElement => {
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);
    return <div className='file-upload'>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>{
            !isEmpty(files) && Array.from(files).map(el => {

                return  <Box>
                    {isThumbnails &&  <FileThumbnail type={el.type} url={URL.createObjectURL(el)} />}
                    <Typography>
                        {el.name}
                    </Typography>
                </Box>
            })
        }</Box>
        <IconButton color="primary" aria-label="upload picture" onClick={(e: any) => {
            if (hiddenFileInput.current !== null) {
                hiddenFileInput.current.click();
            }
        }}>
            <PhotoCamera/>
        </IconButton>
        <input multiple type="file" hidden ref={hiddenFileInput} onChange={(e: any) => {
            setFiles(e.target.files)
        }}/>
    </div>
}