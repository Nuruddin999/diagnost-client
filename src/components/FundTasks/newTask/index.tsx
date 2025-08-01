import React from 'react';
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./style.newtask.scss";
import {Button, Checkbox, TextField, Typography} from "@mui/material";

type NewTaskProps = {
    onClose: (value: React.SetStateAction<boolean>) => void
}

type ContactType = {
    phone?: string,
    email?: string,
    name: string,
    address?: string,
    speciality: string,
    type: string[],
    birthdate: string,
    company?: string,
}

const NewTask = ({onClose}: NewTaskProps) => {

    const [state, setState] = React.useState<{
        patientRequest: string,
        fundRequest: string,
        contacts: ContactType[]
    }>({
        patientRequest: '',
        fundRequest: '',
        contacts: []
    })
    const [contactAdd, setContactAdd] = React.useState<{
        isOpenType: boolean,
        contact: ContactType
    }>({
        isOpenType: false,
        contact: {
            name: "",
            phone: "",
            address: "",
            speciality: '',
            birthdate: "",
            company: "",
            type: [],
            email: ''
        }
    })
    return <Box display={"flex"} className={'newTaskWrapper'}>
        <Button
            sx={{position: "fixed", width: '40px', height: '40px', top: 2, right: 2, padding: 2, cursor: 'pointer'}}
            variant={"contained"}
            disableElevation
            onClick={() => onClose(false)}>
            x
        </Button>
        <Box className="leftBlock">
            <div className={'header'}>
                <div className={'taskTitle'}>
                    Сделка № 9999
                </div>
            </div>
            <TextField
                size={'small'}
                sx={{width: "calc(100% - 32px)", margin: "8px auto"}}
                placeholder={'Запрос пациента'}
                multiline
                maxRows={5}
            />

            <TextField
                size={'small'}
                sx={{width: "calc(100% - 32px)", margin: "8px auto"}}
                placeholder={'Запрос фонда'}
                multiline
                maxRows={5}
            />

            <div className={'divider'}/>

            {state.contacts.map((contact: ContactType) => (<Box sx={{padding: ' 0 16px'}}>
                <Typography fontSize={20} fontWeight={'bold'} align={'left'}>{contact.name}</Typography>
                <Box display="flex"  alignItems="center" gap={2}>
                    <Typography fontSize={16}  sx={{color:'gray'}}>Компания</Typography>
                    <Typography fontWeight={'bold'} >{contact.company}</Typography>
                </Box>
                <Box display="flex"  alignItems="center" gap={2}>
                    <Typography fontSize={16}  sx={{color:'gray'}}>Тип Контакта</Typography>
                    <Typography fontWeight={'bold'} >{contact.company}</Typography>
                </Box>
            </Box>))}

            <Box sx={{width: 'calc(100% - 32px)', margin: "0 16px 0"}}>
                <Box display={'flex'} alignItems={'baseline'} gap={2}>
                    <Box width={40}
                         height={30}
                         sx={{borderRadius: "50%", border: "1px solid #3755fa", padding: "2px"}}
                         display={"flex"}
                         alignItems={'center'}
                         justifyContent={'center'}
                         onClick={() => {
                             const list = [...state.contacts, contactAdd.contact];
                             setState(prev => ({...prev, contacts: list}))
                         }}
                    >
                        <Typography fontSize={24} sx={{color: '#3755fa;'}}>+</Typography>
                    </Box>
                    <TextField
                        variant={'standard'}
                        sx={{width: 'calc(100% - 0px)'}}
                        placeholder={'Добавить контакт'}
                        value={contactAdd.contact.name}
                        onChange={(e: any) => setContactAdd(prev => ({
                            ...prev,
                            contact: {...prev.contact, name: e.target.value}
                        }))}
                    />
                </Box>
                <Box marginTop={2} display={'flex'} alignItems={'baseline'} gap={2}>
                    <Typography sx={{flex: 1}}>Компания</Typography>
                    <TextField
                        variant={'standard'}
                        sx={{width: 'calc(100% - 96px)', flex: 4}}
                        placeholder={'Добавить компанию'}
                        size={'small'}
                        multiline
                        maxRows={5}
                        onChange={(e: any) => setContactAdd(prev => ({
                            ...prev,
                            contact: {...prev.contact, company: e.target.value}
                        }))}
                    />
                </Box>
                {[{phone: 'Телефон'}, {email: 'Email'}, {speciality: 'Должность'}].map((item: any, index: number) => {
                    const field: string = item[Object.keys(item)[0]]
                    return <Box marginTop={2}
                                display={'flex'}
                                alignItems={'baseline'}
                                gap={2}>
                        <Typography sx={{flex: 1}}>{field}</Typography>
                        <TextField
                            variant={'standard'}
                            sx={{width: 'calc(100% - 96px)', flex: 4}}
                            placeholder={'Добавить контакт'}
                            size={'small'}
                            multiline
                            maxRows={5}
                            value={contactAdd.contact[field as keyof typeof contactAdd.contact]}
                            onChange={(e: any) => setContactAdd(prev => ({
                                ...prev,
                                contact: {...prev.contact, [field]: e.target.value}
                            }))}
                        />
                    </Box>
                })}
                <Box marginTop={2} display={'flex'} alignItems={'baseline'} gap={2} sx={{position: "relative"}}>
                    <Typography sx={{flex: 1}}>Тип</Typography>
                    <Box sx={{flex: 4, display: 'flex'}}>
                        {!contactAdd.isOpenType ?
                            <Box
                                sx={{marginRight: "auto", cursor: 'pointer'}}
                                onClick={() => setContactAdd(prev => ({...prev, isOpenType: true}))}
                            >
                                <Box
                                    display={'flex'}
                                    alignItems={'center'}
                                >
                                    <Typography align={'left'}>Выбрать</Typography>
                                    <KeyboardArrowDownIcon/>
                                </Box>
                            </Box> : <Box

                                position="absolute"
                                top={0}
                                right={0}
                                width={300}
                                height={200}
                                className={'typeCard'}
                            >

                                <Button
                                    sx={{position: 'absolute', width: 24, height: 24, top: 10, right: 16}}
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
                                        <Checkbox checked={isInList} onChange={() => {
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
                <Box marginTop={2}
                     display={'flex'}
                     alignItems={'baseline'}
                     gap={2}>
                    <Typography sx={{flex: 1}}>Адрес</Typography>
                    <TextField
                        variant={'standard'}
                        sx={{width: 'calc(100% - 96px)', flex: 4}}
                        placeholder={'Добавить адрес'}
                        size={'small'}
                        multiline
                        maxRows={5}
                        value={contactAdd.contact.address}
                        onChange={(e: any) => setContactAdd(prev => ({
                            ...prev,
                            contact: {...prev.contact, address: e.target.value}
                        }))}
                    />
                </Box>

            </Box>


        </Box>
        <Box>

        </Box>
    </Box>
}

export default NewTask;