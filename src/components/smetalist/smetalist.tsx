import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {getSmetasApi} from "../../api/smetas";
import {SmetasResponseType} from "../../common/types";
import TableHeader from "../../common/components/tableheader/tableHeader";
import "./style.smetalist.scss"
import {selectApplicationUserRights} from "../../common/selectors/user";

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

    const fetchSmetas = async (page: number, limit: number) => {
        const resp = await getSmetasApi(page, 10)
        setSmetas(resp)
    }

    const tableData = ['№', {
        title: 'ФИО пациента',
        field: patientName,
        onChange: setPatientName
    }, 'Дата рождения', {
        title: 'Диагноз',
        field: diagnosis,
        onChange: setDiagnosis
    }, {
        title: 'Представитель',
        field: patientPromoter,
        onChange: setPatientPromoter
    }, 'Дата создания', 'Дата исполнения', 'Удалить']

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
                    <tr>
                        <td>{(page * 10 - 10) + 1 + index}</td>
                        <td>{el.patientName}</td>
                        <td>{new Date(el.patientBirthDate).toLocaleString()}</td>
                        <td>{el.diagnosis}</td>
                        <td>{el.patientPromoter}</td>
                        {/*{role !== 'doctor' && <td>{appl.manager}</td>}*/}
                        {/*<td>{new Date(appl.creationDate).toLocaleString()}</td>*/}
                    </tr>)}
                </tbody>
            </table>
        </div>
    </div>
}

export default Smetalist