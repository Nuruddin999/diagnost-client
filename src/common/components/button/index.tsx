import React from "react";
import './style.button.scss'

type ButtonProps = {
  onClick: () => void,
  title?: string,
  disabled?:boolean
}
export const CommonButton = ({ title = '', onClick, disabled }: ButtonProps): React.ReactElement => {
  return    <button className='add-button' onClick={onClick} disabled={disabled}>
{title}
</button>
}