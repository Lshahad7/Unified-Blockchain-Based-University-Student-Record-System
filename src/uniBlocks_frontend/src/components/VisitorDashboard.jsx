import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Principal } from "@dfinity/principal";
import AOS from "aos";
import "aos/dist/aos.css";
import { ic } from "ic0";

function VisitorDashboard(props) {

    return (
        <div className="App">
            <div className="bg-white">
                <div className="container">
                    <div className="d-flex justify-content-start align-items-start" style={{ margin: '0px !important' }}>
                        <img className="logo-image" src="/logo2.png" width={'100'} alt="DFINITY logo" />
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
