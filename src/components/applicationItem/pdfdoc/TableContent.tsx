import { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import {BASIC_APPL_FONT_SIZE, BASIC_FONT} from "./pdfcontent";


const TableContent: FC<{ flexBasis: string, content: string, hyphenationCallback: (word: string) => string[] }> =
    ({
        flexBasis,
        content,
        hyphenationCallback,
    }) => {
        return <View style={{
            flexBasis,
            flexWrap: 'wrap',
            fontSize: BASIC_APPL_FONT_SIZE,
            fontFamily: BASIC_FONT,
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '5px'
        }}>
            {content ? <Text hyphenationCallback={hyphenationCallback}
            >
                {content}
            </Text> : <Text hyphenationCallback={hyphenationCallback}
            >
                {' '}
            </Text>}
        </View>
    }

export default TableContent