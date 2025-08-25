import React from 'react';
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./style.newtask.scss";
import {Button, TextField, Typography} from "@mui/material";
import ContactItem from "../contactItem";

type NewTaskProps = {
    onClose: (value: React.SetStateAction<boolean>) => void
}
export type ContactType = {
    phone?: string,
    email?: string,
    name: string,
    address?: string,
    speciality: string,
    type: string[],
    birthdate: Date,
    company?: string,
    isExpanded?: boolean,
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



    const addContact = (contact:ContactType) => {
        const list = [...state.contacts, contact];
        setState(prev => ({...prev, contacts: list}))
    }

    const expandContact = (expandIndex:number) => {
        const list = [...state.contacts].map((contact:ContactType, index) => ({...contact, isExpanded: index === expandIndex ? !contact.isExpanded : contact.isExpanded }));
        setState(prev => ({...prev, contacts: list}))
    }


    return <Box display={"flex"} className={'newTaskWrapper'} data-testid="newTask">
        <Button
            sx={{position: "fixed", width: '40px', height: '40px', top: 2, right: 2, padding: 2, cursor: 'pointer'}}
            variant={"contained"}
            disableElevation
            onClick={() => onClose(false)}>
            x
        </Button>
        <Box className="leftBlock"  sx={{overflowY:"scroll"}}>
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

            {state.contacts.map((contact: ContactType, index:number) => (<Box sx={{padding: ' 0 16px 16px'}}>
                <ContactItem addContact={addContact} data={contact} sx={{height: !contact.isExpanded ? '50px':'initial', overflowY: 'hidden'}}/>
                {!contact.isExpanded && <Button  onClick={()=>expandContact(index)}>еще</Button>}
            </Box>))}
            <Box sx={{padding: ' 0 16px 96px'}}>
                <ContactItem addContact={addContact}/>
            </Box>


        </Box>
    </Box>
}

export default NewTask;