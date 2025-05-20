import React, { useCallback } from "react";
import isObject from "lodash/isObject";
import {TextField} from "@mui/material";
import {debounce} from "lodash";
import './style.tableheader.scss'


const TableHeader = ({tableData, role, isDeleteRights,isManagerChange}: { tableData: any, isDeleteRights?:boolean,isManagerChange?:boolean,role: string }): React.ReactElement => {
    const changeHandler = (e: any, field: string, callback: (title: string) => void) => {
        if (e.target.value.length > 2) {
            callback(e.target.value)
        } else if (field.length > 2 && e.target.value.length === 0) {
            callback('')
        }
    };

    const debouncedChangeHandler = useCallback(
        debounce(changeHandler, 300)
        , []);

    return <tr className={'table-header'}>
        {tableData.map((el: any) => {
                if (isObject(el) && (el as any).title === 'Ответственный') {
                    if (role === 'doctor') {
                        return <th>

                        </th>
                    }
                }
                if (el !== 'Удалить' || isDeleteRights) {
                    return <th key={isObject(el) ? (el as any).title : el}>
                        <div>
                            <div>
                                 <span>
                      {isObject(el) ? (el as any).title : el}
                    </span>
                            </div>

                            {isObject(el) &&
                                <TextField
                                    onChange={(e) => debouncedChangeHandler(e, (el as any).field, (el as any).onChange)}
                                    type="text"
                                    size="small"
                                    fullWidth
                                    placeholder="Поиск"
                                />
                            }
                        </div>
                    </th>
                }
                   return <th>

            </th>
            }
        )}
        {isManagerChange && <th>
            Поменять ответственного
        </th>}
    </tr>
}

export default TableHeader