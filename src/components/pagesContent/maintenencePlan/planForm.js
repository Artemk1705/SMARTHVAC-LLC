import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { post } from "aws-amplify/api";

function PlanForm({ title, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
      console.log("Submitting form data:", { ...formData, title });

      const restOperation = post({
        apiName: "Subscription",
        path: "/subs",
        options: {
          body: { ...formData, title },
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
    onClose();
  };

  return (
    <div className="form_modal">
      <div className="close-button" onClick={onClose}>
        &times;
      </div>
      <div className="form_block">
        <div className="block_content">
          <h4 className="req_title">Application for {title} subscription.</h4>
          <form onSubmit={handleSubmit} className="form_plan">
            <input
              className="plan_form_input"
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
            <input
              className="plan_form_input"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              className="plan_form_input"
              type="tel"
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
            />
            <input
              className="plan_form_input"
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
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
    </div>
  );
}

export default PlanForm;
