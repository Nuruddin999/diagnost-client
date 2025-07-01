import React, {FC} from "react";
import {Card, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
const tableHeaders = ['В работе', 'Завершенные', 'Период']
const AnalyticsRecapTable: FC<{inWork:number,completed:number, periodTtitle:string}> = ({inWork,completed, periodTtitle}) => {
    return <Card sx={{width: '800px', margin: "8px auto 0", borderRadius: "16px"}}>
        <Table size={"small"}>
            <TableHead>
                <TableRow>
                    {tableHeaders.map(header => <TableCell><Typography
                        fontWeight={'bold'}>{header}</Typography></TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Typography>
                            {inWork}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography>
                            {completed}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography>
                            {periodTtitle}
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </Card>
}

export default AnalyticsRecapTable;