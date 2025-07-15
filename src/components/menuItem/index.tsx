import React, {FC, ReactNode} from "react";
import {Link} from "react-router-dom";
import "./style.menuitem.scss";

const MenuItem: FC<{ onClick: any, title: string | ReactNode, after?: ReactNode, label?: ReactNode }> = ({
                                                                                                             onClick,
                                                                                                             title,
                                                                                                             after,
                                                                                                             label
                                                                                                         }) => {
    return <Link to='' onClick={onClick} className="left-menu-item-main">
                                <span className="left-menu-item">
                                  {label && <span className="icon-slot">
                                      {label}
                                    </span>}
                                    <span>
                    {title}
                                </span>
                                    {after && <span className="icon-slot">{after}</span>}
                                </span>
    </Link>
}


export default MenuItem;