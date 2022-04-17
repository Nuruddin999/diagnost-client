import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Document, Page, PDFViewer, Text, StyleSheet, View, Font } from '@react-pdf/renderer'
import './style.pdfdoc.scss'
import { useParams } from "react-router-dom";
import { getOneApplication } from '../../../actions/application';
import font from '../../../Ubuntu-Regular.ttf'

Font.register({
  family: "Roboto",
  src:
    "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: "Roboto"
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Roboto"
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
});

function MyDocContent({applItem}) {
  return (
    <PDFViewer>
      <Document>
        <Page style={styles.title}>
          <Text>
            {applItem.mostProblDiagnosis}
          </Text>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default MyDocContent;
