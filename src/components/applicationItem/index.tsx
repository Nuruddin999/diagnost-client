import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import './style.dash.scss'
import { useDispatch, useSelector } from "react-redux";
import { getOneApplication, updateApplication } from "../../actions/application";
import ConsiliumDoctorsForm from "./consilium_doctors/consiliumDoctors";
import { Button, TextField } from "@mui/material";
import { RootState } from "../../app/store";
import './style.applicationitem.scss'
import DiagnosticForm from "./diagnostic/consiliumDoctors";
import { changeMostProblDiagnosis, changeSecondaryDiagnosis } from "../../reducers/applicationItemSlice";

const ApplicationItem = (): React.ReactElement => {
    const { id } = useParams<{ id: string }>()
    const applicationItem = useSelector((state: RootState) => state.applicationItem)
    const dispatch = useDispatch()
    /**
     * Обновляем заключение.
     */
    const handleClick = () => {

        dispatch(updateApplication(applicationItem))
    }
    useEffect(() => {
        dispatch(getOneApplication(id))
    }, [])

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
                value={applicationItem.mostProblDiagnosis}
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
                value={applicationItem.secondaryDiagnosis}
                onChange={(e) => dispatch(changeSecondaryDiagnosis(e.target.value))}
            />
        </div>


        <Button onClick={handleClick}>
            Обновить
        </Button>
    </div>
}
export default ApplicationItem