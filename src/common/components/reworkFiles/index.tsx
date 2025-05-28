import React, {FC, useState} from "react";
import {Box} from "@mui/material";
import {FileThumbnail} from "../file_thumbnail/file_thumbnail";

const ReworkFiles: FC<{
    files: Array<{
        type: string;
        url: string;
    }>
}> = ({files}) => {
    const [currentWathFile, setCurrentWatchFile] = useState<number>(-1)
    return <Box display={"flex"} alignItems={"center"} flexWrap={"wrap"} gap={2}>
        {files.map((file: any, i: number) => {
            const isOnlyImg = file?.type?.split("/")[0] === 'image'
            const isCurrentWatch = currentWathFile === i && isOnlyImg
            return <Box
                display="flex"
                justifyContent="center"
                alignItems={"center"}
                width={isCurrentWatch ? "100%" : 400}
                height={isCurrentWatch ? "100%" : 200}
                {...(isCurrentWatch ? {
                    position: "fixed",
                    top: "0px",
                    left: "0px",
                    overflow: "scroll",
                    zIndex: 3700
                } : {})}
                key={file.url}
                onClick={() => {
                    if (isOnlyImg) {
                        setCurrentWatchFile(isCurrentWatch ? -1 : i)
                    }
                }}
                sx={{
                    cursor: "pointer",
                    border: "0.5px solid #f0f0f0",
                    borderRadius: "4px",
                    background: isCurrentWatch ? "black" : "initial"
                }}

            >
                <FileThumbnail
                    type={file.type}
                    url={'http://188.68.220.210/api/file/'  + file.url}
                    imgWidth={"auto"}
                    imgHeight={isCurrentWatch ? "auto" : "100%"}
                    videoHeight={451}
                    videoWidth={800}
                    pdfWidth={800}
                    pdfHeight={451}
                    mswordWidth={800}
                    mswordHeight={451}
                />
            </Box>
        })}

    </Box>
}
export default ReworkFiles;