import React from "react";
import ExplanArray from "./explanationArray";
import "../../../assets/styles/index.css";

export default function ExplainComp() {
  const explanations = [
    {
      title: "Optimal Performance",
      paragr:
        "Keep your HVAC system running at peak efficiency with our regular maintenance checks. A well-maintained system not only keeps your home comfortable but also reduces energy consumption and lowers utility bills.",
    },
    {
      title: "Prevent Costly Repairs",
      paragr:
        "Our proactive approach to HVAC maintenance helps identify and address potential issues before they become expensive problems. Regular inspections can extend the lifespan of your equipment, saving you money in the long run.",
    },
    {
      title: "Priority Service",
      paragr:
        "As a maintenance plan member, you'll enjoy priority service scheduling. When you need repairs or emergency service, you'll move to the front of the line, ensuring minimal downtime and maximum comfort.",
    },
    {
      title: "Expert Technicians",
      paragr:
        "Our certified technicians are trained to service all major HVAC brands and models. They bring a wealth of knowledge and experience to every visit, ensuring your system receives the best possible care.",
    },
    {
      title: "Exclusive Discounts",
      paragr:
        "Members of our maintenance plan receive special discounts on parts and labor. Enjoy the peace of mind that comes with knowing you're getting the best value for your money.",
    },
    {
      title: "Comprehensive Inspections",
      paragr:
        "Our thorough inspections cover all aspects of your HVAC system, including air filters, coils, electrical connections, thermostats, and more. We leave no stone unturned to ensure your system operates safely and efficiently.",
    },
    {
      title: "Convenient Scheduling",
      paragr:
        "We make it easy to keep your HVAC system in top shape with flexible scheduling options that fit your busy lifestyle. Our friendly staff will work with you to find the most convenient times for your maintenance visits.",
    },
    {
      title: "Environmental Impact",
      paragr:
        "A well-maintained HVAC system runs more efficiently, reducing your carbon footprint and contributing to a greener planet. Do your part for the environment while enjoying the benefits of a comfortable home.",
    },
  ];

  return (
    <div>
      <h2 className="explanation_title_quest">Frequently asked questions</h2>
      <div className="explanations_container">
        {explanations.map((explanation, index) => (
          <ExplanArray
            key={index}
            title={explanation.title}
            paragr={explanation.paragr}
          />
        ))}
      </div>
    </div>
  );
}
