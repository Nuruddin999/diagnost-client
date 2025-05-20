import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {deleteSmetaItemApi, getSmetasApi} from "../../api/smetas";
import {SmetasResponseType} from "../../common/types";
import TableHeader from "../../common/components/tableheader/tableHeader";
import "./style.smetalist.scss"
import {selectApplicationUserRights} from "../../common/selectors/user";
import {useHistory} from "react-router-dom";
import PaginationComponent from "../../common/components/pagination";
import {IconButton} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BasicModal from "../../common/components/modal/ConsiliumModal";
import DeleteModalBody from "../../common/components/delete_modal_body/DeleteModalBody";
import {SMETA_STATUS} from "../../common/constants";

const Smetalist = ({status}: { status: string }): React.ReactElement => {
    const [smetas, setSmetas] = React.useState<SmetasResponseType>()
    const [isLoading, setIsLoading] = React.useState<any>([])
    const [error, setErrorMessage] = useState('')
    const [page, setPage] = React.useState(1);
    const {id, role} = useSelector((state: RootState) => state.user.user)
    const rights = useSelector((state: RootState) => selectApplicationUserRights(state))

    const [patientName, setPatientName] = React.useState('');
    const [patientPhone, setPatientPhone] = React.useState('');
    const [patientRequest, setPatientRequest] = React.useState('');
    const [fundRequest, setFundRequest] = React.useState('');
    const [customer, setCustomer] = React.useState('');
    const [patientPromoter, setPatientPromoter] = React.useState('');
    const [deleteModalId, setDeleteModal] = React.useState<boolean | number>(false);
    const history = useHistory()

    const fetchSmetas = async (page: number, patientName?: string,
                               fundRequest?: string,
                               patientRequest?: string,
                               patientPromoter?: string,
                               customer?: string) => {
        const resp = await getSmetasApi(page, 10, status, patientName, fundRequest, patientRequest, patientPromoter, customer);
        setSmetas(resp)
    }

    const removeSmeta = async (value: number) => {
        try {
            setIsLoading(true)
            await deleteSmetaItemApi(value.toString())
            await fetchApp(page)
            setDeleteModal(false)
        } finally {
            setIsLoading(false)
        }
    };

    const tableData = ['№', {
        title: 'ФИО пациента',
        field: patientName,
        onChange: setPatientName
    }, 'Дата рождения', {
        title: 'Телефон',
        field: patientPhone,
        onChange: setPatientPhone
    },
        {
            title: 'Представитель',
            field: patientPromoter,
            onChange: setPatientPromoter
        }, {
            title: 'Запрос пациента',
            field: patientRequest,
            onChange: setPatientRequest
        }, {
            title: 'Запрос фонда',
            field: fundRequest,
            onChange: setFundRequest
        }, {
            title: 'Статус',
            field: status,
            onChange: ()=>{}
        }, {
            title: 'Заказчик',
            field: customer,
            onChange: setCustomer
        }, 'Удалить']

    const goSmetaItem = (id: number | undefined) => {
        history.push(`smeta/${id}`)
    }

    const fetchApp = async (page: number, patientName?: string,
                            fundRequest?: string,
                            patientRequest?: string,
                            patientPromoter?: string,
                            customer?: string) => {
        setIsLoading(true)
        try {
            await fetchSmetas(page, patientName, fundRequest, patientRequest, patientPromoter, customer);
        } catch (e) {
            setErrorMessage(e?.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    useEffect(() => {
        if (id !== undefined && id !== '') {
            fetchApp(page, patientName, fundRequest, patientRequest, patientPromoter, customer);
        }
    }, [page, id, status])

    useEffect(() => {
        if (id !== undefined && id !== '') {
            fetchApp(page, patientName, fundRequest, patientRequest, patientPromoter, customer);
        }
    }, [patientName, fundRequest, patientRequest, patientPromoter, customer])

    return <div className='smetas-container'>
        <div className="smetas-table">
            <table>
                <thead>
                <TableHeader
                    tableData={tableData}
                    role={role}
                    isDeleteRights={rights.processedRights.applications?.delete}
                />
                </thead>
                <tbody>
                {smetas?.rows.map((el, index) =>
                    <tr onClick={() => goSmetaItem(el.id)} key={el.patientName}>
                        <td>{(page * 10 - 10) + 1 + index}</td>
                        <td>{el.patientName}</td>
                        <td>{new Date(el.patientBirthDate).toLocaleString()}</td>
                        <td>{el.patientPhone}</td>
                        <td>{el.patientPromoter}</td>
                        <td>{el.patientRequest}</td>
                        <td>{el.fundRequest}</td>
                        <td>{SMETA_STATUS[el.status as keyof typeof SMETA_STATUS]}</td>
                        <td>{el.customer}</td>
                        <td>
                            <td><IconButton className='delete-button' onClick={(e: any) => {
                                e.stopPropagation()
                                el.id && setDeleteModal(el.id)
                            }}>
                                <DeleteOutlineIcon/>
                            </IconButton></td>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
        <BasicModal
            open={(deleteModalId as boolean)}
            onClose={() => setDeleteModal(false)}
            className='delete-modal-block'
            body={
                <DeleteModalBody
                    setDeleteModal={() => setDeleteModal(false)}
                    removeAppl={() => removeSmeta(deleteModalId as number)}
                    entityTitle={"смету"}
                />
            }
        />
        {smetas?.count && smetas?.count > 10 && <PaginationComponent count={smetas.count} handleChange={handleChange}/>}
    </div>
}

export default Smetalist