import React, { useState, useEffect, useMemo, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { changeCheckupPlan, saveCheckupPlan, deleteCheckupPlan } from "../../../reducers/applicationItemSlice";
import './style.checkupplans.scss'
import NoResult from "../../no-result/no-result";
import CloseIcon from '@mui/icons-material/Close';
import { selectApplicationUserRights } from "../../../common/selectors/user";
import { changeDeleteOptionAction } from "../../../actions/application";
import { CheckupPlanDetailType } from "../../../common/types";
import {formatPhone, handleKeyDown} from "../../../common/utils";


const CheckupPlanForm = (): React.ReactElement => {
    const dispatch = useDispatch()
    const { checkupPlans, id, checkUpPlaceIsDeleted } = useSelector((state: RootState) => state.applicationItem)
    const {
        applications,
        checkupPlanPlace
    } = useSelector((state: RootState) => selectApplicationUserRights(state)).processedRights
    const [kind, setKind] = useState('')
    const [supplier, setSupplier] = useState('')
    const [target, setTarget] = useState('')
    const [placeAddress, setPlaceAddress] = useState('')
    const [placePhone, setPlacePhone] = useState('')
    const [placePrice, setPlacePrice] = useState('')
    const [placeMedicine, setPlaceMedicine] = useState('')
    const [placeQty, setPlaceQty] = useState('')
    const [placeTotalPrice, setPlaceTotalPrice] = useState('')
    const [error, setError] = useState('')
    const bc = useMemo(() => new BroadcastChannel('pdf_channel'), []);
    const addConsliliumDoctor = () => {
        if (!kind.trim() || !supplier.trim() || !target.trim() || !placePhone.trim() || !placePrice.trim() || !placeAddress.trim()) {
            setError('Все поля должны быть заполнены')
            return
        }
        dispatch(saveCheckupPlan({ kind, supplier, target, address: placeAddress, price: placePrice, phone: placePhone, qty: placeQty, totalPrice: placeTotalPrice }))
        setKind('')
        setSupplier('')
        setPlacePrice('')
        setPlaceAddress('')
        setPlacePhone('')
        setTarget('')
    }
    const deletePlan = (index: number) => {
        dispatch(deleteCheckupPlan(index))
    }
    const sendBroadcastMessage = () => {
        dispatch(changeDeleteOptionAction(id.toString()))
        bc.postMessage(checkUpPlaceIsDeleted);
    }


    const handleCheckupDetails = (e: any, checkupPlanDetail: CheckupPlanDetailType, field: string) => {
        const { price, phone, target, place, address, kind, supplier, medicine, qty } = checkupPlanDetail.checkupPlan
        const currentValue = field === 'phone' ? formatPhone(e.target.value) : e.target.value
        applications?.update && dispatch(changeCheckupPlan({
            index: checkupPlanDetail.index,
            checkupPlan: { supplier, kind, place, target, price, phone, address, medicine, qty, [field]: currentValue, },
            isTotalPriceEdit: field === 'totalPrice'
        }))
    }


    useEffect(() => {
        return () => {
            bc.close();
        };
    }, [bc]);

    useEffect(() => {
        if (parseInt(placeQty) && parseInt(placePrice)) {
            const total = parseInt(placeQty) * parseInt(placePrice)
            setPlaceTotalPrice(total.toString())
        } else {
            setPlaceTotalPrice('')
        }
    }, [placePrice, placeQty]);

    return <div className="checkup-section">
        {checkupPlans.length > 0 ? <table>
            <tr>
                <th>
                    <span>
                        №
                    </span>
                </th>
                <th>
                    <span>
                        Вид обследования
                    </span>
                </th>
                {!checkUpPlaceIsDeleted && <Fragment>
                    {['Поставщик', 'Адрес', 'Телефон',  'Кол-во', 'Цена', 'Общая стоимость'].map(el => <th>
                        <span>
                            {el}
                        </span>
                    </th>)}
                </Fragment>}
                <th>Цель проведения обследования</th>
                <th>
                </th>
            </tr>
            <tbody>
                {checkupPlans.length > 0 && checkupPlans.map((checkupPlan, index) => <tr>
                    <td>{index + 1}</td>
                    <td align="left"><TextField
                        value={checkupPlan.kind}
                        variant='standard'
                        size='small'
                        fullWidth
                        multiline
                        maxRows={15}
                        placeholder='Вид обследования'
                        onChange={(e) => handleCheckupDetails(e, { index, checkupPlan }, 'kind')}

                    /></td>
                    {!checkUpPlaceIsDeleted && ["supplier", "address",
                        "phone", "medicine", "qty",

                        "price", "totalPrice"].map(el => <td>
                            <TextField
                                value={checkupPlan[el as keyof typeof checkupPlan]}
                                variant='standard'
                                size='small'
                                fullWidth
                                multiline
                                maxRows={15}
                                onChange={(e) => handleCheckupDetails(e, { index, checkupPlan }, el)}
                                onKeyDown={(e)=>{
                                    if ((e.key === 'Backspace' || e.key === 'Delete') && el === 'phone') {
                                        const formattedPhone = handleKeyDown(checkupPlan[el as keyof typeof checkupPlan])
                                        handleCheckupDetails({target:{
                                            value:formattedPhone
                                            }}, { index, checkupPlan }, el)
                                    }
                                }}
                            />
                        </td>)}
                    <td><TextField
                        value={checkupPlan.target}
                        variant='standard'
                        size='small'
                        fullWidth
                        multiline
                        maxRows={15}
                        placeholder='Цель проведения обследования'
                        onChange={(e) => handleCheckupDetails(e, { index, checkupPlan }, 'target')}
                    /></td>
                    <td><IconButton disabled={!applications?.update} className='delete-button'
                        onClick={() => deletePlan(index)}>
                        <DeleteOutlineIcon />
                    </IconButton></td>
                </tr>)}
            </tbody>
        </table> : <NoResult />}
        <Typography>Добавить план обследования в таблицу</Typography>
        <div className="add-in-table-section">
            <TextField
                value={kind}
                variant='outlined'
                size='small'
                error={Boolean(error)}
                fullWidth
                placeholder='Вид обследования'
                onChange={(e) => {
                    if (error) {
                        setError('')
                    }
                    setKind(e.target.value)
                }}
            />
            <div className='place'>
                {checkupPlanPlace?.delete &&
                    <div>
                        {!checkUpPlaceIsDeleted &&
                            <IconButton size='small' className='hide-place' onClick={sendBroadcastMessage}>
                                <CloseIcon />
                            </IconButton>}
                    </div>
                }
                {!checkUpPlaceIsDeleted ?
                    <TextField
                        value={supplier}
                        variant='outlined'
                        size='small'
                        error={Boolean(error)}
                        fullWidth
                        placeholder='Поставщик'
                        multiline
                        maxRows={15}
                        onChange={(e) => {
                            if (error) {
                                setError('')
                            }
                            setSupplier(e.target.value)
                        }}
                    /> : <Button disabled={!checkupPlanPlace?.delete} onClick={sendBroadcastMessage}>показать</Button>}
            </div>
            {!checkUpPlaceIsDeleted &&
                <Fragment>
                    <TextField
                        value={placeAddress}
                        variant='outlined'
                        size='small'
                        error={Boolean(error)}
                        fullWidth
                        placeholder='Адрес'
                        multiline
                        maxRows={15}
                        onChange={(e) => {
                            if (error) {
                                setError('')
                            }
                            setPlaceAddress(e.target.value)
                        }}
                    />
                    <TextField
                        value={placePhone}
                        variant='outlined'
                        size='small'
                        error={Boolean(error)}
                        fullWidth
                        placeholder='Телефон'
                        onChange={(e) => {
                            if (error) {
                                setError('')
                            }
                            setPlacePhone(formatPhone(e.target.value))
                        }}
                        onKeyDown={(e)=>{
                            if (e.key === 'Backspace' || e.key === 'Delete') {
                                const formattedPhone = handleKeyDown(placePhone)
                                setPlacePhone(formattedPhone)
                            }
                        }}
                    />
                    <TextField
                        value={placeQty}
                        variant='outlined'
                        size='small'
                        error={Boolean(error)}
                        fullWidth
                        placeholder='Количество'
                        onChange={(e) => {
                            if (error) {
                                setError('')
                            }
                            setPlaceQty(e.target.value)
                        }}
                    />
                    <TextField
                        value={placePrice}
                        variant='outlined'
                        size='small'
                        error={Boolean(error)}
                        fullWidth
                        placeholder='Цена'
                        onChange={(e) => {
                            if (error) {
                                setError('')
                            }
                            setPlacePrice(e.target.value)
                        }}
                    />
                    <TextField
                        value={placeTotalPrice}
                        variant='outlined'
                        size='small'
                        error={Boolean(error)}
                        fullWidth
                        placeholder='Общая стоимость'
                        onChange={(e) => {
                            if (error) {
                                setError('')
                            }
                            setPlaceTotalPrice(e.target.value)
                        }}
                    />

                </Fragment>}
            <TextField
                value={target}
                variant='outlined'
                size='small'
                error={Boolean(error)}
                fullWidth
                maxRows={5}
                multiline
                placeholder='Цель проведения обследования'
                onChange={(e) => {
                    if (error) {
                        setError('')
                    }
                    setTarget(e.target.value)
                }}
            /> <IconButton disabled={!applications?.update} onClick={addConsliliumDoctor}>
                <AddCircleIcon className='add-in-table-svg ' />
            </IconButton>
        </div>
        {error && <Typography color='error'>
            {error}
        </Typography>}
    </div>
}
export default CheckupPlanForm