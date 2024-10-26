import React, {FC, useState} from "react";
import "./style.patientdoctor.scss"
import {TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";
import {CommonButton as Button} from '../../../common/components/button'

type PatientDoctorType = {
    diagnosis: string,
    patientBirthDate: string,
    patientName: string,
    smetasecdiags?: Array<{ name:string }>,
    manager?: string,
    managerSpeciality?:string,
    handleChangeSmetaItem: (field: string, payload: any) => void,
}

const PatientDoctor: FC<PatientDoctorType> = ({
                                                  patientName,
                                                  patientBirthDate,
                                                  diagnosis,
                                                  smetasecdiags = [],
                                                  handleChangeSmetaItem, manager, managerSpeciality
                                              }) => {

    const [tableDiagnosis, setTableDiagnosis] = useState('')
    const addDiagnosisToTable = () => {
        if (smetasecdiags && tableDiagnosis) {
            const hasSameName = smetasecdiags.some((obj) => obj.name === tableDiagnosis);
            const newList = !hasSameName ? [...smetasecdiags, {name:tableDiagnosis}] : smetasecdiags
            handleChangeSmetaItem('Smetasecdiags', newList)
        }
    }

    const removeDiagnosisToTable = (index: number) => {
        const newList = smetasecdiags.filter((filteredEl, fIndex) => index !== fIndex)
        handleChangeSmetaItem('Smetasecdiags', newList)
    }

    const changeDiagnosis = (index: number, val: string) => {
        const newList = smetasecdiags.map((el, elIndex) => elIndex === index ? {...el,name:val} : el)
        handleChangeSmetaItem('Smetasecdiags', newList)
    }


    return <div className={'patient-doctor-block'}>
        <div className={'patient-title'}>
            Пациент:
        </div>
        <div className={'name-manager'}>
            <div className='name-birth-section'>
                <div className='name-section'>
                    <label>Имя</label>
                    <TextField value={patientName} size={'small'}
                               onChange={(e) => handleChangeSmetaItem('patientName', e.target.value)} fullWidth/>
                </div>
                <div className={'birth'}>
                    <label>Дата рождения</label>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                        <div>
                            <DatePicker
                                mask='__.__.____'
                                value={patientBirthDate}
                                toolbarPlaceholder='19.06.87'
                                onChange={(e) => handleChangeSmetaItem('patientBirthDate', e)}
                                renderInput={(params: any) => <TextField {...params} size='small' fullWidth/>}
                                inputFormat="dd-MM-yyyy"
                            />
                        </div>
                    </LocalizationProvider>
                </div>
            </div>

            <div className='diagnosis-section'>
                <div>
                <label>Диагноз</label>
                <TextField value={diagnosis} size={'small'}
                           onChange={(e) => handleChangeSmetaItem('diagnosis', e.target.value)} fullWidth
                           multiline
                           maxRows={15}/>
                </div>
            </div>
        </div>
        <div className={'diagnosis-table'}>
            <div className={'table-section'}>
                <table>
                    <thead>
                    <tr>
                        <th>
                            №
                        </th>
                        <th>
                            Сопутствующие диагнозы
                        </th>
                        <th className={'del-btn'}>

                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {smetasecdiags.length > 0 && smetasecdiags.map((el, index) =>
                        <tr>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                <TextField size={'small'} value={el.name}
                                           onChange={(e) => changeDiagnosis(index, e.target.value)} variant={'outlined'}
                                           fullWidth
                                           sx={{
                                               "& fieldset": {border: 'none'},
                                           }}
                                />
                            </td>
                            <td>
                                <Button onClick={() => removeDiagnosisToTable(index)} title={'-'} color={'error'}/>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <table>
                <tbody>
                <tr>
                    <td className={'add-index'}>
                    </td>
                    <td>
                        <TextField size={'small'} value={tableDiagnosis}
                                   onChange={(e) => setTableDiagnosis(e.target.value)} variant={'outlined'} fullWidth
                                   placeholder={'Диагноз'}/>
                    </td>
                    <td className={'add-add-btn'}>
                        <Button onClick={addDiagnosisToTable} title={'+'}/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div className={'patient-title'}>
            Врач:
        </div>
        <div className={'manager-section'}>
            <div className={'fio-exec-date'}>
                <div className={'manager-name'}>
                    <label>Имя</label>
                    <TextField value={manager} size={'small'}
                               onChange={(e) => handleChangeSmetaItem('manager', e.target.value)} fullWidth/>
                </div>
                <div className={'birth'}>
                    <label>Дата рождения</label>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                        <div>
                            <DatePicker
                                mask='__.__.____'
                                value={patientBirthDate}
                                toolbarPlaceholder='19.06.87'
                                onChange={(e) => handleChangeSmetaItem('patientBirthDate', e)}
                                renderInput={(params: any) => <TextField {...params} size='small' fullWidth/>}
                                inputFormat="dd-MM-yyyy"
                            />
                        </div>
                    </LocalizationProvider>
                </div>
            </div>
            <div className={'manager-speciality'}>
                <div>
                <label>Специальность</label>
                <TextField value={managerSpeciality} size={'small'}
                           onChange={(e) => handleChangeSmetaItem('managerSpeciality', e.target.value)} fullWidth />
                </div>
            </div>
        </div>
    </div>
}

export default PatientDoctor