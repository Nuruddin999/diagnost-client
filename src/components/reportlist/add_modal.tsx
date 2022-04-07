import { Button, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, LocalizationProvider } from "@mui/lab"
import ruLocale from 'date-fns/locale/ru';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import './style.reportlist.scss'
import { useDispatch } from "react-redux";
import { addApplication } from "../../actions/application";
import './style.addmodal.scss'

const AddModal = ({ onClose }: { onClose: Function }): React.ReactElement => {
    const dispatch = useDispatch()
    const [applName, setApplName] = useState('')
    const [patientRequest, setPatientRequest] = useState('')
    const [fundName, setFundName] = useState('')
    const [manager, setManager] = useState('')
    const [creationDate, setValue] = useState(new Date())
    const [execDate, setExecValue] = useState(new Date())
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        dispatch(addApplication({
            name: applName,
            patientRequest,
            fundName,
            manager,
            creationDate: creationDate.toLocaleString(),
            execDate: execDate.toLocaleString()
        }))
    }
    return <div className='add-modal-container'>
        <div className="add-form-wrapper">
            <form onSubmit={handleSubmit}>
                <div className='close-ic' onClick={() => onClose(false)}>
                    <CloseIcon />
                </div>
                <div className='form'>
                    <TextField
                        placeholder='Имя'
                        size='small'
                        value={applName}
                        onChange={(event: any) => setApplName(event.target.value)}
                        required
                    />
                    <TextField
                        placeholder='Запрос пациента'
                        size='small'
                        value={patientRequest}
                        onChange={(event: any) => setPatientRequest(event.target.value)}
                        required
                    />
                    <TextField
                        placeholder='Имя фонда'
                        size='small'
                        value={fundName}
                        onChange={(event: any) => setFundName(event.target.value)}
                        required
                    />
                    <TextField
                        placeholder='Исполнитель'
                        size='small'
                        value={manager}
                        onChange={(event: any) => setManager(event.target.value)}
                        required
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                        <div>
                            <DatePicker
                                mask='__.__.____'
                                value={creationDate}
                                label='Дата создания'
                                onChange={(newValue: any) => setValue(newValue)}
                                renderInput={(params: any) => <TextField {...params} size='small' />}
                            />
                        </div>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                        <div>
                            <DatePicker
                                mask='__.__.____'
                                value={execDate}
                                label='Дата исполнения'
                                onChange={(newValue: any) => setExecValue(newValue)}
                                renderInput={(params: any) => <TextField {...params} size='small' />}
                            />
                        </div>
                    </LocalizationProvider>
                </div>
                <Button size='small' variant='contained' className='add-button' type='submit'>
                    <Typography>Добавить задание</Typography>
                </Button>
            </form>
        </div>
    </div>

}
export default AddModal