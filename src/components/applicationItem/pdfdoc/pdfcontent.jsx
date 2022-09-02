import { Document, Page, PDFViewer, Text, StyleSheet, View, Font, Image } from '@react-pdf/renderer'
import './style.pdfdoc.scss'
import hopedoc from '../../../hopedoc.png'
import sell from '../../../sign.jpeg'
import TimesNewRomanFont from '../../../TimesNewRomanPSMT.ttf'
import TimesNewRomanBoldFont from '../../../TimesNewRomanPS-BoldMT.ttf'

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
const probDiagns = {
  width: '90%',
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

  },
  hdr: {
    flexDirection: 'row',
    borderBottom: '1px solid black',
    fontSize: '11px',
    margin: '10px auto',
    paddingBottom: '10px',
    justifyContent: 'space-between'
  },
  hdrimg: {
    width: '150px'
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: "Times New Roman Reg"
  },
  recomenTitle: {
    fontWeight: 700,
    fontFamily: "Times New Roman Bold",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 9,
    marginTop: 8,
    fontWeight: 700,
    fontFamily: "Times New Roman Bold",
    textAlign: 'center',
    color: 'red',
    margin: '0 auto'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: "Roboto"
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  birth: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontWeight: 700,
    fontFamily: "Times New Roman Bold",
    padding: 0,
    width: '50%'
  },
  birthWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 24
  },
  birthText: {
    borderTop: '1px solid black',
    width: '100%',
    fontFamily: "Times New Roman Reg",
    fontSize: 10
  },
  anamnesisSection: {
    textAlign: 'center'
  },
  reasonTitle: {
    fontWeight: 700,
    fontFamily: "Times New Roman Bold",
  },
  reasonSubTitle: {
    fontWeight: 700,
    fontFamily: "Times New Roman Bold",
    fontSize: 10
  },
  complaintTitle: {
    flexDirection: 'row',
    marginTop: 12,
    width: '100%',
    textAlign: 'left',
    flexWrap: 'wrap'
  },
  complaintTitleAnamnesis: {
    width: '100%',
    textAlign: 'left',
    marginTop: 8
  },
  complaintTitleFirstWord: {
    fontWeight: 700,
    fontFamily: "Times New Roman Bold",
  },
  tabl: {

  },
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
    borderBottom: '1px solid black'
  },
  secondaryDiagnosis: {
    ...(probDiagns),
  },
  probableDiagnosisText: {
    width: '750px',
    borderLeft: '1px solid left'
  },
  probableDiagnosisNum: {
    ...(examineStyle),
    borderRight: 'initial',
    fontFamily: "Times New Roman Bold",
    width: '350px'
  },
  tablHeaderTypeExamine: {
    ...(examineStyle),
    height: '100%',
    fontFamily: "Times New Roman Bold",
    width: '340px'
  },
  tablHeaderPlaceExamine: {
    ...(examineStyle),
    height: '100%',
    fontFamily: "Times New Roman Bold",
    width: '330px'
  },
  tablHeaderTargetExamine: {
    ...(examineStyle),
    fontFamily: "Times New Roman Bold",
    width: '330px'
  },
  commentsWrapper: {
    ...(trow),
    alignItems: 'start'
  },
  commentsNum: {
    width: '50px',
    textAlign: 'left',
    padding: '0px'
  },
  commentsSecText: {
    width: '100%',
    textAlign: 'left',
    borderBottom: '1px solid black',
  },
  commonSize: {
    width: '80%',
    marginHorizontal: 'auto'
  },
  finalDateAndFio: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  finalDateAndFioText: {
    textDecoration: 'underline'
  },
  exeDateText: { width: '150px', marginHorizontal: '10px' },
  managerAndSpeciality: { display: 'flex', flexDirection: 'column', width: '150px', alignItems: 'center', marginHorizontal: '10px', flexWrap: 'wrap' }

});

function MyDocContent({ applItem, isDeletedPlace, status}) {
  let list = []

  for (let index = 0; index < 50; index++) {
    let consdoc = {
      name: `док${index + 1}`,
      speciality: `уролог${index + 1}`
    }
    list.push(consdoc)
  }

  const { mostProblDiagnosis, secondaryDiagnosis, patientBirthDate, patientName, complaint, anamnesis, consiliumDoctors, diagnostic, checkupPlans, diagnosticData, comments, execDate, manager, managerSpeciality, managerSignUrlPath } = applItem
  const currentYear = new Date().getFullYear()
  const yearsOld = new Date(patientBirthDate).getFullYear()
  const month = new Date(patientBirthDate).getMonth()
  const date = new Date(patientBirthDate).getDate()
  const age = currentYear - yearsOld
  return (
    <PDFViewer>
      <Document>
        <Page style={styles.title}>
          <View style={{ ...styles.commonSize, ...styles.hdr, marginBottom: 5 }} fixed>
            <Image src={hopedoc} style={styles.hdrimg} />
            <View>
              <Text>г Махачкала, ул Батырая 11</Text>
              <Text>7 этаж 709 кабинет</Text>
              <Text>Тел. +7(964)0067007</Text>
            </View>
          </View>
          <Text style={styles.recomenTitle}>
            {status}
          </Text>
          <Text style={{ ...styles.commonSize, ...styles.subtitle }}>
            (ВНИМАНИЕ! ДОКУМЕНТ ИСКЛЮЧИТЕЛЬНО ДЛЯ ВНУТРЕННЕГО ПОЛЬЗОВАНИЯ ОРГАНИЗАЦИИ)
          </Text>
          <View style={{ ...styles.commonSize, ...styles.birthWrapper }}>
            {patientName ? <View style={styles.birth}>
              <Text>
                {patientName}
              </Text>
              <Text style={styles.birthText}>
                ФИО
              </Text>
            </View> : <View></View>}
            {patientBirthDate ? <View style={styles.birth}>
              <Text>
                {`${date}.${month}.${yearsOld} г.р. (${age} лет)`}
              </Text>
              <Text style={styles.birthText}>
                Дата рождения
              </Text>
            </View> : <View></View>}
          </View>
          <Text style={styles.reasonTitle}>На основании: </Text>
          <Text style={styles.reasonSubTitle}> (указать основания: жалобы, симптомы, синдромы подозрения врача и пр.): </Text>
          <View style={{ ...styles.commonSize, ...styles.anamnesisSection }}>
            {complaint ? <Text style={styles.complaintTitle}><Text style={styles.complaintTitleFirstWord}>Жалоб: </Text> {complaint}</Text> : null}
            {anamnesis ? <Text style={styles.complaintTitle}><Text style={styles.complaintTitleFirstWord}>Анамнеза: </Text>{anamnesis}
            </Text> : null}
            {diagnosticData ? <Text style={styles.complaintTitle}><Text style={styles.complaintTitleFirstWord}>Данных обследования: </Text>{diagnosticData}</Text> : null}
          </View>
          <View>
            <Text style={{ ...styles.reasonTitle, marginTop: 12 }} wrap={false}>Проведен дистанционный врачебный консилиум в составе:</Text>
            <Text style={{ ...styles.reasonTitle, fontSize: 10, marginTop: 4 }}>(указать ФИО и специальности врачей, которые участвовали в формировании заключения): </Text>
            {consiliumDoctors ? <View style={{ ...styles.commonSize, ...styles.tabl, marginTop: 10 }} wrap={false}>
              <View style={styles.tableRow}>
                <Text style={{ ...styles.tablHeaderNum, fontFamily: 'Times New Roman Bold' }}>№</Text>
                <Text style={{ ...styles.tablHeaderFIO, fontFamily: 'Times New Roman Bold' }}>ФИО врача</Text>
                <Text style={{ ...styles.tablHeaderFIO, fontFamily: 'Times New Roman Bold' }}>Специальность</Text>
              </View>
              {consiliumDoctors.map((consiliumDoctor, index) => <View style={styles.tableRow} wrap={false}>
                <Text style={styles.tablHeaderNum}>{index + 1}</Text>
                <Text style={{ ...styles.tablHeaderFIO, textAlign: 'left', fontFamily: 'Times New Roman Bold' }}>{consiliumDoctor.name}</Text>
                <Text style={{ ...styles.tablHeaderFIO, textAlign: 'left', fontFamily: 'Times New Roman Bold' }}>{consiliumDoctor.speciality}</Text>
              </View>)}
            </View> : null}
          </View>
          <View style={{ marginTop: 14, ...styles.commonSize }}>
            <Text style={{ fontFamily: 'Times New Roman Bold' }}>С целью проведения дифференциальной диагностики между</Text>
            <Text style={{ fontFamily: 'Times New Roman Bold', fontSize: 10 }}>(указать заболевания, факты и симптомы клинической картины, которых частично или полностью соответствуют заболеванию)</Text>
            <View style={{ ...styles.tabl, marginTop: 10 }}>
              <View style={styles.tableRow}>
                <Text style={{ ...styles.tablHeaderNum, fontFamily: 'Times New Roman Bold' }}>№</Text>
                <Text style={{ ...styles.tablHeaderDiagnosis, fontFamily: 'Times New Roman Bold' }}>Диагноз</Text>
              </View>
              {diagnostic.map((diagnosis, index) => <View style={styles.tableRow} wrap={false}>
                <Text style={styles.tablHeaderNum}>{index + 1}</Text>
                <Text style={{ ...styles.tablHeaderDiagnosis, textAlign: 'left' }}>{diagnosis.diagnosis}</Text>
              </View>)}
            </View>
          </View>
          <View style={{ marginTop: 14, ...styles.commonSize }}>
            <View style={styles.probableDiagnosis} wrap={false}>
              <Text style={styles.probableDiagnosisNum}>
                Выявлен наиболее вероятный
                основной диагноз:
              </Text>
              <Text style={{ ...styles.probableDiagnosisText, padding: 5 }}>
                {mostProblDiagnosis}
              </Text>
            </View>
            <View style={styles.secondaryDiagnosis} wrap={false}>
              <Text style={styles.probableDiagnosisNum}>
                Выявлены сопутствующие диагнозы:
              </Text>
              <Text style={{ ...styles.probableDiagnosisText, padding: 5 }}>
                {secondaryDiagnosis}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 14, ...styles.commonSize }}>
            {checkupPlans.length > 0 ? <View style={styles.tabl} wrap={false}>
              <Text style={{ fontFamily: 'Times New Roman Bold' }} wrap={false}>
                На основании проведенного консилиума рекомендован план лечения (ПЛ):
              </Text>
              <View style={{ ...styles.tableRow, alignItems: 'center' }} wrap={false}>
                <Text style={{ ...styles.tablHeaderNum, fontFamily: 'Times New Roman Bold' }}>№</Text>
                <Text style={styles.tablHeaderTypeExamine}>Вид обледования</Text>
                {(!isDeletedPlace || status) && <Text style={styles.tablHeaderPlaceExamine}>Место</Text>}
                <Text style={styles.tablHeaderTargetExamine}>Цель проведения обследования</Text>
              </View>
              {checkupPlans.map((checkUpPlan, index) => <View style={styles.tableRow} wrap={false}>
                <Text style={styles.tablHeaderNum}>{index + 1}</Text>
                <Text style={styles.tablHeaderTypeExamine}>{checkUpPlan.kind}</Text>
                {(!isDeletedPlace || status) && <Text style={styles.tablHeaderPlaceExamine}>{checkUpPlan.place}</Text>}
                <Text style={styles.tablHeaderTargetExamine}>{checkUpPlan.target}</Text>
              </View>)}
            </View> : null}
            {comments ? <View style={styles.tabl}>
              <Text style={{ fontFamily: 'Times New Roman Bold', marginTop: 14, textAlign: 'left' }} wrap={false}>Пояснения:</Text>
              {comments.map((comment, index) => <View style={{ ...styles.commentsWrapper, marginTop: 14 }} wrap={false}>
                <Text style={styles.commentsNum}>{index + 1}</Text>
                <Text style={styles.commentsSecText}>{comment.comment}</Text>
              </View>)}
            </View> : null}
          </View>
          {execDate && manager ?
            <View style={{ ...styles.commonSize, ...styles.finalDateAndFio, ...styles.finalDateAndFioText }} wrap={false}>
              <Text style={styles.exeDateText}>{new Date(execDate).toLocaleString().substring(0, 10)}</Text>
            { managerSignUrlPath ? <Image src={managerSignUrlPath} style={styles.hdrimg} /> : null }
              <Image src={sell} style={styles.hdrimg} />
              <View style={styles.managerAndSpeciality}>
                {managerSpeciality ? <Text >{managerSpeciality}</Text> : null}
                <Text>{manager}</Text>
              </View>
            </View> : null}
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default MyDocContent;
