import { Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, LocalizationProvider } from "@mui/lab"
import ruLocale from 'date-fns/locale/ru';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import './style.reportlist.scss'
import { useDispatch, useSelector } from "react-redux";
import { addApplication } from "../../actions/application";
import './style.addmodal.scss'
import { openModal } from "../../reducers/ui";
import { Loader } from "../loader/loader";
import { RootState } from "../../app/store";
import { specialities } from "../../constants";

const AddModal = (): React.ReactElement => {
  const status = useSelector((state:RootState)=>state.ui.status)
  const dispatch = useDispatch()
  const [patientName, setPatientFIO] = useState('')
  const [patientBirthDate, setBirthDate] = useState(new Date())
  const [patientRequest, setPatientRequest] = useState('')
  const [fundName, setFundName] = useState('')
  const [fundRequest, setFundRequest] = useState('')
  const [manager, setManager] = useState('')
  const [speciality, setSpeciality] = useState('')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(addApplication({
      patientName,
      patientBirthDate: patientBirthDate.toString(),
      patientRequest,
      fundName,
      fundRequest,
      manager: `${speciality}  ${manager}`,
      creationDate: new Date().toLocaleString(),
      execDate: '',
    }))
  }
  return <div className='add-modal-container'>
    <div className="add-form-wrapper">
      <form onSubmit={handleSubmit}>
        <div className='close-ic' onClick={() => dispatch(openModal(false))}>
          <CloseIcon />
        </div>
        <div className='form'>
          <TextField
            placeholder='ФИО пациента'
            size='small'
            value={patientName}
            onChange={(event: any) => setPatientFIO(event.target.value)}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
            <div>
              <DatePicker
                mask='__.__.____'
                value={patientBirthDate}
                label='Дата рождения'
                onChange={(newValue: any) => setBirthDate(newValue)}
                renderInput={(params: any) => <TextField {...params} size='small' />}
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
          <div className="manager-field">
            <Typography children='Ответственный'/>
          <TextField
            placeholder='ФИО'
            size='small'
            value={manager}
            onChange={(event: any) => setManager(event.target.value)}
            required
          />
                <FormControl variant="standard" fullWidth>
               <InputLabel id="demo-simple-select-standard-label">Специальность</InputLabel>
               <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  label="Специальность"
               >
                  {specialities.map(speciality => <MenuItem value={speciality}>{speciality}</MenuItem>)}
               </Select>
            </FormControl>
          </div>
        </div>
        <Button size='small' variant='contained' className='add-button' type='submit'>
        <Loader title='Добавить задание' isLoading={status === 'pending'} />
        </Button>
      </form>
    </div>
  </div>

}
export default AddModal