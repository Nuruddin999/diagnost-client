import React, { useState, useEffect } from "react";
import { Button, TextField, Select, MenuItem, Typography, FormControl, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/user";
import { RootState } from "../../app/store";
import { changeLoadStatus, changeReqStatus } from "../../reducers/userSlice";
import { Loader } from "../loader/loader";
import './style.auth.scss'
import { specialities } from "../../constants";

export const Registration = ({ notHaveSuperUser }: { notHaveSuperUser?: boolean }): React.ReactElement => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('')
  const { isLoading, reqStatus } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(registerUser({ email, password, name, speciality, phone, role: notHaveSuperUser ? 'superadmin' : role }))
  }
  /**
   * Действия после успешной регистрации.
   * @param {boolean} isSuccess Является ли запрос на регистрацию успешным.
   */
  const fillRegistrationForm = (isSuccess: boolean) => {
    setEmail('')
    setPassword('')
    setName('')
    setSpeciality('')
    setPhone('')
    setRole('')
    dispatch(changeReqStatus('no'))
    dispatch(changeLoadStatus(false))
  }
  const renderRegisterButton = () => {
    if (reqStatus === 'ok') {
      return <Typography className='success-reg' align='center'>
        Пользователь успешно зарегистрирован
      </Typography>
    }
    else if (reqStatus === 'no') {
      return <Button className='login-button' fullWidth variant='contained' disableElevation type='submit'>
        <Loader title='Зарегистрировать' isLoading={isLoading} />
      </Button>
    }
    else {
      return <Typography className='error-reg' align='center'>
        {reqStatus}
      </Typography>
    }

  }
  useEffect(() => {
    if (reqStatus === 'ok') {
      setTimeout(() => fillRegistrationForm(true), 1500)
    }
    else if (reqStatus !== 'no') {
      setTimeout(() => fillRegistrationForm(false), 2000)
    }
  }, [reqStatus])
  return <div className={'registration-main'}>
    <div className={'auth-wrapper'}>
      {
        notHaveSuperUser && <div className={'nosuperuser-title'}>
          <Typography variant='h4' >
            Добро пожаловать в систему
          </Typography>
          <Typography>
            Зарегистрируйте главного администратора
          </Typography></div>
      }
      <div className={"auth-container"}>
        <form onSubmit={(event) => onSubmit(event)}>
          <TextField value={email}
            type='email'
            required
            size='small'
            fullWidth
            placeholder='Email'
            margin='normal'
            onChange={(event) => setEmail(event.target.value)} />
          <TextField
            value={password}
            type='password'
            required
            size='small'
            fullWidth
            placeholder='Пароль'
            margin='normal'
            onChange={(event) => setPassword(event?.target.value)} />
          <div>
            <TextField
              value={name}
              type='text'
              required
              size='small'
              fullWidth
              placeholder='ФИО'
              margin='normal'
              onChange={(event) => setName(event?.target.value)} />
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
            <TextField
              value={phone}
              type='text'
              required
              size='small'
              fullWidth
              placeholder='Телефон'
              margin='normal'
              onChange={(event) => setPhone(event?.target.value)} />
            <Typography align='left' >Роль</Typography>
            {notHaveSuperUser ? <Typography align='left' >Главный администратор </Typography> : <Select
              onChange={(event) => setRole(event.target.value)}
              autoWidth
              required
              value={notHaveSuperUser ? 'admin' : role}
              variant='standard'
              className={'select'}
            >
              <MenuItem value={'admin'}>Администратор</MenuItem>
              <MenuItem value={'doctor'}>Врач</MenuItem>
            </Select>}
            {renderRegisterButton()}
          </div>
        </form>
      </div>
    </div>
  </div >
}