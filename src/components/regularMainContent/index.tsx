import {Registration} from "../../common/components/registration/registration";
import React, { FC } from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {selectApplicationUserRights} from "../../common/selectors/user";
import { Route, Switch } from "react-router-dom";
import ReportList from "../reportlist/reportlist";
import {Typography} from "@mui/material";
import UserItemScreen from "../useritem/userItemScreen";
import Smetalist from "../smetalist/smetalist";
import SmetaItem from "../smetaItem";
import UsersRecap from "../analytics";
import AnalyticsItem from "../analyticsItem";
import FundTasks from "../FundTasks";
import UsersList from "../userslist/userslist";
import FundWorkerList from "../fundWorkerList";
import Specialities from "../specialities/Specialities";
import ApplicationItem from "../applicationItem";

const RegularMainContent:FC<{applIdRef: React.MutableRefObject<number | null>, passToCoordRef:React.MutableRefObject<string | null>,timeStartRef:React.MutableRefObject<number | null>,
}>=({applIdRef,passToCoordRef,timeStartRef})=>{
    const {user, hasSuperUser} = useSelector((state: RootState) => state.user)
    const {name, id, role} = user

    const isAdmin = user.role === 'admin' || user.role === 'superadmin'

    const rights = useSelector((state: RootState) => selectApplicationUserRights(state))
    return  <Switch>
                {rights.processedRights.applications?.read && <Route exact path='/main/table'>
            <ReportList/>
        </Route>}
        <Route path='/main/application/:id'>
            {rights.processedRights.applications?.read ?
                <ApplicationItem
                    passToCoordRef={passToCoordRef}
                    timeStartRef={timeStartRef}
                    applIdRef={applIdRef}
                /> :
                <div className="no-rights"><Typography align='center'>Недостаточно прав</Typography>
                </div>}
        </Route>
        <Route path='/main/user/:id'>
            {rights.processedRights.users?.read ? <UserItemScreen onClose={() => {
                }}/> :
                <Typography className="no-rights" align='center'>Недостаточно прав</Typography>}
        </Route>
        <Route path='/main/newuser'>
            {rights.processedRights.users?.create ? <Registration/> :
                <Typography className="no-rights" align='center'>Недостаточно прав</Typography>}
        </Route>
        <Route path='/main/users'>
            {rights.processedRights.users?.read ? <UsersList/> :
                <Typography className="no-rights" align='center'>Недостаточно прав</Typography>}
        </Route>
        <Route path='/main/fundworkers'>
            {rights.processedRights.users?.read ? <FundWorkerList/> :
                <Typography className="no-rights" align='center'>Недостаточно прав</Typography>}
        </Route>
        <Route path='/main/speciality'>
            {rights.processedRights.applications?.read ? <Specialities/> :
                <Typography className="no-rights" align='center'>Недостаточно прав</Typography>}
        </Route>
        <Route path='/main/aboutme'>
            <UserItemScreen onClose={() => {
            }} isProfile/>
        </Route>
        <Route path='/main/smetas'>
            {rights.processedRights.smetas?.read ? <Smetalist status={'rework'}/> :
                <div className="no-rights"><Typography align='center'>Недостаточно прав</Typography>
                </div>}
        </Route>
        <Route path='/main/smeta/:id'>
            {rights.processedRights.smetas?.read ? <SmetaItem/> :
                <div className="no-rights"><Typography align='center'>Недостаточно прав</Typography>
                </div>}
        </Route>
        <Route path='/main/smetasoncheck'>
            {isAdmin ? <Smetalist status={'oncheck'}/> :
                <div className="no-rights"><Typography align='center'>Недостаточно прав</Typography>
                </div>}
        </Route>
        <Route path='/main/smetasonrealization'>
            {isAdmin ? <Smetalist status={'realization'}/> :
                <div className="no-rights"><Typography align='center'>Недостаточно прав</Typography>
                </div>}
        </Route>
        <Route path='/main/analytics'>
            {isAdmin ? <UsersRecap/> :
                <div className="no-rights"><Typography align='center'>Недостаточно прав</Typography>
                </div>}
        </Route>
        <Route path='/main/analytics-item/:id'>
            {isAdmin ? <AnalyticsItem/> :
                <div className="no-rights"><Typography align='center'>Недостаточно прав</Typography>
                </div>}
        </Route>
        <Route path='/main/fundTasks/'>
            {isAdmin ? <FundTasks/> :
                <div className="no-rights"><Typography align='center'>Недостаточно прав</Typography>
                </div>}
        </Route>
    </Switch>
}

export default RegularMainContent