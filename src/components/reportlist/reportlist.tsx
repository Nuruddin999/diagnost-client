import { Button, Typography, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import classNames from "classnames";
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, LocalizationProvider } from "@mui/lab"
import ruLocale from 'date-fns/locale/ru';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import './style.reportlist.scss'
import { useDispatch, useSelector } from "react-redux";
import { addApplication, getApplication } from "../../actions/application";
import { RootState } from "../../app/store";

const ReportList = (): React.ReactElement => {
   const dispatch = useDispatch()
   const applications = useSelector((state: RootState) => state.application.applications)
   const [isAddFormOpened, setAddFormOpened] = useState(false)
   const [applName, setApplName] = useState('')
   const [patientRequest, setPatientRequest] = useState('')
   const [fundName, setFundName] = useState('')
   const [manager, setManager] = useState('')
   const [creationDate, setValue] = useState(new Date())
   const [execDate, setExecValue] = useState(new Date())
   const formClass = isAddFormOpened ? 'form-add' : 'button-end'
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
   useEffect(() => {
      dispatch(getApplication(1, 9))
   }, [])
   return <div className='add-appl-container'>
      <div className={formClass}>
         {isAddFormOpened ? <form onSubmit={handleSubmit}>
            <div className='close-ic' onClick={() => setAddFormOpened(false)}>
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
         </form> : <Button size='small' variant='contained' className='add-button' onClick={() => setAddFormOpened(true)}>
            <Typography>Новое задание</Typography>
         </Button>}
      </div>
      <div className="appl-table">
         <table>
            <tr>
            <th>
                  <span>
                     №
                  </span>
               </th>
               <th>
                  <span>
                     Имя
                  </span>
               </th>
               <th>
                  <span>
                     Заключение
                  </span>
               </th>
               <th>
                  <span>
                     Фонд
                  </span>
               </th>
               <th>
                  <span>
                     Исполнитель
                  </span>
               </th>
               <th>
                  <span>
                     Дата создания
                  </span>
               </th>
               <th>
                  <span>
                     Дата исполнения
                  </span>
               </th>
               <th>
                  <span>
                     Удалить
                  </span>
               </th>
            </tr>
            <tbody>
               {applications.length > 0 && applications.map((appl, index) => <tr>
                  <td>{index+1}</td>
                  <td>{appl.name}</td>
                  <td>{appl.patientRequest}</td>
                  <td>{appl.fundName}</td>
                  <td>{appl.manager}</td>
                  <td>{appl.creationDate}</td>
                  <td>{appl.execDate}</td>
                  <td></td>
               </tr>)}
            </tbody>
         </table>
      </div>
   </div>

}
export default ReportList