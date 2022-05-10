import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Typography, IconButton } from "@mui/material";
import { RootState } from "../../../app/store";
import './style.comments.scss'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { changeComment,  saveComment } from "../../../reducers/applicationItemSlice";

const Comments = (): React.ReactElement => {
  const comments = useSelector((state: RootState) => state.applicationItem.comments)
  const [oneComment, setComment] = useState('')
  const dispatch = useDispatch()
  /**
   * Сохраняем пояснение в стэйт
   */
  const addComment = () => {
    dispatch(saveComment(oneComment))
  }
  console.log('commnets sec render')
  return <>
    <h4>Пояснения:</h4>
    <div className="comments-section">
      {comments.length > 0 && comments.map((commentEl, index) => <div className='comments-section-wrapper'>
        <Typography>{index + 1}</Typography>
        <TextField
          fullWidth
          className="text"
          size='small'
          multiline
          maxRows={2}
          value={commentEl.comment}
          onChange={(e) => dispatch(changeComment({ index, comment: e.target.value }))}
        />
      </div>)}
      <Typography>Добавить пояснение</Typography>
      <div className='add-in-table-comments'>
        <TextField
          fullWidth
          placeholder='Введите пояснение'
          className="text"
          size='small'
          multiline
          maxRows={2}
          value={oneComment}
          onChange={(e) => setComment(e.target.value)}
        />
        <IconButton onClick={addComment} className='add-in-table-svg'>
          <AddCircleIcon />
        </IconButton>
      </div>
    </div>
  </>
}
export default Comments