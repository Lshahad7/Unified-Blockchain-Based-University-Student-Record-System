import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ic } from "ic0";
import TranscriptPDF from './TranscriptPDF';
import { PDFViewer } from '@react-pdf/renderer';

function StudentLogin() {
    // State hooks for storing input values
    const [nationalId, setNationalId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [loggedIn, setloggedIn] = useState(false);
    const [studentData, setstudentData] = useState(null);
    const [studentCompleteData, setData] = useState(null);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "national_id") {
            setNationalId(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };


    const fetchData = async () => {
        console.log("in function");
        setLoading(true);

        try {
            const ledgerQuery = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai");
            const result = await ledgerQuery.call("QueryStudent", nationalId);

            if (result) {
                convertBigIntToString(result);
                setstudentData(result); 
                const studentRecord = result[0];
                console.log("Student data: " + studentRecord.password);

                if (studentRecord && studentRecord.password === password) {
                    const result1 = await ledgerQuery.call("QueryUniversity", studentRecord.uniqueID);
                    convertBigIntToString(result1);
                    setData(result1); 
                    setloggedIn(true);
                }
            } else {
                console.log("No student data found");
            }
        } catch (error) {
            console.error("Error fetching university data:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (nationalId != null && password != null) {
            fetchData();
        }
    };



    // Function to convert BigInt values to strings in an object
    const convertBigIntToString = (obj) => {
        for (const key in obj) {
            if (typeof obj[key] === 'bigint') {
                obj[key] = obj[key].toString();
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                convertBigIntToString(obj[key]); // Recursively convert BigInt values in nested objects
            }
        }
    };


    return (
        <div className="container login-box">
            <div className="row  justify-content-center align-items-center h-100">
                {loggedIn ? (
                    <>
                        {studentCompleteData && (
                            // <div className="card mx-4 my-5" style={{ width: '30rem', height: 'auto', borderRadius: '35px' }}>
                            //     <div className="card-body d-flex justify-content-center align-items-center">
                            //         <div style={styles.dataContainer} className="display_style">
                            //             <h2 style={styles.heading}>Student Data:</h2>
                            //             <pre style={styles.data}>{JSON.stringify(studentCompleteData, null, 2)}</pre>
                            //         </div>
                            //     </div>
                            // </div>

                            <PDFViewer style={{ width: '100%', height: '90vh', marginTop: '15px' }}>
                                <TranscriptPDF universityData={studentCompleteData} />
                            </PDFViewer>

                        )}

                    </>
                ) :
                    (
                        <>
                            <div className="card mx-4 my-5" style={{ width: '30rem', height: '25rem', borderRadius: '35px' }}>
                                <div className="card-body d-flex justify-content-center align-items-center">
                                    <form onSubmit={handleSubmit}>
                                        <h3 className="card-title card-text">Student Login</h3>
                                        <input
                                            type="text"
                                            className="form-control my-2 form-input"
                                            placeholder="National ID"
                                            name="national_id"
                                            value={nationalId}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="password"
                                            className="form-control my-2 form-input"
                                            placeholder="Password"
                                            name="password"
                                            value={password}
                                            onChange={handleInputChange}
                                        />
                                        <button type="submit" className="btn btn-lg btn-primary my-2">{loading ? "Fetching from blockchain..." : "Fetch Data"}</button>
                                    </form>
                                </div>
                            </div>
                        </>
                    )
                }

            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f5f5f5",
    },
    label: {
        display: "block",
        margin: "10px 0",
    },
    input: {
        width: "100%",
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    button: {
        backgroundColor: "#3498db",
        color: "#ffffff",
        padding: "12px 24px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
    },
    loader: {
        marginTop: "20px",
    },
    dataContainer: {
        marginTop: "20px",
    },
    heading: {
        fontSize: "18px",
        marginBottom: "10px",
    },
    data: {
        whiteSpace: "pre-wrap",
    },
};

export default StudentLogin;
