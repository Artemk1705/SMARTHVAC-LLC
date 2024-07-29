import React from "react";

const data = [
  { key: "Years in the Market", value: "MORE THEN 10 YEARS" },
  {
    key: "Completed Projects",
    value: "Over 10,000 projects for satisfied clients.",
  },
  {
    key: "Customer Satisfaction Rate",
    value: "More than 95% of our clients recommend us to others",
  },
  {
    key: "Service Coverage",
    value: "We serve clients in various cities and regions across the country",
  },
  {
    key: "Employee Qualifications",
    value:
      "Our team comprises highly qualified professionals with extensive experience in the HVAC industry",
  },
  {
    key: "Utilized Technologies",
    value:
      "We employ cutting-edge technologies and modern equipment to ensure top-notch service",
  },
  {
    key: "Partners and Certifications",
    value:
      "We collaborate with leading equipment manufacturers and hold certifications confirming high-quality standards",
  },
];

const Table = () => (
  <table className="table">
    <tbody>
      {data.map((row, index) => (
        <tr key={index} className={index % 2 === 0 ? "row-even" : "row-odd"}>
          <td className="cell-key">{row.key}</td>
          <td className="cell-value">{row.value}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
