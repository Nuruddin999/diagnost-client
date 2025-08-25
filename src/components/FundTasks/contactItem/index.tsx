import React, {FC, useEffect, useRef} from "react";
import Box from "@mui/material/Box";
import {Button, Checkbox, TextField, Typography} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {ContactType} from "../newTask";

const ExpandTitle: React.FC<{ title: string }> = ({title}) => <Box
    display={'flex'}
    alignItems={'center'}
    data-testid="typetitle"
>
    <Typography align={'left'}>{title}</Typography>
    <KeyboardArrowDownIcon/>
</Box>


const ItemWrapper = ({title, children}: {
    title: string,
    children: JSX.Element | JSX.Element[] | (() => (JSX.Element))
}) => {
    return <Box
        marginTop={2}
        display={'flex'}
        alignItems={'baseline'}
        gap={2}>

        <Typography sx={{flex: 1}}>{title}</Typography>
        {children}
    </Box>
}

const inputProps = {
    disableUnderline: false,
    sx: {
        "&::placeholder": {
            opacity: 1,
            transition: "opacity 0.2s",
        },
        "&:focus-within::placeholder": {
            opacity: 0,
        },
    },
}

const inputSx = {
    width: 'calc(100% - 96px)', flex: 4,
    "& .MuiInput-underline:before": {
        borderBottom: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderBottom: "none",
    },
    "& .MuiInput-underline:after": {
        borderBottom: "2px solid #1976d2", // Цвет при фокусе
    },
    "& input::placeholder": {
        opacity: 1,
        transition: "opacity 0.2s",
    },
    "& input:focus::placeholder": {
        opacity: 0,
    },
}

const ContactItem: FC<{
    data?: ContactType,
    addContact: (contact: ContactType) => void,
    sx?: Record<string, string>
}> = ({data, addContact, sx}) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const [contactAdd, setContactAdd] = React.useState<{
        isOpenType: boolean,
        isBottom: boolean,
        contact: ContactType
    }>({
        isOpenType: false,
        isBottom: false,
        contact: {
            name: "",
            phone: "",
            address: "",
            speciality: '',
            birthdate: today,
            company: "",
            type: [],
            email: ''
        }
    })

    const isFirstRender = useRef<boolean>(true)

    const {
        name, phone, address, speciality, birthdate,
        company, type, email
    } = contactAdd.contact

    const handleAddContact = () => {
        addContact(contactAdd.contact)
        setContactAdd({
            isOpenType: false,
            isBottom: false,
            contact: {
                name: "",
                phone: "",
                address: "",
                speciality: '',
                birthdate: today,
                company: "",
                type: [],
                email: ''
            }
        })
    }

    useEffect(() => {
        if (data) {
            setContactAdd(prev => ({...prev, contact: data}))

        }
    }, [data]);


    useEffect(() => {

        if (isFirstRender.current && data) {
            isFirstRender.current = false;
            return;
        }

        let isNoChange = true;
        for (const argumentsKey in contactAdd.contact) {
            const fieldValue = contactAdd.contact[argumentsKey as keyof ContactType]
            const isNotDateAndType = argumentsKey !== 'type' && argumentsKey !== 'birthdate'
            if (data) {

                const isNotTypeChanged = isNotDateAndType && (data[argumentsKey as keyof ContactType] !== fieldValue)
                const isTypeChanged = argumentsKey === 'type' &&  contactAdd.contact.type.length > 0 && (data.type.length !== contactAdd.contact.type.length)
                const isDayChanged = contactAdd.contact.birthdate.getDate()  !== data.birthdate.getDate()
                const isMonthChanged = contactAdd.contact.birthdate.getMonth() !== data.birthdate.getMonth()
                const isYearChanged = contactAdd.contact.birthdate.getFullYear() !== data.birthdate.getFullYear()
                const isDateChanged = argumentsKey === 'birthdate' && (isDayChanged || isMonthChanged || isYearChanged)

                if (isNotTypeChanged || isTypeChanged || isDateChanged) {
                    isNoChange = false;
                    setContactAdd(prev => ({...prev, isBottom: true}))
                }

            } else  {

                const isNotTypeChanged = isNotDateAndType && (fieldValue !== "")
                const isTypeChanged = argumentsKey === 'type' && (contactAdd.contact.type.length > 0)
                const isDayChanged = contactAdd.contact.birthdate.getDate() !== today.getDate()
                const isMonthChanged = contactAdd.contact.birthdate.getMonth() !== today.getMonth()
                const isYearChanged = contactAdd.contact.birthdate.getFullYear() !== today.getFullYear()
                const isDateChanged = argumentsKey === 'birthdate' && (isDayChanged || isMonthChanged || isYearChanged)

                if (isNotTypeChanged || isTypeChanged || isDateChanged) {
                    isNoChange = false;
                    setContactAdd(prev => ({...prev, isBottom: true}))
                }
            }
        }

        if (isNoChange) {
            setContactAdd(prev => ({...prev, isBottom: false}))
        }


    }, [name, phone, address, speciality, birthdate, company, type, email]);


    const typesList = contactAdd.contact.type
    return <Box sx={{width: 'calc(100% - 32px)', margin: "0 16px 0", ...sx}}>
        <Box display={'flex'} alignItems={'baseline'} gap={2}>
            <Box width={40}
                 height={30}
                 sx={{borderRadius: "50%", border: "1px solid #3755fa", padding: "2px"}}
                 display={"flex"}
                 alignItems={'center'}
                 justifyContent={'center'}
            >
                <Typography fontSize={24} sx={{color: '#3755fa;'}}>+</Typography>
            </Box>
            <TextField
                variant="standard"
                placeholder="Добавить контакт"
                value={contactAdd.contact.name}
                fullWidth
                onChange={(e: any) => setContactAdd(prev => ({
                    ...prev,
                    contact: {...prev.contact, name: e.target.value}
                }))}
                InputProps={inputProps}
                sx={inputSx}
            />
        </Box>
        <ItemWrapper title={'Компания'}>
            <TextField
                variant={'standard'}
                placeholder={'Добавить компанию'}
                size={'small'}
                value={contactAdd.contact.company}
                multiline
                maxRows={5}
                onChange={(e: any) => setContactAdd(prev => ({
                    ...prev,
                    contact: {...prev.contact, company: e.target.value}
                }))}
                InputProps={inputProps}
                sx={inputSx}
            />
        </ItemWrapper>
        {[{phone: 'Телефон'}, {email: 'Email'}, {speciality: 'Должность'}].map((item: any, index: number) => {
            const field: string = Object.keys(item)[0]
            return <ItemWrapper title={field}>
                <TextField
                    variant="standard"
                    placeholder="..."
                    fullWidth
                    value={contactAdd.contact[field as keyof typeof contactAdd.contact]}
                    onChange={(e: any) => setContactAdd(prev => ({
                        ...prev,
                        contact: {...prev.contact, [field]: e.target.value}
                    }))}
                    InputProps={inputProps}
                    sx={inputSx}
                />
            </ItemWrapper>
        })}
        <Box marginTop={2} display={'flex'} alignItems={'baseline'} gap={2} sx={{position: "relative"}}>
            <Typography sx={{flex: 1}}>Тип</Typography>
            <Box sx={{flex: 4, display: 'flex'}}>
                {!contactAdd.isOpenType ?
                    <Box
                        sx={{marginRight: "auto", cursor: 'pointer'}}
                        data-testid="contactType"
                        onClick={() => setContactAdd(prev => ({...prev, isOpenType: true}))}
                    >
                        {typesList.length > 0 ?
                            <Box>
                                {typesList.map((item: any, index: number) =>
                                    index === 0 ?
                                        <ExpandTitle title={item}/>
                                        :
                                        <Typography
                                            align={'left'}>{item}
                                        </Typography>)}
                            </Box>

                            :
                            <ExpandTitle title={'Выбрать'}/>}
                    </Box> :
                    <Box

                        position="absolute"
                        top={0}
                        right={0}
                        width={300}
                        height={200}
                        className={'typeCard'}
                    >

                        <Button
                            sx={{position: 'absolute', width: 24, height: 24, top: 10, right: 16}}
                            data-testid='closeTypes'
                            onClick={() => setContactAdd(prev => ({...prev, isOpenType: false}))}
                        >
                            <Typography lineHeight={24}>x</Typography>
                        </Button>

                        {[{patient: 'Пациент'}, {provider: 'Представитель'}, {medicalBody: 'Мед учреждение фонда'}, {fundContact: 'Контактное лицо фонда'}, {fundDirector: "Директор фонда"}].map((item: any, index: number) => {
                            const list = contactAdd.contact.type
                            const person = item[Object.keys(item)[0]]
                            const isInList = list.includes(person)
                            const finalList = isInList ? list.filter(el => el !== person) : [...list, person]
                            return <Box
                                marginTop={index > 0 ? 2 : 0}
                                display={'flex'}
                                alignItems={'center'}
                                gap={2}
                            >
                                <Checkbox data-testid='typeCheckbox' checked={isInList} onChange={() => {
                                    setContactAdd(prev => ({
                                        ...prev,
                                        contact: {...prev.contact, type: finalList}
                                    }))
                                }}
                                          sx={{height: 24, padding: 0}}/>
                                <Typography align={"left"} sx={{flex: 4, marginTop: '2px'}}
                                            component={'div'}>{person}</Typography>
                            </Box>
                        })}

                    </Box>}
            </Box>
        </Box>
        <ItemWrapper title={'Адрес'}>
            <TextField
                variant={'standard'}
                InputProps={inputProps}
                sx={inputSx}
                placeholder="..."
                size={'small'}
                multiline
                maxRows={5}
                value={contactAdd.contact.address}
                onChange={(e: any) => setContactAdd(prev => ({
                    ...prev,
                    contact: {...prev.contact, address: e.target.value}
                }))}
            />
        </ItemWrapper>
        <ItemWrapper title={'Дата рождения'}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                <DatePicker
                    mask='__.__.____'
                    value={contactAdd.contact.birthdate}
                    toolbarPlaceholder='19.06.87'
                    onChange={(e: any) => setContactAdd(prev => ({
                        ...prev,
                        contact: {...prev.contact, birthdate: e}
                    }))}
                    renderInput={(params: any) =>
                        <TextField
                            {...params}
                            size='small'
                            fullWidth
                        />}
                    inputFormat="dd.MM.yyyy"
                />
            </LocalizationProvider>
        </ItemWrapper>
        {contactAdd.isBottom && !contactAdd.isOpenType && <Box
            data-testid="addBottom"
            sx={{
                boxSizing: 'border-box',
                width: '482px',
                position: 'fixed',
                bottom: 0,
                left: 0,
                zIndex: 2000,
                background: '#2b2f33',
                padding: '16px',
                marginTop: "90px"
            }}
        >
            <Button data-testid="saveButton" onClick={handleAddContact}>Сохранить</Button>
        </Box>}
    </Box>

}

export default ContactItem