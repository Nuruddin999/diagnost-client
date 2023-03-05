import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getSpecialityAction} from "../../actions/speciality";
import {RootState} from "../../app/store";

export const useGetSpecialities =(specialities:Array<{id:number,name:string}>)=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        if (specialities.length === 0){
            dispatch(getSpecialityAction(1,100))
        }
    },[])
}