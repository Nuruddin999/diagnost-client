import {Button, IconButton, TextField, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, {Fragment, useEffect, useMemo, useState} from "react";
import {formatPhone, handleKeyDown} from "../../../common/utils";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {selectApplicationUserRights} from "../../../common/selectors/user";
import {changeDeleteOptionAction} from "../../../actions/application";
import {saveCheckupPlan} from "../../../reducers/applicationItemSlice";

const AddForm = ({id}: { id: string }) => {
  const dispatch = useDispatch()
  const [checkupState, setCheckupState] = useState<{
    kind: string,
    supplier: string,
    placeAddress: string,
    placePhone: string,
    placeQty: string,
    placePrice: string,
    placeTotalPrice: string,
    target: string
  }>({
    kind: "",
    supplier: "",
    placeAddress: "",
    placePhone: "",
    placeQty: "",
    placePrice: "",
    placeTotalPrice: "",
    target: ""
  })
  
  const [error, setError] = useState<string>('')
  
  const {
    checkupPlanPlace, applications
  } = useSelector((state: RootState) => selectApplicationUserRights(state)).processedRights
  
  const {checkUpPlaceIsDeleted} = useSelector((state: RootState) => state.applicationItem)
  
  const handleChange = (title: string, field: string) => {
    setCheckupState(prev => ({...prev, [field]: title}))
  }
  
  const {kind, supplier, placeAddress, placePhone, placeQty, placePrice, placeTotalPrice, target} = checkupState;
  
  const addConsliliumDoctor = () => {
    if (!kind.trim() || !supplier.trim() || !target.trim() || !placePhone.trim() || !placePrice.trim() || !placeAddress.trim()) {
      setError('Все поля должны быть заполнены')
      return
    }
    dispatch(saveCheckupPlan({
      kind,
      supplier,
      target,
      address: placeAddress,
      price: placePrice,
      phone: placePhone,
      qty: placeQty,
      totalPrice: placeTotalPrice
    }))
    setCheckupState({
      kind: "",
      supplier: "",
      placeAddress: "",
      placePhone: "",
      placeQty: "",
      placePrice: "",
      placeTotalPrice: "",
      target: ""
    })
  }
  
  
  const bc = useMemo(() => new BroadcastChannel('pdf_channel'), []);
  const sendBroadcastMessage = () => {
    dispatch(changeDeleteOptionAction(id))
    bc.postMessage(checkUpPlaceIsDeleted);
  }
  
  useEffect(() => {
    return () => {
      bc.close();
    };
  }, [bc]);
  
  useEffect(() => {
    if (parseInt(placeQty) && parseInt(placePrice)) {
      const total = parseInt(placeQty) * parseInt(placePrice)
      handleChange(total.toString(), "placeTotalPrice")
    } else {
      handleChange("", "placeTotalPrice")
    }
  }, [placePrice, placeQty]);
  
  return <div className="add-in-table-section">
    <TextField
      value={kind}
      variant='outlined'
      size='small'
      // error={Boolean(error)}
      fullWidth
      placeholder='Вид обследования'
      onChange={(e) => {
        handleChange(e.target.value, "kind")
      }}
    />
    <div className='place'>
      {checkupPlanPlace?.delete &&
          <div>
            {!checkUpPlaceIsDeleted &&
                <IconButton size='small' className='hide-place' onClick={sendBroadcastMessage}>
                    <CloseIcon/>
                </IconButton>}
          </div>
      }
      {!checkUpPlaceIsDeleted ?
        <TextField
          value={supplier}
          variant='outlined'
          size='small'
          // error={Boolean(error)}
          fullWidth
          placeholder='Поставщик'
          multiline
          maxRows={15}
          onChange={(e) => {
            // if (error) {
            //   setError('')
            // }
            handleChange(e.target.value, "supplier")
          }}
        /> : <Button disabled={!checkupPlanPlace?.delete} onClick={sendBroadcastMessage}>показать</Button>}
    </div>
    {!checkUpPlaceIsDeleted &&
        <Fragment>
            <TextField
                value={placeAddress}
                variant='outlined'
                size='small'
              // error={Boolean(error)}
                fullWidth
                placeholder='Адрес'
                multiline
                maxRows={15}
                onChange={(e) => {
                  // if (error) {
                  //   setError('')
                  // }
                  handleChange(e.target.value, "placeAddress")
                }}
            />
            <TextField
                value={placePhone}
                variant='outlined'
                size='small'
              // error={Boolean(error)}
                fullWidth
                placeholder='Телефон'
                onChange={(e) => {
                  // if (error) {
                  //   setError('')
                  // }
                  handleChange(formatPhone(e.target.value), "placePhone")
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' || e.key === 'Delete') {
                    const formattedPhone = handleKeyDown(placePhone)
                    handleChange(formattedPhone, "placePhone")
                  }
                }}
            />
            <TextField
                value={placeQty}
                variant='outlined'
                size='small'
              // error={Boolean(error)}
                fullWidth
                placeholder='Количество'
                onChange={(e) => {
                  // if (error) {
                  //   setError('')
                  // }
                  handleChange(e.target.value, "placeQty")
                }}
            />
            <TextField
                value={placePrice}
                variant='outlined'
                size='small'
              // error={Boolean(error)}
                fullWidth
                placeholder='Цена'
                onChange={(e) => {
                  // if (error) {
                  //   setError('')
                  // }
                  handleChange(e.target.value, "placePrice")
                }}
            />
            <TextField
                value={placeTotalPrice}
                variant='outlined'
                size='small'
              // error={Boolean(error)}
                fullWidth
                placeholder='Общая стоимость'
                onChange={(e) => {
                  // if (error) {
                  //   setError('')
                  // }
                  handleChange(e.target.value, "placeTotalPrice")
                }}
            />

        </Fragment>}
    <TextField
      value={target}
      variant='outlined'
      size='small'
      // error={Boolean(error)}
      fullWidth
      maxRows={5}
      multiline
      placeholder='Цель проведения обследования'
      onChange={(e) => {
        // if (error) {
        //   setError('')
        // }
        handleChange(e.target.value, "target")
      }}
    /> <IconButton disabled={!applications?.update} onClick={addConsliliumDoctor}>
    <AddCircleIcon className='add-in-table-svg '/>
  </IconButton>
    {error && <Typography color='error'>
      {error}
    </Typography>}
  </div>
}


export default AddForm
