import React, {FC, useState} from "react";
import Box from "@mui/material/Box";
import {CommonButton} from "../../common/components/button";
import "./fundworkers.scss"
import Modal from "@mui/material/Modal";
import {Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../actions/user";
import {FundWorkerType} from "../../common/types";
import {useUsers} from "../../common/hooks/useUsers";
import {RootState} from "../../app/store";
import {User} from "../../reducers/userSlice";


const FundWorkerList: FC<{}> = () => {
    const [addModal, setAddModal] = useState<boolean>(false)
    const [data, setData] = useState<{
        queryData: FundWorkerType
        users: Array<FundWorkerType>
    }>({
        users: [], queryData: {
            name: '',
            email: "",
            phone: "",
            fundName: "",
            speciality: "",
        }
    })

    const [extraKeys, setExtraKeys] = useState<Array<string>>([]); // ключи (имена новых полей)
    const [extraValues, setExtraValues] = useState<Record<string, any>>({}); // значения этих полей
    const [newKey, setNewKey] = useState("");
    const {email, fundName, name, phone, speciality} = data.queryData
    const {users, user} = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    const handleAddField = () => {
        if (!newKey || extraKeys.includes(newKey)) return;
        setExtraKeys([...extraKeys, newKey]);
        setNewKey("");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

       console.log(extraValues);
        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get('fullName') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            phone: formData.get('phone') as string,
            fundName: formData.get('fundName') as string,
            speciality: formData.get('position') as string,
            role: 'fundWorker',
            files: [],
            extra:extraValues
        };

        dispatch(registerUser(data));
      //  setAddModal(false);
    }

    useUsers(1, email, name, speciality, phone, 'fundWorker', fundName)

    return <Box className={'fundWorkers'}>
        <CommonButton title='Новый пользователь' onClick={() => setAddModal(true)} className={'addButton'}/>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Typography>
                            №
                        </Typography>
                    </TableCell>
                    {['Имя', 'Почто', 'Телефон', 'Должность', 'Название фонда'].map(el =>
                        <TableCell>
                            <Typography>
                                {el}
                            </Typography>
                        </TableCell>)
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user: User, index: number) => <TableRow>
                    <TableCell><Typography>{index + 1}</Typography></TableCell>
                    <TableCell><Typography>{user.name}</Typography></TableCell>
                    <TableCell><Typography>{user.email}</Typography></TableCell>
                    <TableCell><Typography>{user.phone}</Typography></TableCell>
                    <TableCell><Typography>{user.speciality}</Typography></TableCell>
                    <TableCell><Typography>{user.fundName}</Typography></TableCell>


                </TableRow>)}
            </TableBody>
        </Table>
        <Modal open={addModal} onClose={() => setAddModal(false)} disablePortal className={'addModal'}>
            <div>
                <Paper sx={{
                    width: "700px",
                    margin: "auto",
                    padding: "16px",
                }}>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}>
                            <TextField label="ФИО" name="fullName" required/>
                            <TextField label="Email" name="email" type="email" required/>
                            <TextField label="Пароль" name="password" type="password" required/>
                            <TextField label="Телефон" name="phone" required/>
                            <TextField label="Название благотворительного фонда" name="fundName" required/>
                            <TextField label="Должность" name="position" required/>
                            {extraKeys.map((key, index) =>
                                (
                                    <TextField
                                        label={key}
                                        onChange={(e) => setExtraValues({...extraValues, [key]: e.target.value})}
                                        />
                                ))}
                            <Button type={'submit'} fullWidth variant={'contained'}
                                    disableElevation>Зарегистрировать</Button>
                        </Box>
                    </form>
                    <Typography m={2}>Дополнительное поле</Typography>
                    <Box display={"flex"} gap={2}><
                        TextField
                        size={'small'}
                        variant={'outlined'}
                        value={newKey}
                        onChange={(e) => setNewKey(e.target.value)}
                        sx={{flex: 2}}
                    />
                        <Button
                            sx={{flex: 1}}
                            onClick={handleAddField}
                        >Добавить</Button>
                    </Box>
                </Paper>
            </div>
        </Modal>
    </Box>
}

export default FundWorkerList;