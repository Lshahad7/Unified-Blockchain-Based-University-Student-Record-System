import React, { useState } from "react";
import { ic } from "ic0";

  const DisplayUniversityData = () => {
  const [mongoid, setMongoid] = useState("");
  const [studentid, setStudetId] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [universityData, setUniversityData] = useState(null);

  const fetchUniversityData = async () => {
    try {
      setLoading(true);
      const ledgerInvoice = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai");
      const result = await ledgerInvoice.call("QueryUniversity", mongoid + '-' + studentid + '-' + country);
      // Convert BigInt values to strings before setting the state
      convertBigIntToString(result);
      setUniversityData(result);
    } catch (error) {
      console.error("Error fetching university data:", error);
    } finally {
      setLoading(false);
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
    <div className="card col-md-3 mx-2" style={{ width: '27rem', height: 'auto' }}>
      <center><h2>View Transcript</h2></center>
      <div className="card-body d-flex justify-content-center align-items-center">
        <div>
          <label style={styles.label}>
            Enter University ID:
            <input
              type="text"
              value={mongoid}
              onChange={(e) => setMongoid(e.target.value)}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Enter Student ID:
            <input
              type="text"
              value={studentid}
              onChange={(e) => setStudetId(e.target.value)}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Enter Student Country:
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={styles.input}
            />
          </label>

          <button onClick={fetchUniversityData} disabled={loading} style={styles.button}>
            Show
          </button>

          {/* Display loader while loading is true */}
          {loading && <div style={styles.loader}>Loading...</div>}

          {/* Display fetched university data */}
          {universityData && (
            <div style={styles.dataContainer} className="display_style">
              <h2 style={styles.heading}>Fetched University Data:</h2>
              <pre style={styles.data}>{JSON.stringify(universityData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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

export default DisplayUniversityData;
