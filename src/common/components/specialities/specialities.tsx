import React, {useEffect} from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { specialities } from "../../../constants";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {getSpecialityAction} from "../../../actions/speciality";
import {useGetSpecialities} from "../../hooks/useGetSpecialities";

type SpecialitiesProps = {
speciality: string,
setSpeciality:(name:string)=>void
}
const Specialities = ({speciality, setSpeciality}: SpecialitiesProps): React.ReactElement => {
    const {specialities}=useSelector((state:RootState)=>state.speciality)
  useGetSpecialities(specialities)
    return <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-standard-label">Специальность</InputLabel>
        {specialities && <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            label="Специальность"
        >
            {specialities.map(speciality => <MenuItem key={speciality.id}
                                                      value={speciality.name}>{speciality.name}</MenuItem>)}
        </Select>}
    </FormControl>
}
export default Specialities