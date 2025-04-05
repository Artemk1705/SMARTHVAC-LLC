import React, { useState, useEffect } from "react";
import { post } from "aws-amplify/api";

const RequestModal = ({ isOpen, onClose, item, setCartItems }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [desiredDate, setDesiredDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !item || !item.cart || item.cart.length === 0) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      fullName: userName,
      email: userEmail,
      phone: userPhone,
      terms: desiredDate,
      quantity: item.cart.reduce((sum, i) => sum + (i.qty || 1), 0),
      mname: "Full Cart Submission",
      model: "Multiple",
      selectedAnswers: item.cart.map((i) => ({
        name: i.name,
        model: i.model,
        power: i.power,
        qty: i.qty,
        price: i.price,
      })),
    };

    try {
      const restOperation = post({
        apiName: "equipapply",
        path: "/eapply",
        options: {
          body: payload,
          headers: {
            "Content-Type": "application/json",
          },
        },
      });

      const { body } = await restOperation.response;
      const response = await body.json();

      if (response.success) {
        console.log("✅ Application submitted successfully");
        setIsSuccess(true);
        localStorage.removeItem("myCart");
        if (typeof setCartItems === "function") setCartItems([]);
      } else {
        console.log("❌ Error submitting application:", response.error);
        setIsSuccess(false);
      }
    } catch (e) {
      console.error("❌ Error during submission:", e);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="confirm-overlay">
      <div className="confirm-modal">
        {isSuccess ? (
          <>
            <h3>Request Sent Successfully!</h3>
            <p>
              Thank you, {userName || "Customer"}! We’ll contact you shortly.
            </p>
            <button className="eq_appr_button" onClick={handleClose}>
              Close
            </button>
          </>
        ) : (
          <>
            <h3>Submit Request for All Equipment</h3>
            <form onSubmit={handleSubmit}>
              <input
                className="name_Inp_eq appl_inp"
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <input
                className="name_Inp_eq appl_inp"
                type="email"
                placeholder="Your Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
              <input
                className="name_Inp_eq appl_inp"
                type="tel"
                placeholder="Your Phone"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                required
              />
              <h4 className="eq_term_title">Desired Installation Date</h4>
              <input
                className="name_Inp_eq appl_inp"
                type="date"
                value={desiredDate}
                onChange={(e) => setDesiredDate(e.target.value)}
                required
              />
              <div className="policy_block_app">
                <div className="form_radio_block">
                  <label className="radio_policy_1">
                    <input
                      className="opt_in_label"
                      type="radio"
                      name="consent"
                      value="opt-in"
                      required
                    />
                    Opt-in
                  </label>
                  <label className="radio_policy">
                    <input type="radio" name="consent" value="opt-out" />
                    Opt-out
                  </label>
                </div>
                <span>
                  By submitting this form above I consent to SMART HVAC LLC
                  contact me via texts, phone, emails and voicemails for
                  promotions, marketing messages & offers even if I’m on any DNC
                  registries and use an automatic phone dialing system. I agree
                  to the{" "}
                  <a
                    href="https://smarthvacllc.s3.us-east-1.amazonaws.com/Privacy+Policy.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    privacy policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://smarthvacllc.s3.us-east-1.amazonaws.com/Web+Site+Terms+and+Conditions+of+Use.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    terms & conditions
                  </a>
                  Message frequency varies; Message & Data rates may apply. Text
                  STOP anytime to unsubscribe.
                </span>
              </div>
              <div className="confirm-buttons">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="eq_appr_button"
                >
                  {isSubmitting ? "Sending..." : "Submit Request"}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="eq_cancel_button"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RequestModal;
