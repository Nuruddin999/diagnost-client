import React, {FC, ReactNode} from "react";
import {setExpanded} from "../reducers/ui";
import {Link, useHistory} from "react-router-dom";
import HopedocLogo from "../hopedoc.png";
import {IconButton, Typography} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {logOutUser} from "../actions/user";

const MainLayout:FC<{leftBlock:ReactNode, mainContent:ReactNode}>=({leftBlock, mainContent})=>{
    const {user, hasSuperUser} = useSelector((state: RootState) => state.user)
    const {name, id} = user

    const history = useHistory()

    const {isExpanded} = useSelector((state: RootState) => state.ui)
    const dispatch = useDispatch()

    const logOut = async () => {
        dispatch(logOutUser())
    }
    return <div className="dashboard" data-testid='dashboard'>
        <div className="dashboard-wrapper">
            <header className="header">
                <div className="header__content-wrapper ">
                    <div className="header__left">
                        <div className="burger" onClick={() => dispatch(setExpanded(!isExpanded))}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <Link to='' onClick={(e) => {
                            e.preventDefault();
                            history.push('/main/table')
                        }}>
                            <img src={HopedocLogo} height={40} alt="Hopedoc"/>
                        </Link>
                    </div>
                    <div className="header__rigth">
                        <Typography>{name}</Typography>
                        <IconButton onClick={logOut}>
                            <LogoutIcon/>
                        </IconButton>
                    </div>
                </div>
            </header>
            <div className={`left-menu ${isExpanded ? 'expanded' : ''}`}>
                {leftBlock}
            </div>
        </div>
        <div className="main-wrapper">
            <div className={`main-content ${isExpanded ? 'expanded' : ''}`}>
                {mainContent}
            </div>
        </div>
    </div>
}

export default MainLayout;