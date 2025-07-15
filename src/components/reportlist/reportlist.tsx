/* eslint-disable react-hooks/exhaustive-deps */
import {
    CircularProgress,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import React, {useEffect} from "react";
import './style.reportlist.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import AddModal from "./add_modal";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useHistory} from "react-router-dom";
import {openManagerChangeModal, openModal, setStatus} from "../../reducers/ui";
import {isEmpty} from "lodash";
import {selectApplicationUserRights} from "../../common/selectors/user";
import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ManagerChangeModal from "./manager_change_modal";
import {useFetchApplications} from "../../common/hooks/useFetchApplications";
import BasicModal from "../../common/components/modal/ConsiliumModal";
import DeleteModalBody from "../../common/components/delete_modal_body/DeleteModalBody";
import isObject from "lodash/isObject";
import Box from "@mui/material/Box";

const ReportList = (): React.ReactElement => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {
        isModalOpened, status, errorMessage,
        isManagerChangeModalOpened
    } = useSelector((state: RootState) => state.ui)
    const {appls, isLoading, fetchApp, error, id, role, deleteAppl, updateApplicationManager} = useFetchApplications()
    const rights = useSelector((state: RootState) => selectApplicationUserRights(state))
    const [page, setPage] = React.useState(1);
    const [patientName, setPatientName] = React.useState('');
    const [patientRequest, setPatientRequest] = React.useState('');
    const [fundRequest, setFundRequest] = React.useState('');
    const [fundName, setFundName] = React.useState('');
    const [manager, setManager] = React.useState('');
    const [pagesRange, setPagesRange] = React.useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
    const [deleteModalId, setDeleteModal] = React.useState<boolean | number>(false);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const removeAppl = async (value: number) => {
        await deleteAppl(value)
        setDeleteModal(false)
    };

    const tableData = ['№', {
        title: 'ФИО пациента',
        field: patientName,
        onChange: setPatientName
    }, 'Дата рождения', {
        title: 'Запрос пациента',
        field: patientRequest,
        onChange: setPatientRequest
    }, {title: 'Название фонда', field: fundName, onChange: setFundName}, {
        title: 'Запрос фонда',
        field: fundRequest,
        onChange: setFundRequest
    }, {title: 'Ответственный', field: manager, onChange: setManager}, 'Дата создания', 'Дата исполнения', 'Удалить']

    useEffect(() => {
        if (id !== undefined && id !== '') {
            fetchApp(page, 10, manager, patientName, patientRequest, fundName, fundRequest)
        }
    }, [page, id])

    useEffect(() => {
        if (id !== undefined && id !== '') {
            fetchApp(page, 10, manager, patientName, patientRequest, fundName, fundRequest)
        }
    }, [manager, patientName, patientRequest, fundName, fundRequest])

    useEffect(() => {
        if (status === 'no') {
            setTimeout(() => dispatch(setStatus('')), 1500)
        }
    }, [status])

    /**
     * Переход на отдельное заключение
     * @param {number} id Id заключения.
     */
    const goToApplItem = (id: number | undefined) => {
        history.push(`application/${id}`)
    }
    return <div className='add-appl-container'>
        {isModalOpened && <AddModal fetchApp={fetchApp}/>}
        {isManagerChangeModalOpened &&
            <ManagerChangeModal isLoading={isLoading} updateManager={updateApplicationManager} appls={appls.rows}/>}
        <Box sx={{width: '100%', overflow: "scroll"}}>
            <Box sx={{background: 'white', maxHeight: 'calc(90vh - 48px)', minWidth: "1980px", margin: "8px 16px 0"}}>
                <Table sx={{background: 'white'}} stickyHeader>
                    <TableHead>
                        <TableRow>
                            {tableData.map((row) => <TableCell sx={{color: '#707a8a'}}>
                                {isObject(row) && role !== 'doctor' &&
                                    <Box sx={{backgroundColor: '#f9fafc', borderRadius: '12px'}}>
                                        <input
                                        value={row.field}
                                        placeholder={'Поиск'}
                                        className={'search-input'}
                                        onChange={(e:any)=>row.onChange(e.target.value)}
                                        />
                                    </Box>}
                                {isObject(row) ? row.title : row}
                            </TableCell>)}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!isLoading && appls.rows.length > 0 && appls.rows.map((appl: any, index: number) => <TableRow
                            onClick={() => goToApplItem(appl.id)} key={appl.patientName}>
                            <TableCell>{(page * 10 - 10) + 1 + index}</TableCell>
                            <TableCell>{appl.patientName}</TableCell>
                            <TableCell>{new Date(appl.patientBirthDate).toLocaleString()}</TableCell>
                            <TableCell>{appl.patientRequest}</TableCell>
                            <TableCell>{appl.fundName}</TableCell>
                            <TableCell>{appl.fundRequest}</TableCell>
                            {role !== 'doctor' && <TableCell>{appl.manager}</TableCell>}
                            <TableCell>{new Date(appl.creationDate).toLocaleString()}</TableCell>
                            <TableCell>{appl.execDate && new Date(appl.execDate).toLocaleString()}</TableCell>
                            {(rights.processedRights.applications?.delete) &&
                                <TableCell><IconButton className='delete-button' onClick={(e: any) => {
                                    e.stopPropagation()
                                    appl.id && setDeleteModal(appl.id)
                                }}>
                                    <DeleteOutlineIcon/>
                                </IconButton></TableCell>}
                            {role !== 'doctor' && <TableCell><IconButton>
                                <EditIcon onClick={(e: any) => {
                                    e.stopPropagation();
                                    dispatch(openManagerChangeModal(appl.id))
                                }}/></IconButton>
                            </TableCell>}
                        </TableRow>)}
                    </TableBody>
                </Table>
            </Box>
        </Box>
        {!isLoading && isEmpty(appls) && <div><BlockIcon sx={{fontSize: '40px', marginTop: '20px'}}/></div>}
        {isLoading && <div><CircularProgress/></div>}
        {!isLoading && error && <Typography sx={{color: 'red'}}>{errorMessage}</Typography>}
        <BasicModal
            open={(deleteModalId as boolean)}
            onClose={() => setDeleteModal(false)}
            className='delete-modal-block'
            body={
                <DeleteModalBody
                    setDeleteModal={() => setDeleteModal(false)}
                    removeAppl={() => removeAppl(deleteModalId as number)}
                    entityTitle={"заключение"}
                />
            }
        />
        <Box display='flex' flexDirection='row' alignItems='center' gap={2} justifyContent='center' height={48}>
            <Box
                width={30}
                height={30}
                sx={{cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center"}}
                onClick={() => {
                    if (pagesRange[0] > 0) {
                        setPagesRange(pagesRange.map(el => el - 20))
                    }
                }}>
                <ArrowBackIosIcon/>
            </Box>
            {appls.count > 10 && pagesRange.map(el => <Box width={30} height={30} sx={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
                                                           onClick={(e: any) => handleChange(e, el + 1)}
            >{el + 1}</Box>)}
            <Box
                width={30}
                height={30}
                sx={{cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center"}}
                onClick={() => {
                    if (pagesRange[pagesRange.length - 1] < appls.count) {
                        setPagesRange(pagesRange.map(el => el + 20))
                    }
                }}>
                <ArrowForwardIosIcon/>
            </Box>
        </Box>
        <div className={'add-appl-button'} onClick={() => dispatch(openModal(true))}><Typography
            variant={'h3'} sx={{marginBottom:"calc(50% - 22px)"}}>+</Typography></div>
    </div>

}
export default ReportList