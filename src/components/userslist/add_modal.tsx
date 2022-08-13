import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import './style.reportlist.scss'
import { useDispatch, useSelector } from "react-redux";
import { addApplication } from "../../actions/application";
import './style.addmodal.scss'
import { openModal } from "../../reducers/ui";
import { RootState } from "../../app/store";
import { Registration } from "../common/registration";

const AddModal = (): React.ReactElement => {
  const status = useSelector((state: RootState) => state.ui.status)
  const dispatch = useDispatch()
  return <div className='add-modal-container'>
    <div className="add-form-wrapper">
      <div className='close-ic' onClick={() => dispatch(openModal(false))}>
        <CloseIcon />
      </div>
      <Registration />
    </div>
  </div>

}
export default AddModal