import React from "react";
import classNames from "classnames";
import './style.button.scss'

type ButtonProps = {
  onClick: () => void,
  title?: string,
  disabled?:boolean
    color?:'primary' | 'error' | 'secondary',
    className?:string,
}
export const CommonButton = ({ title = '', onClick, disabled,color,className }: ButtonProps): React.ReactElement => {
  return    <button className={classNames('add-button',color ?? 'primary', className)} onClick={onClick} disabled={disabled} color={color}>
{title}
</button>
}