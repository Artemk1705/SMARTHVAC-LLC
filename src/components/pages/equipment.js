import { useState } from "react";
import "../../assets/styles/equip.css";
import Equipment from "../pagesContent/equipmentPageContent/equipContent";
import Navbar from "../layout/navbar";
import Questionnaire from "../pagesContent/equipmentPageContent/quest";
import Footer from "../layout/footer";

export default function EquipmentPage() {
  const [selectedTypes, setSelectedTypes] = useState([]);

  return (
    <div>
      <Navbar />
      <Equipment selectedTypes={selectedTypes} />
      <Questionnaire setSelectedTypes={setSelectedTypes} />
      <Footer />
    </div>
  );
}
