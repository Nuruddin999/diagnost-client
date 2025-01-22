import React from "react";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Box from "@mui/material/Box";
import ArticleIcon from '@mui/icons-material/Article';
type FileUploadProps = {
    type: string,
    url: string,
    imgWidth?: string | number,
    imgHeight?: string | number,
    videoHeight?: string | number,
    videoWidth?: string | number,
    pdfWidth?: string | number,
    pdfHeight?: string | number,
    mswordWidth?: string | number,
    mswordHeight?: string | number,

}
export const FileThumbnail = ({type, url, imgWidth,imgHeight, videoWidth,videoHeight, pdfWidth, pdfHeight, mswordWidth, mswordHeight}: FileUploadProps): React.ReactElement => {
    const isVideo = type?.split("/")[0] === 'video'
    const isImage = type?.split("/")[0] === 'image'
    const isPDF = type?.split("/")[1] === 'pdf'
    const isWord = !isVideo && !isImage && !isPDF;



    return <Box>
        {isImage && <img src={url} alt="" width={imgWidth || 100} height={imgHeight || 100} />}
        {isVideo && <video src={url} width={videoWidth || 100} height={videoHeight || 100} controls={true}/>}
        {isPDF && <Box width={pdfWidth|| 100} height={pdfHeight || 100} display={"flex"} justifyContent={"center"} alignItems={"center"}><a href={url} target={"_blank"}><PictureAsPdfIcon scale={2} fontSize={'large'}/></a></Box>}
        {isWord &&
            <Box width={mswordWidth || 100} height={mswordHeight || 100} display={"flex"} justifyContent={"center"}
                 alignItems={"center"}><a href={url} target={"_blank"}><ArticleIcon scale={2} fontSize={'large'}/></a></Box>}

    </Box>
}