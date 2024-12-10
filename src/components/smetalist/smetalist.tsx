import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {getSmetasApi} from "../../api/smetas";
import {SmetasResponseType} from "../../common/types";
import TableHeader from "../../common/components/tableheader/tableHeader";
import "./style.smetalist.scss"
import {selectApplicationUserRights} from "../../common/selectors/user";
import {useHistory} from "react-router-dom";
import PaginationComponent from "../../common/components/pagination";
import {IconButton} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Smetalist = (): React.ReactElement => {
    const [smetas, setSmetas] = React.useState<SmetasResponseType>()
    const [isLoading, setIsLoading] = React.useState<any>([])
    const [error, setErrorMessage] = useState('')
    const [page, setPage] = React.useState(1);
    const {id, role} = useSelector((state: RootState) => state.user.user)
    const rights = useSelector((state: RootState) => selectApplicationUserRights(state))

    const [patientName, setPatientName] = React.useState('');
    const [diagnosis, setDiagnosis] = React.useState('');
    const [patientPromoter, setPatientPromoter] = React.useState('');
    const [deleteModalId, setDeleteModal] = React.useState<boolean | number>(false);
    const history = useHistory()

    const fetchSmetas = async (page: number, limit: number) => {
        const resp = await getSmetasApi(page, 10)
        setSmetas(resp)
    }

    const tableData = ['№', {
        title: 'ФИО пациента',
        field: patientName,
        onChange: setPatientName
    }, 'Дата рождения',{
        title: 'Телефон',
        field: patientPromoter,
        onChange: setPatientPromoter
    },
        {
        title: 'Представитель',
        field: patientPromoter,
        onChange: setPatientPromoter
    }, {
            title: 'Запрос пациента',
            field: patientPromoter,
            onChange: setPatientPromoter
        }, {
            title: 'Запрос фонда',
            field: patientPromoter,
            onChange: setPatientPromoter
        },{
            title: 'Статус',
            field: patientPromoter,
            onChange: setPatientPromoter
        }, {
            title: 'Заказчик',
            field: patientPromoter,
            onChange: setPatientPromoter
        },'Удалить']

    const goSmetaItem = (id: number | undefined) => {
        history.push(`smeta/${id}`)
    }

    const fetchApp = async (page: number, limit: number) => {
        setIsLoading(true)
        try {
            await fetchSmetas(page, limit)
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
            fetchApp(page, 10)
        }
    }, [page, id])

    return <div className='smetas-container'>
        <div className="smetas-table">
            <table>
                <thead>
                <TableHeader tableData={tableData} role={role} isDeleteRights={rights.processedRights.applications?.delete}/>
                </thead>
                <tbody>
                {smetas?.rows.map((el,index) =>
                    <tr   onClick={() => goSmetaItem(el.id)} key={el.patientName}>
                        <td>{(page * 10 - 10) + 1 + index}</td>
                        <td>{el.patientName}</td>
                        <td>{new Date(el.patientBirthDate).toLocaleString()}</td>
                        <td>{el.patientPhone}</td>
                        <td>{el.patientPromoter}</td>
                        <td>{el.patientRequest}</td>
                        <td>{el.fundRequest}</td>
                        <td>{el.status}</td>
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
        {smetas?.count && smetas?.count > 10 && <PaginationComponent count={smetas.count} handleChange={handleChange}/>}
    </div>
}

export default Smetalist