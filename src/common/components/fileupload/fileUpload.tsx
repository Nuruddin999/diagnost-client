import React from "react";
import {Button, IconButton, Typography} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import './style.auth.scss'
import {isEmpty} from "lodash";
import Box from "@mui/material/Box";
import {FileThumbnail} from "../file_thumbnail/file_thumbnail";
import {RemoveCircle} from "@mui/icons-material";

type FileUploadProps = {
    files: Array<File>,
    setFiles: (el: Array<File>) => void,
    isThumbnails?: boolean,
  isButton?: boolean,
}
export const FileUpload = ({files, setFiles, isThumbnails, isButton}: FileUploadProps): React.ReactElement => {
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);
    return <div className='file-upload'>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}   sx={{
          width: '80%',
          flexDirection: { xs: 'column', lg: 'row' }
        }}>{
            !isEmpty(files) && Array.from(files).map(el => {

                return  <Box sx={{position: 'relative'}}>
                    {isThumbnails &&  <Box position="relative" width={150} height={150}>
                        <FileThumbnail type={el.type} url={URL.createObjectURL(el)} />
                        <RemoveCircle sx={{position:"absolute", top:0, right:0}} color={"primary"}/>
                    </Box>}
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
          {isButton ? <Button variant={"contained"}>Добавить файлы</Button> : <PhotoCamera/>}
        </IconButton>
        <input multiple type="file" hidden ref={hiddenFileInput} onChange={(e: any) => {
          const newFiles = Array.from(e.target.files || []) as File[];
          setFiles([...files, ...newFiles]);
        }}/>
    </div>
}
