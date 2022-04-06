import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../actions/user";
import './style.loader.scss'
type LoaderProps = {
    title: string,
    isLoading: boolean
}
export const Loader = (props: LoaderProps): React.ReactElement => {

    return <div className={props.isLoading ? 'btn-loader-container' : 'btn-no-loader'}>
        <span className='btn-title'>
            {props.title}
        </span>
        {props.isLoading && <div className="lds-ring">
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
        </div>}
    </div>
}