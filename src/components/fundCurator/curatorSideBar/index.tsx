import React, {FC, Fragment} from "react";
import MenuItem from "../../menuItem";
import {Analytics} from "@mui/icons-material";
import {useHistory, useLocation} from "react-router-dom";

const CuratorSideBar:FC = () => {



    const history = useHistory()

    const goToTab = (e: any, url: string) => {
        e.preventDefault()
            history.push(url);

    }

    return  <div>
        <MenuItem
            title={'Куратор'}
            label={<Analytics/>}
            onClick={(e: any) => goToTab(e, '/main/fundTasks')}
        />
    </div>
}

export default CuratorSideBar;