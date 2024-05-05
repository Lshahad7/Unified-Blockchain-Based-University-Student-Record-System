import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Principal } from "@dfinity/principal";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

function Login() {

    return (
        <div className="App">
            <div className="mt-5">
                <h1 className="text-center text-white">Unified Blockchain-Based University <br /> Student Record System</h1>
            </div>
            <div className="container">
                <div className="mx-3 content">
                    <div className="row  d-flex justify-content-center align-items-center" style={{ margin: '50px 10px' }}>
                        <Link to="/university-dashboard?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai" className="card col-md-4 mx-5" style={{ width: '18rem', height: '22rem' }}>
                            <div className="card-body d-flex justify-content-center align-items-center">
                                <h3 className="card-title">University</h3>
                            </div>
                        </Link>
                        <Link to="/student-login?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai" className="card col-md-4 mx-5" style={{ width: '18rem', height: '22rem' }}>
                            <div className="card-body d-flex justify-content-center align-items-center">
                                <h3 className="card-title">Student</h3>
                            </div>
                        </Link>
                        {/*<Link to="/visitor-dashboard?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai" className="card col-md-4 mx-5" style={{ width: '18rem', height: '22rem' }}>
                            <div className="card-body d-flex justify-content-center align-items-center">
                                <h3 className="card-title">Visitor</h3>
                            </div>
                        </Link>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
