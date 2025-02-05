import React from "react";
import Image from "../../../assets/images/HvacMainBack.jpg";

export default function Equipment({ selectedEquipment = [] }) {
  return (
    <div>
      <div className="equip_page_title_container">
        <h1 className="equip_page_title">Recommended Equipment</h1>
      </div>

      <div className="equip_list_container">
        {selectedEquipment.length === 0 ? (
          <p>No equipment available.</p>
        ) : (
          selectedEquipment.map((item, index) => (
            <div key={item.equipment_id || index} className="equip_card">
              <img
                className="equip_pic"
                src={item.image_url || Image}
                alt={item.model || "No model"}
              />
              <h2 className="equip_card_title">
                {item.model || "Unknown Model"}
              </h2>
              <p className="equip_card_description">
                {item.name || "No description"}
              </p>

              <p className="equip_card_power">
                Power: {item.power ? `${item.power} tons` : "N/A"}
              </p>

              <p className="equip_card_details">
                {item.btu ? `BTU: ${item.btu}` : ""}
                {item.seer ? ` | SEER: ${item.seer}` : ""}
              </p>

              <p className="equip_card_type">Type: {item.type || "Unknown"}</p>
              <button className="equip_more_button">Подробнее</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
