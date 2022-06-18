import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { FormControl, IconButton, InputLabel, TextField, Typography, Select, MenuItem } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { changeConsiliumDoctors, saveConsiliumDoctors, deleteConsiliumDoctors } from "../../../reducers/applicationItemSlice";
import './style.consiliumdoctors.scss'
import { specialities } from "../../../constants";
import NoResult from "../../no-result/no-result";

const ConsiliumDoctorsForm = (): React.ReactElement => {
   console.log('render ConsiliumDoctorsForm')
   const dispatch = useDispatch()
   const consiliumDoctorsProp = useSelector((state: RootState) => state.applicationItem.consiliumDoctors)
   const [fio, setFio] = useState('')
   const [speciality, setSpeciality] = useState('')
   const addConsliliumDoctor = () => {
      dispatch(saveConsiliumDoctors({ name: fio, speciality }))
   }
   const deleteDoctor = (index: number) => {
      dispatch(deleteConsiliumDoctors(index))
   }
   return <div>
      <h3>Проведен дистанционный врачебный консилиум в составе:</h3>
      <h5>(указать ФИО и специальности врачей, которые участвовали в формировании заключения)</h5>
     { consiliumDoctorsProp.length > 0 ? <table>
         <thead>
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
               <th>
               </th>
            </tr>
         </thead>
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
         </tbody>
      </table> : <NoResult />  }
      <Typography>Добавить доктора в табилцу</Typography>
      <div className="add-in-table-section">
         <div className='speciality-fio'>
           <TextField
            value={fio}
            variant='outlined'
            fullWidth
            size='small'
            placeholder='ФИО'
            onChange={(e) => setFio(e.target.value)}
         />
         </div>

         <div className='speciality-dropdown'>
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
         {/* <TextField
            value={speciality}
            variant='outlined'
            size='small'
            fullWidth
            placeholder='специальность'
            onChange={(e) => setSpeciality(e.target.value)}
         /> */}
         <IconButton onClick={addConsliliumDoctor} >
            <AddCircleIcon className='add-in-table-svg' />
         </IconButton>
      </div>
   </div>
}
export default ConsiliumDoctorsForm