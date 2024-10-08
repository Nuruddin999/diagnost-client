import {FC} from "react";

const SmetaTable:FC<{data:any, localObj:any, handleChangeSmeta:()=>void, headers:Array<string>}>=({data,handleChangeSmeta,localObj, headers})=>{
    return <div>
        <table>
            <thead>
            <tr>
                {headers.map(el=><td>
                    el
                </td>)}
            </tr>
            </thead>
        </table>
    </div>
}
export default SmetaTable