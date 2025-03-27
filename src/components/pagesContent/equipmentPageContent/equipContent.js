import React, { useState, useEffect } from "react"; // ✅ Добавил useState, useEffect
import { Amplify } from "aws-amplify";
import { get } from "aws-amplify/api"; // ✅ Добавил get из aws-amplify
import awsconfig from "../../../aws-exports";
import Image from "../../../assets/images/HvacMainBack.jpg";

Amplify.configure(awsconfig);

export default function Equipment({ selectedTypes }) {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedTypes.length > 0) {
      fetchEquipment();
    }
  }, [selectedTypes]);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      console.log(`Fetching equipment for type(s): ${selectedTypes}...`);

      const queryString = selectedTypes.length
        ? `?type=${selectedTypes.join(",")}`
        : "";

      console.log(`API Request: /equip${queryString}`);

      const restOperation = get({
        apiName: "EquipDB",
        path: `/equip${queryString}`,
      });

      const { body } = await restOperation.response;
      const equipmentData = await body.json();

      console.log("📜 Filtered Equipment Data:", equipmentData);
      setEquipment(equipmentData);
    } catch (error) {
      console.error("❌ Ошибка загрузки данных:", error);
      setError("Не удалось загрузить данные.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="equip_page_title_container"></div>

      <div>
        {equipment.length === 0 ? (
          <div></div>
        ) : (
          equipment.map((item) => (
            <div key={item.equipment_id} className="list_equip_container">
              <div className="equip_card_container">
                <h2 className="equip_card_title">{item.model}</h2>
                <p className="equip_card_description">{item.name}</p>
                <p className="equp_card_Category">
                  Power: {item.power} Ton | {item.btu} BTU | SEER: {item.seer}
                </p>
                <p className="equp_card_Category">Type: {item.type}</p>
              </div>
              <div className="equip_contact_button">Contact</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
