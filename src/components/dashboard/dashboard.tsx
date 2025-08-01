import React, {useEffect} from "react";
import {Redirect, useHistory, useLocation} from "react-router-dom";
import './style.dash.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {checkUser, logOutUser} from "../../actions/user";
import {Registration} from "../../common/components/registration/registration";
import {selectApplicationUserRights} from "../../common/selectors/user";
import {saveStartTime} from "../../api/user";
import {sessionHeartBit} from "../../common/api/api";
import MainLayout from "../../layouts";
import RegularSideBar from "../regularSideBar";
import RegularMainContent from "../regularMainContent";
import Box from "@mui/material/Box";
import CuratorSideBar from "../fundCurator/curatorSideBar";
import CuratorMainContent from "../fundCurator/curatorMainContent";


const Dashboard = (): React.ReactElement => {
    const {user, hasSuperUser} = useSelector((state: RootState) => state.user)
    const {name, id, role} = user

    const rights = useSelector((state: RootState) => selectApplicationUserRights(state))
    const isAdmin = user.role === 'admin' || user.role === 'superadmin'
    const {isExpanded} = useSelector((state: RootState) => state.ui)
    const [isWarning, setIsWarning] = React.useState('');
    const [sessionId, setSessionId] = React.useState('');
    const [openDropDown, setOpenDropDown] = React.useState<{ users: boolean }>({users: false});
    const timeStartRef = React.useRef<number | null>(null);
    const passToCoordRef = React.useRef<string | null>(null);
    const applIdRef = React.useRef<number | null>(0);
    const heartBitTimerRef = React.useRef<any | null>(null);
    const dispatch = useDispatch()

    const logOut = async () => {
        dispatch(logOutUser())
    }

    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        dispatch(checkUser())
    }, [])

    const handleStartTime = async () => {
        const result = await saveStartTime()
        setSessionId(result.id)
    }

    useEffect(() => {
        let socket: WebSocket;
        if (id.trim() && id !== '0' && id !== 'undefined') {

            handleStartTime()
            socket = new WebSocket('ws://188.68.220.210:5000');

            socket.onopen = () => {
                socket.send(JSON.stringify({type: 'online', id}));
            };

        }


        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [id]);


    useEffect(() => {
        if (sessionId) {
            heartBitTimerRef.current = setInterval(() => {
                sessionHeartBit(`/usdurhrtbt`, sessionId, 30000)
            }, 30000)
        }
        return () => {
            if (heartBitTimerRef.current) {
                clearInterval(heartBitTimerRef.current)
                heartBitTimerRef.current = null;
            }
        };
    }, [sessionId]);

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


    if (!hasSuperUser) {
        return <Registration notHaveSuperUser/>
    }
    if (name === 'empty') {
        return <Redirect to='/auth'/>
    }
    if (role && role !== 'fundWorker') {
        return <Box sx={{height: "100%"}}>
            <MainLayout
                leftBlock={<RegularSideBar setIsWarning={setIsWarning}/>}
                mainContent={<RegularMainContent passToCoordRef={passToCoordRef} applIdRef={applIdRef}
                                                 timeStartRef={timeStartRef}/>}
            />
        </Box>
    } else {
        return <Box sx={{height: "100%"}}>
            <MainLayout
                leftBlock={<CuratorSideBar /> }
                mainContent={<CuratorMainContent />}
            />
        </Box>
    }

}
export default Dashboard