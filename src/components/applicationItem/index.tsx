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
import Anamnesis from "./anamnesis";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import PatientInfo from "./patientinfo";
import MostProbDiagnosis from "./probable_diagnosis";
import Comments from "./comments";

const ApplicationItem = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>()
  const mostProblDiagnosis = useSelector((state: RootState) => state.applicationItem.mostProblDiagnosis)
  const secondaryDiagnosis = useSelector((state: RootState) => state.applicationItem.secondaryDiagnosis)
  const comments = useSelector((state: RootState) => state.applicationItem.comments)
  const [oneComment, setComment] = useState('')
  const [fio, setFIO] = useState('')
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
    <PatientInfo />
    <h3>На основании: </h3>
    <h5> (указать основания: жалобы, симптомы, синдромы подозрения врача и пр.) </h5>
    <Anamnesis />
    <ConsiliumDoctorsForm />
    <DiagnosticForm />
    <MostProbDiagnosis />
    <h4>На основании проведенного консилиума рекомендован план обследования (ПО):</h4>
    <CheckupPlanForm />
    <Comments />
    <Button onClick={handleClick}>
      Обновить
    </Button>
    <a href={`http://localhost:3000/flpdf/${id}`} target='_blank' rel="noreferrer">topad</a>
  </div>
}
export default ApplicationItem