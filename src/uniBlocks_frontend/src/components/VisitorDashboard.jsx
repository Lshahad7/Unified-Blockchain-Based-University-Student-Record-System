import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Principal } from "@dfinity/principal";
import AOS from "aos";
import "aos/dist/aos.css";
import { ic } from "ic0";
import TranscriptPDF from './TranscriptPDF';
import { PDFViewer } from '@react-pdf/renderer';

function VisitorDashboard(props) {
    const [transcriptId, setTranscriptId] = useState('');
    const [unique_id, setUniqueId] = useState('');
    const [loading, setLoading] = useState(false);
    const [loggedIn, setloggedIn] = useState(false);
    const [studentData, setstudentData] = useState(null);
    const [showSecondCard, setShowSecondCard] = useState(false); 
   
    const toggleSecondCardVisibility = () => {
        setShowSecondCard(!showSecondCard);
    };

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "transcript_id") {
            setTranscriptId(value);
        } else if (name === "unique_id") {
            setUniqueId(value);
        }
    };

    const fetchData = async () => {
        try {
            console.log("in function");
            setLoading(true);
            const ledgerQuery = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai");
            const result = await ledgerQuery.call("QueryUniversity", unique_id);
            // Convert BigInt values to strings before setting the state
            convertBigIntToString(result);
            setstudentData(result);
            if (studentData != null) {
                console.log(studentData[0].transcriptID);
                if (studentData[0].transcriptID == transcriptId) {
                    setloggedIn(true);
                } else {
                    setloggedIn(false);
                }
            }

            // Check if studentData is still null and counter is within limit for recursive call

        } catch (error) {
            console.error("Error fetching university data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (transcriptId !== null && unique_id !== null) {
            setLoading(true);
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
        <div className="App">
            <div className="bg-white">
                <div className="container">
                    <div className="uni_logo_style" style={{ margin: '0px !important' }}>
                        <img className="logo-image" src="/logo2.png" width={'100'} alt="DFINITY logo" />
                        {props.loggedInPrincipal == null ? (
                            <>
                                <span></span>
                            </>
                        ) :
                            (
                                <>
                                    <button onClick={props.onDisconnect} className="btn btn-danger">Logout</button>
                                </>
                            )}
                    </div>
                </div>
            </div>
            {
                props.loggedInPrincipal == null ?
                    (
                        <>
                            <div className="mx-3 content">
                                <div className="container">
                                    <div className="row  d-flex justify-content-center align-items-center" style={{ margin: '60px 0px' }}>
                                        <button className="btn btn-primary" style={{ width: '30%' }} onClick={props.onLoginClick}>Login with Internet Identity</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) :
                    (
                        <>
                            <div className="bg-secondary">
                                <h1 className="text-center text-white ">Vistor Home Page</h1>
                            </div>
                            <div className="mx-3 content">
                                <div className="container">
                                    <div className="row  d-flex justify-content-center align-items-center" style={{ margin: '60px 0px' }}>

                                        <div className="card col-md-6 mx-4" style={{ width: '70%', height: 'auto', overFlowX: "auto" }}>
                                            <div className="card-body d-flex justify-content-center align-items-center">
                                                {studentData ? (
                                                    <>

                                                        
                                                        <PDFViewer style={{ width: '100%', height: '90vh', marginTop: '15px' }}>
                                                            <TranscriptPDF universityData={studentData} />
                                                        </PDFViewer>
                                                    </>
                                                ) :
                                                    (
                                                        <>
                                                            <form onSubmit={handleSubmit}>
                                                                <h3 className="card-title card-text">Student Detail</h3>
                                                                <input
                                                                    type="text"
                                                                    className="form-control my-2 form-input"
                                                                    placeholder="Transcript ID"
                                                                    name="transcript_id"
                                                                    value={transcriptId}
                                                                    onChange={handleInputChange}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    className="form-control my-2 form-input"
                                                                    placeholder="Unique ID"
                                                                    name="unique_id"
                                                                    value={unique_id}
                                                                    onChange={handleInputChange}
                                                                />
                                                                <button type="submit" className="btn btn-lg btn-primary my-2">{loading ? "Fetching Data..." : "Fetch Data"}</button>
                                                            </form>
                                                        </>
                                                    )
                                                }

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </>
                    )
            }


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
export default VisitorDashboard;
