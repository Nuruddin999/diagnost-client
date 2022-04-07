import { Button, Typography, TextField, Pagination, Stack } from "@mui/material";
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
import AddModal from "./add_modal";

const ReportList = (): React.ReactElement => {
   const dispatch = useDispatch()
   const applications = useSelector((state: RootState) => state.application.applications)
   const count = useSelector((state: RootState) => state.application.count)
   const [isAddFormOpened, setAddFormOpened] = useState(false)
   const [page, setPage] = React.useState(1);
   console.log(page)
   const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
   };
   useEffect(() => {
      dispatch(getApplication(page, 10))
   }, [page])
   return <div className='add-appl-container'>
      {isAddFormOpened && <AddModal onClose={setAddFormOpened} />}
      <div className='add-button-wrapper'>
         <Button size='small' variant='contained' className='add-button' onClick={() => setAddFormOpened(true)}>
            <Typography>Новое задание</Typography>
         </Button>
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
                  <td>{index + 1}</td>
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
      <div className="pagination">
         <Pagination
            count={(count / 10) + 1}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
            size='large'
            color="primary"
            boundaryCount={10}
         />
      </div>
   </div>

}
export default ReportList