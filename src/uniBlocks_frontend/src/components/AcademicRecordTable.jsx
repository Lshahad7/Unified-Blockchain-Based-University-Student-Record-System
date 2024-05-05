import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import {aes, unAes} from './Encription';

const styles = StyleSheet.create({

  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '20%',
    borderStyle: 'solid',
    borderBottomColor: '#000',
    borderWidth: 1,
    padding: 8,
    backgroundColor: '#f3e7d2',
  },

  tableColBody: {
    width: '20%',
    borderStyle: 'solid',
    borderBottomColor: '#000',
    borderWidth: 1,
    padding: 8,
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 8,
  },
  tableCellHeader: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableCell: {
    textAlign: 'center',
    fontSize: 10,
  },
  title: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#f3e7d2',
  },
  headerContainer: {
    flexDirection: 'row',
    borderBottomStyle: 'solid',
    border: 1,
    padding: 8,
  },
  subtitle: {
    fontSize: 12,
    width: '33.33%',
    textAlign: 'center',
  },
  footerContainer: {
    flexDirection: 'row',
    backgroundColor: '#d3d3d3',
  },
  footerTitle: {
    width: '40%',
    textAlign: 'left',
    fontSize: 12,
    padding: 8,
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
  },
  footerCell: {
    width: '12%',
    textAlign: 'center',
    fontSize: 12,
    padding: 8,
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
  },
});

// Create Document Component
const AcademicRecordTable = ({ courseData }) => {
  if (!courseData || courseData.length === 0) {
    return <Text>No Course Data Available</Text>;
  }
  // console.log("status:",courseData.status);
  // // console.log("status:",courseData[0].status);
  console.log("Course:",courseData);
  return (
    <View style={{ border: 1, marginBottom:'20px' }}>
      <Text style={styles.title}>Term Record</Text>
      <View style={styles.headerContainer}>
      <Text style={styles.subtitle}>Semester: {unAes(courseData.term_description)}</Text>
        <Text style={styles.subtitle}>Student Status: {unAes(courseData.status)}</Text>
        <Text style={styles.subtitle}>Major: {unAes(courseData.program)}</Text>
      </View>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableColHeader, { width: '20%' }]}>
            <Text style={styles.tableCellHeader}>Course Code</Text>
          </Text>
          <Text style={[styles.tableColHeader, { width: '30%' }]}>
            <Text style={styles.tableCellHeader}>Course Name</Text>
          </Text>
          <Text style={[styles.tableColHeader, { width: '15%' }]}>
            <Text style={styles.tableCellHeader}>Course Credit</Text>
          </Text>
          <Text style={[styles.tableColHeader, { width: '20%' }]}>
            <Text style={styles.tableCellHeader}>Letter Grade</Text>
          </Text>
          <Text style={[styles.tableColHeader, { width: '15%' }]}>
            <Text style={styles.tableCellHeader}>Points</Text>
          </Text>
        </View>
        {courseData.courses.map((course, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={[styles.tableColBody, { width: '20%' }]}>
              <Text style={styles.tableCell}>{unAes(course.course_cod)}</Text>
            </Text>
            <Text style={[styles.tableColBody, { width: '30%' }]}>
              <Text style={styles.tableCell}>{unAes(course.course_name)}</Text>
            </Text>
            <Text style={[styles.tableColBody, { width: '15%' }]}>
              <Text style={styles.tableCell}>{unAes(course.course_credit)}</Text>
            </Text>
            <Text style={[styles.tableColBody, { width: '20%' }]}>
              <Text style={styles.tableCell}>{unAes(course.letter_grade)}</Text>
            </Text>
            <Text style={[styles.tableColBody, { width: '15%' }]}>
              <Text style={styles.tableCell}>{unAes(course.points)}</Text>
            </Text>
          </View>
        ))}
        <View style={styles.tableRow}>
          <Text style={[styles.tableColHeader, { width: '20%' }]}>
            <Text style={styles.tableCellHeader}></Text>
          </Text>
          <Text style={[styles.tableColHeader, { width: '15%' }]}>
            <Text style={styles.tableCellHeader}>Attempted Hours</Text>
          </Text>
          <Text style={[styles.tableColHeader, { width: '15%' }]}>
            <Text style={styles.tableCellHeader}>Earned Hours</Text>
          </Text>
          <Text style={[styles.tableColHeader, { width: '15%' }]}>
            <Text style={styles.tableCellHeader}>Points </Text>
          </Text>
          <Text style={[styles.tableColHeader, { width: '20%' }]}>
            <Text style={styles.tableCellHeader}>GPA Hours Grade</Text>
          </Text>
          <Text style={[styles.tableColHeader, { width: '15%' }]}>
            <Text style={styles.tableCellHeader}>GPA</Text>
          </Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={[styles.tableColBody, { width: '20%' }]}>
            <Text style={styles.tableCellHeader}>Semester</Text>
          </Text>
          <Text style={[styles.tableColBody, { width: '15%' }]}>
            <Text style={styles.tableCellHeader}>{unAes(courseData.semester_attempted_hours)} </Text>
          </Text>
          <Text style={[styles.tableColBody, { width: '15%' }]}>
            <Text style={styles.tableCellHeader}>{unAes(courseData.semester_earned_hours)} </Text>
          </Text>
          <Text style={[styles.tableColBody, { width: '15%' }]}>
            <Text style={styles.tableCellHeader}>{unAes(courseData.semester_points)} </Text>
          </Text>
          <Text style={[styles.tableColBody, { width: '20%' }]}>
            <Text style={styles.tableCellHeader}>{unAes(courseData.semester_gpa_hour)} </Text>
          </Text>
          <Text style={[styles.tableColBody, { width: '15%' }]}>
            <Text style={styles.tableCellHeader}>{unAes(courseData.semester_gpa)}</Text>
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableColBody, { width: '20%' }]}>
            <Text style={styles.tableCellHeader}>Cumulative</Text>
          </Text>
          <Text style={[styles.tableColBody, { width: '15%' }]}>
            <Text style={styles.tableCellHeader}>{unAes(courseData.cumulative_attempted_hours)} </Text>
          </Text>
          <Text style={[styles.tableColBody, { width: '15%' }]}>
            <Text style={styles.tableCellHeader}>{unAes(courseData.cumulative_earned_hours)} </Text>
          </Text>
          <Text style={[styles.tableColBody, { width: '15%' }]}>
            <Text style={styles.tableCellHeader}>{unAes(courseData.cumulative_points)} </Text>
          </Text>
          <Text style={[styles.tableColBody, { width: '20%' }]}>
            <Text style={styles.tableCellHeader}>{unAes(courseData.cumulative_gpa_hours)} </Text>
          </Text>
          <Text style={[styles.tableColBody, { width: '15%' }]}>
            <Text style={styles.tableCellHeader}>{unAes(courseData.cumulative_gpa)}</Text>
          </Text>
        </View>
      </View>
    </View>
  

  );
};
export default AcademicRecordTable;
