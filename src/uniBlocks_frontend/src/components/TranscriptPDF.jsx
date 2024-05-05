import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import {aes, unAes} from './Encription';
import AcademicRecordTable from './AcademicRecordTable';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
  },
  header: {
    backgroundColor: '#477388',
    padding: 10,
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 50,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: 'white',
  },
  subTitle: {
    fontSize: 12,
    color: 'white',
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    borderBottomStyle: 'solid',
  },
  userInfoColumn: {
    flexDirection: 'column',
  },
  userInfoText: {
    fontSize: 10,
    marginBottom: 2,
  },
  userInfoTextScale: {
    fontSize: 8,
    marginBottom: 2,
    color: 'grey'  
},
  label: {
    fontWeight: 'bold',
  },
});

// Create Document Component
const TranscriptPDF = ({ universityData }) => {
  console.log(universityData);
  const data = universityData[0];
  console.log("In Page:",data);
  const { universityName, studentName, studentID, college, major } = data;
  const { nationalID, studentStatus, gpaScale, transcriptID } = data;
  return (
    <Document>
      
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Unified Transcript</Text>
            <Text style={styles.subTitle}>Student Record System</Text>
          </View> {/* For balancing the header */}
        </View>
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfoColumn}>
            <Text style={styles.userInfoText}>
              <Text style={styles.label}>University Name: </Text>{unAes(universityName) || 'N/A'}
            </Text>
            <Text style={styles.userInfoText}>
              <Text style={styles.label}>Student Name: </Text>{unAes(studentName) || 'N/A'}
            </Text>
            <Text style={styles.userInfoText}>
              <Text style={styles.label}>Student Id: </Text>{unAes(studentID) || 'N/A'}
            </Text>
            <Text style={styles.userInfoText}>
              <Text style={styles.label}>College: </Text>{unAes(college) || 'N/A'}
            </Text>
            <Text style={styles.userInfoText}>
              <Text style={styles.label}>Degree: </Text>{unAes(major) || 'N/A'}       </Text>
            {/* ... Other left column items ... */}
          </View>
          <View style={styles.userInfoColumn}>
            <Text style={styles.userInfoText}>
              <Text style={styles.label}>Transcript ID: </Text>{transcriptID || 'N/A' }
            </Text>
            <Text style={styles.userInfoText}>
              <Text style={styles.label}>Student NID: </Text>{unAes(nationalID) || 'N/A'}
            </Text>
            <Text style={styles.userInfoText}>
              <Text style={styles.label}>Student Status: </Text>{unAes(studentStatus) || 'N/A'}
            </Text>
              
                {/*  <Text style={styles.userInfoText}>
                  <Text style={styles.label}>GPA: </Text>
                  {courseData.courses.length > 0 ? unAes(courseData.courses[courseData.courses.length - 1].cumulative_gpa) : 'N/A'}
                  </Text>*/}
              <Text style={styles.userInfoTextScale}>
              <Text style={styles.label}>The GPA system is based on a </Text>
              <Text>
                {unAes(gpaScale) || 'N/A'}
                <Text style={styles.label}>-based system</Text>
              </Text>
              </Text>
            

            {/* ... Other right column items ... */}
          </View>
        </View>

        {data.term.map((term, index) => (
        <AcademicRecordTable courseData={term} />
          ))}
        {/* ... Academic records and other content here ... */}
      </Page>
    </Document>
  );
};

export default TranscriptPDF;
