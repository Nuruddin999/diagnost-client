import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, TextField, Typography } from "@mui/material";
import './style.applicationitem.scss'
import { successUpdate } from "../../reducers/applicationItemSlice";
import { RootState } from "../../app/store";
import { getListItemAction } from "../../common/actions/common";
import { Right, saveUserItem } from "../../reducers/userSlice";
import { entitiesForRights } from "../../constants";
import { updateRightsAction } from "../../actions/user";

const UserItem = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>()
  const status = useSelector((state: RootState) => state.applicationItem.status)
  const { name,  email, speciality, phone } = useSelector((state: RootState) => state.user.useritem)
  const rights: Right[] = useSelector((state: RootState)=>{
    const processedRights: Right[] = []
    state.user.useritem.rights?.forEach(item => {
      if(item.entity === 'applications') {
        processedRights[0]=item
      }
      else if(item.entity === 'users') {
        processedRights[1] = item
      }
      else {
        processedRights[2] = item
      }
    })
    return processedRights
  })
  const dispatch = useDispatch()
  const handleChange = (entity: string, field: string, value: any) => {
   dispatch(updateRightsAction(entity, field, value, id))
  }
  useEffect(() => {
    dispatch(getListItemAction(id, 'users', saveUserItem))
  }, [])
  useEffect(() => {
    if (status === 'success') {
      setTimeout(() => dispatch(successUpdate('no')), 500)
    }
  }, [status])

  return <div className="user-item">
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
    <div className='rights-section'>
      <Typography>
      </Typography>
      <Typography>
        Создание
      </Typography>
      <Typography>
        Просмотр
      </Typography>
      <Typography>
        Правка
      </Typography>
      <Typography>
        Удаление
      </Typography>
      {rights?.map((right) => <>
        <Typography>
          {entitiesForRights[right.entity as keyof typeof entitiesForRights]}
        </Typography>
        <Checkbox checked={right.create} onChange={(e) => handleChange(right.entity, 'create', e.target.checked)} />
        <Checkbox checked={right.read} onChange={(e) => handleChange(right.entity, 'read', e.target.checked)} />
        <Checkbox checked={right.update} onChange={(e) => handleChange(right.entity, 'update', e.target.checked)} />
        <Checkbox checked={right.delete} onChange={(e) => handleChange(right.entity, 'delete', e.target.checked)} />
      </>)}
    </div>
  </div>
}
export default UserItem