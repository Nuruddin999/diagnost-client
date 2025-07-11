import React, {MutableRefObject, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateApplication} from "../../actions/application";
import ConsiliumDoctorsForm from "./consilium_doctors/consiliumDoctors";
import {Box, Button, Typography} from "@mui/material";
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
import {PDFButton} from "../../common/components/pdf_icon_button";
import {initComments} from "../../common/constants";
import ReworkBlock from "../../common/components/rework_block";
import {sessionHeartBit} from "../../common/api/api";

const ApplicationItem = ({passToCoordRef, timeStartRef, applIdRef}: {
    passToCoordRef: MutableRefObject<string | null>,
    timeStartRef: MutableRefObject<number | null>,
    applIdRef: MutableRefObject<number | null>
},): React.ReactElement => {
    const {id} = useParams<{ id: string }>()
    const {userItemStatus, errorMessage} = useSelector((state: RootState) => state.ui)
    const {id: userId} = useSelector((state: RootState) => state.user.user)
    const {
        reworkComments,
        id: ApplId,
        passToCoordinatorTime,
        managerId
    } = useSelector((state: RootState) => state.applicationItem)
    const dispatch = useDispatch()
    const heartBitTimerRef = React.useRef<any | null>(null);
    passToCoordRef.current = passToCoordinatorTime;
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
        if (response.success) {
            clearInterval(heartBitTimerRef.current)
            heartBitTimerRef.current = null;
        }

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
                Comments: initComments,
                Diagnostics: [],
                CheckupPlans: [],
                ReworkComments: []
            }))

        }
    }, [])

    useEffect(() => {
        const allReady = managerId && userId;

        const shouldStart = !passToCoordinatorTime && allReady && managerId === userId;
        if (shouldStart) {
            heartBitTimerRef.current = setInterval(() => {
                sessionHeartBit(`/upddur`, id, 30000)
            }, 30000)
        }
        return () => {
            if (heartBitTimerRef.current) {
                clearInterval(heartBitTimerRef.current)
                heartBitTimerRef.current = null;
            }
        };
    }, [passToCoordinatorTime, managerId, userId])


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
        {reworkComments.length > 0 && <ReworkBlock reworkComments={reworkComments}/>}
        <Button onClick={handleClick} size='medium' variant='contained' className='save-button'>
            Сохранить
        </Button>
        <Button onClick={makeReadyForCoordinator} size='medium' variant='contained' className='forCoordinate-button'>
            Передать координатору
        </Button>
        <PDFButton url={`/flpdf/${id}`}/>
        <BasicModal
            open={userItemStatus === 'updated' || userItemStatus === 'movedCoord' || userItemStatus === 'no'}
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