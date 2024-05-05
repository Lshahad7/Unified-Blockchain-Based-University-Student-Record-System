import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./UniversityForm.css"; 

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
    setLoading2(true); // Set loading state to true during submission;
    console.log("Data = ", data);
    try {

      try{
        const Add_Api = await ledgerInvoice.call(
          "CreateAPI",
          formData.ApiUrl,
          formData.desc,
          formData.start+"-"+formData.end,
          formData.University,
          formData.country,
          formData.gpaScale
        );
        console.log("Successfully API Added");
      }
      catch(error){
        console.log("Error While Storeing API:", error);
      }finally{
        alert("API Stored");
      }



    } catch (error) {
      // Handle errors
      console.error("Error calling CreateUniversityInstance:", error);
    }
    setLoading2(false); // Set loading state to true during submission
  };

  const [data, setData] = useState(null);


  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      isEndPresent: e.target.checked,
      end: 'Present'
    });
  };

  const handleEndDateChange = (e) => {
    if (!formData.isEndPresent) { 
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
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Qatar">Qatar</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Oman">Oman</option>
                  <option value="Kuwait">Kuwait</option>
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
          </form>
        </div>
        <div className="card-body d-flex justify-content-center align-items-center">
          <form onSubmit={handleSubmit}>
            <div className="form-button">
              <button type="submit"> {loading2 ? "Storeing Data..." : "Submit"}</button>
              <div>{result}</div>
            </div>
          </form>
        </div>

      </div>
    </>
  );
};

export default UniversityForm;