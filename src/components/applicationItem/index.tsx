import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import './style.dash.scss'
import { useDispatch, useSelector } from "react-redux";
import { getOneApplication, updateApplication } from "../../actions/application";
import ConsiliumDoctorsForm from "./consilium_doctors/consiliumDoctors";
import { Button } from "@mui/material";
import { RootState } from "../../app/store";
import './style.applicationitem.scss'
import DiagnosticForm from "./diagnostic/consiliumDoctors";

const ApplicationItem = (): React.ReactElement => {
    const { id } = useParams<{ id: string }>()
    const applicationItem = useSelector((state: RootState) => state.applicationItem)
    const dispatch = useDispatch()
    /**
     * Обновляем заключение.
     */
    const handleClick = () => {
        debugger
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
        <Button onClick={handleClick}>
            Обновить
        </Button>
    </div>
}
export default ApplicationItem