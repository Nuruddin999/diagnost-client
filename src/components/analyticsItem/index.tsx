import {FC, useEffect} from "react";
import Box from "@mui/material/Box";
import {useLocation, useParams} from "react-router-dom";
import {useQuery} from "../../common/hooks/useQuery";
import {getUserItemRecapApi} from "../../api/analytics";
import {UserItemRecapType} from "../../common/types";
import {Card, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {formatDuration, makeDuration} from "../../common/utils";

const tableHeaders = ['В работе', 'Завершенные', 'Период']

const AnalyticsItem: FC = () => {
    const {id} = useParams<{ id: string }>(); // из :id
    const query = new URLSearchParams(useLocation().search);
    const period = query.get('period');
    const {loading, data} = useQuery<UserItemRecapType>(() => getUserItemRecapApi(period || '', id))


    const fromPeriod = new Date(data?.period[0] || '').toLocaleDateString()
    const toPeriod = new Date(data?.period[1] || '').toLocaleDateString()

    const unfinished = data?.user.applications.filter(el=>el.passToCoordinatorTime === null)
    const finished = data?.user.applications.filter(el=>el.passToCoordinatorTime !== null)


    useEffect(() => {
    }, []);


    return <Box marginTop={10}>
        <Typography variant={'h5'} fontWeight={'bold'}>Заключения общий отчет</Typography>
        <Card variant={'outlined'} sx={{width: '800px', margin: "16px auto 0"}}>
            <Table>
                <TableHead>
                    <TableRow>
                        {tableHeaders.map(header => <TableCell><Typography fontWeight={'bold'}>{header}</Typography></TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Typography>
                                {data?.count}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                {data?.user.applications.filter(el => el.passToCoordinatorTime).length || 0}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                {`C ${fromPeriod} по ${toPeriod}`}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
        <Typography variant={'h5'} fontWeight={'bold'}>Заключения - отчет детальный</Typography>
        <Card variant={'outlined'} sx={{width: '800px', margin: "16px auto 0"}}>
            <Table>
                <TableHead>
                    <TableRow>
                      <TableCell><Typography fontWeight={'bold'}>В работе</Typography></TableCell>
                        <TableCell><Typography fontWeight={'bold'}>Завершенные</Typography></TableCell>
                        <TableCell><Typography fontWeight={'bold'}>Период</Typography></TableCell>
                        <TableCell><Typography fontWeight={'bold'}>Время выполнения заявки</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.user.applications.map((el, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Typography>
                                    {unfinished && unfinished[index] ? unfinished[index].name:""}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {finished && finished[index] ? finished[index].name:""}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {`C ${fromPeriod} по ${toPeriod}`}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {finished && finished[index] ? makeDuration(finished[index].duration):""}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    </Box>
}

export default AnalyticsItem;