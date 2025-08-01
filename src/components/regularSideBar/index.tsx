import React, {FC, Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {selectApplicationUserRights} from "../../common/selectors/user";
import MenuItem from "../menuItem";
import CalculateIcon from '@mui/icons-material/Calculate';
import GradingIcon from '@mui/icons-material/Grading';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import SummarizeIcon from "@mui/icons-material/Summarize";
import {Analytics} from "@mui/icons-material";
import {PeopleAlt} from "@mui/icons-material";
import {useHistory, useLocation} from "react-router-dom";

const RegularSideBar:FC<{setIsWarning: React.Dispatch<React.SetStateAction<string>>}> = ({setIsWarning}) => {
    const {user, hasSuperUser} = useSelector((state: RootState) => state.user)

    const rights = useSelector((state: RootState) => selectApplicationUserRights(state))
    const isAdmin = user.role === 'admin' || user.role === 'superadmin'
    const [openDropDown, setOpenDropDown] = React.useState<{ users: boolean }>({users: false});

    const location = useLocation()
    const history = useHistory()

    const goToTab = (e: any, url: string) => {
        const pattern = /^\/main\/application\/\d+$/
        const smetaPattern = /^\/main\/smeta\/\d+$/
        e.preventDefault()
        if (pattern.test(location.pathname) || smetaPattern.test(location.pathname)) {
            setIsWarning(url);
        } else {
            history.push(url);
        }
    }

    return  <div>
        {rights.isApplicationOneRight &&
            <MenuItem label={<SummarizeIcon/>} title={'Заключения'}
                      onClick={(e: any) => goToTab(e, '/main/table')}/>}
        {rights.isUsersOneRight &&
            <Fragment>
                <MenuItem
                    label={<PeopleAlt/>}
                    title={'Пользователи'}
                    onClick={(e: any) => {
                        e.preventDefault();
                        setOpenDropDown({
                            ...openDropDown,
                            users: !openDropDown.users
                        })
                    }}
                    after={<KeyboardArrowDownSharpIcon sx={{width: 30, height: 30}}/>}

                />
                {openDropDown.users &&
                    <Fragment>
                        <div className={'left-menu-sub-item'}><MenuItem
                            onClick={(e: any) => goToTab(e, '/main/users')}
                            title={'Консилиум'}/>
                        </div>
                        <div className={'left-menu-sub-item'}><MenuItem
                            onClick={(e: any) => goToTab(e, '/main/fundworkers')}
                            title={'Работники фондов'}/>
                        </div>
                    </Fragment>}
            </Fragment>}
        {rights.processedRights.smetas?.read && <MenuItem
            title={'Сметы'}
            label={<CalculateIcon/>}
            onClick={(e: any) => goToTab(e, '/main/smetas')}
        />
        }
        {isAdmin &&
            <Fragment>
                <MenuItem
                    title={<span>Сметы на<br/>проверку</span>}
                    label={<GradingIcon/>}
                    onClick={(e: any) => goToTab(e, '/main/smetasoncheck')}
                />
                <MenuItem
                    title={<span>Сметы на<br/>реализации</span>}
                    label={<CheckCircleOutlineIcon/>}
                    onClick={(e: any) => goToTab(e, '/main/smetasoncheck')}
                />
                <MenuItem
                    title={'Аналитика'}
                    label={<Analytics/>}
                    onClick={(e: any) => goToTab(e, '/main/analytics')}
                />
                <MenuItem
                    title={'Куратор'}
                    label={<Analytics/>}
                    onClick={(e: any) => goToTab(e, '/main/fundTasks')}
                />
            </Fragment>
        }

    </div>
}

export default RegularSideBar;