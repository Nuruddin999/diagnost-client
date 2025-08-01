import React, { FC } from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {selectApplicationUserRights} from "../../../common/selectors/user";
import { Route, Switch } from "react-router-dom";
import FundTasks from "../../FundTasks";


const CuratorMainContent:FC =()=>{
    const {user, hasSuperUser} = useSelector((state: RootState) => state.user)
    const {name, id, role} = user



    const rights = useSelector((state: RootState) => selectApplicationUserRights(state))
    return  <Switch>
        <Route path='/main/fundTasks/'>
          <FundTasks/>
        </Route>
    </Switch>
}

export default CuratorMainContent