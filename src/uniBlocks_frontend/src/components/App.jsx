import React, { useState, useEffect } from "react";
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Principal } from "@dfinity/principal";
import AOS from "aos";
import "aos/dist/aos.css";
import UniversityForm from "./Form";
import DisplayUniversityData from "./Display";
import Login from "./login";
import UniversityDashboard from "./UniversityDashboard";
import ViewTranscript from "./ViewTranscript";
import VisitorDashboard from "./VisitorDashboard";
import Guidelines from "./Guide";
import MainForm from "./mainform";
import StudentLogin from "./studentLogin";
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

function App(props) {
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
    console.log("props", props);
  console.log("start", logged);
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path="/" element={<Login />}>
          </Route>
          <Route path="/student-login/" element={<StudentLogin />}>
          </Route>
          <Route path="/university-dashboard" element={<UniversityDashboard onLoginClick={props.onLoginClick} loggedInPrincipal={props.loggedInPrincipal} />}>
          </Route>
          <Route path="/visitor-dashboard" element={<VisitorDashboard onLoginClick={props.onLoginClick} loggedInPrincipal={props.loggedInPrincipal}/>}>
          </Route>
          <Route path="/manage-api" element={<MainForm />}>
          </Route>

          <Route path="/guide-lines" element={<Guidelines />}>
          </Route>

          <Route path="/view-transcript" element={<ViewTranscript />}>
          </Route>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
