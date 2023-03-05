import React, {useState, useEffect} from "react";
import {specialities} from "../../constants";
import "./speciality_style.scss"
import {Grid, IconButton, TextField} from "@mui/material";
import {CommonButton} from "../../common/components/button"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {useDispatch, useSelector} from "react-redux";
import {addSpecialityAction, getSpecialityAction} from "../../actions/speciality";
import {RootState} from "../../app/store";
const Specialities=():React.ReactElement=>{
    const [specName,setSpecName]=useState<string>()
    const [page, setPage] = React.useState(1);
    const {specialities}=useSelector((state:RootState)=>state.speciality)
    const dispatch = useDispatch()
    const addSpeciality =()=>{
        specName && dispatch(addSpecialityAction(specName))
    }
    useEffect(()=>{
       dispatch(getSpecialityAction(page,100))
    },[])

    useEffect(()=>{
        setSpecName('')
    },[specialities])

    return <div>
        <Grid container marginTop={6} spacing={2}>
            <Grid item xs={4}>
                <TextField
                    value={specName}
                    onChange={(e)=>setSpecName(e.target.value)}
                    variant={"outlined"}
                    fullWidth
                    size={'small'}
                />
            </Grid>
            <Grid item xs={4}>
             <CommonButton disabled={!specName} onClick={addSpeciality} title={'Добавить'}/>
            </Grid>
        </Grid>
        {specialities.length > 0 && <div className={'appl-table'}>
            <table>
                <tbody>
                {specialities.map((el => <tr key={el.id}>
                    <td>{el.name}</td>
                    <td><IconButton className='delete-button' onClick={(e: any) => {
                        e.stopPropagation()
                    }}>
                        <DeleteOutlineIcon/>
                    </IconButton></td>
                </tr>))}
                </tbody>
            </table>
        </div>}
    </div>
 }
 export default Specialities