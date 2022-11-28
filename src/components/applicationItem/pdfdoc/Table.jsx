import { Text, View} from '@react-pdf/renderer'
import hyphen from 'hyphen';
import pattern from 'hyphen/patterns/ru';
import { unset } from 'lodash'

const hyphenator = hyphen(pattern);

const hyphenationCallback = (word) => {
  return hyphenator(word).split('\u00AD');
}


const TablePdf = ({ headers, dataContent, contentKeys, title, subTitle }) => {
  return <View>
    {dataContent.length > 0 ? <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}
      wrap={false}>
      <Text
        style={{ fontFamily: "Times New Roman Bold", }}>
        {title}
      </Text>
      <Text
        style={{ fontSize: 10, marginTop: 4, marginBottom: 10, fontFamily: "Times New Roman Bold", }}>
        {subTitle}
      </Text>
      {headers.length > 0 ?
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            border: '1px solid black'
          }}>
          {headers.map((hdr, hdrIndex) =>
            <View
              style={{
                flexBasis: hdr === '№' ? '5%' : `${95 / (headers.length - 1)}%`,
                borderRight: hdrIndex === headers.length - 1 ? unset : '1px solid black'
              }}>
              <Text hyphenationCallback={hyphenationCallback} style={{ fontFamily: "Times New Roman Bold", }}>
                {hdr}
              </Text>
            </View>)}
        </View>
        : null}
      {dataContent && dataContent.length > 0 ?
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          border: '1px solid black',
          borderTop: 'unset'
        }} >
          <View style={{ flexBasis: '5%', borderRight: '1px solid black' }}>
            <Text>1</Text>
          </View>
          {contentKeys.length > 0 ? contentKeys.map((val, valIndex) =>
            <Text hyphenationCallback={hyphenationCallback}
              style={{
                flexBasis: `${95 / (headers.length - 1)}%`,
                flexWrap: 'wrap',
                borderRight: valIndex === contentKeys.length - 1 ? unset : '1px solid black'
              }} >
              {dataContent[0][val]}
            </Text>) : null}
        </View> : null}
    </View> : null}
    {dataContent.length > 0 ?
      <View style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }} >
        {dataContent && dataContent.length > 0 ? dataContent.map((dataObj, index) => index > 0 ?
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            border: '1px solid black'
          }}
            wrap={false} >
            <View style={{ flexBasis: '5%', borderRight: '1px solid black' }}>
              <Text>{index + 1}</Text>
            </View>
            {contentKeys.length > 0 ? contentKeys.map((val, valIndex) => <View
              style={{
                flexBasis: `${95 / (headers.length - 1)}%`,
                flexWrap: 'wrap',
                borderRight: valIndex === contentKeys.length - 1 ? unset : '1px solid black'
              }} wrap={false}>
              <Text hyphenationCallback={hyphenationCallback}>
                {dataObj[val]}
              </Text>
            </View>) : null}
          </View> : null) : null}
      </View> : null}
  </View>
}
export default TablePdf