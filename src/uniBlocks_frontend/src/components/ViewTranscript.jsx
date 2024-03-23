import DisplayUniversityData from "./Display";
import React from "react";
function ViewTranscript() {

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
                <div className="row  d-flex justify-content-center align-items-center" style={{ margin: '40px 0px' }}>
                    <DisplayUniversityData />
                </div>
            </div>
        </>
    );
}

export default ViewTranscript;