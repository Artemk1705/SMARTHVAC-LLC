import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "aws-amplify/api";
import Disclamer from "./disclamer";
import QuestionPhoto from "../../../assets/images/qutstion.png";

function FormDis() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting form data:", formData);

      const restOperation = post({
        apiName: "Discount",
        path: "/discount",
        options: {
          body: formData,
          headers: {
            "Content-Type": "application/json",
          },
        },
      });

      const { body } = await restOperation.response;
      const response = await body.json();

      console.log("Response object:", response);

      if (response.success) {
        console.log("Application submitted successfully");
        setIsSuccess(true);
      } else {
        console.log("Error submitting application:", response.error);
        setIsSuccess(false);
      }
    } catch (e) {
      console.error("Error during submission:", JSON.parse(e.response.body));
      setIsSuccess(false);
    } finally {
      setModalOpen(true);
    }
  };

  const handleBack = () => {
    setModalOpen(false);
    navigate("/");
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dis_form_container">
      <h4 className="dis_title">GET DISCOUNT</h4>
      <div className="dis_quest_block">
        <p className="dis_p">Fill out the form and get 10% discount</p>
        <img
          src={QuestionPhoto}
          className="quest_img"
          alt="Disclaimer"
          onClick={handleSidebarToggle}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="dis_input_container">
          <div className="Fullname_block">
            <input
              className="name_Inp"
              type="text"
              id="fullName"
              name="fullName"
              placeholder="YOUR NAME"
              onChange={handleChange}
              required
            />
          </div>
          <div className="Lastname_block"></div>
          <input
            className="email_Inp"
            type="email"
            id="email"
            name="email"
            placeholder="YOUR EMAIL"
            onChange={handleChange}
            required
          />
          <input
            className="email_Inp"
            type="tel"
            id="phone"
            name="phone"
            placeholder="YOUR PHONE NUMBER"
            onChange={handleChange}
          />
          <input
            className="email_Inp"
            type="text"
            id="city"
            name="city"
            placeholder="YOUR CITY"
            onChange={handleChange}
            required
          />
          <button className="button_Inp" type="submit">
            SUBMIT
          </button>
        </div>
      </form>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {isSuccess ? (
              <>
                <h2 className="success_title">Success!</h2>
                <p className="success_text">
                  We will contact you as soon as we process your data.
                </p>
              </>
            ) : (
              <p className="error_text">
                There was an error submitting your application. Please try again
                later.
              </p>
            )}
            <button className="button_back" onClick={handleBack}>
              Back
            </button>
          </div>
        </div>
      )}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <button className="close_button" onClick={handleSidebarToggle}>
            &times;
          </button>
          <Disclamer />
        </div>
      </div>
    </div>
  );
}

export default FormDis;
