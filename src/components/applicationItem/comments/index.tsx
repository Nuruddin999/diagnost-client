import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {MenuItem, Select, TextField, Typography} from "@mui/material";
import { RootState } from "../../../app/store";
import { changeComment } from "../../../reducers/applicationItemSlice";
import { selectApplicationUserRights } from "../../../common/selectors/user";
import Box from "@mui/material/Box";
import PatternImg from "../../../pattern.png"
import './style.comments.scss'



/**
 * Компонент пояснений.
 * @returns {React.ReactElement}
 */
const Comments = (): React.ReactElement => {
    const comments = useSelector((state: RootState) => state.applicationItem.comments)
    const { processedRights } = useSelector((state: RootState) => selectApplicationUserRights(state))

    const dispatch = useDispatch()


    return <>
        <h4>Пояснения:</h4>
        <div className="comments-section">
            <div className='comments-where-wrapper'>
                <Typography sx={{ width: "40px" }}>1</Typography>
                {comments.map((comment, index) => index < 2 ? (
                    <Box flex={1} display={'flex'} alignItems={'center'} key={comment.title}>
                        <Box>
                            <Typography textAlign={'left'}>{comment.title}</Typography>
                        </Box>
                        <Box flex={1} maxHeight={300}>
                            <TextField
                                fullWidth
                                className="text"
                                size='small'
                                multiline
                                value={comment.comment}
                                onChange={(e) => processedRights.applications?.update && dispatch(changeComment({
                                    title: comment.title!,
                                    comment: e.target.value
                                }))}
                                margin='normal'
                                variant={'standard'}
                                sx={{ minHeight: "30px", margin: 0 }}
                            />
                        </Box>
                    </Box>) : null)}
            </div>
            <div className='comments-docs-wrapper'>
                {comments.map((comment, index) => index > 1 && index < 4 ? (
                    <Box display={'flex'} alignItems={'center'} key={comment.title} marginTop={2}>
                        {index === 2 && <Typography sx={{ width: "40px" }}>2</Typography>}
                        <Box>
                            <Typography
                                align={'left'}>{comment.title}:</Typography>
                        </Box>
                        <Box flex={1} maxHeight={300}>
                            <TextField
                                fullWidth
                                className="text"
                                size='small'
                                multiline
                                maxRows={10}
                                value={comment.comment}
                                onChange={(e) => processedRights.applications?.update && dispatch(changeComment({
                                    title: comment.title!,
                                    comment: e.target.value
                                }))}
                                margin='normal'
                                variant={'standard'}
                                sx={{ minHeight: '30px', margin: 0 }}
                            />
                        </Box>
                    </Box>) : null)}
            </div>
            <div className='comments-docs-wrapper'>
                <Box>
                    <Box display={'flex'} alignItems={'center'} width={'100%'} borderBottom={"2px solid black"}>
                        <Typography sx={{ width: "40px" }}>3</Typography>
                        <Typography
                            align={'left'}>{comments[4].title}:</Typography>
                    </Box>
                    <Box flex={1}>
                        <TextField
                            fullWidth
                            className="text"
                            size='small'
                            multiline
                            maxRows={10}
                            value={comments[4].comment}
                            onChange={(e) => processedRights.applications?.update && dispatch(changeComment({
                                title: comments[4].title!,
                                comment: e.target.value
                            }))}
                            margin='normal'
                            variant={'standard'}
                            sx={{ minHeight: '30px', maxHeight: '300px', margin: 0 }}
                        />
                    </Box>
                </Box>
            </div>
            <div className='comments-docs-wrapper'>
                {comments.map((comment, index) => index > 4 && index < 9 ? (
                    <Box key={comment.title}>
                        <Box flex={1}>
                            <Typography
                                align={'left'}>{comment.title}</Typography>
                        </Box>
                        <Box flex={1}>
                            <TextField
                                fullWidth
                                className="text"
                                size='small'
                                multiline
                                maxRows={10}
                                value={comment.comment}
                                onChange={(e) => processedRights.applications?.update && dispatch(changeComment({
                                    title: comment.title!,
                                    comment: e.target.value
                                }))}
                                margin='normal'
                                variant={'standard'}
                                sx={{ minHeight: '30px', maxHeight: '300px', margin: 0 }}
                            />
                        </Box>
                    </Box>) : null)}
            </div>
            <Box display={'flex'} alignItems={'center'} marginTop={2}>
                <Typography sx={{ width: "40px" }}>4
                </Typography>
                <Typography>Решение принято на основании:
                </Typography>
            </Box>
            <Typography align={'left'}>фото-образец:</Typography>
            <Box sx={{ width:"719px", border:"1px solid black"}}>
                <img src={PatternImg} width={719} height={248} alt={'Образец заявки'}/>
            </Box>
            <Box flex={1}>
                <TextField
                    fullWidth
                    className="text"
                    size='small'
                    multiline
                    maxRows={10}
                    value={comments[9].comment}
                    onChange={(e) => processedRights.applications?.update && dispatch(changeComment({
                        title: comments[9].title!,
                        comment: e.target.value
                    }))}
                    margin='normal'
                    variant={'standard'}
                    sx={{ minHeight: '30px', maxHeight: '300px', margin: 0 }}
                />
            </Box>
            <Box display={'flex'} alignItems={'center'} marginTop={2}>
                <Typography sx={{ width: "40px" }}>5
                </Typography>
                <Typography>Заключение: просьбу подопечного считаем
                </Typography>
                <Select
                    variant={'standard'}
                    value={comments[11].comment}
                    onChange={(e) => processedRights.applications?.update && dispatch(changeComment({
                        title: comments[11].title!,
                        comment: e.target.value
                    }))}
                    sx={{marginLeft:"8px"}}
                >
                    <MenuItem value={'обоснованной'}>обоснованной</MenuItem>
                    <MenuItem value={'необоснованной'}>необоснованной</MenuItem>
                    <MenuItem value={'частично обоснованной'}>частично обоснованной</MenuItem>
                </Select>
                <Typography marginX={2}>и
                </Typography>
                <Select
                    variant={'standard'}
                    value={comments[12].comment}
                    onChange={(e) => processedRights.applications?.update && dispatch(changeComment({
                        title: comments[12].title!,
                        comment: e.target.value
                    }))}
                >
                    <MenuItem value={'возможной для одобрения'}>возможной для одобрения</MenuItem>
                    <MenuItem value={'невозможной для одобрения'}>невозможной для одобрения</MenuItem>
                </Select>
            </Box>
        </div>
    </>
}
export default Comments