import React, {FC, useState} from "react";
import BasicModal from "../../common/components/modal/ConsiliumModal";
import {Box, TextField, Typography} from "@mui/material";
import {FileUpload} from "../../common/components/fileupload/fileUpload";
import {CommonButton as Button} from "../../common/components/button";
import UnitFake from "../unit_fake";

const ReturnToRework:FC<{}>=()=>{
    const [openOnReworkModal, setOpenOnReworkModal] = useState(false)
    const [reworkComment, setReworkComment] = useState('')
    const [files, setFiles] = useState<Array<File>>([])
    return <div>
        <UnitFake  />
        <BasicModal
            open={openOnReworkModal}
            onClose={() => setOpenOnReworkModal(false)}
            bodyStyle={{width: '60%'}}
            body={<Box>
                <Typography variant={"h4"}>
                    {`Комментарий`}
                </Typography>
                <TextField
                    multiline
                    maxRows={30}
                    value={reworkComment}
                    fullWidth={true}
                    onChange={(e) => setReworkComment(e.target.value)}
                />
                <Typography variant={"h6"} align={"left"}>
                    {`Файлы`}
                </Typography>
                <FileUpload files={files} setFiles={setFiles} isThumbnails/>
                <Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={10} mt={2}>
                    <Button title={"Отправить"} onClick={()=>{}}/>
                    <Button title={"Отмена"} onClick={() => setOpenOnReworkModal(false)} color={"error"}/>
                </Box>
            </Box>}
        />
    </div>
}

export default ReturnToRework