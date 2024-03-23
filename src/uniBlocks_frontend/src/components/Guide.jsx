import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Principal } from "@dfinity/principal";
import AOS from "aos";
import "aos/dist/aos.css";

function Guidelines() {

    return (
        <div className="App">
            <div className="mt-5">
                <h1 className="text-center text-white text-bold">Guidelines and Rquirements</h1>
            </div>
            <div className="container">
                <div className="mx-3 content">
                    <div className="row  d-flex justify-content-center align-items-center" style={{ margin: '50px 10px' }}>
                        <div className="card col-md-12 mx-5">
                            <div className="card-body">
                                <p>Data Format: The data should be in JSON format.</p>
                                <h3 className="card-title">Student Object Structure:</h3>
                                <p>Each object in the JSON array should represent a student. Each student object should contain the following keys:</p>
                                <ul>
                                    <li>student_id: Unique identifier for the student.</li>
                                    <li>county: The country of the student.</li>
                                    <li>university_id: Unique identifier for the university.</li>
                                    <li>university_name: Name of the university.</li>
                                    <li>student_nid: Student's National ID.</li>
                                    <li>student_name: Name of the student.</li>
                                    <li>college: College name.</li>
                                    <li>major: Student's major.</li>
                                    <li>status: Status of the student.</li>
                                    <li>Terms Object Structure:</li>
                                </ul>
                                <h3 className="card-title">Terms Object Structure:</h3>
                                <p>Each student object should contain a key named terms, which should hold an array of objects representing the terms for that student. Each term object should contain the following keys:</p>
                                <ul>
                                    <li>term_id: Unique identifier for the term.</li>
                                    <li>term_description: Description of the term.</li>
                                    <li>status: Status of the term.</li>
                                    <li>semester_attempted_hours: Number of semester hours attempted.</li>
                                    <li>semester_earned_hours: Number of semester hours earned.</li>
                                    <li>semester_points: Points earned in the semester.</li>
                                    <li>semester_gpa_hour: GPA hour for the semester.</li>
                                    <li>semester_gpa: GPA for the semester.</li>
                                    <li>cumulative_earned_hours: Cumulative earned hours.</li>
                                    <li>cumulative_points: Cumulative points.</li>
                                    <li>cumulative_gpa_hours: Cumulative GPA hours.</li>
                                    <li>cumulative_gpa: Cumulative GPA.</li>
                                    <li>program: Program enrolled in.</li>
                                    <li>cumulative_attempted_hours: Cumulative number of attempted hours.</li>
                                    <li>Courses Object Structure:</li>
                                </ul>
                                <h3 className="card-title">Courses Object Structure:</h3>
                                <p>Each term object should contain a key named courses, which should hold an array of objects representing the courses taken in that term. Each course object should contain the following keys:</p>
                                <ul>
                                    <li>course_id: Unique identifier for the course.</li>
                                    <li>course_cod: Course code.</li>
                                    <li>course_name: Name of the course.</li>
                                    <li>course_credit: Credit hours for the course.</li>
                                    <li>letter_grade: Grade received for the course.</li>
                                    <li>points: Points earned for the course.</li>
                                </ul>
                                <p>By adhering to these guidelines, you ensure that the data is structured consistently and can be processed accurately. Thank you for your cooperation.</p>
                                <h3 className="card-title">Sample Data</h3>
                                
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Guidelines;
