import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import './style.dash.scss'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { IconButton, TextField } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { changeConsiliumDoctors, saveConsiliumDoctors, deleteConsiliumDoctors } from "../../../reducers/applicationItemSlice";
import './style.consiliumdoctors.scss'

const ConsiliumDoctorsForm = (): React.ReactElement => {
   const dispatch = useDispatch()
   const consiliumDoctorsProp = useSelector((state: RootState) => state.applicationItem.consiliumDoctors)
   const [fio, setFio] = useState('')
   const [speciality, setSpeciality] = useState('')
   const addConsliliumDoctor = () => {
      dispatch(saveConsiliumDoctors({ name: fio, speciality }))
   }
   const deleteDoctor = (index:number) => {
      dispatch(deleteConsiliumDoctors(index))
   }
   return <div>
      <h3>Проведен дистанционный врачебный консилиум в составе:</h3>
      <h5>(указать ФИО и специальности врачей, которые участвовали в формировании заключения)</h5>
      <table>
         <tr>
            <th>
               <span>
                  №
               </span>
            </th>
            <th>
               <span>
                  ФИО
               </span>
            </th>
            <th>
               <span>
                  Специализация
               </span>
            </th>
         </tr>
         <tbody>
            {consiliumDoctorsProp.length > 0 && consiliumDoctorsProp.map((consDoctor, index) => <tr>
               <td>{index + 1}</td>
               <td>    <TextField
                  value={consDoctor.name}
                  variant='standard'
                  size='small'
                  fullWidth
                  placeholder='ФИО'
                  onChange={(e) => dispatch(changeConsiliumDoctors({ index, name: e.target.value, speciality: consDoctor.speciality }))}
               /></td>
               <td>    <TextField
                  value={consDoctor.speciality}
                  variant='standard'
                  size='small'
                  fullWidth
                  placeholder='специальность'
                  onChange={(e) => dispatch(changeConsiliumDoctors({ index, name: consDoctor.name, speciality: e.target.value }))}
               /></td>
               <td><IconButton className='delete-button' onClick={() => deleteDoctor(index)}>
                  <DeleteOutlineIcon />
               </IconButton></td>
            </tr>)}
            <tr>
               <td></td>
               <td>    <TextField
                  value={fio}
                  variant='outlined'
                  size='small'
                  fullWidth
                  placeholder='ФИО'
                  onChange={(e) => setFio(e.target.value)}
               /></td>
               <td>   <TextField
                  value={speciality}
                  variant='outlined'
                  size='small'
                  fullWidth
                  placeholder='специальность'
                  onChange={(e) => setSpeciality(e.target.value)}
               /></td>
               <td>    <IconButton onClick={addConsliliumDoctor}>
                  <AddCircleIcon />
               </IconButton></td>
            </tr>
         </tbody>
      </table>
   </div>
}
export default ConsiliumDoctorsForm