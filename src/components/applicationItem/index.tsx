import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateApplication} from "../../actions/application";
import ConsiliumDoctorsForm from "./consilium_doctors/consiliumDoctors";
import {Button, Typography, IconButton, Box} from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import {RootState} from "../../app/store";
import './style.applicationitem.scss'
import DiagnosticForm from "./diagnostic/consiliumDoctors";
import {initialState, saveApplicationItem} from "../../reducers/applicationItemSlice";
import CheckupPlanForm from "./checkup_plans/checkupPlans";
import Anamnesis from "./anamnesis";
import PatientInfo from "./patientinfo";
import MostProbDiagnosis from "./probable_diagnosis";
import Comments from "./comments";
import {getListItemAction} from "../../common/actions/common";
import {setError, setUserItemStatus} from "../../reducers/ui";
import {RoundLoader} from "../../common/components/roundloader";
import {makeSmetaReadyForCoordApi} from "../../api/smetas";
import BasicModal from "../../common/components/modal/ConsiliumModal";

const ApplicationItem = (): React.ReactElement => {
    const {id} = useParams<{ id: string }>()
    const {userItemStatus, errorMessage} = useSelector((state: RootState) => state.ui)
    const dispatch = useDispatch()
    const isError = errorMessage || userItemStatus === 'no'
    /**
     * Обновляем заключение.
     */
    const handleClick = () => {
        if (errorMessage) {
            dispatch(setError(''))
        }
        dispatch(updateApplication())
    }
    const makeReadyForCoordinator = async () => {
        if (errorMessage) {
            dispatch(setError(''))
        }
        dispatch(setUserItemStatus('pending'))
        const response = await makeSmetaReadyForCoordApi(id)
        dispatch(setUserItemStatus(response.success ? 'movedCoord' : 'no'))
    }
    useEffect(() => {
        dispatch(getListItemAction(id, 'applications', saveApplicationItem))
        return () => {
            dispatch(saveApplicationItem({
                ...initialState,
                fundRequest: '',
                managerId: '',
                updatedAt: '',
                createdAt: '',
                ConsiliumDoctors: [],
                Comments: [{
                    title: 'Куда обратился пациент и с какой помощью',
                    comment: ''
                }, {
                    title: 'Что было им предоставлено, или наоборот, ничего не было предоставлено, только жалоюы и просьбы',
                    comment: ''
                }, {
                    title: 'Какая работа была проделана',
                    comment: ''
                }, {
                    title: 'Почему быоо рекомендовано то, или иное, на основании чего',
                    comment: ''
                }, {
                    title: 'Заключение: "По результатам проделанной работы считаю просьбу подопечного (ой) обоснованной (или нет) и возможной для одобрения (или нет)"',
                    comment: ''
                }],
                Diagnostics: [],
                CheckupPlans: []
            }))
        }
    }, [])

    return userItemStatus === 'pending' ? <RoundLoader/> : <div className="application-item">
        <h2>РЕКОМЕНДАЦИИ ВРАЧА</h2>
        <h4 className='only-for-inner-warning'>(ВНИМАНИЕ! ДОКУМЕНТ ИСКЛЮЧИТЕЛЬНО ДЛЯ ВНУТРЕННЕГО ПОЛЬЗОВАНИЯ
            ОРГАНИЗАЦИИ)
        </h4>
        <PatientInfo/>
        <h3>На основании: </h3>
        <h5> (указать основания: жалобы, симптомы, синдромы подозрения врача и пр.) </h5>
        <Anamnesis/>
        <ConsiliumDoctorsForm/>
        <DiagnosticForm/>
        <MostProbDiagnosis/>
        <h4>На основании проведенного консилиума рекомендован план обследования (ПО):</h4>
        <CheckupPlanForm/>
        <Comments/>
        <Button onClick={handleClick} size='medium' variant='contained' className='save-button'>
            Сохранить
        </Button>
        <Button onClick={makeReadyForCoordinator} size='medium' variant='contained' className='forCoordinate-button'>
            Передать координатору
        </Button>
        <a href={`/flpdf/${id}`} target='_blank' rel="noreferrer"><IconButton size='medium' className='pdf-btn'>
            <PictureAsPdfIcon className='only-for-inner-warning'/>
        </IconButton></a>
        <BasicModal
            open={userItemStatus === 'updated' || userItemStatus === 'movedCoord' ||userItemStatus === 'no'}
            onClose={() => dispatch(setUserItemStatus(''))}
            body={<Box>
                <Typography id="modal-modal-title" variant="h6" component="h3" color={isError ? 'error' : 'primary'}
                            align={isError ? 'left' : 'center'}>
                    {userItemStatus === 'no' && (errorMessage || 'Смета не найдена')}
                    {userItemStatus === 'updated' && 'Сохранено'}
                    {userItemStatus === 'movedCoord' && 'Смета передана'}
                </Typography>
                {userItemStatus === 'no' && !errorMessage && <Typography id="modal-modal-description" sx={{mt: 2}}>
                   Сначала сохраните заключение
                </Typography>}
            </Box>}
        />
    </div>
}
export default ApplicationItem