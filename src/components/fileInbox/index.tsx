import React, {FC, useState} from "react";
import Box from "@mui/material/Box";
import {Button, IconButton, Typography} from "@mui/material";
import {isEmpty} from "lodash";
import {FileThumbnail} from "../../common/components/file_thumbnail/file_thumbnail";
import {RemoveCircle} from "@mui/icons-material";

const FileInbox: FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const hiddenFileInput = React.useRef<HTMLInputElement>(null)
  return (<Box display="flex" flexDirection="column" sx={{overflow: 'auto'}}>
    <Box sx={{height:"85vh", overflowY:"auto"}}>
    {
      !isEmpty(files) && Array.from(files).map(el => {
        
        return  <Box sx={{position: 'relative'}}>
          <Box position="relative" width={150} height={150}>
              <FileThumbnail type={el.type} url={URL.createObjectURL(el)} />
              <RemoveCircle sx={{position:"absolute", top:0, right:0}} color={"primary"}/>
          </Box>
          <Typography>
            {el.name}
          </Typography>
        </Box>
      })
    }
    </Box>
    <Box>
      <IconButton color="primary" aria-label="upload picture" onClick={(e: any) => {
        if (hiddenFileInput.current !== null) {
          hiddenFileInput.current.click();
        }
      }}>
        <Button variant={"contained"}>Добавить файлы</Button>
      </IconButton>
      <input multiple type="file" hidden ref={hiddenFileInput} onChange={(e: any) => {
        const newFiles = Array.from(e.target.files || []) as File[];
        setFiles([...files, ...newFiles]);
      }}/>
    </Box>
    <Box sx={{position:"fixed", bottom:16, display:"flex", justifyContent:"center", width:'100%'}}>
      <Button variant={"contained"} disabled={files.length === 0} sx={{width:"95%"}} fullWidth>Отправить</Button>
    </Box>
  </Box>)
}

export default FileInbox
