import React, {FC} from "react";
import {Box, Typography} from "@mui/material";
import ReworkFiles from "../reworkFiles";
import {ReworkCommentType} from "../../types";

const ReworkBlock: FC<{reworkComments:ReworkCommentType}> = ({reworkComments}) => {
    return <Box>
        <Typography align={'left'} variant={'h6'} borderBottom={1} marginTop={2}>Доработки</Typography>
        {reworkComments.map((commentItem, index) => (
            <Box sx={{backgroundColor: '#eaeaea', padding: '16px', marginTop: '8px', borderRadius: '8px'}}>
                <Box textAlign={'left'}>
                    <Typography marginBottom={1}>{new Date(commentItem.createdAt).toLocaleString()}</Typography>
                    <Typography sx={{background: 'white', padding: '8px', borderRadius: '8px'}} component={'span'}>
                        {commentItem.comment}
                    </Typography>
                    {commentItem.ReworkCommentFiles && commentItem.ReworkCommentFiles?.length > 0 &&
                        <Box marginTop={2}>
                        <ReworkFiles
                            files={commentItem.ReworkCommentFiles}
                        />
                        </Box>}
                </Box>
            </Box>
        ))}
    </Box>
}

export default ReworkBlock