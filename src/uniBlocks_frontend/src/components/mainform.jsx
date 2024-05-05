import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Principal } from "@dfinity/principal";
import AOS from "aos";
import "aos/dist/aos.css";
import UniversityForm from "./Form";
import DisplayUniversityData from "./Display";
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

function MainForm(props) {
    const [itemId, setItemId] = useState("46zg7-6yaaa-aaaap-abvhq-cai");
    const handleInputChange = (e) => {
        console.log(e);
        setItemId(e.target.value);
        console.log(itemId);
    };
    useEffect(() => {
        console.log("Rerendered");
        const aos_init = () => {
            AOS.init({
                once: true,
                duration: 1000,
                easing: "ease-out-cubic",
            });
        };

        window.addEventListener("load", () => {
            aos_init();
        });
    }, [props]);
    let logged = props.loggedInPrincipal
        ? props.loggedInPrincipal
        : Principal.fromText("2vxsx-fae");
    console.log("start", logged);
    return (
        <div className="App">
            <div className="bg-white">
                <div className="container">
                    <div className="d-flex justify-content-start align-items-start" style={{ margin: '0px !important' }}>
                        <img className="logo-image" src="/logo2.png" width={'100'} alt="DFINITY logo" />
                    </div>
                </div>
            </div>
            <div className="bg-secondary">
                <h1 className="text-center text-white ">University Home Page</h1>
            </div>

            <div style={styles.contentContainer}>
                <section style={styles.textSection}></section>
            </div>
            <div className="row  d-flex justify-content-center align-items-center" style={{ margin: '40px 0px' }}>
                <UniversityForm />
            </div>

        </div >
    );
}

export default MainForm;
