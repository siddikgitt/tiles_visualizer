import React from "react";


import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "crimson",
    color: "white",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

const GeneratePDF = () => {
  return (
    <>

<PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Tiles: 35</Text>
            <Text>Tiles: $350</Text>
          </View>
          <View style={styles.section}>
            <Text>Rug: 1</Text>
            <Text>Rug Price: $50</Text>
          </View>

          <View style={styles.section}>
            <Text>Total Price: $400</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
      
    </>
  );
};

export default GeneratePDF;
