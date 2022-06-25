import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Typography, IconButton } from "@mui/material";
import { RootState } from "../../../app/store";
import './style.comments.scss'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { changeComment,  saveComment } from "../../../reducers/applicationItemSlice";

/**
 * Компонент пояснений.
 * @returns {React.ReactElement}
 */
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
  return <>
    <h4>Пояснения:</h4>
    <div className="comments-section">
      {comments.map((commentEl, index) => <div className='comments-section-wrapper'>
        <Typography>{index + 1}</Typography>
        <TextField
          fullWidth
          className="text"
          placeholder={commentEl.title}
          size='small'
          multiline
          maxRows={4}
          value={commentEl.comment}
          onChange={(e) => dispatch(changeComment({ index, comment: e.target.value }))}
          margin='normal'
        />
      </div>)}
    </div>
  </>
}
export default Comments