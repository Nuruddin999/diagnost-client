import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, TextField, Typography } from "@mui/material";
import './style.applicationitem.scss'
import { successUpdate } from "../../reducers/applicationItemSlice";
import { RootState } from "../../app/store";
import { getListItemAction } from "../../common/actions/common";
import { Right, saveEmail, savePhone, saveUserItem } from "../../reducers/userSlice";
import { entitiesForRights } from "../../constants";
import { updateRightsAction } from "../../actions/user";
import { selectApplicationUserRights, selectsUserItemRights } from "../../common/selectors/user";
 type userItem = {
   isProfile?: boolean
 }
const UserItem = ({isProfile} : userItem): React.ReactElement => {
  const { id } = useParams<{ id: string }>()
  const status = useSelector((state: RootState) => state.applicationItem.status)
  const { name,  email, speciality, phone, role } = useSelector((state: RootState) => state.user.useritem)
  const { id: userApplId} = useSelector((state: RootState) => state.user.user)
  const idUrl = id ? id : userApplId
  const rights: Right[] = useSelector((state: RootState) => selectsUserItemRights(state))
  const applUserRights = useSelector((state: RootState) => selectApplicationUserRights(state))
  const {users} = applUserRights.processedRights
  const dispatch = useDispatch()
  const handleChange = (entity: string, field: string, value: any) => {
   dispatch(updateRightsAction(entity, field, value, id))
  }
  useEffect(() => {
    dispatch(getListItemAction(idUrl, 'users', saveUserItem))
  }, [])
  useEffect(() => {
    if (status === 'success') {
      setTimeout(() => dispatch(successUpdate('no')), 500)
    }
  }, [status])

  return <div className="user-item">
    <div className='user-info-block'>
        <div className="user-info">
          <Typography>
            Имя
          </Typography>
          <Typography children={name} className='user-info-name' />
        </div>
        <div className="user-info">
          <Typography>
            Роль
          </Typography>
          <Typography  children={role} className='user-info-name' />
        </div>
        <div className="user-info">
          <Typography>
            Специальность
          </Typography>
          <Typography  children={speciality} className='user-info-name' />
        </div>
        <div className="user-info">
          <Typography>
            Телефон
          </Typography>
          <TextField size='small' disabled={!users?.update} value={phone} className='user-info-name' onChange={(e)=>dispatch(savePhone(e.target.value))} />
        </div>
        <div className="user-info">
          <Typography>
            email
          </Typography>
          <TextField size='small' disabled={!users?.update} value={email} className='user-info-name' onChange={(e)=>dispatch(saveEmail(e.target.value))}/>
        </div>
    </div>
    <Typography variant='h4' gutterBottom className='rights-title'>
      Права
    </Typography>
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
      {rights?.map((right) =>  <>
        <Typography align='left'>
          {entitiesForRights[right.entity as keyof typeof entitiesForRights]}
        </Typography>
        <Checkbox checked={right.create} disabled={isProfile || right.entity === 'checkupPlanPlace' || !users?.update}  onChange={(e) => handleChange(right.entity, 'create', e.target.checked)} />
        <Checkbox checked={right.read}  disabled={ isProfile || right.entity === 'checkupPlanPlace' || !users?.update} onChange={(e) => handleChange(right.entity, 'read', e.target.checked)} />
        <Checkbox checked={right.update}   disabled={isProfile ||  right.entity === 'checkupPlanPlace' || !users?.update } onChange={(e) => handleChange(right.entity, 'update', e.target.checked)} />
        <Checkbox checked={right.delete}   disabled={isProfile || !users?.update }   onChange={(e) => handleChange(right.entity, 'delete', e.target.checked)} />
      </>)}
    </div>
  </div>
}
export default UserItem