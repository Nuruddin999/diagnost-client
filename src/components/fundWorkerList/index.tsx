import React, {FC, useState} from "react";
import Box from "@mui/material/Box";
import {CommonButton} from "../../common/components/button";
import "./fundworkers.scss"
import Modal from "@mui/material/Modal";
import {Button, Paper, TextField, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {register} from "../../serviceWorker";
import {registerUser} from "../../actions/user";


const FundWorkerList: FC<{}> = () => {
    const [addModal, setAddModal] = useState<boolean>(false)
    const dispatch = useDispatch()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get('fullName') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            phone: formData.get('phone') as string,
            fundName: formData.get('fundName') as string,
            speciality: formData.get('position') as string,
            role:'fundWorker',
            files:[]
        };

        dispatch(registerUser(data));
        setAddModal(false);
    };

    return <Box className={'fundWorkers'}>
        <CommonButton title='Новый пользователь' onClick={() => setAddModal(true)} className={'addButton'}/>
        <Modal open={addModal} onClose={() => setAddModal(false)} disablePortal className={'addModal'}>
            <form onSubmit={handleSubmit}>
                <Paper sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "700px",
                    margin: "auto",
                    padding: "16px",
                }}>
                    <TextField label="ФИО" name="fullName" required />
                    <TextField label="Email" name="email" type="email" required />
                    <TextField label="Пароль" name="password" type="password" required />
                    <TextField label="Телефон" name="phone" required />
                    <TextField label="Название благотворительного фонда" name="fundName" required />
                    <TextField label="Должность" name="position" required />
                    <Button type={'submit'} fullWidth variant={'contained'} disableElevation>Зарегистрировать</Button>
                </Paper>
            </form>
        </Modal>
    </Box>
}

export default FundWorkerList;