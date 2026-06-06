import React, {Fragment, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {Button, IconButton, TextField, Typography} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {changeCheckupPlan, deleteCheckupPlan, saveCheckupPlan} from "../../../reducers/applicationItemSlice";
import './style.checkupplans.scss'
import NoResult from "../../no-result/no-result";
import CloseIcon from '@mui/icons-material/Close';
import {selectApplicationUserRights} from "../../../common/selectors/user";
import {changeDeleteOptionAction} from "../../../actions/application";
import {CheckupPlanDetailType} from "../../../common/types";
import {formatPhone, handleKeyDown} from "../../../common/utils";
import {Controller, useFieldArray, useFormContext, useWatch} from "react-hook-form";
import TotalPriceCell from "./checkupPlanRow/TotalPriceCell";
import {testCheckupPlans} from "../../../constants";


const CheckupPlanForm = (): React.ReactElement => {
  const dispatch = useDispatch()
  const {control, register, setValue, handleSubmit, resetField} = useFormContext();
  
  const {checkupPlans, id, checkUpPlaceIsDeleted} = useSelector((state: RootState) => state.applicationItem)
  const {
    applications,
    checkupPlanPlace
  } = useSelector((state: RootState) => selectApplicationUserRights(state)).processedRights
  const [target, setTarget] = useState('')
  const [placePhone, setPlacePhone] = useState('')
  const [error, setError] = useState('')
  const bc = useMemo(() => new BroadcastChannel('pdf_channel'), []);
  const addConsliliumDoctor = (data: any) => {
    // Из собранных данных формы достаем нашу группу полей addForm
    const { addForm } = data;
    
    //Ваша валидация: проверяем, что все нужные поля заполнены
    if (
      !addForm?.kind?.trim() ||
      !addForm?.supplier?.trim() ||
      !addForm?.target?.trim() ||
      !addForm?.placePhone?.trim() ||
      !addForm?.placePrice?.trim() ||
      !addForm?.placeAddress?.trim()
    ) {
      setError('Все поля должны быть заполнены');
      return;
    }
    
    // Вместо диспатча в Redux, пушим строку в useFieldArray (в таблицу сверху)
    append({
      kind: addForm.kind,
      supplier: addForm.supplier,
      address: addForm.placeAddress,
      phone: addForm.placePhone,
      qty: addForm.placeQty || "",
      price: addForm.placePrice,
      totalPrice: addForm.placeTotalPrice || "",
      target: addForm.target
    });
    
    // Очищаем всю нижнюю форму добавления одной командой (замена ваших шести setKind(''))
    resetField("addForm", {
      defaultValue: {
        kind: '', supplier: '', placeAddress: '',
        placePhone: '', placeQty: '', placePrice: '',
        placeTotalPrice: '', target: ''
      }
    });
  }
  const deletePlan = (index: number) => {
    dispatch(deleteCheckupPlan(index))
  }
  const sendBroadcastMessage = () => {
    dispatch(changeDeleteOptionAction(id.toString()))
    bc.postMessage(checkUpPlaceIsDeleted);
  }
  
  
  const handleCheckupDetails = (e: any, checkupPlanDetail: CheckupPlanDetailType, field: string) => {
    const {price, phone, target, place, address, kind, supplier, medicine, qty} = checkupPlanDetail.checkupPlan
    const currentValue = field === 'phone' ? formatPhone(e.target.value) : e.target.value
    applications?.update && dispatch(changeCheckupPlan({
      index: checkupPlanDetail.index,
      checkupPlan: {supplier, kind, place, target, price, phone, address, medicine, qty, [field]: currentValue,},
      isTotalPriceEdit: field === 'totalPrice'
    }))
  }
  
  
  const {fields, append, remove, replace} = useFieldArray({
    control,
    name: "checkupPlans" // имя ключа в общем стейте формы
  });
  
  const addQty = useWatch({control, name: "addForm.placeQty"});
  const addPrice = useWatch({control, name: "addForm.placePrice"});
  
  const onAddRow = (data: any) => {
    const {addForm} = data;
    // Валидация теперь может работать автоматически, но можно оставить и ручную:
    if (!addForm.kind?.trim() || !addForm.supplier?.trim() /* ... остальные проверки */) {
      return;
    }
    
    // Вместо Redux-диспатча на каждый символ, просто пушим в массив формы
    append({
      kind: addForm.kind,
      supplier: addForm.supplier,
      address: addForm.placeAddress,
      phone: addForm.placePhone,
      qty: addForm.placeQty,
      price: addForm.placePrice,
      totalPrice: addForm.placeTotalPrice,
      target: addForm.target
    });
    
    // Очищаем только поля нижней формы добавления
    resetField("addForm");
  };
  
  const handleDeleteRow = (index: number) => {
    remove(index); // Удаляем из React Hook Form (без лагов!)
  };
  
  // Автоматический расчет общей стоимости при изменении Кол-ва или Цены
  useEffect(() => {
    const qty = parseInt(addQty) || 0;
    const price = parseInt(addPrice) || 0;
    setValue("addForm.placeTotalPrice", qty && price ? (qty * price).toString() : "");
  }, [addQty, addPrice, setValue]);
  
  useEffect(() => {
    return () => {
      bc.close();
    };
  }, [bc]);
  

  return <div className="checkup-section">
    {fields.length > 0 ? <table>
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
          {['Поставщик', 'Адрес', 'Телефон', 'Кол-во', 'Цена', 'Общая стоимость'].map(el => <th>
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
      {fields.map((field, index) => <tr key={field.id}>
        <td>{index + 1}</td>
        <td align="left">
          <Controller
            name={`checkupPlans.${index}.kind` as any}
            control={control}
            render={({field: inputProps}) => (
              <TextField
                {...inputProps}
                variant='standard'
                size='small'
                fullWidth
                multiline
                maxRows={15}
                placeholder='Вид обследования'
              />
            )}
          />
        </td>
        {!checkUpPlaceIsDeleted && ["supplier", "address",
          "phone", "qty",
          
          "price"].map(el => <td key={el}>
          <Controller
            name={`checkupPlans.${index}.${el}` as any}
            control={control}
            render={({field: inputProps}) => (
              <TextField
                {...inputProps}
                variant='standard'
                size='small'
                fullWidth
                multiline
                maxRows={15}
                // Блокируем ручной ввод для общей стоимости, так как она считается автоматически
                disabled={el === 'totalPrice'}
                onChange={(e) => {
                  // Если это телефон, применяем вашу маску на лету
                  const value = el === 'phone' ? formatPhone(e.target.value) : e.target.value;
                  inputProps.onChange(value);
                }}
                onKeyDown={(e) => {
                  // Ваша логика удаления символов в маске телефона
                  if ((e.key === 'Backspace' || e.key === 'Delete') && el === 'phone') {
                    const formattedPhone = handleKeyDown(inputProps.value);
                    setValue(`checkupPlans.${index}.phone` as any, formattedPhone);
                  }
                }}
              />
            )}
          />
        </td>)}
        <TotalPriceCell index={index} />
        <td>
          <Controller
            name={`checkupPlans.${index}.target` as any}
            control={control}
            render={({field: inputProps}) => (
              <TextField
                {...inputProps}
                variant='standard'
                size='small'
                fullWidth
                multiline
                maxRows={15}
                placeholder='Цель проведения обследования'
              />
            )}
          />
        </td>
        <td>
          <IconButton
            disabled={!applications?.update}
            className='delete-button'
            onClick={() => handleDeleteRow(index)}
          >
            <DeleteOutlineIcon/>
          </IconButton>
        </td>
      </tr>)}
      </tbody>
    </table> : <NoResult/>}
    <Typography>Добавить план обследования в таблицу</Typography>
    <div className="add-in-table-section">
      <Controller
        name="addForm.kind"
        control={control}
        defaultValue=""
        render={({field: inputProps}) => (
          <TextField
            {...inputProps}
            variant='outlined'
            size='small'
            // Если в форме есть общая ошибка валидации, подсвечиваем поле красным
            error={Boolean(error)}
            fullWidth
            placeholder='Вид обследования'
            onChange={(e) => {
              // Если у вас горела ошибка, при вводе текста мы её сбрасываем
              if (error) {
                setError('');
              }
              // Передаем значение в react-hook-form
              inputProps.onChange(e.target.value);
            }}
          />
        )}
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
          <Controller
            name="addForm.supplier"
            control={control}
            defaultValue=""
            render={({field: inputProps}) => (
              <TextField
                {...inputProps}
                variant='outlined'
                size='small'
                // Если в форме есть общая ошибка валидации, подсвечиваем поле красным
                error={Boolean(error)}
                fullWidth
                placeholder='Поставщик'
                onChange={(e) => {
                  // Если у вас горела ошибка, при вводе текста мы её сбрасываем
                  if (error) {
                    setError('');
                  }
                  // Передаем значение в react-hook-form
                  inputProps.onChange(e.target.value);
                }}
              />
            )}
          />
          : <Button disabled={!checkupPlanPlace?.delete} onClick={sendBroadcastMessage}>показать</Button>}
      </div>
      {!checkUpPlaceIsDeleted &&
          <Fragment>
              <Controller
                  name="addForm.placeAddress"
                  control={control}
                  defaultValue=""
                  render={({field: inputProps}) => (
                    <TextField
                      {...inputProps}
                      variant='outlined'
                      size='small'
                      // Если в форме есть общая ошибка валидации, подсвечиваем поле красным
                      error={Boolean(error)}
                      fullWidth
                      placeholder='Адрес'
                      multiline
                      maxRows={15}
                      onChange={(e) => {
                        // Если у вас горела ошибка, при вводе текста мы её сбрасываем
                        if (error) {
                          setError('');
                        }
                        // Передаем значение в react-hook-form
                        inputProps.onChange(e.target.value);
                      }}
                    />
                  )}
              />
              <Controller
                  name="addForm.placePhone"
                  control={control}
                  defaultValue=""
                  render={({field: inputProps}) => (
                    <TextField
                      {...inputProps}
                      variant='outlined'
                      size='small'
                      // Если в форме есть общая ошибка валидации, подсвечиваем поле красным
                      error={Boolean(error)}
                      fullWidth
                      placeholder='Телефон'
                      onChange={(e) => {
                        // Если у вас горела ошибка, при вводе текста мы её сбрасываем
                        if (error) {
                          setError('');
                        }
                        // Передаем значение в react-hook-form
                        inputProps.onChange(formatPhone(e.target.value));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' || e.key === 'Delete') {
                          const formattedPhone = handleKeyDown(placePhone)
                          inputProps.onChange(formattedPhone)
                        }
                      }}
                    />
                  )}
              />
              <Controller
                  name="addForm.placeQty"
                  control={control}
                  defaultValue=""
                  render={({field: inputProps}) => (
                    <TextField
                      {...inputProps}
                      variant='outlined'
                      size='small'
                      // Если в форме есть общая ошибка валидации, подсвечиваем поле красным
                      error={Boolean(error)}
                      fullWidth
                      placeholder='Количество'
                      onChange={(e) => {
                        // Если у вас горела ошибка, при вводе текста мы её сбрасываем
                        if (error) {
                          setError('');
                        }
                        // Передаем значение в react-hook-form
                        inputProps.onChange(e.target.value);
                      }}
                    />
                  )}
              />
              <Controller
                  name="addForm.placePrice"
                  control={control}
                  defaultValue=""
                  render={({field: inputProps}) => (
                    <TextField
                      {...inputProps}
                      variant='outlined'
                      size='small'
                      // Если в форме есть общая ошибка валидации, подсвечиваем поле красным
                      error={Boolean(error)}
                      fullWidth
                      placeholder='Цена'
                      onChange={(e) => {
                        // Если у вас горела ошибка, при вводе текста мы её сбрасываем
                        if (error) {
                          setError('');
                        }
                        // Передаем значение в react-hook-form
                        inputProps.onChange(e.target.value);
                      }}
                    />
                  )}
              />
              <Controller
                  name="addForm.placeTotalPrice"
                  control={control}
                  defaultValue=""
                  render={({field: inputProps}) => (
                    <TextField
                      {...inputProps}
                      variant='outlined'
                      size='small'
                      // Если в форме есть общая ошибка валидации, подсвечиваем поле красным
                      error={Boolean(error)}
                      fullWidth
                      placeholder='Общая стоимость'
                      onChange={(e) => {
                        // Если у вас горела ошибка, при вводе текста мы её сбрасываем
                        if (error) {
                          setError('');
                        }
                        // Передаем значение в react-hook-form
                        inputProps.onChange(e.target.value);
                      }}
                    />
                  )}
              />
          </Fragment>}
      
      <Controller
        name="addForm.target"
        control={control}
        defaultValue=""
        render={({field: inputProps}) => (
          <TextField
            {...inputProps}
            variant='outlined'
            size='small'
            // Если в форме есть общая ошибка валидации, подсвечиваем поле красным
            error={Boolean(error)}
            fullWidth
            placeholder='Цель проведения обследования'
            onChange={(e) => {
              // Если у вас горела ошибка, при вводе текста мы её сбрасываем
              if (error) {
                setError('');
              }
              // Передаем значение в react-hook-form
              inputProps.onChange(e.target.value);
            }}
          />
        )}
      />
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
      /> <IconButton disabled={!applications?.update} onClick={handleSubmit(addConsliliumDoctor)}>
      <AddCircleIcon className='add-in-table-svg '/>
    </IconButton>
    </div>
    {error && <Typography color='error'>
      {error}
    </Typography>}
  </div>
}
export default CheckupPlanForm
