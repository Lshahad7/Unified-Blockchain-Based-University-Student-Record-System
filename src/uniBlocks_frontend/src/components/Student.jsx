import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const { ic } = require("ic0");
const ledgerInvoice = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai");

function Student() {
    const [loading, setLoading] = useState(false);
    const [universityData, setUniversityData] = useState(null);
    const [studentid, setStudetId] = useState("");
    const fetchUniversityData = async () => {
        try {
            setLoading(true);
            const result = await ledgerInvoice.call("QueryStudent", studentid);
            // Convert BigInt values to strings before setting the state
            convertBigIntToString(result);
            setUniversityData(result);
        } catch (error) {
            console.error("Error fetching university data:", error);
        } finally {
            setLoading(false);
        }
    };

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
                    <h1 className="text-center text-white ">Check Student Account</h1>
                </div>
                <div className="card-body d-flex justify-content-center align-items-center card_style">
                    <center><h2>View Student Account Details</h2></center>
                    <div>
                        <label style={styles.label}>
                            Enter Student National ID:
                            <input
                                type="text"
                                value={studentid}
                                onChange={(e) => setStudetId(e.target.value)}
                                style={styles.input}
                            />
                        </label>

                        <button onClick={fetchUniversityData} disabled={loading} style={styles.button}>
                            Login
                        </button>
                        {loading && <div style={styles.loader}>Loading...</div>}
                        {universityData && (
                            <div style={styles.dataContainer} className="display_style">
                                <h2 style={styles.heading}>Fetched Student Data:</h2>
                                <pre style={styles.data}>{JSON.stringify(universityData, null, 2)}</pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
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

export default Student;