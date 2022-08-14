import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Typography } from "@mui/material";
import './style.applicationitem.scss'
import { successUpdate } from "../../reducers/applicationItemSlice";
import { RootState } from "../../app/store";
import { getListItemAction } from "../../common/actions/common";
import { saveUserItem } from "../../reducers/userSlice";


const UserItem = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>()
  const status = useSelector((state: RootState) => state.applicationItem.status)
  const { name, role, email, speciality, phone } = useSelector((state: RootState) => state.user.useritem)

  const dispatch = useDispatch()
  // /**
  //  * Обновляем заключение.
  //  */
  // const handleClick = () => {
  //   dispatch(updateApplication())
  // }
  useEffect(() => {
    dispatch(getListItemAction(id, 'users', saveUserItem))
  }, [])
  useEffect(() => {
    if (status === 'success') {
      setTimeout(() => dispatch(successUpdate('no')), 500)
    }
  }, [status])

  return <div className="user-item">
    {status === 'success' && <div className='upload-snakebar'>
      <Typography variant='h6' alignContent='center'>
        сохранено
      </Typography>
    </div>}
    <div className='user-info-block'>
      <div className='user-image'>
        <img width='200px' height='200px' src='https://img.freepik.com/premium-photo/view-destroyed-post-apocalyptic-city-3d-illustration_291814-1477.jpg?w=2000' />
      </div>
      <div className="user-info-wrapper">
        <div className="user-info">
          <Typography>
            Имя
          </Typography>
          <TextField size='small' value={name} className='user-info-name' />
        </div>
        <div className="user-info">
          <Typography>
            Специальность
          </Typography>
          <TextField size='small' value={speciality} className='user-info-name' />
        </div>
        <div className="user-info">
          <Typography>
            Телефон
          </Typography>
          <TextField size='small' value={phone} className='user-info-name' />
        </div>
        <div className="user-info">
          <Typography>
            email
          </Typography>
          <TextField size='small' value={email} className='user-info-name' />
        </div>
      </div>
    </div>
  </div>
}
export default UserItem