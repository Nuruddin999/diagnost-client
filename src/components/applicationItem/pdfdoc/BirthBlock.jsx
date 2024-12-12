
import { Text, View } from '@react-pdf/renderer'
import {BASIC_APPL_FONT_SIZE} from "./pdfcontent";





const BirthBlock = ({ patientName, patientBirthDate}) => {
    const birthFormattedStyle = {
        width: '80%',
        borderBottom: "1px solid black",
        marginHorizontal: 'auto',
        flexDirection: 'row',
        fontSize: BASIC_APPL_FONT_SIZE,
        fontFamily: "Dejavu Sans Bold",
    }

  return <View>
      <View style={birthFormattedStyle}>
          {[patientName, patientBirthDate].map((el) =>
              <View style={{width: '50%', height: "40px"}} key={el}>
                  <Text style={{marginTop: "auto", marginBottom: "2px"}}>
                      {el}
                  </Text>
              </View>)}
      </View>
      <View style={{...birthFormattedStyle, fontFamily: 'Times New Roman Reg', border:"unset"}}>
          {['ФИО','Дата рождения'].map(el=>
              <View style={{width: '50%', height: "40px"}} key={el}>
                  <Text>{el}</Text>
              </View>
          )}
      </View>
</View>
}
export default BirthBlock