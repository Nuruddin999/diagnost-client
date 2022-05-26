import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import './style.dash.scss'
import { useDispatch, useSelector } from "react-redux";

import { Button, TextField, Typography, IconButton } from "@mui/material";
import { RootState } from "../../../app/store";
import './style.anamnesis.scss'
import { changeComplaints, changeAnamnesis, changeDiagnosticData } from "../../../reducers/applicationItemSlice";


const Anamnesis = (): React.ReactElement => {

  const complaints = useSelector((state: RootState) => state.applicationItem.complaint)
  const anamnesis = useSelector((state: RootState) => state.applicationItem.anamnesis)
  const diagnosticData = useSelector((state: RootState) => state.applicationItem.diagnosticData)
  const dispatch = useDispatch()

  console.log('anamnesis render')
  return <div className="anamnesis">
    <div className='complaints'>
      <Typography fontWeight={700}>Жалоб:</Typography>
      <TextField
        multiline
        maxRows={8}
        size='small'
        variant='standard'
        value={complaints}
        className='text-section'
        onChange={(e) => dispatch(changeComplaints(e.target.value))}
      />
    </div>
    <div className='complaints'>
      <Typography fontWeight={700}>Анамнеза:</Typography>
      <TextField
        multiline
        maxRows={8}
        size='small'
        variant='standard'
        className='text-section'
        value={anamnesis}
        onChange={(e) => dispatch(changeAnamnesis(e.target.value))}
      />
    </div>
    <div className='complaints'>
      <Typography fontWeight={700}>Данных обследования:</Typography>
      <TextField
        multiline
        maxRows={8}
        size='small'
        variant='standard'
        className='text-section'
        value={diagnosticData}
        onChange={(e) => dispatch(changeDiagnosticData(e.target.value))} />
    </div>
  </div>
}
export default Anamnesis