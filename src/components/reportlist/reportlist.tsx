/* eslint-disable react-hooks/exhaustive-deps */
import { Typography, Pagination, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import './style.reportlist.scss'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import AddModal from "./add_modal";
import { IconButton, Box } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useHistory } from "react-router-dom";
import { openModal, setStatus, openManagerChangeModal } from "../../reducers/ui";
import { isEmpty } from "lodash";
import { selectApplicationUserRights } from "../../common/selectors/user";
import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import ManagerChangeModal from "./manager_change_modal";
import { useFetchApplications } from "../../common/hooks/useFetchApplications";
import TableHeader from "../../common/components/tableheader/tableHeader";
import BasicModal from "../../common/components/modal/ConsiliumModal";
import { CommonButton } from "../../common/components/button";
import PaginationComponent from "../../common/components/pagination";

const ReportList = (): React.ReactElement => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {
        isModalOpened, status, errorMessage,
        isManagerChangeModalOpened
    } = useSelector((state: RootState) => state.ui)
    const { appls, isLoading, fetchApp, error, id, role, deleteAppl } = useFetchApplications()
    const rights = useSelector((state: RootState) => selectApplicationUserRights(state))
    const [page, setPage] = React.useState(1);
    const [patientName, setPatientName] = React.useState('');
    const [patientRequest, setPatientRequest] = React.useState('');
    const [fundRequest, setFundRequest] = React.useState('');
    const [fundName, setFundName] = React.useState('');
    const [manager, setManager] = React.useState('');
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
        }, { title: 'Название фонда', field: fundName, onChange: setFundName }, {
            title: 'Запрос фонда',
            field: fundRequest,
            onChange: setFundRequest
        }, { title: 'Ответственный', field: manager, onChange: setManager }, 'Дата создания', 'Дата исполнения', 'Удалить']

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
        {isModalOpened && <AddModal fetchApp={fetchApp} />}
        {isManagerChangeModalOpened && <ManagerChangeModal appls={appls.rows} />}
        <div className='add-button-wrapper'>
            {isManagerChangeModalOpened === undefined && rights.processedRights.applications?.create &&
                <CommonButton
                    onClick={() => dispatch(openModal(true))}
                    title={'Новое заключение'} />}

        </div>
        <div className="appl-table">
            <table>
                <thead>
                    <TableHeader tableData={tableData} role={role}
                        isDeleteRights={rights.processedRights.applications?.delete}
                        isManagerChange={role !== 'doctor'} />
                </thead>
                <tbody>
                    {!isLoading && appls.rows.length > 0 && appls.rows.map((appl: any, index: number) => <tr
                        onClick={() => goToApplItem(appl.id)} key={appl.patientName}>
                        <td>{(page * 10 - 10) + 1 + index}</td>
                        <td>{appl.patientName}</td>
                        <td>{new Date(appl.patientBirthDate).toLocaleString()}</td>
                        <td>{appl.patientRequest}</td>
                        <td>{appl.fundName}</td>
                        <td>{appl.fundRequest}</td>
                        {role !== 'doctor' && <td>{appl.manager}</td>}
                        <td>{new Date(appl.creationDate).toLocaleString()}</td>
                        <td>{appl.execDate && new Date(appl.execDate).toLocaleString()}</td>
                        {(rights.processedRights.applications?.delete) &&
                            <td><IconButton className='delete-button' onClick={(e: any) => {
                                e.stopPropagation()
                                appl.id && setDeleteModal(appl.id)
                            }}>
                                <DeleteOutlineIcon />
                            </IconButton></td>}
                        {role !== 'doctor' && <td><IconButton>
                            <EditIcon onClick={(e: any) => {
                                e.stopPropagation();
                                dispatch(openManagerChangeModal(appl.id))
                            }} /></IconButton>
                        </td>}
                    </tr>)}
                </tbody>
            </table>
        </div>
        {!isLoading && isEmpty(appls) && <div><BlockIcon sx={{ fontSize: '40px', marginTop: '20px' }} /></div>}
        {isLoading && <div><CircularProgress /></div>}
        {!isLoading && error && <Typography sx={{ color: 'red' }}>{errorMessage}</Typography>}
        <BasicModal
            open={(deleteModalId as boolean)}
            onClose={() => setDeleteModal(false)}
            className='delete-modal-block'
            body={<Box className='delete-modal-block'>
                <Typography variant='h5'>
                    Удалить заключение ?
                </Typography>
                <div className='delete-modal-btns'>
                    <CommonButton
                        onClick={() => removeAppl(deleteModalId as number)}
                        color='error'
                        title='Да' />
                    <CommonButton
                        title='Нет'
                        onClick={() => setDeleteModal(false)} />
                </div>
            </Box>} />
        {appls.count > 10 && <div className="pagination">
            <PaginationComponent
                count={appls.count}
                handleChange={handleChange}
            />
        </div>}
    </div>

}
export default ReportList