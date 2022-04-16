import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import './style.dash.scss'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { IconButton, TextField, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { changeCheckupPlan, saveCheckupPlan, deleteCheckupPlan } from "../../../reducers/applicationItemSlice";
import './style.checkupplans.scss'

const CheckupPlanForm = (): React.ReactElement => {
  const dispatch = useDispatch()
  const checkupPlansProp = useSelector((state: RootState) => state.applicationItem.checkupPlans)
  const [kind, setKind] = useState('')
  const [place, setPlace] = useState('')
  const [target, setTarget] = useState('')
  const addConsliliumDoctor = () => {
    dispatch(saveCheckupPlan({ kind, place, target }))
  }
  const deletePlan = (index: number) => {
    dispatch(deleteCheckupPlan(index))
  }
  return <div>
    <table>
      <tr>
        <th>
          <span>
            №
          </span>
        </th>
        <th>
          <span>
            Вид обследования
          </span>
        </th>
        <th>
          <span>
            Место
          </span>
        </th>
        <th>Цель проведения обследования</th>
        <th>
        </th>
      </tr>
      <tbody>
        {checkupPlansProp.length > 0 && checkupPlansProp.map((checkupPlan, index) => <tr>
          <td>{index + 1}</td>
          <td>    <TextField
            value={checkupPlan.kind}
            variant='standard'
            size='small'
            fullWidth
            placeholder='Вид обследования'
            onChange={(e) => dispatch(changeCheckupPlan({ index, checkupPlan: { kind: e.target.value, place: checkupPlan.place, target: checkupPlan.target } }))}
          /></td>
          <td>    <TextField
            value={checkupPlan.place}
            variant='standard'
            size='small'
            fullWidth
            placeholder='Место'
            onChange={(e) => dispatch(changeCheckupPlan({ index, checkupPlan: { kind: checkupPlan.kind, place: e.target.value, target: checkupPlan.target } }))}
          /></td>
          <td>    <TextField
            value={checkupPlan.target}
            variant='standard'
            size='small'
            fullWidth
            placeholder='Цель проведения обследования'
            onChange={(e) => dispatch(changeCheckupPlan({ index, checkupPlan: { kind: checkupPlan.kind, place: checkupPlan.place, target: e.target.value } }))}
          /></td>
          <td><IconButton className='delete-button' onClick={() => deletePlan(index)}>
            <DeleteOutlineIcon />
          </IconButton></td>
        </tr>)}
      </tbody>
    </table>
    <Typography>Добавить план обследования в таблицу</Typography>
    <div className="add-in-table-section">
          <TextField
      value={kind}
      variant='outlined'
      size='small'
      fullWidth
      placeholder='Вид обследования'
      onChange={(e) => setKind(e.target.value)}
    /> <TextField
      value={place}
      variant='outlined'
      size='small'
      fullWidth
      placeholder='Место'
      onChange={(e) => setPlace(e.target.value)}
    /> <TextField
      value={target}
      variant='outlined'
      size='small'
      fullWidth
      placeholder='Цель проведения обследования'
      onChange={(e) => setTarget(e.target.value)}
    /> <IconButton onClick={addConsliliumDoctor} color='info'>
      <AddCircleIcon />
    </IconButton>
    </div>

  </div>
}
export default CheckupPlanForm