/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Typography, Pagination, TextField } from "@mui/material";
import React, { useEffect, useCallback } from "react";
import './style.reportlist.scss'
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../actions/user";
import { RootState } from "../../app/store";
import AddModal from "./add_modal";
import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useHistory } from "react-router-dom";
import { openModal } from "../../reducers/ui";
import isObject from "lodash/isObject";
import { debounce } from "lodash";

import { getUserByLetter } from "../../actions/user";
import { selectApplicationUserRights } from "../../common/selectors/user";

const UsersList = (): React.ReactElement => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { users, user } = useSelector((state: RootState) => state.user)
  const { users: applUserRights } = useSelector((state: RootState) => selectApplicationUserRights(state)).processedRights
  const isModalOpened = useSelector((state: RootState) => state.ui.isModalOpened)
  const count = useSelector((state: RootState) => state.user.count)
  const [page, setPage] = React.useState(1);
  const [name, setUserName] = React.useState('');
  const [speciality, setUserPosition] = React.useState('');
  const [phone, setUserPhone] = React.useState('');
  const [role, setUserRole] = React.useState('');
  const [email, setUserEmail] = React.useState('');
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const deleteAppl = (value: string) => {
    dispatch(deleteUser(value));
  };
  const tableData = ['№', { title: 'ФИО', field: name, onChange: setUserName }, { title: 'Роль', field: role, onChange: setUserRole }, { title: 'Должность', field: speciality, onChange: setUserPosition }, { title: 'Email', field: email, onChange: setUserEmail }, { title: 'Контакты', field: phone, onChange: setUserPhone }, 'Удалить']
  const roles = {
    doctor: 'Врач',
    admin: 'Админ',
    superadmin: 'Главный админ',
    coordinator: 'Координатор'
  }
  const changeHandler = (e: any, field: string, callback: (title: string) => void) => {
    if (e.target.value.length > 2) {
      callback(e.target.value)
    }
    else if (field.length > 2 && e.target.value.length === 0) {
      callback('')
    }
  };
  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 300)
    , []);

  useEffect(() => {
    dispatch(getUserByLetter(page, 10, email, name, speciality, phone))
  }, [page])

  useEffect(() => {
    dispatch(getUserByLetter(page, 10, email, name, speciality, phone))
  }, [email, name, speciality, phone])

  /**
   * Переход на отдельное заключение
   * @param {number} id Id заключения.
   */
  const goToApplItem = (id: string | undefined) => {
    history.push(`user/${id}`)
  }
  return <div className='add-appl-container'>
    {isModalOpened && <AddModal />}
    <div className='add-button-wrapper'>
      {applUserRights?.create && <Button size='small' variant='contained' className='add-button' onClick={() => dispatch(openModal(true))}>
        <Typography>Новый пользователь</Typography>
      </Button>}
    </div>
    <div className="appl-table">
      <table>
        <thead>
          <tr>
            {tableData.map(el => (<th>
              <div>
                <div>
                  <span>
                    {isObject(el) ? el.title : el}
                  </span>
                </div>
                {isObject(el) &&
                  <TextField
                    onChange={(e) => debouncedChangeHandler(e, el.field, el.onChange)}
                    type="text"
                    size="small"
                    placeholder="Поиск"
                  />
                }
              </div>
            </th>))}
          </tr>
        </thead>
        <tbody>
          {applUserRights?.read && users.length > 0 ? users.map((userItem, index) => user.id !== String(userItem.id) && <tr onClick={() => goToApplItem(userItem.id)}>
            <td>{index + 1}</td>
            <td>{userItem.name}</td>
            <td>{roles[userItem.role as keyof typeof roles]}</td>
            <td>{userItem.speciality}</td>
            <td>{userItem.email}</td>
            <td>{userItem.phone}</td>
            <td><IconButton disabled={!applUserRights?.delete} className='delete-button' onClick={(e: any) => {
              e.stopPropagation()
              userItem.id && deleteAppl(userItem.id)
            }}>
              <DeleteOutlineIcon />
            </IconButton></td>
          </tr>) : <Typography> Недостаточно прав</Typography>}
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
export default UsersList