import { Button, TextField, Select, MenuItem, InputLabel, OutlinedInput, Typography, Alert, Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { clearTimeout } from "timers";
import { login, registerUser } from "../../actions/user";
import { RootState } from "../../app/store";
import { changeLoadStatus, changeReqStatus } from "../../reducers/userSlice";
import { Loader } from "../loader/loader";
import './style.auth.scss'

export const Auth = (): React.ReactElement => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistration, setRegistration] = useState(false)
  const [name, setName] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('')
  const [isAlert, showAllert] = useState(false)
  const [isRedirect, setRedirect] = useState(false)
  const { isLoading, role: roleUser, reqStatus } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(isRegistration ? registerUser({ email, password, name, speciality, phone, role }) : login(email, password))
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
    isSuccess && setRegistration(false)
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
  return <div className={'auth-wrapper'}>
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
        {isRegistration && <div>
          <TextField
            value={name}
            type='text'
            required
            size='small'
            fullWidth
            placeholder='ФИО'
            margin='normal'
            onChange={(event) => setName(event?.target.value)} />
          <TextField
            value={speciality}
            type='text'
            required
            size='small'
            fullWidth
            placeholder='Специальность'
            margin='normal'
            onChange={(event) => setSpeciality(event?.target.value)} />
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
          <Select
            onChange={(event) => setRole(event.target.value)}
            autoWidth
            required
            value={role}
            variant='standard'
            className={'select'}
          >
            <MenuItem value={'admin'}>Администратор</MenuItem>
            <MenuItem value={'doctor'}>Врач</MenuItem>
          </Select>
          {renderRegisterButton()}
        </div>}
        {!isRegistration && reqStatus !== 'ok' && reqStatus !=='no' && <Typography className='error-reg' align='center'>
          {reqStatus}
        </Typography>}
        {!isRegistration && <Button className='login-button' fullWidth variant='contained' disableElevation type='submit'>
          <Loader title='Войти' isLoading={isLoading} />
        </Button>}
      </form>
      <Button className='login-button' fullWidth variant='contained' disableElevation onClick={() => setRegistration(!isRegistration)}>
        <Loader title={!isRegistration ? 'Регистрация' : 'Вход'} isLoading={false} />
      </Button>
          {roleUser !== '' && <Redirect to='/' />}
    </div>
    {/* <Modal
      open
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className='alert-wrapper'>
      <Alert variant="filled" severity="error">
        <Typography>Пользователь успешно зарегистрирован !</Typography>
      </Alert>
      </div>
    </Modal> */}
  </div>
}