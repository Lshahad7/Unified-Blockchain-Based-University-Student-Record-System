import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import { aes, unAes } from './Encription';

const styles = {
    contentContainer: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
    },
    mintButton: {
        backgroundColor: "#3498db",
        color: "#ffffff",
        padding: "12px 24px",
        borderRadius: "8px",
        textDecoration: "none",
        display: "inline-block",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "background-color 0.3s ease",
        marginTop: "20px",
    },
    textSection: {
        marginTop: "30px",
        lineHeight: "1.6",
    },
};


const { ic } = require("ic0");
const ledgerInvoice = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai");


function makepassword(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

function generateRandomId() {
    const currentDate = new Date();
    const timestamp = currentDate.getTime(); // Get current timestamp
    const randomNum = Math.floor(Math.random() * 1000); // Generate a random number
    const randomId = `${timestamp}${randomNum}`; // Combine timestamp and random number
    return randomId;
}


function API_Page() {
    const [APIs, setAPIs] = useState(null);
    const [loading, setLoading] = useState(false);
    const [API_Data, setAPIData] = useState(null); // Moved inside the component
    const [data, setData] = useState(null);
    const [result, setResult] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await ledgerInvoice.call("QueryALLAPI");
                setAPIs(data);
                console.log("All APIs: ", data);
            } catch (error) {
                console.error("Failed to fetch APIs:", error);
            }
        };

        if (APIs === null) {
            fetchData();
        }
    }, [APIs]); 

    function handleAPIData(api) {
        console.log("In Function Call:", api);
        if (API_Data == null) {
            setAPIData(api);
        } else {
            setAPIData(null);
        }
    }

    const handleDataSubmit = async (api) => {
        setLoading(true);

        try {
            const response = await axios.get(api.api_url);
            setData(response.data);
            console.log(response.data);

            // Using response.data directly to avoid state timing issues
            if (response.data && response.data.length > 0) {
                // Extract start and end dates using a regular expression
                const match = api.duration.match(/(\d{4}-\d{2}-\d{2})-(\d{4}-\d{2}-\d{2})/);
                const startDate = match ? match[1] : null;
                const endDate = match ? match[2] : null;
                console.log("Stdents:",response.data);
                for (const studentRecord of response.data) {
                    try {
                        const termList = [];
                        for (const term of studentRecord.terms) {
                            const courseList = [];
                            for (const course of term.courses) {
                                const courseRecord = {
                                    course_name: aes(course.student_course[0].course_name),
                                    term_id: aes((course.studen_term_id).toString()),
                                    course_credit: aes((course.student_course[0].course_credit).toString()),
                                    course_id: aes((course.course_id).toString()),
                                    course_cod: aes(course.student_course[0].course_code),
                                    letter_grade: aes(course.letter_grade),
                                    points: aes((course.points).toString()),
                                    class_nbr: aes((course.class_nbr).toString())
                                };
                                courseList.push(courseRecord);
                            }

                            const termRecord = {
                                courses: courseList,
                                status: aes((term.status).toString()),
                                term_id: aes((term.term_id).toString()),
                                student_term_id: aes((term.student_term_id).toString()),
                                semester_attempted_hours: aes((term.semester_attempted_hours).toString()),
                                term_description: aes(term.student_term.term_desc),
                                cumulative_gpa_hours: aes((term.cumulative_gpa_hours).toString()),
                                cumulative_earned_hours: aes((term.cumulative_earned_hours).toString()),
                                semester_gpa: aes((term.semester_gpa).toString()),
                                student_id: aes((term.student_id).toString()),
                                semester_points: aes((term.semester_points).toString()),
                                semester_gpa_hour: aes((term.semester_gpa_hours).toString()),
                                cumulative_attempted_hours: aes((term.cumulative_attempted_hours).toString()),
                                semester_earned_hours: aes((term.semester_earned_hours).toString()),
                                cumulative_gpa: aes((term.cumulative_gpa).toString()),
                                cumulative_points: aes((term.tot_grd_points_fa).toString()),
                                program: aes(term.program),
                            };

                            termList.push(termRecord);
                        }
                        console.log("My GPA:",api.gpaScale);

                        console.log("My Terms = ", termList);
                        const result = await ledgerInvoice.call(
                            "CreateUniversityInstance",
                            studentRecord.student_id + '-' + studentRecord.university_id + '-' + api.country,
                            aes(studentRecord.student_name_en),
                            aes((studentRecord.student_id).toString()),
                            aes(studentRecord.degree_en),
                            aes((studentRecord.status).toString()),
                            aes(studentRecord.student_nid),
                            aes(studentRecord.college_en),
                            aes(api.gpaScale),
                            aes(studentRecord.university_name),
                            aes(startDate),
                            aes(endDate),
                            aes(api.description),
                            generateRandomId(),
                            termList
                        );
                        const studentData = await ledgerInvoice.call(
                            "CreateStudentData",
                            studentRecord.student_nid,
                            makepassword(8),
                            studentRecord.student_id + '-' + studentRecord.university_id + '-' + api.country
                        );
                        console.log("Record =", studentRecord.student_id + '-' + studentRecord.university_id + '-' + api.country);
                        console.log("CreateUniversityInstance result:", result);
                        console.log("StudentData result:", studentData);
                        setResult(result);
                    } catch (error) {
                        console.error("Error calling CreateUniversityInstance:", error);
                    }
                }
            } else {
                console.log('No data to process');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            alert("Data Stored");
            setLoading(false);
            
        }
    }



    return (
        <>
            <div className="App">
                <div className="bg-white">
                    <div className="container">
                        <div className="d-flex justify-content-start align-items-start" style={{ margin: '0px !important' }}>
                            <img className="logo-image" src="/logo2.png" width={'100'} alt="DFINITY logo" />
                        </div>
                    </div>
                </div>
                <div className="bg-secondary">
                    <h1 className="text-center text-white ">Manage API Connections</h1>
                </div>
                {APIs ? (
                    <>
                        {API_Data && (
                            <div className="API_display_main">
                                <div className="api_row">
                                    <span className="api_title">URL:</span>
                                    <span className="api_data">{API_Data.api_url}</span>
                                </div>
                                <div className="api_row">
                                    <span className="api_title">Description:</span>
                                    <span className="api_data">{API_Data.description}</span>
                                </div>
                                <div className="api_row">
                                    <span className="api_title">Duration:</span>
                                    <span className="api_data">{API_Data.duration}</span>
                                </div>
                                <div className="api_row">
                                    <span className="api_title">University:</span>
                                    <span className="api_data">{API_Data.university}</span>
                                </div>
                                <div className="api_row">
                                    <span className="api_title">GPA Scale:</span>
                                    <span className="api_data">{API_Data.gpaScale}</span>
                                </div>
                                <div className="api_row">
                                    <span className="api_title">Country:</span>
                                    <span className="api_data">{API_Data.country}</span>
                                </div>

                                <button onClick={() => handleDataSubmit(API_Data)} className="btn btn-primary">{loading ? "Storeing Data..." : "Add the new transcript to blockchain"}</button>
                            </div>
                        )}

                        <div className="main_api_class">
                            {APIs.map((api, index) => (
                                <button
                                    key={index} 
                                    onClick={() => handleAPIData(api)}  
                                    className="new_transcript_btn"
                                    style={{ display: "block", marginBottom: "10px" }} 
                                >
                                    {api.university} / {api.duration}
                                </button>
                            ))}
                            <Link to="/manage-api?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai" className="new_transcript_btn">Add the New API Request</Link>
                        </div>
                    </>
                ) : (
                    <div className="main_api_class">
                        <div className="loader"></div>
                    </div>
                )}
            </div>
        </>
    );
}

export default API_Page;
