import { Button, Typography, Pagination, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import './style.reportlist.scss'
import { useDispatch, useSelector } from "react-redux";
import { deleteOneApplication, getApplication } from "../../actions/application";
import { RootState } from "../../app/store";
import AddModal from "./add_modal";
import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useHistory } from "react-router-dom";
import { openModal } from "../../reducers/ui";

const ReportList = (): React.ReactElement => {
   const dispatch = useDispatch()
   const history = useHistory()
   const applications = useSelector((state: RootState) => state.application.applications)
   const status = useSelector((state: RootState) => state.ui.status)
   const isModalOpened = useSelector((state: RootState) => state.ui.isModalOpened)
   const count = useSelector((state: RootState) => state.application.count)
   const [page, setPage] = React.useState(1);
   const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
   };
   const deleteAppl = (value: number) => {
      dispatch(deleteOneApplication(value.toString()));
   };
   useEffect(() => {
      dispatch(getApplication(page, 10))
   }, [page])


   /**
    * Переход на отдельное заключение
    * @param {number} id Id заключения.
    */
   const goToApplItem = (id: number | undefined) => {
      history.push(`application/${id}`)
   }
   return <div className='add-appl-container'>
      {isModalOpened && <AddModal  />}
      <div className='add-button-wrapper'>
         <Button size='small' variant='contained' className='add-button' onClick={() => dispatch(openModal(true))}>
            <Typography>Новое задание</Typography>
         </Button>
      </div>
      <div className="appl-table">
         <table>
            <tr>
               {['№','ФИО пациента','Дата рождения','Запрос пациента','Название фонда','Запрос фонда','Ответственный','Дата создания','Дата исполнения','Удалить'].map(el => <th>
                  <span>
                     {el}
                  </span>
               </th>)}
            </tr>
            <tbody>
               {applications.length > 0 && applications.map((appl, index) => <tr onClick={() => goToApplItem(appl.id)}>
                  <td>{index + 1}</td>
                  <td>{appl.patientName}</td>
                  <td>{new Date(appl.patientBirthDate).toLocaleString()}</td>
                  <td>{appl.patientRequest}</td>
                  <td>{appl.fundName}</td>
                  <td>{appl.fundRequest}</td>
                  <td>{appl.manager}</td>
                  <td>{new Date(appl.creationDate).toLocaleString()}</td>
                  <td>{appl.execDate}</td>
                  <td><IconButton className='delete-button' onClick={(e:any) => {
                     e.stopPropagation()
                     appl.id && deleteAppl(appl.id)}}>
                     <DeleteOutlineIcon />
                  </IconButton></td>
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