import {FC} from "react";
import {useManageSmetaItem} from "../../common/hooks/useManageSmetaItem";
import './style.smetaitem.scss'
import {Typography} from "@mui/material";
import PatientDoctor from "./patient_doctor";
import SmetaTable from "./smeta-table";

const SmetaItem:FC=()=> {
    const {smetaItem, handleChangeSmetaItem} = useManageSmetaItem()
    const {diagnosis, patientBirthDate, patientName, Smetasecdiags,Smetaroadcosts }=smetaItem
    console.log('smetaItem',smetaItem)
    return <div className={'smeta-item'}>
            <Typography variant={'h4'}>
                Формирование сметы др
            </Typography>
        <PatientDoctor handleChangeSmetaItem={handleChangeSmetaItem} patientName={patientName} patientBirthDate={patientBirthDate} diagnosis={diagnosis} smetasecdiags={Smetasecdiags}  />
        {/*<SmetaTable data={Smetaroadcosts} localObj={{}} handleChangeSmeta={handleChangeSmetaItem} headers={["Вид транспорта",'Откуда','Куда',"Дата отправления","Кол-во билетов","Стоимость","Общая стоимость","Источник информации"]} />*/}
    </div>
}

export default SmetaItem