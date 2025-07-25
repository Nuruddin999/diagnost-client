import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserByLetter } from '../../actions/user';

export function useUsers(page: number, email:string, name:string, speciality:string, phone:string, role:string, fundName?:string) {
  const dispatch = useDispatch()

    useEffect(() => {
    dispatch(getUserByLetter(page, 10, email, name, speciality, phone, role,fundName))
  }, [page,email, name, speciality, phone, role,fundName])

}