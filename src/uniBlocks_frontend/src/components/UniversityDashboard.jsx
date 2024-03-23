import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Principal } from "@dfinity/principal";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

function UniversityDashboard(props) {
    const [principalID, setPricipal] = useState(null);
    console.log("university login = ", props.loggedInPrincipal);
    return (
        <div className="App">
            <div className="bg-white">
                <div className="container">
                    <div className="d-flex justify-content-start align-items-start" style={{ margin: '0px !important' }}>
                        <img className="logo-image" src="./logo2.png" width={'100'} alt="DFINITY logo" />
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
                                        <button className="btn btn-primary" style={{width:'30%'}} onClick={props.onLoginClick}>Login with Internet Identity</button>
                                    </div>
                                </div>
                            </div>

                        </>
                    )
                    : (
                        <>
                            <div className="bg-secondary">
                                <h1 className="text-center text-white ">University Home Page</h1>
                            </div>
                            <div className="mx-3 content">
                                <div className="container">
                                    <div className="row  d-flex justify-content-center align-items-center" style={{ margin: '60px 0px' }}>
                                        <Link to="/manage-api?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai" className="card col-md-3 mx-4" style={{ width: '15rem', height: '18rem' }}>
                                            <div className="card-body d-flex justify-content-center align-items-center">
                                                <h3 className="card-title card-text">Manage Api Connections</h3>

                                            </div>
                                        </Link>
                                        <Link to="/view-transcript?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai" className="card col-md-3 mx-4" style={{ width: '15rem', height: '18rem' }}>
                                            <div className="card-body d-flex justify-content-center align-items-center">
                                                <h3 className="card-title card-text">View Transcript</h3>

                                            </div>
                                        </Link>
                                        {/* <div className="card col-md-3 mx-4" style={{ width: '15rem', height: '18rem' }}>
                                            <div className="card-body d-flex justify-content-center align-items-center">
                                                <h3 className="card-title card-text">Update Transcript</h3>

                                            </div>
                                        </div> */}
                                        <Link to="/guide-lines" className="card col-md-3 mx-4" style={{ width: '15rem', height: '18rem' }}>
                                            <div className="card-body d-flex justify-content-center align-items-center">
                                                <h3 className="card-title card-text">Guidelines and Requirements</h3>

                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
            }

        </div>
    );
}

export default UniversityDashboard;
