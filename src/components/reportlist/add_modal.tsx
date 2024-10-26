import {Button, Typography, TextField, CircularProgress,} from "@mui/material";
import React, {useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import {DatePicker, LocalizationProvider} from "@mui/lab"
import ruLocale from 'date-fns/locale/ru';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import './style.reportlist.scss'
import {useDispatch, useSelector} from "react-redux";
import './style.addmodal.scss'
import {openModal} from "../../reducers/ui";
import {Loader} from "../loader/loader";
import {RootState} from "../../app/store";
import UsersDropDown from "../usersdropdown/usersdropdown";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import {addApplicationApi} from "../../api/application";


const AddModal = ({fetchApp}: { fetchApp: (page: number, limit: number, manager: string, patientName: string, patientRequest: string, fundName: string, fundRequest: string) => Promise<void> }): React.ReactElement => {
    const status = useSelector((state: RootState) => state.ui.status)
    const {id, role, name, speciality: userSpeciality} = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch()
    const [patientName, setPatientFIO] = useState('')
    const [open, setOpen] = useState(false)
    const [patientBirthDate, setBirthDate] = useState(new Date())
    const [patientRequest, setPatientRequest] = useState('')
    const [patientPromoter, setPatientPromoter] = useState('')
    const [fundName, setFundName] = useState('')
    const [fundRequest, setFundRequest] = useState('')
    const [manager, setManager] = useState({
        name: '',
        id: ''
    })
    const [speciality, setSpeciality] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const createApplication = async () => {
        setIsLoading(true)
        try {
            await addApplicationApi({
                patientName,
                patientBirthDate: patientBirthDate.toString(),
                patientRequest,
                patientPromoter,
                fundName,
                fundRequest,
                manager: role === 'doctor' ? name : manager.name,
                managerSpeciality: role === 'doctor' ? userSpeciality : speciality,
                managerId: role === 'doctor' ? id : manager.id,
                creationDate: new Date().toString(),
                execDate: '',
                creator: id
            })
            await fetchApp(1, 10, '', '', '', '', '')
        } catch (e) {

        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        await createApplication()
        setPatientFIO('')
        setPatientRequest('')
        setFundName('')
        setFundRequest('')
        setManager(() => ({name: '', id: ''}))
        setSpeciality('')
        dispatch(openModal(false))
    }
    return <div className='add-modal-container'>
        <div className="add-form-wrapper">
            {!isLoading ? <form onSubmit={handleSubmit} data-testid='addrequest-form'>
                <div className='close-ic' onClick={() => dispatch(openModal(false))}>
                    <CloseIcon/>
                </div>
                <div className='form'>
                    <TextField
                        placeholder='ФИО пациента'
                        size='small'
                        value={patientName}
                        onChange={(event: any) => setPatientFIO(event.target.value)}
                        required
                    />
                    <TextField
                        placeholder='Представитель  пациента'
                        size='small'
                        value={patientPromoter}
                        onChange={(event: any) => setPatientPromoter(event.target.value)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                        <div>
                            <DatePicker
                                mask='__.__.____'
                                value={patientBirthDate}
                                label='Дата рождения'
                                onChange={(newValue: any) => setBirthDate(newValue)}
                                renderInput={(params: any) => <TextField {...params} size='small'/>}
                            />
                        </div>
                    </LocalizationProvider>
                    <TextField
                        placeholder='Запрос пациента'
                        size='small'
                        value={patientRequest}
                        onChange={(event: any) => setPatientRequest(event.target.value)}
                        required
                    />
                    <TextField
                        placeholder='Название фонда'
                        size='small'
                        value={fundName}
                        onChange={(event: any) => setFundName(event.target.value)}
                        required
                    />
                    <TextField
                        placeholder='Запрос фонда'
                        size='small'
                        value={fundRequest}
                        onChange={(event: any) => setFundRequest(event.target.value)}
                        required
                    />
                    {role !== 'doctor' && <div className="manager-field" aria-required data-testid='manager-field'>
                        <Typography
                            children={'Выберете ответственного'}
                            align='center'
                            margin={1}
                            color='secondary'
                        />
                        <div className="manager-field-icon">
                            <div>
                                <Typography
                                    children={manager.name ? manager.name : 'Ответственный'}
                                />
                                <Typography
                                    children={speciality ? speciality : 'Специальность'}
                                />
                            </div>
                            <ArrowDropDownCircleIcon onClick={() => setOpen(state => !state)}/>
                        </div>
                        {open &&
                            <UsersDropDown setManager={setManager} setSpeciality={setSpeciality} onClose={setOpen}/>}
                    </div>}
                </div>
                <Button size='small' variant='contained' className='add-button' type='submit'>
                    <Loader title='Добавить задание' isLoading={status === 'pending'}/>
                </Button>
            </form> : <CircularProgress />}

        </div>
    </div>

}
export default AddModal