import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Document, Page, PDFViewer, Text, StyleSheet, View, Font } from '@react-pdf/renderer'
import './style.pdfdoc.scss'
import { useParams } from "react-router-dom";
import { getOneApplication } from '../../../actions/application';
import MyDocContent from "./pdfcontent";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
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

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

function MyDoc() {
  const { id } = useParams<{ id: string }>()
  const applItem = useSelector((state: RootState) => state.applicationItem)
  const dispatch = useDispatch()
  console.log('applItem',applItem)
  useEffect(() => {
    dispatch(getOneApplication(id))
  }, [])
  return (
  <MyDocContent applItem={applItem} />
  );
}

export default MyDoc;
