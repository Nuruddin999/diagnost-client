import { Text, View } from '@react-pdf/renderer'
import hyphen from 'hyphen';
import pattern from 'hyphen/patterns/ru';
import TableContent from "./TableContent";
import {BASIC_APPL_FONT_SIZE, BASIC_FONT, BASIC_FONT_BOLD} from './pdfcontent';

const hyphenator = hyphen(pattern);

const hyphenationCallback = (word) => {
    return hyphenator(word).split('\u00AD');
}

const TablePdf = ({ headers, dataContent, contentKeys, title, subTitle, status, isDeletedPlace }) => {
    const processedDataContent = dataContent.map(el => {
        return {
            ...el,
            place: `${[el.supplier, el.address, el.phone, el.price].filter(el => el).join(', ')}`
        }
    })

    const calcHeaderWidth = (hdr, status) => {
        const hdrLength = headers.length - 1
        let calcVal;
        if (hdr === '№') {
            calcVal = '5%'
        } else if (status === undefined) {
            calcVal = isDeletedPlace ? `${95 / 2}%` : `${95 / hdrLength}%`
        } else {
            calcVal = status ? `${95 / 2}%` : `${95 / hdrLength}%`
        }
        return calcVal
    }

    const isFalseStatus = status !== undefined && !status
    const isDeleted = isDeletedPlace === false
    const hiddenFields = ['supplier', 'phone', 'address', 'price', 'medicine', 'qty', 'totalPrice']
    const hiddenHeaders = ['Поставщик', 'Телефон', 'Адрес', 'Цена', 'Медикаменты', 'Кол-во', 'Общая стоимость']

    return <View>
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }}
            wrap={false}>
            <Text
                style={{ fontFamily: BASIC_FONT_BOLD, fontSize: BASIC_APPL_FONT_SIZE }}>
                {title}
            </Text>
            <Text
                style={{ fontSize: '7px', marginBottom: 10, fontFamily: BASIC_FONT_BOLD, }}>
                {subTitle}
            </Text>
            {headers.length > 0 ?
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                    }}>
                    {headers.map((hdr) => {
                        const isNotForHideFileds = !hiddenHeaders.includes(hdr)
                        if (isNotForHideFileds || isFalseStatus || isDeleted) {
                            return <View
                                style={{
                                    flexBasis: calcHeaderWidth(hdr, status),
                                    height: '100%',
                                    border: '1px solid black',
                                    padding: '7px'
                                }}>
                                <Text hyphenationCallback={hyphenationCallback}
                                    style={{ fontFamily: BASIC_FONT_BOLD, fontSize:BASIC_APPL_FONT_SIZE }}>
                                    {hdr}
                                </Text>
                            </View>
                        }
                        return null
                    })}
                </View>
                : null}
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
            }}>
                {processedDataContent && processedDataContent.length > 0 && contentKeys.length > 0 ? <View style={{
                    flexBasis: '5%',
                    height: '100%',
                    border: '1px solid black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '5px'
                }}>
                    <Text style={{ fontFamily: BASIC_FONT, fontSize: BASIC_APPL_FONT_SIZE }}>1</Text>
                </View> : null}
                {processedDataContent && processedDataContent.length > 0 && contentKeys.length > 0 ? contentKeys.map((val) => {
                    const isNotForHideFileds = !hiddenFields.includes(val)
                    if (isNotForHideFileds || isFalseStatus || isDeleted) {
                        return <TableContent flexBasis={calcHeaderWidth(null, status)} content={processedDataContent[0][val]} hyphenationCallback={hyphenationCallback} />
                    } else {
                        return null
                    }
                }) : null}
            </View>
        </View>
        {processedDataContent.length > 0 ?
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }}>
                {processedDataContent && processedDataContent.length > 0 ? processedDataContent.map((dataObj, index) => index > 0 ?
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                    }}
                        wrap={false}>
                        <View style={{
                            flexBasis: '5%', border: '1px solid black', display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '5px'
                        }}>
                            <Text style={{ fontFamily: BASIC_FONT, fontSize: BASIC_APPL_FONT_SIZE }}>{index + 1}</Text>
                        </View>
                        {contentKeys.length > 0 ? contentKeys.map((val) => {
                            const isNotForHideFileds = !hiddenFields.includes(val)
                            if (isNotForHideFileds || isFalseStatus || isDeleted) {
                                return <TableContent flexBasis={calcHeaderWidth(null, status)} content={dataObj[val]} hyphenationCallback={hyphenationCallback} />
                            } else {
                                return null
                            }
                        }) : null}
                    </View> : null) : null}
            </View> : null}
    </View>
}
export default TablePdf