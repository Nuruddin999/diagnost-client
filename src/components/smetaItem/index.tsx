import React, {FC, useState} from "react";
import {useHistory} from "react-router-dom";
import {useManageSmetaItem} from "../../common/hooks/useManageSmetaItem";
import './style.smetaitem.scss'
import {Box, TextField, Typography} from "@mui/material";
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
import {FileUpload} from "../../common/components/fileupload/fileUpload";
import {FileThumbnail} from "../../common/components/file_thumbnail/file_thumbnail";


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
        updateSmetaStatus,
        handleUploadComment
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
        ReworkComments,
        managerName,
        managerSpeciality,
        totalAllSum,
        status
    } = smetaItem

    const [openCheckConfirmModal, setOpenCheckConfirmModal] = useState(false)
    const [openOnRealizationModal, setOpenOnRealizationModal] = useState(false)
    const [openOnReworkModal, setOpenOnReworkModal] = useState(false)
    const [reworkComment, setReworkComment] = useState('')
    const [files, setFiles] = useState<Array<File>>([])
    const [currentWathFile, setCurrentWatchFile] = useState<number>(-1)
    const history = useHistory();


    const handleupdate = async () => {
        await updateSmetaItem()
    }

    const makeReadyForCheck = async (status: string, callback: (isFalse: boolean) => void) => {
        await updateSmetaStatus(status)
        callback(false)
    }

    const handleModalClose = () => {
        if (openOnRealizationModal) {
            setOpenOnRealizationModal(false);
        } else if (openCheckConfirmModal) {
            setOpenCheckConfirmModal(false);
        }
    };

    const handleConfirm = () => {
        if (openOnRealizationModal) {
            makeReadyForCheck('realization', setOpenOnRealizationModal);
            history.push('/main/smetasonrealization')
        } else if (openCheckConfirmModal) {
            makeReadyForCheck('oncheck', setOpenCheckConfirmModal);
            history.push('/main/smetas')
        }
    };

    const handleUpload = async () => {
        await handleUploadComment(reworkComment, files)
        setOpenOnReworkModal(false)
        history.push('/main/smetasoncheck')
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
        {ReworkComments.length > 0 && <div>
            <Typography align='left' variant='h5'>На доработке</Typography>
            {ReworkComments.map((comment: any, i: number) => {
                return <div key={i}>
                    <Typography variant={"h4"} align={"left"}>
                        Комментарий
                    </Typography>
                    <p className={"rework-comment"}>{comment.comment}</p>
                    <div>
                        <Typography variant={"h5"} align={"left"}>
                            Файлы
                        </Typography>
                        <Box display={"flex"} alignItems={"center"} flexWrap={"wrap"} gap={2}>
                            {comment.ReworkCommentFiles.length > 0 && comment.ReworkCommentFiles.map((file: any, i: number) => {
                                const isOnlyImg = file?.type?.split("/")[0] === 'image'
                                const isCurrentWatch = currentWathFile === i && isOnlyImg
                                return <Box
                                    {...(isCurrentWatch ? {
                                        position:"fixed",
                                        top:"0px",
                                        left:"0px",
                                        width:"100%",
                                        height:"100%",
                                        overflow:"scroll",
                                        zIndex:3700
                                    }:{})}
                                            key={file.id}
                                onClick={()=> {
                                    if (isOnlyImg) {
                                        setCurrentWatchFile(isCurrentWatch ? -1 : i)
                                    }
                                }}
                                    sx={{cursor: "pointer", border:"0.5px solid #f0f0f0", borderRadius:"4px"}}  height={isCurrentWatch? "auto" :451}
                                >
                                    <FileThumbnail
                                        type={file.type}
                                        url={'http://localhost:5001/file/' + file.url}
                                        imgWidth={isCurrentWatch ? "auto":800}
                                        imgHeight={isCurrentWatch? "auto" :451}
                                        videoHeight={451}
                                        videoWidth={800}
                                        pdfWidth={800}
                                        pdfHeight={451}
                                        mswordWidth={800}
                                        mswordHeight={451}
                                    />
                                </Box>
                            })}

                        </Box>
                    </div>
                </div>
            })}
        </div>}
        <div className={'buttons-block'}>
            <Button title={"Сохранить"} onClick={handleupdate}/>
            {status !== 'oncheck' && <Button title={"На проверку"} color={"secondary"} onClick={() => {
                setOpenCheckConfirmModal(true)
            }}/>}
            {status === 'oncheck' && <Button title={"На доработку"} color={"warning"} onClick={() => {
                setOpenOnReworkModal(true)
            }}/>}

            {status === 'oncheck' && <Button title={"На реализацию"} color={"success"} onClick={() => {
                setOpenOnRealizationModal(true)
            }}/>}

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
            open={openCheckConfirmModal || openOnRealizationModal}
            onClose={handleModalClose}
            body={<Box>
                <Typography variant={"h4"}>
                    {`Отправить смету на ${openCheckConfirmModal ? 'проверку директору' : 'реализацию'} ?`}
                </Typography>
                <Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={10} mt={2}>
                    <Button title={"Да"} onClick={handleConfirm}/>
                    <Button title={"Нет"} onClick={handleModalClose} color={"error"}/>
                </Box>
            </Box>}
        />
        <BasicModal
            open={openOnReworkModal}
            onClose={() => setOpenOnReworkModal(false)}
            bodyStyle={{width: '60%'}}
            body={<Box>
                <Typography variant={"h4"}>
                    {`Комментарий`}
                </Typography>
                <TextField
                    multiline
                    maxRows={30}
                    value={reworkComment}
                    fullWidth={true}
                    onChange={(e) => setReworkComment(e.target.value)}
                />
                <Typography variant={"h6"} align={"left"}>
                    {`Файлы`}
                </Typography>
                <FileUpload files={files} setFiles={setFiles} isThumbnails/>
                <Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={10} mt={2}>
                    <Button title={"Отправить"} onClick={handleUpload}/>
                    <Button title={"Отмена"} onClick={() => setOpenOnReworkModal(false)} color={"error"}/>
                </Box>
            </Box>}
        />
    </div>
}

export default SmetaItem