import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UniversityForm.css"; //CSS file 
import axios from 'axios';

const { ic } = require("ic0");

const ledgerInvoice = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai");

function makepassword(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function generateRandomId() {
  const currentDate = new Date();
  const timestamp = currentDate.getTime(); // Get current timestamp
  const randomNum = Math.floor(Math.random() * 1000); // Generate a random number
  const randomId = `${timestamp}${randomNum}`; // Combine timestamp and random number
  return randomId;
}



const UniversityForm = () => {
  const [formData, setFormData] = useState({
    ApiUrl: "",
    country: "",
    gpaScale: "5",
    University: "",
    start: "",
    end: "",
    desc: "",
    isEndPresent: false
  });
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [result, setResult] = useState("");
  const [flag, setFlag] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading2(true); // Set loading state to true during submission
    
    console.log("Data = ", data);
    try {

      for (const studentRecord of data) {
        try {
          const termList = [];
          for (const term of studentRecord.terms) {
            const courseList = [];
            for (const course of term.courses) {
              const courseRecord = {
                course_name: course.course_name,
                term_id: course.term_id,
                course_credit: course.course_credit,
                course_id: course.course_id,
                course_cod: course.course_cod,
                letter_grade: course.letter_grade,
                points: course.points,
              };
              courseList.push(courseRecord);
            }

            const termRecord = {
              courses: courseList,
              status: term.status,
              term_id: term.term_id,
              semester_attempted_hours: term.semester_attempted_hours,
              term_description: term.term_description,
              cumulative_gpa_hours: term.cumulative_gpa_hours,
              cumulative_earned_hours: term.cumulative_earned_hours,
              semester_gpa: term.semester_gpa,
              student_id: term.student_id,
              semester_points: term.semester_points,
              semester_gpa_hour: term.semester_gpa_hour,
              cumulative_attempted_hours: term.cumulative_attempted_hours,
              semester_earned_hours: term.semester_earned_hours,
              cumulative_gpa: term.cumulative_gpa,
              cumulative_points: term.cumulative_points,
              program: term.program,
            };

            termList.push(termRecord);
          }

          console.log("My Temrs = ", termList);
          const result = await ledgerInvoice.call(
            "CreateUniversityInstance",
            studentRecord.student_id + '-' + studentRecord.university_id + '-' + formData.country,
            studentRecord.student_name,
            studentRecord.student_id,
            studentRecord.major,
            studentRecord.status,
            studentRecord.student_nid,
            studentRecord.college,
            formData.gpaScale,
            studentRecord.university_name,
            formData.start,
            formData.end,
            formData.desc,
            generateRandomId(),
            termList
          );
          const studentData = await ledgerInvoice.call(
            "CreateStudentData",
            studentRecord.student_nid,
            makepassword(8),
            studentRecord.student_id + '-' + studentRecord.university_id + '-' + formData.country,
          );
          console.log("Record =", studentRecord.student_id + '-' + studentRecord.university_id + '-' + formData.country);
          console.log("CreateUniversityInstance result:", result);
          console.log("StudentData result:", studentData);
          setResult(result);
        } catch (error) {
          console.error("Error calling CreateUniversityInstance:", error);
        }
      }


    } catch (error) {
      // Handle errors
      console.error("Error calling CreateUniversityInstance:", error);
    }
    setLoading2(false); // Set loading state to true during submission
  };
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const response = await fetch("/university/create", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       });

  //       if (response.ok) {
  //         const result = await response.json();
  //         console.log("CreateUniversityInstance result:", result);
  //         // Handle success, e.g., show a success message
  //       } else {
  //         // Handle error, e.g., show an error message
  //         console.error("Failed to create university instance:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error creating university instance:", error);
  //     }
  //   };

  useEffect(() => {
    // handleSubmit();
  }, [formData]);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    setLoading1(true);
    try {
      const response = await axios.get(formData.ApiUrl);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading1(false);
      setFlag(false);
    }
  };

  useEffect(() => {
    if (formData.ApiUrl && data === null && flag == true) {
      fetchData();
    }
  }, [formData.ApiUrl, data]); 

  const handleFetch = () => {
    if (formData.ApiUrl) {
      setFlag(true);
      fetchData();
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      isEndPresent: e.target.checked
    });
  };

  const handleEndDateChange = (e) => {
    if (!formData.isEndPresent) { // If the checkbox is not selected, allow the "End" picker
      setFormData({
        ...formData,
        end: e.target.value
      });
    }
  };

  return (
    <>
      <div className="card col-md-3 mx-1" style={{ width: '40rem', height: 'auto' }}>
        <div className="card-body d-flex  align-items-center">
          <form>
            <h5 className="card-title card-text">Fill the following field to start the connection and fetch to Blockchain</h5>
            <div className="form-row my-2">
              <div className="col-md-3">
                <label htmlFor="country" className="form-label">Country</label>
              </div>
              <div className="col-md-9">
                <select name="country"
                  className="form-control form-input" id="country" value={formData.country} onChange={handleChange}>

                  <option value="">Select a country</option>
                  {/* all countries  */}
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="USA">United States</option>
                </select>
              </div>
            </div>
            <div className="form-row my-2">
              <div className="col-md-3">
                <label htmlFor="" className="form-row">GPA Scale Type</label>
              </div>
              <div className="col-md-9 col-md-9 d-flex gap-4">

                <div>
                  <input
                    type="radio"
                    id="gpaScale5"
                    name="gpaScale"
                    value="5"
                    checked={formData.gpaScale === "5"}
                    onChange={handleChange}
                  />
                  <label htmlFor="gpaScale5" className="mx-2">5</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="gpaScale4"
                    name="gpaScale"
                    value="4"
                    checked={formData.gpaScale === "4"}
                    onChange={handleChange}
                  />
                  <label htmlFor="gpaScale4" className="mx-2">4</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="gpaScale100"
                    name="gpaScale"
                    value="100"
                    checked={formData.gpaScale === "100"}
                    onChange={handleChange}
                  />
                  <label htmlFor="gpaScale100" className="mx-2">100</label>
                </div>
              </div>
            </div>
            <div className="form-row my-2">
              <div className="col-md-3">
                <label htmlFor="university" className="form-label">University Name</label>
              </div>
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control my-2 form-input"
                  placeholder="Enter University Name"
                  name="University"
                  value={formData.University}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row my-2">
              <div className="col-md-3">
                <label htmlFor="duration" className="form-label">Transcript Duration</label>
              </div>
              <div className="col-md-9">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isEndPresent}
                    onChange={handleCheckboxChange}
                  />
                  Set End Date as "Present"
                </label>
                <div className="form-row my-2 gap-2">
                  <div className="col-md-6"> <input
                    type="date"
                    className="form-control my-2 form-input"
                    placeholder="Start "
                    name="start"
                    value={formData.start}
                    onChange={handleChange}
                  /></div>
                  <div className="col-md-6"> <input
                    type="date"
                    className="form-control my-2 form-input"
                    placeholder="End"
                    name="end"
                    value={formData.end}
                    onChange={handleEndDateChange}
                    disabled={formData.isEndPresent}
                  /></div>
                </div>

              </div>
            </div>
            <div className="form-row my-2">
              <div className="col-md-3">
                <label htmlFor="desc" className="form-label">Description</label>
              </div>
              <div className="col-md-9">
                <textarea name="desc" className="form-control" id="desc" cols="10" rows="5" value={formData.desc} onChange={handleChange}></textarea>
              </div>
            </div>
            <div className="form-row my-2">
              <div className="col-md-3">
                <label htmlFor="api" className="form-label">Api URL</label>
              </div>
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control my-2 form-input"
                  placeholder="Enter Api Url"
                  name="ApiUrl"
                  value={formData.ApiUrl}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="button" className="btn btn-lg btn-primary my-2" onClick={handleFetch} disabled={loading1}>
              {loading1 ? 'Fetching Data From SQL...' : 'Fetch new transcripts from the database'}
            </button>
          </form>
        </div>
        <div className="card-body d-flex justify-content-center align-items-center">
          <form onSubmit={handleSubmit}>
            <div className="form-button">
              <button type="submit"> {loading2 ? "Storeing Data..." : "Add the new transcript to blockchain"}</button>
              <div>{result}</div>
            </div>
          </form>
        </div>

      </div>
    </>
  );
};

export default UniversityForm;


// import React, { useState, useEffect } from "react";
// import "./UniversityForm.css"; // Import your CSS file for styling
// const { ic } = require("ic0");

// const ledgerInvoice = ic("vbway-byaaa-aaaap-abuvq-cai");

// const UniversityForm = () => {
//   const [formData, setFormData] = useState({
//     universityName: "",
//     gpaScaleType: "5",
//     studentName: "",
//     studentID: "",
//     major: "",
//     studentStatus: "",
//     termStatus: "",
//     courseNo: "",
//     crH: "",
//     points: "",
//     termPoints: "",
//     termAHRS: "",
//     termGPAHRS: "",
//     termGPA: "",
//     nationalID: "",
//     college: "",
//     degree: "",
//     academicYearTime: "",
//     termMajor: "",
//     courseName: "",
//     grade: "",
//     cumulativeHRS: "",
//     cumulativeEHRS: "",
//     cumulativeGPAHRS: "",
//     cumulativePoints: "",
//     cumulativeGPA: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFetch = async (event) => {
//     event.preventDefault(); // Prevent default form submission behavior
//     setLoading(true); // Set loading state to true during submission
//     console.log("Form data", formData);

//     try {
//       const result = await ledgerInvoice.call(
//         "CreateUniversityInstance",
//         formData.universityName,
//         formData.gpaScaleType,
//         formData.studentName,
//         formData.studentID,
//         formData.major,
//         formData.studentStatus,
//         formData.termStatus,
//         formData.courseNo,
//         formData.crH,
//         formData.points,
//         formData.termPoints,
//         formData.termAHRS,
//         formData.termGPAHRS,
//         formData.termGPA,
//         formData.nationalID,
//         formData.college,
//         formData.degree,
//         formData.academicYearTime,
//         formData.termMajor,
//         formData.courseName,
//         formData.grade,
//         formData.cumulativeHRS,
//         formData.cumulativeEHRS,
//         formData.cumulativeGPAHRS,
//         formData.cumulativePoints,
//         formData.cumulativeGPA
//       );
//       console.log("CreateUniversityInstance result:", result);
//       setResult(result);
//     } catch (error) {
//       // Handle errors
//       console.error("Error calling CreateUniversityInstance:", error);
//     }
//     setLoading(true); // Set loading state to true during submission
//   };
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     const response = await fetch("/api/create", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(formData),
//   //     });

//   //     if (response.ok) {
//   //       const result = await response.json();
//   //       console.log("CreateUniversityInstance result:", result);
//   //       // Handle success, e.g., show a success message
//   //     } else {
//   //       // Handle error, e.g., show an error message
//   //       console.error("Failed to create university instance:", response.statusText);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error creating university instance:", error);
//   //   }
//   // };

//   useEffect(() => {
//     // Trigger submission whenever formData changes
//     // handleSubmit();
//   }, [formData]);
//   return (
//     <div>
//       <form className="university-form" onSubmit={handleSubmit}>
//         <div className="form-column">
//           <div>
//             <label>1) Enter Official Name of University:</label>
//             <input
//               type="text"
//               name="universityName"
//               value={formData.universityName}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>2) Please Choose GPA Scale Type:</label>
//             <select
//               name="gpaScaleType"
//               value={formData.gpaScaleType}
//               onChange={handleChange}
//             >
//               <option value="5">5</option>
//               <option value="4">4</option>
//               <option value="100">100</option>
//             </select>
//           </div>

//           <div>
//             <label>3) Student Name:</label>
//             <input
//               type="text"
//               name="studentName"
//               value={formData.studentName}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>4) Student ID:</label>
//             <input
//               type="text"
//               name="studentID"
//               value={formData.studentID}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>5) Major:</label>
//             <input
//               type="text"
//               name="major"
//               value={formData.major}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>6) Student Status:</label>
//             <input
//               type="text"
//               name="studentStatus"
//               value={formData.studentStatus}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>7) Term Status:</label>
//             <input
//               type="text"
//               name="termStatus"
//               value={formData.termStatus}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>8) Course No:</label>
//             <input
//               type="text"
//               name="courseNo"
//               value={formData.courseNo}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>9) CR.H:</label>
//             <input
//               type="text"
//               name="crH"
//               value={formData.crH}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>10) Points:</label>
//             <input
//               type="text"
//               name="points"
//               value={formData.points}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>11) Term Points:</label>
//             <input
//               type="text"
//               name="termPoints"
//               value={formData.termPoints}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>12) Term AHRS:</label>
//             <input
//               type="text"
//               name="termAHRS"
//               value={formData.termAHRS}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>13) Term GPA HRS:</label>
//             <input
//               type="text"
//               name="termGPAHRS"
//               value={formData.termGPAHRS}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>14) Term GPA:</label>
//             <input
//               type="text"
//               name="termGPA"
//               value={formData.termGPA}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className="form-column">
//           <div>
//             <label>15) National ID:</label>
//             <input
//               type="text"
//               name="nationalID"
//               value={formData.nationalID}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>16) College:</label>
//             <input
//               type="text"
//               name="college"
//               value={formData.college}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>17) Degree:</label>
//             <input
//               type="text"
//               name="degree"
//               value={formData.degree}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>18) Academic Year-Time:</label>
//             <input
//               type="text"
//               name="academicYearTime"
//               value={formData.academicYearTime}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>19) Term Major:</label>
//             <input
//               type="text"
//               name="termMajor"
//               value={formData.termMajor}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>20) Course Name:</label>
//             <input
//               type="text"
//               name="courseName"
//               value={formData.courseName}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>21) Grade:</label>
//             <input
//               type="text"
//               name="grade"
//               value={formData.grade}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>22) Cumulative HRS:</label>
//             <input
//               type="text"
//               name="cumulativeHRS"
//               value={formData.cumulativeHRS}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>23) Cumulative EHRS:</label>
//             <input
//               type="text"
//               name="cumulativeEHRS"
//               value={formData.cumulativeEHRS}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>24) Cumulative GPA HRS:</label>
//             <input
//               type="text"
//               name="cumulativeGPAHRS"
//               value={formData.cumulativeGPAHRS}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>25) Cumulative Points:</label>
//             <input
//               type="text"
//               name="cumulativePoints"
//               value={formData.cumulativePoints}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>26) Cumulative GPA:</label>
//             <input
//               type="text"
//               name="cumulativeGPA"
//               value={formData.cumulativeGPA}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className="form-button">
//           <button type="submit"> {loading ? "Submitting..." : "Submit"}</button>
//           <div>{result}</div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UniversityForm;
