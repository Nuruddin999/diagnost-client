import React from "react";
import './style.managerchange.scss'
import UsersList from "../userslist/userslist";
import {IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {openManagerChangeModal} from "../../reducers/ui";
const ManagerChangeModal =({appls}: { appls:Array<any> }): React.ReactElement=>{

    const {isManagerChangeModalOpened}=useSelector((state:RootState)=>state.ui)
    const appl=appls.find(el=>el.id===isManagerChangeModalOpened)
    const dispatch = useDispatch()

    return <div className='managerchange'>
        <div className='managerchange__mainwrapper'>
            <div className='closeblock'>
               <IconButton> <CloseIcon onClick={()=>dispatch(openManagerChangeModal(undefined))}/></IconButton>
            </div>
            <div className="appl-table">
                <table>
                    <tbody>
                    <tr>
                        <td>{appl?.patientName}</td>
                        <td>{appl?.patientRequest}</td>
                        <td>{appl?.fundName}</td>
                        <td>{appl?.fundRequest}</td>
                        <td>{appl?.manager}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <Typography variant={'h5'}>Выберите ответственного и нажимите на него</Typography>
<UsersList />
        </div>
    </div>
}
export default ManagerChangeModal