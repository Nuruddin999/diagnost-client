import React from "react";
import ruLocale from 'date-fns/locale/ru';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {TextField, Typography} from "@mui/material";
import './style.patientinfo.scss'
import {DatePicker, LocalizationProvider} from "@mui/lab";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {changePatientBirthDate, changePatientName, changePatientPromoter} from "../../../reducers/applicationItemSlice";
import {selectApplicationUserRights} from "../../../common/selectors/user";

const PatientInfo = (): React.ReactElement => {
    const {patientBirthDate, patientName, patientPromoter} = useSelector((state: RootState) => state.applicationItem)
    const {applications} = useSelector((state: RootState) => selectApplicationUserRights(state)).processedRights
    const dispatch = useDispatch()
    return <div>
        <div className="patient-info">
            <TextField
                placeholder='Исаев Гитинамагомед Магомедович'
                size='small'
                value={patientName}
                fullWidth
                onChange={(e) => applications?.update && dispatch(changePatientName(e.target.value))}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                <div>
                    <DatePicker
                        mask='__.__.____'
                        value={patientBirthDate}
                        toolbarPlaceholder='19.06.87'
                        label='Дата рождения'
                        onChange={(newValue: any) => applications?.update && dispatch(changePatientBirthDate(newValue))}
                        renderInput={(params: any) => <TextField {...params} size='small'/>}
                        inputFormat="dd-MM-yyyy"
                    />
                </div>
            </LocalizationProvider>
        </div>
        <div>
            <Typography>Представитель пациента</Typography>
            <TextField
                placeholder='Представитель пациента'
                size='small'
                value={patientPromoter}
                onChange={(e) => applications?.update && dispatch(changePatientPromoter(e.target.value))}
            />
        </div>
    </div>
}
export default PatientInfo