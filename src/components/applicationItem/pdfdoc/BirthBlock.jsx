
import { Text, View } from '@react-pdf/renderer'
import { BASIC_FONT } from './pdfcontent'



const BirthBlock = ({ patientName, flex, patientBirthDate,underText, text, styles}) => {

  return <View style={{ display: 'flex', flexDirection: 'column', flex }}>
  {patientName ?
    <Text style={{ borderBottom: '1px solid black', ...styles, textAlign:'center',paddingBottom:'2px' }}>
      {text}
    </Text> : <Text></Text>}
  {patientBirthDate ?
    <Text style={{ fontFamily: BASIC_FONT,
    fontSize: '8px',}}>
      {underText}
    </Text> : <Text></Text>}
</View>
}
export default BirthBlock