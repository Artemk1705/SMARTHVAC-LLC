import React, { useState } from "react";
import Select from "react-select";
import Resumeph from "../../../../assets/images/resume1.png";
import { Link } from "react-router-dom";
import { post } from "aws-amplify/api";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#ffffff"
      : state.isFocused
      ? "#c9c9c9"
      : "#ffffff",
    cursor: "pointer",
  }),
  multiValue: (styles, { data }) => ({
    ...styles,
    backgroundColor: "#ffffff",
    color: "#32326e",
  }),
  multiValueLabel: (base, state) => ({
    ...base,
    color: "#32326e",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: "#32326e",
    ":hover": {
      backgroundColor: "#ffffff",
      color: "#32326e",
    },
  }),
};

function EmploymentForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    resume: null,
    education: "",
    yearsExperience: "",
    previousCompany: "",
    workStartDate: "",
    workEndDate: "",
    licenses: [],
    softSkills: [],
    ethnicity: "",
    veteran: "",
    disability: "",
    workAuthorization: "",
  });

  const softSkillsOptions = [
    { value: "communication", label: "Communication" },
    { value: "teamwork", label: "Teamwork" },
    { value: "problem_solving", label: "Problem Solving" },
    { value: "creativity", label: "Creativity" },
    { value: "work_ethic", label: "Work Ethic" },
    { value: "interpersonal_skills", label: "Interpersonal Skills" },
    { value: "time_management", label: "Time Management" },
    { value: "leadership", label: "Leadership" },
    { value: "attention_to_detail", label: "Attention to Detail" },
    { value: "critical_thinking", label: "Critical Thinking" },
    { value: "empathy", label: "Empathy" },
    { value: "open_mindedness", label: "Open-Mindedness" },
    { value: "patience", label: "Patience" },
    { value: "decision_making", label: "Decision Making" },
    { value: "negotiation", label: "Negotiation" },
    { value: "self_motivation", label: "Self-Motivation" },
    { value: "stress_management", label: "Stress Management" },
    { value: "listening", label: "Listening" },
    { value: "enthusiasm", label: "Enthusiasm" },
    { value: "positivity", label: "Positivity" },
    { value: "confidence", label: "Confidence" },
    { value: "assertiveness", label: "Assertiveness" },
    { value: "initiative", label: "Initiative" },
    { value: "resilience", label: "Resilience" },
    { value: "analytical_skills", label: "Analytical Skills" },
    { value: "flexibility", label: "Flexibility" },
    { value: "accountability", label: "Accountability" },
    { value: "cultural_awareness", label: "Cultural Awareness" },
    { value: "persuasion", label: "Persuasion" },
    { value: "collaboration", label: "Collaboration" },
    { value: "integrity", label: "Integrity" },
    { value: "humor", label: "Humor" },
    { value: "reliability", label: "Reliability" },
    { value: "self-awareness", label: "Self-Awareness" },
    { value: "ambition", label: "Ambition" },
    { value: "respect", label: "Respect" },
    { value: "curiosity", label: "Curiosity" },
    { value: "sociability", label: "Sociability" },
    { value: "resourcefulness", label: "Resourcefulness" },
    { value: "proactiveness", label: "Proactiveness" },
    { value: "self_discipline", label: "Self-Discipline" },
    { value: "humility", label: "Humility" },
    { value: "sincerity", label: "Sincerity" },
    { value: "adaptability", label: "Adaptability" },
    { value: "teachability", label: "Teachability" },
    { value: "emotional_intelligence", label: "Emotional Intelligence" },
    { value: "grit", label: "Grit" },
    { value: "optimism", label: "Optimism" },
    { value: "reflectiveness", label: "Reflectiveness" },
  ];
  const licenseOptions = [
    { value: "Driver`s_License", label: "Driver’s License" },
    { value: "EPA_Section_608_Universal", label: "EPA Section 608 Universal" },
    { value: "OSHA_10", label: "OSHA 10" },
    { value: "OSHA_30", label: "OSHA 30" },
    { value: "EPA_608_TYPE_1", label: "EPA 608 type 1" },
    { value: "EPA_608_type_2", label: "EPA 608 type 2" },
    { value: "EPA_608_type_3", label: "EPA 608 type 3" },
    { value: "EPA_608_type_4", label: "EPA 608 type 4" },
    { value: "Refrigeration_Card", label: "Refrigeration Card" },
    { value: "Class_5_Boiler", label: "Class 5 Boiler" },
    { value: "CDL", label: "CDL" },
  ];

  const [fileName, setFileName] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "resume") {
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });
      setFileName(e.target.files[0].name);
    } else if (name === "licenses") {
      let selectedLicenses = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData({
        ...formData,
        [name]: selectedLicenses,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalOpen(true);

    const data = {};
    for (let key in formData) {
      if (key === "licenses" || key === "softSkills") {
        data[key] = formData[key].join(",");
      } else {
        data[key] = formData[key];
      }
    }

    try {
      console.log("Submitting form data:", data);

      const result = await post({
        apiName: "Careers",
        path: "/careers",
        options: {
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        },
      });

      const response = await result.response;
      console.log("Response object:", response);

      const reader = response.body.getReader();
      const stream = new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }
              controller.enqueue(value);
              push();
            });
          }

          push();
        },
      });

      const responseBody = await new Response(stream).text();
      console.log("Response text:", responseBody);

      const responseBodyJson = JSON.parse(responseBody);
      console.log("Response JSON:", responseBodyJson);

      if (responseBodyJson.success) {
        console.log("Application submitted successfully");
      } else {
        console.log("Error submitting application:", responseBodyJson.error);
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="employment-form"
      encType="multipart/form-data"
    >
      <h2 className="title_form">Contact information</h2>

      <div className="name_block">
        <div className="Firstname_block">
          <h4>First Name</h4>
          <input
            className="first_name_input"
            type="text"
            id="firstName"
            name="firstName"
            onChange={handleChange}
            required
          />
        </div>
        <div className="Lastname_block">
          <h4>Last Name</h4>
          <input
            className="lust_name_input"
            type="text"
            id="lastName"
            name="lastName"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="contact_form_block">
        <h4>Email</h4>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          required
        />

        <h4>Phone number</h4>
        <input type="tel" id="phone" name="phone" onChange={handleChange} />

        <h4>State</h4>
        <select id="state" name="state" onChange={handleChange} required>
          <option value="">Select state</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">MaryLand</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennesse</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washinghton</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>

        <h4>City</h4>
        <input
          type="text"
          id="city"
          name="city"
          onChange={handleChange}
          required
        />
      </div>
      <div className="resume_block">
        <div className="file-upload-wrapper">
          <h2 className="resume_title">Resume</h2>
          <input
            type="file"
            id="resume"
            name="resume"
            className="file-input"
            onChange={handleChange}
          />
          <div
            className="file-upload-block"
            onClick={() => document.getElementById("resume").click()}
          >
            <div className="resume_content">
              <img className="res_photo" src={Resumeph} alt="ResumePhoto" />
              <div className="resume_duble_block">
                <div className="resume_button">Upload Resume</div>
                <div className="text_file">
                  {fileName && (
                    <span className="file-name-display">{fileName}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="step_two">Experience information</h2>
      <div className="exp_block">
        <div className="last_work_place">
          <h4>Last work place</h4>
          <input
            type="text"
            id="previousCompany"
            name="previousCompany"
            onChange={handleChange}
          />
          <div className="date">
            <h4>From: </h4>
            <input
              type="date"
              id="workStartDate"
              name="workStartDate"
              onChange={handleChange}
            />
            <h4>To: </h4>
            <input
              type="date"
              id="workEndDate"
              name="workEndDate"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="licens_block">
          <h4>Years of experience</h4>
          <div className="years_exp">
            <label className="radio_container">
              <input
                type="radio"
                name="yearsExperience"
                value="0-1"
                className="radio-input"
                onChange={handleChange}
              />
              <span className="radio-label">0-1</span>
            </label>
            <label className="radio_container">
              <input
                type="radio"
                name="yearsExperience"
                value="1-2"
                className="radio-input"
                onChange={handleChange}
              />
              <span className="radio-label">1-2</span>
            </label>
            <label className="radio_container">
              <input
                type="radio"
                name="yearsExperience"
                value="2-5"
                className="radio-input"
                onChange={handleChange}
              />
              <span className="radio-label">2-5</span>
            </label>
            <label className="radio_container">
              <input
                type="radio"
                name="yearsExperience"
                value="5 & more"
                className="radio-input"
                onChange={handleChange}
              />
              <span className="radio-label">5 & more</span>
            </label>
          </div>
          <div className="education_block">
            <h4>Education Level</h4>
            <select
              id="education"
              name="education"
              onChange={handleChange}
              required
            >
              <option value="">Select Education Level</option>
              <option value="highschool">High School</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">Ph.D.</option>
              <option value="other">Other</option>
            </select>
          </div>
          <h4>Licenses</h4>
          <Select
            isMulti
            name="licenses"
            options={licenseOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            styles={customStyles}
            onChange={(selected) => {
              setFormData({
                ...formData,
                licenses: selected.map((s) => s.value),
              });
            }}
          />
        </div>
        <div className="soft_block">
          <h4>Soft skills</h4>
          <Select
            isMulti
            name="softSkills"
            options={softSkillsOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            styles={customStyles}
            onChange={(selected) => {
              setFormData({
                ...formData,
                softSkills: selected.map((s) => s.value),
              });
            }}
          />
        </div>
      </div>
      <div className="self_block">
        <h2 className="self_title">Self-Disclosure</h2>
        <div className="self_block_content">
          <div className="form-group">
            <h4>Ethnicity</h4>
            <select id="ethnicity" name="ethnicity" onChange={handleChange}>
              <option value="">Please choose an option</option>
              <option value="hispanic_latino">Hispanic or Latino</option>
              <option value="white">White</option>
              <option value="black_african_american">
                Black or African American
              </option>
              <option value="asian">Asian</option>
              <option value="native_american">
                Native American or Alaska Native
              </option>
              <option value="hawaii_pacific_islander">
                Native Hawaiian or Other Pacific Islander
              </option>
              <option value="two_more_races">Two or More Races</option>
              <option value="decline">I prefer not to answer</option>
            </select>
            <div className="form-group" onChange={handleChange}>
              <h4>Veteran Status</h4>
              <select id="veteran" name="veteran">
                <option value="">Please choose an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="decline">I prefer not to answer</option>
              </select>
            </div>

            <div className="form-group">
              <h4>Disability Status</h4>
              <select id="disability" name="disability" onChange={handleChange}>
                <option value="">Please choose an option</option>
                <option value="yes">Yes, I have a disability</option>
                <option value="no">No, I don't have a disability</option>
                <option value="decline">I prefer not to answer</option>
              </select>
            </div>
            <h4>Work Autorisation</h4>
            <div className="work_a">
              <label className="radio_container">
                <input
                  type="radio"
                  name="workAutorisation"
                  value="yes"
                  className="radio-input"
                  onChange={handleChange}
                />
                <span className="radio-label_2_span">yes</span>
              </label>
              <label className="radio_container">
                <input
                  type="radio"
                  name="workAutorisation"
                  value="no"
                  className="radio-input"
                  onChange={handleChange}
                />
                <span className="radio-label_2_span">no</span>
              </label>
            </div>
          </div>
          <button className="submit_button" type="submit">
            SUBMIT
          </button>
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h2 className="success_title">Success!</h2>
                <p className="success_text">
                  We will contact you as soon as we process your data.
                </p>
                <Link to="/">
                  <button
                    className="button_back"
                    onClick={() => setModalOpen(false)}
                  >
                    Back
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export default EmploymentForm;
