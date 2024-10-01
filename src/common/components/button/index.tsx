import React from "react";
import classNames from "classnames";
import './style.button.scss'

type ButtonProps = {
  onClick: () => void,
  title?: string,
  disabled?:boolean
    color?:'primary' | 'error' | 'secondary',
}
export const CommonButton = ({ title = '', onClick, disabled,color }: ButtonProps): React.ReactElement => {
  return    <button className={classNames('add-button',color ?? 'primary')} onClick={onClick} disabled={disabled} color={color}>
{title}
</button>
}