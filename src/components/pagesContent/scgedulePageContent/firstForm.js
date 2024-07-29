import { useState } from "react";
import Calendar from "./calendar";
import { post } from "aws-amplify/api";

function FromSchedule({ onChange, selectedService }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedBlockTitle, setSelectedBlockTitle] = useState("");
  const [formValues, setFormValues] = useState({
    Old_equip: "",
    Describe: "",
    Picture: null,
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Email: "",
    Street: "",
    Unit: "",
    City: "",
    StateSch: "",
    Zip: "",
    BlockTitle: "",
  });

  const [showFirstForm, setShowFirstForm] = useState(true);
  const [showSecondForm, setShowSecondForm] = useState(false);

  const handleNextClick = () => {
    setShowFirstForm(false);
    setShowSecondForm(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("service", selectedService);
    data.append("date", selectedDate);
    data.append("time", selectedTime);
    Object.keys(formValues).forEach((key) => {
      data.append(key, formValues[key]);
    });
    if (formValues.Picture) {
      data.append("Picture", formValues.Picture);
    }

    try {
      console.log("Submitting form data:", data);

      const response = await post({
        apiName: "ScheduleFunction",
        path: "/schedule",
        options: {
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      });

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
        console.log("Service booking submitted successfully");
      } else {
        console.log(
          "Error submitting service booking:",
          responseBodyJson.error
        );
      }
    } catch (error) {
      console.error("Error during service booking submission:", error);
    }
  };

  const handleSchedChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormValues({
        ...formValues,
        [name]: files[0],
      });
      if (files.length > 0) {
        setFileName(files[0].name);
      }
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleBackClick = () => {
    setShowFirstForm(true);
    setShowSecondForm(false);
  };

  const [fileName, setFileName] = useState("");

  return (
    <div className="sch_page">
      <div className="sch_content_form">
        {showFirstForm && (
          <form enctype="multipart/form-data">
            {selectedBlockTitle && (
              <div>
                <h3>{selectedBlockTitle}</h3>
              </div>
            )}
            <div className="first_form_block">
              <h3>How old is your equipment?</h3>
              <select
                className="sch_Old"
                name="Old_equip"
                value={formValues.Old_equip}
                onChange={handleSchedChange}
                placeholder="Enter your answer"
              >
                {[...Array(50).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <h3>Please describe the issue you're having.</h3>
              <input
                className="sch_describe"
                type="text"
                name="Describe"
                value={formValues.Describe}
                onChange={handleSchedChange}
                placeholder="Enter your answer"
              />
              <div className="picture_block">
                <div className="file-upload-wrapper">
                  <h3 className="resume_title">
                    Add pictures to make your description more detailed.
                  </h3>
                  <input
                    type="file"
                    id="Picture"
                    name="Picture"
                    className="file-input"
                    onChange={handleSchedChange}
                  />
                  <div
                    className="file-upload-block"
                    onClick={() => document.getElementById("Picture").click()}
                  >
                    <div className="sch_picture_block">
                      <div className="resume_duble_block">
                        <div className="sch_upload_button">Upload Picture</div>
                        <div className="text_file">
                          {fileName && (
                            <span className="file-name-display">
                              {fileName}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="sch_button" onClick={() => onChange()}>
                BACK
              </button>
              <button
                className="sch_button"
                type="button"
                onClick={handleNextClick}
              >
                NEXT
              </button>
            </div>
          </form>
        )}

        {showSecondForm && (
          <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <div className="second_form_block">
              <input
                className="contact_input"
                name="FirstName"
                type="text"
                placeholder="First Name"
                onChange={handleSchedChange}
              />
              <input
                className="contact_input"
                name="LastName"
                type="text"
                placeholder="Last Name"
                onChange={handleSchedChange}
              />
              <input
                className="contact_input"
                name="PhoneNumber"
                type="text"
                placeholder="Phone Number"
                onChange={handleSchedChange}
              />
              <input
                className="contact_input"
                name="Email"
                type="text"
                placeholder="E-mail adress"
                onChange={handleSchedChange}
              />
              <input
                className="contact_input"
                name="Street"
                type="text"
                placeholder="Street address"
                onChange={handleSchedChange}
              />
              <input
                className="contact_input"
                name="Unit"
                type="text"
                placeholder="Unit / appartment / suite"
                onChange={handleSchedChange}
              />
              <input
                className="contact_input"
                name="City"
                type="text"
                placeholder="City"
                onChange={handleSchedChange}
              />
              <input
                className="contact_input"
                name="Zip"
                type="text"
                placeholder="Zip code"
                onChange={handleSchedChange}
              />
            </div>
            <select
              className="contact_input_select"
              id="StateSch"
              name="StateSch"
              onChange={handleSchedChange}
              required
            >
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

            <button
              className="sch_button"
              type="button"
              onClick={handleBackClick}
            >
              BACK
            </button>
            <div>
              <h2>Choose your date</h2>
              <div className="calendar">
                <div className="month_and_date">
                  <Calendar
                    onDateSelect={setSelectedDate}
                    onTimeSelect={setSelectedTime}
                  />
                  <div></div>
                </div>
                <div className="date_and_time"></div>
              </div>
            </div>
            <button className="sch_button" type="submit">
              SUBMIT
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default FromSchedule;
