import { Document, Page, PDFViewer, Text, StyleSheet, View, Font, Image } from '@react-pdf/renderer'

const Table = ({ headers, dataContent, contentKeys }) => {
  return <View style={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: 'green' }}>
  { headers.length > 0 ? <View style={{ display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: 'green' }}>
      {headers.map(hdr =>
        <View style={{ flexBasis: hdr === '№' ? '5%' : '32%', backgroundColor: 'pink' }}>
          <Text>{hdr}</Text>
        </View>)}
    </View> : null}
    {dataContent && dataContent.length > 0 ? dataContent.map((dataObj,index)=><View style={{ display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: 'green' }} wrap={false}>
    <View style={{ flexBasis: '5%', backgroundColor: 'pink' }}>
          <Text>{index + 1}</Text>
        </View>
    {contentKeys.length > 0 ? contentKeys.map((val)=><View style={{ flexBasis: '32%', backgroundColor: 'pink' }}  wrap={false}>
          <Text>
{dataObj[val]}
          </Text>
        </View>) : null}
    </View>) : null}
  </View>
}
export default Table