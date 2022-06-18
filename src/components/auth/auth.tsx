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
  const [isAlert, showAllert] = useState(false)
  const [isRedirect, setRedirect] = useState(false)
  const { isLoading, role: roleUser, reqStatus } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(login(email, password))
  }
  /**
   * Действия после успешной регистрации.
   * @param {boolean} isSuccess Является ли запрос на регистрацию успешным.
   */
  const fillRegistrationForm = (isSuccess: boolean) => {
    setEmail('')
    setPassword('')
    dispatch(changeReqStatus('no'))
    dispatch(changeLoadStatus(false))
    isSuccess && setRegistration(false)
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

        { reqStatus !== 'ok' && reqStatus !== 'no' && <Typography className='error-reg' align='center'>
          {reqStatus}
        </Typography>}
        {<Button className='login-button' fullWidth variant='contained' disableElevation type='submit'>
          <Loader title='Войти' isLoading={isLoading} />
        </Button>}
      </form>
      {roleUser !== '' && <Redirect to='/' />}
    </div>
  </div>
}