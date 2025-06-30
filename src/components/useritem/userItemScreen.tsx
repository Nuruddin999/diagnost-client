import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    Button,
    Checkbox,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import './style.applicationitem.scss'
import {RootState} from "../../app/store";
import {getListItemAction} from "../../common/actions/common";
import {Right, saveName, savePhone, saveUserItem, saveUserItemSpeciality} from "../../reducers/userSlice";
import {entitiesForRights} from "../../constants";
import {updatePrimaryData, updateRightsAction, userSignFileUpdate} from "../../actions/user";
import {selectApplicationUserRights, selectsUserItemRights} from "../../common/selectors/user";
import {FileUpload} from "../../common/components/fileupload/fileUpload";
import {isEmpty} from "lodash";
import {setError, setFileUploadStatus} from "../../reducers/ui";
import {CommonButton} from "../../common/components/button";
import Specialities from "../../common/components/specialities/specialities";
import {useParams} from "react-router-dom";
import {formatDuration} from "../../common/utils";
import Box from "@mui/material/Box";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";

type userItem = {
    isProfile?: boolean,
    id?: string,
    onClose: Dispatch<SetStateAction<string>>
}

const UserItemScreen = ({isProfile}: userItem): React.ReactElement => {
    const {fileUploadStatus, userItemStatus, errorMessage} = useSelector((state: RootState) => state.ui)
    const {id: userId} = useParams<{ id: string }>()
    const {
        name,
        email,
        speciality,
        phone,
        role,
        urlSignPath,
        signFileName,
        UserSessions
    } = useSelector((state: RootState) => state.user.useritem)
    const {id: userApplId} = useSelector((state: RootState) => state.user.user)
    const idUrl = userId ? userId : isProfile ? userApplId : ''
    const rights: Right[] = useSelector((state: RootState) => selectsUserItemRights(state))
    const applUserRights = useSelector((state: RootState) => selectApplicationUserRights(state))
    const {users} = applUserRights.processedRights
    const [files, setFiles] = useState<Array<File>>([])
    const [searchPeriod, setSearchPeriod] = useState<{ from: string, to: string }>({
        from: '',
        to: ''
    })
    const [dateError, setDateError] = useState<string | null>(null)
    const dispatch = useDispatch()
    const handleChange = (entity: string, field: string, value: any) => {
        dispatch(updateRightsAction(entity, field, value, idUrl))
    }
    const updateFile = () => {
        dispatch(userSignFileUpdate(idUrl, files))
    }

    const handlePeriodsFilter = () => {

        if (dateError || !searchPeriod.from || searchPeriod.to) {
            return
        }


    }
    useEffect(() => {
        if (idUrl) {
            dispatch(getListItemAction(idUrl, 'users', saveUserItem))
        }
    }, [idUrl])
    useEffect(() => {
        if (fileUploadStatus === 'success' || 'error') {
            setFiles([])
            setTimeout(() => dispatch(setFileUploadStatus('no')), 1500)
        }
    }, [fileUploadStatus])
    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => dispatch(setError('')), 1500)
        }
    }, [errorMessage])

    return userItemStatus === 'pending' ? <div className="user-item-loader"><CircularProgress/></div> :
        <div className="user-item-wrapper">
            {userItemStatus === 'ok' ? <div className="user-item">
                <div className='user-info-block'>
                    <div className="user-info">
                        <Typography fontWeight='bold'>
                            Имя
                        </Typography>
                        <TextField size='small' value={name} className='user-info-name'
                                   onChange={(e) => dispatch(saveName(e.target.value))}/>
                    </div>
                    <div className="user-info">
                        <Typography fontWeight='bold'>
                            Роль
                        </Typography>
                        <Typography children={role} className='user-info-name'/>
                    </div>
                    {users?.update ? <Specialities speciality={speciality}
                                                   setSpeciality={(e) => dispatch(saveUserItemSpeciality(e))}/> :
                        <div className="user-info"><Typography fontWeight='bold'>
                            Специальность
                        </Typography>
                            <Typography children={speciality} className='user-info-name'/>
                        </div>}
                    <div className="user-info">
                        <Typography fontWeight='bold'>
                            Телефон
                        </Typography>
                        <TextField size='small' disabled={!users?.update} value={phone} className='user-info-name'
                                   onChange={(e) => dispatch(savePhone(e.target.value))}/>
                    </div>
                    <div className="user-info">
                        <Typography fontWeight='bold'>
                            email
                        </Typography>
                        <Typography children={email} className='user-info-name'/>
                    </div>
                </div>
                <Typography margin={2} variant='h6'>Фото подписи</Typography>
                {urlSignPath && <div className='sign-img'>
                    <img src={urlSignPath} width='200px' height='100px' alt={'Подпись'}/>
                    <Typography>{signFileName}</Typography>
                </div>}
                {users?.update && <div className={'upload-section'}>
                    <FileUpload files={files} setFiles={setFiles}/>
                    <Button onClick={updateFile} disabled={isEmpty(files)}>Загрузить</Button>
                    {fileUploadStatus === 'pending' && <CircularProgress size={20}/>}
                    {fileUploadStatus === 'error' && <Typography>{errorMessage}</Typography>}
                </div>}
                <Typography variant='h6' gutterBottom className='rights-title'>
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
                    {rights?.map((right) => <React.Fragment key={right.entity}>
                        <Typography align='left'>
                            {entitiesForRights[right.entity as keyof typeof entitiesForRights]}
                        </Typography>
                        <Checkbox checked={right.create}
                                  disabled={isProfile || right.entity === 'checkupPlanPlace' || !users?.update}
                                  onChange={(e) => handleChange(right.entity, 'create', e.target.checked)}/>
                        <Checkbox checked={right.read}
                                  disabled={isProfile || right.entity === 'checkupPlanPlace' || !users?.update}
                                  onChange={(e) => handleChange(right.entity, 'read', e.target.checked)}/>
                        <Checkbox checked={right.update}
                                  disabled={isProfile || right.entity === 'checkupPlanPlace' || !users?.update}
                                  onChange={(e) => handleChange(right.entity, 'update', e.target.checked)}/>
                        <Checkbox checked={right.delete} disabled={isProfile || !users?.update}
                                  onChange={(e) => handleChange(right.entity, 'delete', e.target.checked)}/>
                    </React.Fragment>)}
                    {errorMessage && <Typography color='secondary'>
                        {errorMessage}
                    </Typography>}
                </div>
                <div className='save-button'>
                    <CommonButton title='Сохранить'
                                  onClick={() => dispatch(updatePrimaryData(email, speciality, phone, name))}/>
                </div>
                <Typography align={'left'} m={2}>Фильтр по периодам посещения</Typography>
                <Box marginY={2} display='flex' alignItems='center' gap={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                        <div>
                            <DatePicker
                                mask='__.__.____'
                                value={searchPeriod.from}
                                toolbarPlaceholder='01.01.2025'
                                label='Период начала'
                                onChange={(newValue: any) => setSearchPeriod(state => ({...state, from: newValue}))}
                                onError={(newError) => setDateError(newError)}
                                renderInput={(params: any) => <TextField {...params} size='small'/>}
                                inputFormat="dd-MM-yyyy"
                            />
                        </div>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                        <div>
                            <DatePicker
                                mask='__.__.____'
                                value={searchPeriod.to}
                                toolbarPlaceholder='01.01.2025'
                                label='Период конца'
                                onChange={(newValue: any) => setSearchPeriod(state => ({...state, to: newValue}))}
                                onError={(newError) => setDateError(newError)}
                                renderInput={(params: any) => <TextField {...params} size='small'/>}
                                inputFormat="dd-MM-yyyy"
                            />
                        </div>
                    </LocalizationProvider>
                    <Button onClick={handlePeriodsFilter}>Применить</Button>
                    <Button>Сбросить</Button>
                </Box>
                {UserSessions.length > 0 && <div>
                </div>}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Время входа
                            </TableCell>
                            <TableCell>
                                Время выхода
                            </TableCell>
                            <TableCell>
                                Длительность
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {UserSessions.length > 0 && UserSessions.map(session => {
                            const date = new Date(session.connectedAt).toLocaleDateString();
                            const time = new Date(session.connectedAt).toLocaleTimeString();
                            const connnectedAt = `${date} ${time}`;
                            const dateOut = session.disconnectedAt ? new Date(session.disconnectedAt).toLocaleDateString() : 0;
                            const timeOut = session.disconnectedAt ? new Date(session.disconnectedAt).toLocaleTimeString() : '';
                            const disconnnectedAt = `${dateOut} ${timeOut}`;
                            return <TableRow>
                                <TableCell>
                                    {connnectedAt}
                                </TableCell>
                                <TableCell>
                                    {disconnnectedAt}
                                </TableCell>
                                <TableCell>
                                    {formatDuration(session.connectedAt, session.disconnectedAt)}
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </div> : <div className="user-item-loader"><Typography>{errorMessage}</Typography></div>}

        </div>
}
export default UserItemScreen