import React from "react";
import { useSelector } from 'react-redux';
import { Document, Page, PDFViewer, Text, StyleSheet, View, Font, Image } from '@react-pdf/renderer'
import './style.pdfdoc.scss'
import hopedoc from '../../../hopedoc.png'
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
    margin: '10px 30px 0 30px',
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
    color: 'red'
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
    marginHorizontal: 30,
    marginTop: 24
  },
  birthText: {
    borderTop: '1px solid black',
    width: '100%',
    fontFamily: "Times New Roman Reg",
    fontSize: 10
  },
  anamnesisSection: {
    width: '90%',
    margin: '0px 30px',
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
    width: '97%',
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
    width: '90%',
    margin: '0 auto 0',
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
    alignItems: 'center'
  },
  commentsNum: {
    width: '50px',
    textAlign: 'left',
    padding: '5px'
  },
  commentsSecText: {
    width: '1000px',
    textAlign: 'left',
    borderBottom: '1px solid black',
    marginLeft: '10px',
    padding: '5px'
  }

});

function MyDocContent({ applItem }) {
  let list = []

  for (let index = 0; index < 50; index++) {
    let consdoc = {
      name: `док${index + 1}`,
      speciality: `уролог${index + 1}`
    }
    list.push(consdoc)
  }
  const { mostProblDiagnosis, secondaryDiagnosis, patientBirthDate, patientName, complaint, anamnesis, consiliumDoctors, diagnostic, checkupPlans, diagnosticData, comments } = useSelector(state => state.applicationItem)
  const currentYear = new Date().getFullYear()
  const yearsOld = new Date(patientBirthDate).getFullYear()
  const month = new Date(patientBirthDate).getMonth()
  const date = new Date(patientBirthDate).getDate()
  const age = currentYear - yearsOld
  return (
    <PDFViewer>
      <Document>
        <Page style={styles.title}>
          <View style={{ ...styles.hdr, marginBottom: 5 }} fixed>
            <Image src={hopedoc} style={styles.hdrimg} />
            <View>
              <Text>г Махачкала, ул Батырая 11</Text>
              <Text>7 этаж 709 кабинет</Text>
              <Text>Тел. +7(964)0067007</Text>
            </View>
          </View>
          <Text style={styles.recomenTitle}>
            РЕКОМЕНДАЦИИ ВРАЧА
          </Text>
          <Text style={styles.subtitle}>
            (ВНИМАНИЕ! ДОКУМЕНТ ИСКЛЮЧИТЕЛЬНО ДЛЯ ВНУТРЕННЕГО ПОЛЬЗОВАНИЯ ОРГАНИЗАЦИИ)
          </Text>
          <View style={styles.birthWrapper}>
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
          <View style={styles.anamnesisSection}>
            {complaint ? <Text style={styles.complaintTitle}><Text style={styles.complaintTitleFirstWord}>Жалоб: </Text> {complaint}</Text> : null}
            {anamnesis ? <Text style={styles.complaintTitle}><Text style={styles.complaintTitleFirstWord}>Анамнеза: </Text>{anamnesis}
            </Text> : null}
            {diagnosticData ? <Text style={styles.complaintTitle}><Text style={styles.complaintTitleFirstWord}>Данных обследования: </Text>{diagnosticData}</Text> : null}
          </View>
          <View>
            <Text style={{ ...styles.reasonTitle, marginTop: 12 }} wrap={false}>Проведен дистанционный врачебный консилиум в составе:</Text>
            <Text style={{ ...styles.reasonTitle, fontSize: 10, marginTop: 4 }}>(указать ФИО и специальности врачей, которые участвовали в формировании заключения): </Text>
            {consiliumDoctors ? <View style={{ ...styles.tabl, marginTop: 10 }} wrap={false}>
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
          <View style={{ marginTop: 14, marginHorizontal: 30 }}>
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
          <View style={{ marginTop: 14 }}>
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
          <View>
            {checkupPlans.length > 0 ? <View style={styles.tabl}>
            <Text style={{ fontFamily: 'Times New Roman Bold' }}>
              На основании проведенного консилиума рекомендован план лечения (ПЛ):
            </Text>
              <View style={{ ...styles.tableRow, alignItems: 'center' }}>
                <Text style={{ ...styles.tablHeaderNum, fontFamily: 'Times New Roman Bold' }}>№</Text>
                <Text style={styles.tablHeaderTypeExamine}>Вид обледования</Text>
                <Text style={styles.tablHeaderPlaceExamine}>Место</Text>
                <Text style={styles.tablHeaderTargetExamine}>Цель проведения обследования</Text>
              </View>
              {checkupPlans.map((checkUpPlan, index) => <View style={styles.tableRow} wrap={false}>
                <Text style={styles.tablHeaderNum}>{index + 1}</Text>
                <Text style={styles.tablHeaderTypeExamine}>{checkUpPlan.kind}</Text>
                <Text style={styles.tablHeaderPlaceExamine}>{checkUpPlan.place}</Text>
                <Text style={styles.tablHeaderTargetExamine}>{checkUpPlan.target}</Text>
              </View>)}
            </View> : null}
            {comments ? <View style={styles.tabl}  wrap={false}>
              <Text style={{ fontFamily: 'Times New Roman Bold', marginTop: 14, textAlign:'left' }}>Пояснения:</Text>
              {comments.map((comment, index) => <View style={{...styles.commentsWrapper, marginTop: 14}} wrap={false}>
                <Text style={styles.commentsNum}>{index + 1}</Text>
                <Text style={styles.commentsSecText}>{comment.comment}</Text>
              </View>)}
            </View> : null}
          </View>
          {/* <Text>На основании: </Text>
          <Text> (указать основания: жалобы, симптомы, синдромы подозрения врача и пр.): </Text>
          <View style={styles.anamnesisSection}>
            <Text style={styles.complaintTitle}><Text>Жалоб: </Text> {complaint}</Text>
            <Text style={styles.complaintTitle}><Text>Анамнеза: </Text>{anamnesis}</Text>
          </View>
          <View>
            <Text>Проведен дистанционный врачебный консилиум в составе:</Text>
            <Text>(указать ФИО и специальности врачей, которые участвовали в формировании заключения): </Text>
            <View style={styles.tabl}>
              <View style={styles.tableRow}>
                <Text style={styles.tablHeaderNum}>№</Text>
                <Text style={styles.tablHeaderFIO}>ФИО врача</Text>
                <Text style={styles.tablHeaderFIO}>Специальность</Text>
              </View>
              {list.map((consiliumDoctor, index) => <View style={styles.tableRow} wrap={false}>
                <Text style={styles.tablHeaderNum}>{index + 1}</Text>
                <Text style={styles.tablHeaderFIO}>док</Text>
                <Text style={styles.tablHeaderFIO}>уролог</Text>
              </View>)}
            </View>
          </View>
          <View>
            <Text>С целью проведения дифференциальной диагностики между</Text>
            <Text>(указать заболевания, факты и симптомы клинической картины, которых частично или полностью соответствуют заболеванию)</Text>
            <View style={styles.tabl}>
              <View style={styles.tableRow}>
                <Text style={styles.tablHeaderNum}>№</Text>
                <Text style={styles.tablHeaderDiagnosis}>Диагноз</Text>
              </View>
              {list.map((diagnosis, index) => <View style={styles.tableRow} wrap={false}>
                <Text style={styles.tablHeaderNum}>{index + 1}</Text>
                <Text style={styles.tablHeaderDiagnosis}>диагноз</Text>
              </View>)}
            </View>
          </View>
          <View>
            <View style={styles.probableDiagnosis}>
              <Text style={styles.probableDiagnosisNum}>
                Выявлен наиболее вероятный
                основной диагноз:
              </Text>
              <Text style={styles.probableDiagnosisText} wrap={false}>
                Последствия ОЧМТ (огнестрельное ранение) – ушиба ГМ
                тяжелой степени, перелома костей свода черепа,
                аксонального повреждения ГМ в виде травматической
                болезни ГМ, спастической гемиплегии. Посттравматическая
                энцефалопатия.
              </Text>
            </View>
            <View style={styles.secondaryDiagnosis}>
              <Text style={styles.probableDiagnosisNum}>
                Выявлен наиболее вероятный
                основной диагноз:
              </Text>
              <Text style={styles.probableDiagnosisText}>
                Последствия ОЧМТ (огнестрельное ранение) – ушиба ГМ
                тяжелой степени, перелома костей свода черепа,
                аксонального повреждения ГМ в виде травматической
                болезни ГМ, спастической гемиплегии. Посттравматическая
                энцефалопатия.
                Последствия ОЧМТ (огнестрельное ранение) – ушиба ГМ
                тяжелой степени, перелома костей свода черепа,
                аксонального повреждения ГМ в виде травматической
                болезни ГМ, спастической гемиплегии. Посттравматическая
                энцефалопатия.
                Последствия ОЧМТ (огнестрельное ранение) – ушиба ГМ
                тяжелой степени, перелома костей свода черепа,
                аксонального повреждения ГМ в виде травматической
                болезни ГМ, спастической гемиплегии. Посттравматическая
                энцефалопатия.
                Последствия ОЧМТ (огнестрельное ранение) – ушиба ГМ
                тяжелой степени, перелома костей свода черепа,
                аксонального повреждения ГМ в виде травматической
                болезни ГМ, спастической гемиплегии. Посттравматическая
                энцефалопатия.
                Последствия ОЧМТ (огнестрельное ранение) – ушиба ГМ
                тяжелой степени, перелома костей свода черепа,
                аксонального повреждения ГМ в виде травматической
                болезни ГМ, спастической гемиплегии. Посттравматическая
                энцефалопатия.
              </Text>
            </View>
          </View>
          <View>
            <Text>
              На основании проведенного консилиума рекомендован план лечения (ПЛ):
            </Text>
            <View style={styles.tabl}>
              <View style={styles.tableRow}>
                <Text style={styles.tablHeaderNum}>№</Text>
                <Text style={styles.tablHeaderTypeExamine}>Вид обледования</Text>
                <Text style={styles.tablHeaderPlaceExamine}>Место</Text>
                <Text style={styles.tablHeaderTargetExamine}>Цель проведения обследования</Text>
              </View>
              {list.map((consiliumDoctor, index) => <View style={styles.tableRow} wrap={false}>
                <Text style={styles.tablHeaderNum}>{index + 1}</Text>
                <Text style={styles.tablHeaderTypeExamine}>Реабилитационное лечение</Text>
                <Text style={styles.tablHeaderPlaceExamine}>ООО «Реабилитационный центр
                  «Три
                  сестры»,
                  Московская
                  область, г.о. Лосино-Петровский,
                  дер. Райки, ул. Чеховская, д. 1, тел:
                  8-495-287-49-49, +7 499 116-56-95,
                  535 500р.</Text>
                <Text style={styles.tablHeaderTargetExamine}>Цель проведения обследования</Text>
              </View>)}
            </View>
          </View>
          <View style={styles.tabl}>
            <Text>Пояснения</Text>
            {list.map((consiliumDoctor, index) => <View style={styles.commentsWrapper} wrap={false}>
              <Text style={styles.commentsNum}>{index + 1}</Text>
              <Text style={styles.commentsSecText}>Выяснили, что подопечный периодически получает амбулаторное, стационарное
                лечение, последнее реабилитационное лечение в декабре 2021 года, выписной эпикриз
                предоставлен. Эффект после курсов реабилитации бывает незначительным и
                непродолжительным. От родственников и знакомых семья узнала о реабилитационном
                центре «Три сестры», о котором много положительных отзывов людей, прошедших там
                реабилитацию.
                Мы ознакомились с сайтом центра, созвонились со специалистами центра,
                уточнили перечень процедур и условия пребывания для людей с данным диагнозом,
                получили интересовавшую нас информацию о стоимости.
                4.
                Далее мы стали сравнивать по перечню оказываемых п</Text>
            </View>)}
          </View> */}
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default MyDocContent;
