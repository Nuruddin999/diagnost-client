import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import './style.dash.scss'
import { useDispatch, useSelector } from "react-redux";
import { getOneApplication, updateApplication } from "../../actions/application";
import ConsiliumDoctorsForm from "./consilium_doctors/consiliumDoctors";
import { Button, TextField, Typography, IconButton } from "@mui/material";
import { RootState } from "../../app/store";
import './style.applicationitem.scss'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DiagnosticForm from "./diagnostic/consiliumDoctors";
import { changeComment, changeMostProblDiagnosis, changeSecondaryDiagnosis, saveComment } from "../../reducers/applicationItemSlice";
import CheckupPlanForm from "./checkup_plans/checkupPlans";

const ApplicationItem = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>()
  const mostProblDiagnosis = useSelector((state: RootState) => state.applicationItem.mostProblDiagnosis)
  const secondaryDiagnosis = useSelector((state: RootState) => state.applicationItem.secondaryDiagnosis)
  const comments = useSelector((state: RootState) => state.applicationItem.comments)
  const [oneComment, setComment] = useState('')
  const dispatch = useDispatch()
  /**
   * Сохраняем пояснение в стэйт
   */
  const addComment = () => {
    dispatch(saveComment(oneComment))
  }
  /**
   * Обновляем заключение.
   */
  const handleClick = () => {

    dispatch(updateApplication())
  }
  useEffect(() => {
    dispatch(getOneApplication(id))
  }, [])
  console.log('render')
  return <div className="application-item">
    <h2>РЕКОМЕНДАЦИИ ВРАЧА</h2>
    <h4 className='only-for-inner-warning'>(ВНИМАНИЕ! ДОКУМЕНТ ИСКЛЮЧИТЕЛЬНО ДЛЯ ВНУТРЕННЕГО ПОЛЬЗОВАНИЯ ОРГАНИЗАЦИИ)
    </h4>
    <ConsiliumDoctorsForm />
    <DiagnosticForm />
    <div className="most-probbl-diagnosis">
      <h4>Выявлен наиболее вероятный
        основной диагноз:  </h4>
      <TextField
        fullWidth
        placeholder='Выявлен наиболее вероятный
            основной диагноз:'
        className="text"
        size='small'
        value={mostProblDiagnosis}
        onChange={(e) => dispatch(changeMostProblDiagnosis(e.target.value))}
      />
    </div>
    <div className="most-probbl-diagnosis">
      <h4>Выявлены сопутствующие
        диагнозы: </h4>
      <TextField
        fullWidth
        placeholder='Выявлены сопутствующие диагнозы:'
        className="text"
        size='small'
        multiline
        maxRows={2}
        value={secondaryDiagnosis}
        onChange={(e) => dispatch(changeSecondaryDiagnosis(e.target.value))}
      />
    </div>
    <h4>На основании проведенного консилиума рекомендован план обследования (ПО):</h4>
    <CheckupPlanForm />
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
          value={commentEl}
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
        <IconButton onClick={addComment} color='info'>
          <AddCircleIcon />
        </IconButton>
      </div>
    </div>

    <Button onClick={handleClick}>
      Обновить
    </Button>
    <a href={`http://localhost:3000/flpdf/${id}`} target='_blank' rel="noreferrer">topad</a>
  </div>
}
export default ApplicationItem