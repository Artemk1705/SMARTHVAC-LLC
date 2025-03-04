import React, { useState } from "react";

const EquipForm = ({ answers, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    adress: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, selectedAnswers: answers }); // ✅ Теперь answers передаётся правильно
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
          type="phone"
          name="phone"
          placeholder="Your phone number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          className="name_Inp_eq"
          type="text"
          name="adress"
          placeholder="Your address"
          value={formData.adress}
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
