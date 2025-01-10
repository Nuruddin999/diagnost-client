import React, {FC, useState} from "react";
import {useManageSmetaItem} from "../../common/hooks/useManageSmetaItem";
import './style.smetaitem.scss'
import {Box,Typography} from "@mui/material";
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
import {PDFButton} from "../../common/components/pdf_icon_button";



const SmetaItem: FC = () => {
    const {
        smetaItem,
        handleChangeSmetaItem,
        isLoading,
        updateSmetaItem,
        respStatus,
        setRespStatus,
        error,
        setErrorMessage,
        moveToDirector
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
        managerSpeciality,
        totalAllSum
    } = smetaItem

    const [openCheckConfirmModal, setOpenCheckConfirmModal] = useState(false)

    const handleupdate = async () => {
        await updateSmetaItem()
    }

    const makeReadyForCheck =async ()=>{
        await moveToDirector()
        setOpenCheckConfirmModal(false)
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
                {hdr: "Общая стоимость", field: 'totalPrice'},
                {hdr: "Источник информации", field: 'infoSrc'}]}
            calculationFields={['qty', 'price']}
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
            calculationFields={['cost', 'ticketQty']}
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
                calculationFields={['costPerDay', 'inData', 'outData', 'peopleQty']}
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
                calculationFields={['costPerDay', 'daysQty', 'peopleQty']}
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
                calculationFields={['costPerTrip', 'tripsQty', 'peopleQty']}
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
        <div className={"total-sum"}>
            <h2>
                Итого:
                <span>
                    {!Number.isNaN(parseInt(totalAllSum)) ? totalAllSum : '   '}
                </span>
                <span>
                   руб.
               </span>
            </h2>
        </div>
        <div className={'buttons-block'}>
            <Button title={"Сохранить"} onClick={handleupdate}/>
            <Button title={"На проверку"} color={"secondary"} onClick={() => {
                setOpenCheckConfirmModal(true)
            }}/>
            <PDFButton url={`http://188.68.220.210:12345/${smetaItem.id}`}/>
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
                    {error !== "" && error}
                    {respStatus === 'ok' && 'Сохранено'}
                </Typography>
            </Box>}
        />
        <BasicModal
            open={openCheckConfirmModal}
            onClose={() => {
                setOpenCheckConfirmModal(false);
            }}
            body={<Box>
                <Typography variant={"h4"}>
                    Отправить смету на проверку директору ?
                </Typography>
                <Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={10} mt={2}>
                    <Button title={"Да"} onClick={() => makeReadyForCheck()} />
                    <Button title={"Нет"} onClick={() => setOpenCheckConfirmModal(false)}  color={"error"}/>
                </Box>
            </Box>}
        />
    </div>
}

export default SmetaItem