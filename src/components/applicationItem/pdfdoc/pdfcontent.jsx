import {Document, Font, Image, Page, PDFViewer, StyleSheet, Text, View} from '@react-pdf/renderer'
import './style.pdfdoc.scss'
import hopedoc from '../../../hopedoc.png'
import sell from '../../../sign.jpeg'
import TimesNewRomanFont from '../../../TimesNewRomanPSMT.ttf'
import TimesNewRomanBoldFont from '../../../TimesNewRomanPS-BoldMT.ttf'
import DejavuSansBold from '../../../DejaVuSans-Bold.ttf'
import DejavuSansReg from '../../../DejaVuSans.ttf'
import Table from './Table'
import hyphen from 'hyphen';
import pattern from 'hyphen/patterns/ru';
import {declination} from '../../../helpers'
import BirthBlock from "./BirthBlock";


const hyphenator = hyphen(pattern);
const hyphenationCallback = (word) => {
    return hyphenator(word).split('\u00AD');
}

export const BASIC_FONT = "Dejavu Sans Reg"
export const BASIC_FONT_BOLD = "Dejavu Sans Bold"
export const BASIC_APPL_FONT_SIZE = "10px"

Font.register({
    family: "Roboto",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
});

Font.register({
    family: "Times New Roman Reg",
    src: TimesNewRomanFont
});
Font.register({
    family: "Times New Roman Bold",
    src: TimesNewRomanBoldFont
});
Font.register({
    family: BASIC_FONT,
    src: DejavuSansReg
});
Font.register({
    family: BASIC_FONT_BOLD,
    src: DejavuSansBold
});
const probDiagns = {
    width: '100%',
    margin: '0 auto 0',
    flexDirection: 'row',
    alignItems: 'center',
}
const examineStyle = {
    textAlign: 'center',
    borderRight: '1px solid black',
    padding: '5px'
}
const trow = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
}
const styles = StyleSheet.create({
    body: {
        // margin: '8px',
    },
    hdr: {
        flexDirection: 'row',
        borderBottom: '1px solid black',
        fontSize: '11px',
        margin: '10px auto',
        paddingBottom: '10px',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    hdrimg: {
        width: '150px'
    },
    title: {
        margin: '8px',
        paddingBottom: '42px',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: BASIC_FONT
    },
    recomenTitle: {
        fontWeight: 700,
        fontSize: '12px',
        fontFamily: BASIC_FONT_BOLD,
        marginTop: 12,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 8,
        marginTop: 8,
        fontWeight: 700,
        fontFamily: BASIC_FONT_BOLD,
        textAlign: 'center',
        color: 'red',
        margin: '0 auto'
    },
    author: {
        fontSize: BASIC_APPL_FONT_SIZE,
        textAlign: 'center',
        marginBottom: 40,
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: BASIC_FONT
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: BASIC_APPL_FONT_SIZE,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: BASIC_APPL_FONT_SIZE,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    newbirth: {
        fontWeight: 700,
        fontFamily: BASIC_FONT_BOLD,
        fontSize: BASIC_APPL_FONT_SIZE
    },
    newbirthText: {
        fontFamily: BASIC_FONT,
        fontSize: '8px'
    },
    anamnesisSection: {
        textAlign: 'center',
        marginTop: '7px'
    },
    reasonTitle: {
        fontWeight: 700,
        fontFamily: BASIC_FONT_BOLD,
        fontSize: BASIC_APPL_FONT_SIZE,
        marginTop: '14px'
    },
    reasonSubTitle: {
        fontWeight: 700,
        fontFamily: BASIC_FONT_BOLD,
        fontSize: 7
    },
    complaintTitle: {
        flexDirection: 'row',
        width: '100%',
        textAlign: 'justify',
        fontSize: BASIC_APPL_FONT_SIZE
    },
    complaintTitleAnamnesis: {
        width: '100%',
        textAlign: 'left',
    },
    complaintTitleFirstWord: {
        fontWeight: 700,
        fontFamily: BASIC_FONT_BOLD,
    },
    tabl: {},
    tableRow: {
        ...(trow),
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
    },
    tablHeaderNum: {
        borderRight: '1px solid black',
        borderLeft: '1px solid black',
        padding: '5px',
        width: '50px',
        height: '100%'
    },
    tablHeaderFIO: {
        width: '500px',
        ...(examineStyle),
    },
    tablHeaderDiagnosis: {
        width: '1000px',
        ...(examineStyle),
    },
    probableDiagnosis: {
        ...(probDiagns),
        borderBottom: '1px solid black',
        textAlign: 'justify'
    },
    secondaryDiagnosis: {
        ...(probDiagns),
        textAlign: 'justify'
    },
    probableDiagnosisText: {
        width: '750px',
        textAlign: 'justify',
        fontFamily: BASIC_FONT,
        fontSize: BASIC_APPL_FONT_SIZE,
    },
    probableDiagnosisNum: {
        ...(examineStyle),
        borderRight: 'unset',
        fontFamily: BASIC_FONT_BOLD,
        fontSize: BASIC_APPL_FONT_SIZE,
        width: '350px',
        textAlign: 'start'
    },
    tablHeaderTypeExamine: {
        ...(examineStyle),
        height: '100%',
        fontFamily: BASIC_FONT_BOLD,
        width: '100%',
        flex: '1'
    },
    tablHeaderPlaceExamine: {
        ...(examineStyle),
        height: '100%',
        fontFamily: BASIC_FONT_BOLD,
        flex: '1'
    },
    tablHeaderTargetExamine: {
        ...(examineStyle),
        fontFamily: BASIC_FONT_BOLD,
        flexWrap: 'wrap',
        flex: '1'
    },
    commentsWrapper: {
        ...(trow),
    },
    commentsNum: {
        width: '50px',
        textAlign: 'left',
        padding: '0px'
    },
    commentsSecText: {
        width: '100%',
        borderBottom: '1px solid black',
        fontFamily: BASIC_FONT,
        fontSize: BASIC_APPL_FONT_SIZE,
        textAlign: 'justify'
    },
    commonSize: {
        width: '80%',
        marginHorizontal: 'auto',
    },
    finalDateAndFio: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    finalDateAndFioText: {
        fontSize: BASIC_APPL_FONT_SIZE
    },
    exeDateText: {width: '150px', marginHorizontal: '10px', borderBottom: '1px solid black',},
    managerAndSpeciality: {
        display: 'flex',
        flexDirection: 'row',
        width: '550px',
        alignItems: 'center',
        marginHorizontal: '10px',
        flexWrap: 'wrap',
        borderBottom: '1px solid black',
        justifyContent: 'center'
    },
    probDiagValue: {
        flexBasis: '650px',
        minHeight: '40px',
        display: 'flex',
        flexDirection: 'row',
        borderLeft: '1px solid black',
        flexWrap: 'wrap',
        alignItems: 'center'
    }

});


function MyDocContent({applItem, isDeletedPlace, status}) {
    const {
        mostProblDiagnosis,
        secondaryDiagnosis,
        patientBirthDate,
        patientName,
        patientPromoter,
        complaint,
        anamnesis,
        consiliumDoctors,
        diagnostic,
        checkupPlans,
        diagnosticData,
        comments,
        execDate,
        manager,
        managerSpeciality,
        managerSignUrlPath
    } = applItem

    const currentYear = new Date().getFullYear()
    const yearsOld = new Date(patientBirthDate).getFullYear()
    const month = new Date(patientBirthDate).getMonth() + 1
    const date = new Date(patientBirthDate).getDate().toLocaleString()
    const age = currentYear - yearsOld
    const ageWithEnding = declination(age, [' год', ' года', ' лет'])
    const currentMonth = new Date().getMonth()
    const yearsInMonth = new Date(patientBirthDate).getMonth()
    const birthInMonthDifference = currentMonth - yearsInMonth
    const ageInMonth = age * 12 + birthInMonthDifference
    let managerFio = "";
    if (manager) {
        let credentials = manager ? manager.replace(/ +/g, ' ') : ""
        let withSpaceInFirst = credentials.split(" ")
        let isSpaceFirst = withSpaceInFirst[0] === ""
        managerFio = `${withSpaceInFirst[isSpaceFirst ? 1 : 0]} ${withSpaceInFirst[isSpaceFirst ? 2 : 1][0]}. ${withSpaceInFirst[isSpaceFirst ? 3 : 2][0]}.`
    }
    // TODO может есть какой-то проще метод, типа равно врач ignore case
    const isContainsDoctorWord = (managerSpeciality.replace(/\s/g, "").substring(0, 4) === 'Врач') || (managerSpeciality.replace(/\s/g, "").substring(0, 4) === 'врач')
    const patientBirthDataFormatted = `${date > 9 ? date : '0' + date}.${month > 9 ? month : '0' + month}.${yearsOld} г.р. (${age > 0 ? age + ' ' + ageWithEnding : ageInMonth + 'мес'})`
    return (
        <PDFViewer>
            <Document>
                <Page style={styles.title}>
                    <View style={{...styles.commonSize, ...styles.hdr, marginBottom: 15}} fixed>
                        <Image src={hopedoc} style={styles.hdrimg}/>
                        <View style={{fontSize: BASIC_APPL_FONT_SIZE, fontFamily: BASIC_FONT}}>
                            <Text>г Махачкала, ул. Батырая 11 </Text>
                            <Text>9 этаж, помещение № 905</Text>
                            <Text>Тел. +7(8722)98-96-97, +7(964)006-70-07</Text>
                            <Text>vrachi_nadejdi@mail.ru</Text>
                        </View>
                    </View>
                    <Text style={styles.recomenTitle}>
                        РЕКОМЕНДАЦИИ ВРАЧА
                    </Text>
                    <Text style={{...styles.commonSize, ...styles.subtitle}}>
                        (ВНИМАНИЕ! ДОКУМЕНТ ИСКЛЮЧИТЕЛЬНО ДЛЯ ВНУТРЕННЕГО ПОЛЬЗОВАНИЯ ОРГАНИЗАЦИИ)
                    </Text>
                    <BirthBlock
                        patientName={patientName}
                        patientBirthDate={patientBirthDataFormatted}
                    />
                    {patientPromoter ?
                        <View style={{...styles.commonSize, marginTop: '8px'}}>
                            <Text style={styles.complaintTitle} wrap={false}><Text
                                style={styles.complaintTitleFirstWord}>Представитель: </Text>{patientPromoter}
                            </Text>
                        </View> : null}

                    <Text style={styles.reasonTitle}>На основании: </Text>
                    <Text style={styles.reasonSubTitle}> (указать основания: жалобы, симптомы, синдромы, подозрения
                        врача и пр.): </Text>
                    <View style={{...styles.commonSize, ...styles.anamnesisSection}}>
                        {complaint ? <Text style={styles.complaintTitle} wrap={false}><Text
                            style={styles.complaintTitleFirstWord}>Жалоб: </Text>{complaint}</Text> : null}
                        {anamnesis ? <Text style={{...styles.complaintTitle, marginTop: '10px'}} wrap={false}><Text
                            style={styles.complaintTitleFirstWord}>Анамнеза: </Text>{anamnesis}
                        </Text> : null}
                        {diagnosticData ? <Text style={{...styles.complaintTitle, marginTop: '10px'}} wrap={false}><Text
                            style={styles.complaintTitleFirstWord}>Данных обследования: </Text>{diagnosticData}
                        </Text> : null}
                    </View>
                    {consiliumDoctors.length > 0 ? <View style={{...styles.commonSize, marginTop: 10}}>
                        <Table
                            title='Проведен дистанционный врачебный консилиум в составе:'
                            subTitle='(указать ФИО и специальности врачей, которые участвовали в формировании заключения):'
                            headers={['№', 'ФИО врача', 'Специальность']}
                            dataContent={consiliumDoctors}
                            contentKeys={['name', 'speciality']}
                        />
                    </View> : null}
                    {diagnostic.length > 0 ? <View style={{marginTop: 14, ...styles.commonSize}}>
                        <Table
                            title='С целью проведения дифференциальной диагностики между'
                            subTitle='(указать заболевания, факты и симптомы клинической картины, которых частично или полностью соответствуют заболеванию)'
                            headers={['№', 'Диагноз']}
                            dataContent={diagnostic}
                            contentKeys={['diagnosis']}
                        />
                    </View> : null}
                    <View style={{marginTop: 44, ...styles.commonSize}}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottom: '1px solid black',
                            width: '100%'
                        }} wrap={false}>
                            <View style={{flexBasis: '450px', padding: '5px'}}>
                                <Text style={{...styles.probableDiagnosisNum, width: '100%', padding: '0px'}}
                                      hyphenationCallback={hyphenationCallback}>
                                    Выявлен наиболее вероятный
                                </Text>
                                <Text style={{...styles.probableDiagnosisNum, width: '100%', padding: '0px'}}
                                      hyphenationCallback={hyphenationCallback}>
                                    основной диагноз:
                                </Text>
                            </View>
                            <View style={styles.probDiagValue}>
                                <Text style={{...styles.probableDiagnosisText, padding: 5}}
                                      hyphenationCallback={hyphenationCallback}>
                                    {mostProblDiagnosis}
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderTop: '1px solid black',
                            width: '100%'
                        }} wrap={false}>
                            <View style={{flexBasis: '450px', padding: '5px'}}>
                                <Text style={{...styles.probableDiagnosisNum, width: '100%', padding: '0px'}}
                                      hyphenationCallback={hyphenationCallback}>
                                    Выявлены сопутствующие
                                </Text>
                                <Text style={{...styles.probableDiagnosisNum, width: '100%', padding: '0px'}}
                                      hyphenationCallback={hyphenationCallback}>
                                    диагнозы:
                                </Text>
                            </View>
                            <View style={styles.probDiagValue}>
                                <Text style={{...styles.probableDiagnosisText, padding: 5, flexWrap: 'wrap'}}
                                      hyphenationCallback={hyphenationCallback}>
                                    {secondaryDiagnosis}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: 44, ...styles.commonSize}}>
                        {checkupPlans.length > 0 && <Table
                            headers={['№', 'Вид обследования', 'Поставщик', 'Адрес', 'Телефон', 'Медикаменты', 'Кол-во', 'Цена', 'Общая стоимость', 'Цель проведения']}
                            dataContent={checkupPlans}
                            contentKeys={['kind', 'supplier', 'address', 'phone', 'medicine', 'qty', 'price', 'totalPrice', 'target']}
                            title='На основании проведенного консилиума рекомендован план лечения (ПЛ):'
                            isDeletedPlace={isDeletedPlace}
                            status={status}
                        />}
                        {comments ? <View wrap={false}>
                            <Text style={{
                                fontFamily: BASIC_FONT_BOLD,
                                marginTop: 14,
                                textAlign: 'left',
                                fontSize: BASIC_APPL_FONT_SIZE
                            }}> Пояснения:</Text>
                            <View style={{...styles.commentsWrapper, marginTop: 28}}>
                                <View style={{width: '100%'}}>
                                    <Text style={{...styles.commentsSecText}}
                                          hyphenationCallback={hyphenationCallback}>{1} {comments[0].comment}</Text>
                                </View>
                            </View>
                        </View> : null}
                        {/** разделил блоки комментариев, чтоб первый комментарий не оставался на заполненном листе и переносился на новый, сейчас это отменено, //todo написать один компонент без разделения  */}
                        {comments ? comments.map((comment, index) => index > 0 ?
                            <View style={{...styles.commentsWrapper, marginTop: 28}}>
                                <View style={{width: '100%'}}>
                                    <Text style={{...styles.commentsSecText}}
                                          hyphenationCallback={hyphenationCallback}>{index + 1} {comment.comment}</Text>
                                </View>
                            </View> : null) : null}
                    </View>
                    <View style={{...styles.commonSize, position: 'relative'}} wrap={false}>
                        <Image src={sell} style={{width: '150px', alignSelf: 'center', marginLeft: '20px'}}/>
                        {execDate && manager ?
                            <View style={{
                                ...styles.commonSize,
                                width: '100%',
                                height: '100px', ...styles.finalDateAndFio, ...styles.finalDateAndFioText,
                                position: 'absolute',
                                top: '15px',
                                left: '0'
                            }}>
                                <View
                                    style={styles.exeDateText}><Text>{new Date(execDate).toLocaleString().substring(0, 10)}</Text>
                                </View>
                                {managerSignUrlPath ? <Image src={managerSignUrlPath} style={styles.hdrimg}/> : null}
                                <View style={styles.managerAndSpeciality}>
                                    {managerSpeciality ?
                                        <Text>{isContainsDoctorWord ? managerSpeciality : `Врач-${managerSpeciality.toLowerCase()}`} /</Text> : null}
                                    <Text style={{paddingLeft: '10px'}}>{managerFio}</Text>
                                </View>
                            </View> : null}
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
}

export default MyDocContent;
