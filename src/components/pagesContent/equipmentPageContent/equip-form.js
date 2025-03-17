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
      <h3>Заполните форму:</h3>
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
