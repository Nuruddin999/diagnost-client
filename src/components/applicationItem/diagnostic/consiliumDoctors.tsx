import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import './style.dash.scss'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { IconButton, TextField, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { changeDiagnostic, saveDiagnostic, deleteDiagnostic } from "../../../reducers/applicationItemSlice";
import './style.diagnostic.scss'

const DiagnosticForm = (): React.ReactElement => {
   const dispatch = useDispatch()
   const diagnosticProp = useSelector((state: RootState) => state.applicationItem.diagnostic)
   const [diagnosis, setDiagnosis] = useState('')
   const addDiagnosis = () => {
      dispatch(saveDiagnostic(diagnosis))
   }
   const removeDiagnostic = (index: number) => {
      dispatch(deleteDiagnostic(index))
   }
   return <div>
      <h3>С целью проведения дифференциальной диагностики между</h3>
      <h5>(указать заболевания, факты и симптомы клинической картины, которых частично или полностью соответствуют заболеванию)</h5>
      <table>
         <tr>
            <th>
               <span>
                  №
               </span>
            </th>
            <th>
               <span>
                  Диагноз
               </span>
            </th>
            <th>
            </th>
         </tr>
         <tbody>
            {diagnosticProp.length > 0 && diagnosticProp.map((diagnos, index) => <tr>
               <td>{index + 1}</td>
               <td>    <TextField
                  value={diagnos.diagnosis}
                  variant='standard'
                  size='small'
                  fullWidth
                  placeholder='диагноз'
                  onChange={(e) => dispatch(changeDiagnostic({ index, diagnosis: e.target.value }))}
               /></td>
               <td><IconButton className='delete-button' onClick={() => removeDiagnostic(index)}>
                  <DeleteOutlineIcon />
               </IconButton></td>
            </tr>)}
         </tbody>
      </table>
      <Typography>Добавить диагноз в табилцу</Typography>
      <div className='add-in-table-section'>
      <TextField
         value={diagnosis}
         variant='outlined'
         size='small'
         fullWidth
         placeholder='Диагноз'
         onChange={(e) => setDiagnosis(e.target.value)}
      />
      <IconButton onClick={addDiagnosis} color='info'>
         <AddCircleIcon />
      </IconButton>
      </div>
   </div>
}
export default DiagnosticForm