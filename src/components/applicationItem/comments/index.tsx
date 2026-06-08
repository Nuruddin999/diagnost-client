import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {MenuItem, Select, TextField, Typography} from "@mui/material";
import {RootState} from "../../../app/store";
import {changeComment} from "../../../reducers/applicationItemSlice";
import {selectApplicationUserRights} from "../../../common/selectors/user";
import Box from "@mui/material/Box";
import PatternImg from "../../../pattern.png"
import './style.comments.scss'
import {Controller, useFormContext} from "react-hook-form";


/**
 * Компонент пояснений.
 * @returns {React.ReactElement}
 */
const Comments = (): React.ReactElement => {
  const {control, getValues} = useFormContext();
  const comments = getValues("comments") as Array<{
    title?: string,
    comment: string,
  }>
  const {processedRights} = useSelector((state: RootState) => selectApplicationUserRights(state))
  
  const dispatch = useDispatch()
  
  
  
  
  return <>
    <h4>Пояснения:</h4>
    <div className="comments-section">
      <div className='comments-where-wrapper'>
        <Typography sx={{width: "40px"}}>1</Typography>
        {comments.map((comment, index) => index < 2 ? (
          <Box flex={1} display={'flex'} alignItems={'center'} key={comment.title}>
            <Box>
              <Typography textAlign={'left'}>{comment.title}</Typography>
            </Box>
            <Box flex={1} maxHeight={300}>
              <Controller
                name={`comments.${index}.comment` as any}
                control={control}
                render={({field: inputProps}) => (
                  <TextField
                    {...inputProps}
                    fullWidth
                    className="text"
                    size='small'
                    multiline
                    margin='normal'
                    variant={'standard'}
                    sx={{minHeight: "30px", margin: 0}}
                    disabled={!processedRights?.applications?.update}
                  />
                )}
              />
            </Box>
          </Box>) : null)}
      </div>
      <div className='comments-docs-wrapper'>
        {comments.map((comment, index) => {
          if (index <= 1 || index >= 4) {
            return null
          }
          return (<Box display={'flex'} alignItems={'center'} key={comment.title} marginTop={2}>
            {index === 2 && <Typography sx={{width: "40px"}}>2</Typography>}
            <Box>
              <Typography
                align={'left'}>{comment.title}:</Typography>
            </Box>
            <Box flex={1} maxHeight={300}>
              <Controller
                name={`comments.${index}.comment` as any}
                control={control}
                render={({field: inputProps}) => (
                  <TextField
                    {...inputProps}
                    fullWidth
                    className="text"
                    size='small'
                    multiline
                    margin='normal'
                    variant={'standard'}
                    sx={{minHeight: "30px", margin: 0}}
                    disabled={!processedRights?.applications?.update}
                  />
                )}
              />
            </Box>
          </Box>)
        })}
      </div>
      <div className='comments-docs-wrapper'>
        <Box>
          <Box display={'flex'} alignItems={'center'} width={'100%'} borderBottom={"2px solid black"}>
            <Typography sx={{width: "40px"}}>3</Typography>
            <Typography
              align={'left'}>{comments[4].title}:</Typography>
          </Box>
          <Box flex={1}>
            <Controller
              name={`comments.${4}.comment` as any}
              control={control}
              render={({field: inputProps}) => (
                <TextField
                  {...inputProps}
                  fullWidth
                  className="text"
                  size='small'
                  multiline
                  margin='normal'
                  variant={'standard'}
                  sx={{minHeight: "30px", margin: 0}}
                  disabled={!processedRights?.applications?.update}
                />
              )}
            />
          </Box>
        </Box>
      </div>
      <div className='comments-docs-wrapper'>
        {comments.map((comment, index) => {
          if (index <= 4 || index >= 9) return null
          return (<Box key={comment.title}>
            <Box flex={1}>
              <Typography
                align={'left'}>{comment.title}</Typography>
            </Box>
            <Box flex={1}>
              <Controller
                name={`comments.${index}.comment` as any}
                control={control}
                render={({field: inputProps}) => (
                  <TextField
                    {...inputProps}
                    fullWidth
                    className="text"
                    size='small'
                    multiline
                    margin='normal'
                    variant={'standard'}
                    sx={{minHeight: "30px", margin: 0}}
                    disabled={!processedRights?.applications?.update}
                  />
                )}
              />
            </Box>
          </Box>)
        })}
      </div>
      <Box display={'flex'} alignItems={'center'} marginTop={2}>
        <Typography sx={{width: "40px"}}>4
        </Typography>
        <Typography>Решение принято на основании:
        </Typography>
      </Box>
      <Typography align={'left'}>фото-образец:</Typography>
      <Box sx={{width: "719px", border: "1px solid black"}}>
        <img src={PatternImg} width={719} height={248} alt={'Образец заявки'}/>
      </Box>
      <Box flex={1}>
        <Controller
          name={`comments.${9}.comment` as any}
          control={control}
          render={({field: inputProps}) => (
            <TextField
              {...inputProps}
              fullWidth
              className="text"
              size='small'
              multiline
              margin='normal'
              variant={'standard'}
              sx={{minHeight: "30px", margin: 0}}
              disabled={!processedRights?.applications?.update}
            />
          )}
        />
      </Box>
      <Box display={'flex'} alignItems={'center'} marginTop={2}>
        <Typography sx={{width: "40px"}}>5
        </Typography>
        <Typography>Заключение: просьбу подопечного считаем
        </Typography>
        <Controller
          name="comments.11.comment" // Точный жесткий путь к 11-му комментарию
          control={control}
          render={({ field: inputProps }) => (
            <Select
              {...inputProps} // RHF сама передаст правильный value и onChange
              variant={'standard'}
              sx={{ marginLeft: "8px" }}
              // Защита прав: если обновлять нельзя, блокируем селект
              disabled={!processedRights.applications?.update}
            >
              <MenuItem value={'обоснованной'}>обоснованной</MenuItem>
              <MenuItem value={'необоснованной'}>необоснованной</MenuItem>
              <MenuItem value={'частично обоснованной'}>частично обоснованной</MenuItem>
            </Select>
          )}
        />
        <Typography marginX={2}>и
        </Typography>
        <Controller
          name="comments.12.comment" // Точный жесткий путь к 12-му комментарию
          control={control}
          render={({ field: inputProps }) => (
            <Select
              {...inputProps}
              variant={'standard'}
              disabled={!processedRights.applications?.update}
            >
              <MenuItem value={'возможной для одобрения'}>возможной для одобрения</MenuItem>
              <MenuItem value={'невозможной для одобрения'}>невозможной для одобрения</MenuItem>
            </Select>
          )}
        />
      </Box>
    </div>
  </>
}
export default Comments
