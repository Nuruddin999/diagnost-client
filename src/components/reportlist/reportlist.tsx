import { Button, Typography, Pagination, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import './style.reportlist.scss'
import { useDispatch, useSelector } from "react-redux";
import { getApplication } from "../../actions/application";
import { RootState } from "../../app/store";
import AddModal from "./add_modal";
import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useHistory } from "react-router-dom";

const ReportList = (): React.ReactElement => {
   const dispatch = useDispatch()
   const history = useHistory()
   const applications = useSelector((state: RootState) => state.application.applications)
   const count = useSelector((state: RootState) => state.application.count)
   const [isAddFormOpened, setAddFormOpened] = useState(false)
   const [page, setPage] = React.useState(1);
   const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
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
                  <td onClick={() => goToApplItem(appl.id)}>{index + 1}</td>
                  <td>{appl.name}</td>
                  <td>{appl.patientRequest}</td>
                  <td>{appl.fundName}</td>
                  <td>{appl.manager}</td>
                  <td>{appl.creationDate}</td>
                  <td>{appl.execDate}</td>
                  <td><IconButton className='delete-button'>
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