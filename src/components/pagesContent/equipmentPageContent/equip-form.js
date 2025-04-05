import React, { useState } from "react";

const EquipForm = ({ answers, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    adress: "",
    zip: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, selectedAnswers: answers });
  };

  return (
    <div className="eq_form_container">
      <h3>Fill in your contact details</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="name_Inp_eq"
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="name_Inp_eq"
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="name_Inp_eq"
          type="tel"
          name="phone"
          placeholder="Your phone number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          className="name_Inp_eq"
          type="text"
          name="city"
          placeholder="Your city"
          value={formData.city} // ✅ Исправлено
          onChange={handleChange}
          required
        />
        <input
          className="name_Inp_eq"
          type="text"
          name="adress"
          placeholder="Your adress"
          value={formData.adress} // ✅ Исправлено
          onChange={handleChange}
          required
        />
        <input
          className="name_Inp_eq"
          type="text"
          name="zip"
          placeholder="Your zip code"
          value={formData.zip} // ✅ Исправлено
          onChange={handleChange}
          required
        />
        <div className="policy_block_equip">
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
            By submitting this form above I consent to SMART HVAC LLC contact me
            via texts, phone, emails and voicemails for promotions, marketing
            messages & offers even if I’m on any DNC registries and use an
            automatic phone dialing system. I agree to the{" "}
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
            Message frequency varies; Message & Data rates may apply. Text STOP
            anytime to unsubscribe.
          </span>
        </div>
        <div className="but">
          <button className="eq_submit_button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EquipForm;
