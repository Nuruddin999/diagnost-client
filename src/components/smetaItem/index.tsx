import React, {FC} from "react";
import {useManageSmetaItem} from "../../common/hooks/useManageSmetaItem";
import './style.smetaitem.scss'
import {Box, Typography} from "@mui/material";
import PatientDoctor from "./patient_doctor";
import SmetaRoadCostItem from "./smeta_road_cost_item";
import SmetaAccomodationItem from "./smeta_accomodation_table"
import SmetaMealCostItem from "./smeta_meals_cost";
import SmetaTransportCostItem from "./smeta_transport_costs";
import SmetaMedCostItem from "./smeta_med_cost";
import SmetaAdditionalCosts from "./smeta_additional_costs";
import {CommonButton as Button} from "../../common/components/button"
import {RoundLoader} from "../../common/components/roundloader";
import BasicModal from "../../common/components/modal/ConsiliumModal";



const SmetaItem: FC = () => {
    const {
        smetaItem,
        handleChangeSmetaItem,
        isLoading,
        updateSmetaItem,
        respStatus,
        setRespStatus,
        error,
        setErrorMessage
    } = useManageSmetaItem()
    const {
        diagnosis,
        patientBirthDate,
        patientName,
        Smetasecdiags,
        Smetaroadcosts,
        Smetaroaccomodations,
        Smetamealcosts,
        Smetaplans,
        Smetacosts,
        Smetatransportcosts,
        managerName,
        managerSpeciality
    } = smetaItem

    const handleupdate = async () => {
        await updateSmetaItem()
    }

    if (isLoading) {
        return <RoundLoader/>
    }
    return <div className={'smeta-item'}>
        <Typography variant={'h4'}>
            Формирование сметы др
        </Typography>
        <PatientDoctor handleChangeSmetaItem={handleChangeSmetaItem} patientName={patientName}
                       patientBirthDate={patientBirthDate} diagnosis={diagnosis} smetasecdiags={Smetasecdiags}
                       manager={managerName} managerSpeciality={managerSpeciality}/>
        <SmetaMedCostItem
            data={Smetaplans}
            handleChangeSmeta={handleChangeSmetaItem}
            headers={[
                {hdr: "Название", field: 'kind'},
                {hdr: 'Поставщик', field: 'supplier'},
                {hdr: 'Телефон', field: 'phone'},
                {hdr: "Адрес", field: 'address'},
                {hdr: "Кол-во", field: 'qty'},
                {hdr: "Стоимость", field: 'price'},
                {hdr: "Общая стоимость", field: 'totalCost'},
                {hdr: "Источник информации", field: 'infoSrc'}]}
        />
        <SmetaRoadCostItem
            data={Smetaroadcosts}
            handleChangeSmeta={handleChangeSmetaItem}
            headers={[
                {hdr: "Вид транспорта", field: 'vehicle'},
                {hdr: 'Откуда', field: 'directionFrom'},
                {hdr: 'Куда', field: 'directionTo'},
                {hdr: "Дата отправления", field: 'departureDate', isDate: true},
                {hdr: "Кол-во билетов", field: 'ticketQty'},
                {hdr: "Стоимость", field: 'cost'},
                {hdr: "Общая стоимость", field: 'totalCost'},
                {hdr: "Источник информации", field: 'infoSrc'}]}
        />
        <div className='entity-table'>
            <SmetaAccomodationItem
                data={Smetaroaccomodations}
                handleChangeSmeta={handleChangeSmetaItem}
                headers={[
                    {hdr: "Название услуги", field: 'serviceName'},
                    {hdr: 'Город', field: 'city'},
                    {hdr: "Кол-во людей", field: 'peopleQty'},
                    {hdr: "Вьезд", field: 'inData', isDate: true},
                    {hdr: "Выезд", field: 'outData', isDate: true},
                    {hdr: "Цена 1 дня", field: 'costPerDay'},
                    {hdr: "Общая стоимость", field: 'totalCost'},
                    {hdr: "Источник информации", field: 'infoSrc'}]}
            />
        </div>
        <div className='entity-table'>
            <SmetaMealCostItem
                data={Smetamealcosts}
                handleChangeSmeta={handleChangeSmetaItem}
                headers={[
                    {hdr: "Место питания", field: 'placeName'},
                    {hdr: 'Город', field: 'city'},
                    {hdr: "Кол-во людей", field: 'peopleQty'},
                    {hdr: "Кол-во дней", field: 'daysQty'},
                    {hdr: "Стоимость 1 дня", field: 'costPerDay'},
                    {hdr: "Общая стоимость", field: 'totalCost'},
                    {hdr: "Источник информации", field: 'infoSrc'}]}
            />
        </div>
        <div className='entity-table'>
            <SmetaTransportCostItem
                data={Smetatransportcosts}
                handleChangeSmeta={handleChangeSmetaItem}
                headers={[
                    {hdr: "Вид транспорта", field: 'transportKind'},
                    {hdr: 'Откуда/Куда', field: 'fromTo'},
                    {hdr: "Кол-во поездок", field: 'tripsQty'},
                    {hdr: "Кол-во людей", field: 'peopleQty'},
                    {hdr: "Стоимость поездки", field: 'costPerTrip'},
                    {hdr: "Общая стоимость", field: 'totalCost'},
                    {hdr: "Источник информации", field: 'infoSrc'}]}
            />
        </div>
        <div className='entity-table'>
            <SmetaAdditionalCosts
                data={Smetacosts}
                handleChangeSmeta={handleChangeSmetaItem}
                headers={[
                    {hdr: "Наименование", field: 'name'},
                    {hdr: 'Основание', field: 'reason'},
                    {hdr: "Сумма", field: 'sum'},
                ]}
            />
        </div>
        <div className={'save-button'}>
            <Button title={"Сохранить"} onClick={handleupdate}/>
        </div>
        <BasicModal
            open={respStatus === 'ok' || error !== ""}
            onClose={() => {
                setRespStatus("")
                setErrorMessage("")
            }}
            body={<Box>
                <Typography id="modal-modal-title" variant="h6" component="h3" color={error ? 'error' : 'primary'}
                            align={error ? 'left' : 'center'}>
                    {error !== ""  && error}
                    {respStatus === 'ok' && 'Сохранено'}
                </Typography>
            </Box>}
        />
    </div>
}

export default SmetaItem